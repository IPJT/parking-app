import { NextApiRequest, NextApiResponse } from 'next'
import { graphql } from '../../../__generated__'
import { apolloClientOnServer } from '../../../clients/ApolloClientOnServer'
import { exchangeAuthCodeWithToken, exchangeTokenWithVehicleInfo } from '../../../clients/HmOAuthApi'
import { ERROR_TOASTS } from '../../../utils/enums'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let errorToast: keyof typeof ERROR_TOASTS | null = null
  try {
    const {
      code: authCode,
      error: authError,
      state: vehicleData,
    } = req.query as { code?: string; error?: string; state?: string }

    if (!vehicleData) {
      throw new Error('state(vehicleData) was not set as a query param by High Mobility')
    }

    const partialVehicleDataObject = JSON.parse(vehicleData) as { name: string; brand: string; owner: string } //TODO. Add zod-validation

    if (!authCode) {
      throw new Error(`No authCode was received from HM. Error from HM: ${authError}`)
    }

    const tokenResponse = await exchangeAuthCodeWithToken(authCode)

    if (tokenResponse.status !== 200) {
      throw new Error(
        `Access token could not be fetched from access-token API. Error from HM: ${await tokenResponse.json()}`
      )
    }

    const accessTokensReponseJson = await tokenResponse.json() //TODO. Use zod to verify there is a accessToken in the response

    //use Token to obtain vin through the vehicle-info api
    const vehicleInfoResponse = await exchangeTokenWithVehicleInfo(accessTokensReponseJson['access_token'])
    const vehicleInfoResponseJson = await vehicleInfoResponse.json() // We need to verify this response

    //If we get an error for duplicate VINS, tell it to the user! If this happens. It seems like an error is thrown rather than populating the errors var
    const vehicleDataObject = {
      vin: vehicleInfoResponseJson.vin,
      ...partialVehicleDataObject,
      accessTokensReponse: accessTokensReponseJson,
    }
    const { errors } = await apolloClientOnServer.mutate({
      mutation: VehicleAdder_Mutation,
      variables: vehicleDataObject,
      errorPolicy: 'all',
    })

    if (errors) {
      if (errors.find((error) => error.message.match('is already taken on field "vin"'))) {
        errorToast = 'vehichleAlreadyExists'
      } else {
        throw new Error(
          `Car couldn't be saved to the DB. Here is the first of potentially more errors ${errors[0].toString()}}`
        )
      }
    }
  } catch (error: any) {
    errorToast = 'genericError'
    console.log(error.message)
    throw error //TODO-ian wtf do I do here? I need to log this! Include something traceable in all the log. E.g. userId + carName
  } finally {
    if (errorToast) {
      res.redirect(`/?errorToast=${errorToast}`)
    }
    res.redirect(`/`)
  }
}

const VehicleAdder_Mutation = graphql(/* GraphQL */ `
  mutation VehicleAdder_Mutation(
    $vin: String!
    $owner: String!
    $name: String!
    $brand: String!
    $accessTokensReponse: JSON!
  ) {
    vehicleCreate(
      input: { vin: $vin, owner: $owner, name: $name, brand: $brand, accessTokensReponse: $accessTokensReponse }
    ) {
      vehicle {
        vin
        id
      }
    }
  }
`)
