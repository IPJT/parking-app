import { NextApiRequest, NextApiResponse } from 'next'
import { graphql } from '../../../__generated__'
import { apolloClientOnServer } from '../../../clients/ApolloClientOnServer'
import { ERROR_TOASTS } from '../../../utils/enums'
import * as Sentry from '@sentry/nextjs'
import { exchangeAccessTokenWithVehicleInfo, exchangeAuthCodeWithAccessToken } from '../../../clients/HmOAuthApi'

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

    const tokenResponse = await exchangeAuthCodeWithAccessToken(authCode)

    if (tokenResponse.status !== 200) {
      throw new Error(
        `Access token could not be fetched from access-token API. Error from HM: ${await tokenResponse.json()}`
      )
    }

    const accessTokensResponseJson = await tokenResponse.json() //TODO. Use zod to verify there is a accessToken in the response

    //use Token to obtain vin through the vehicle-info api
    const vehicleInfoResponse = await exchangeAccessTokenWithVehicleInfo(accessTokensResponseJson['access_token'])
    const vehicleInfoResponseJson = await vehicleInfoResponse.json() // We need to verify this response

    const vehicleDataObject = {
      vin: vehicleInfoResponseJson.vin,
      ...partialVehicleDataObject,
      accessTokensResponse: accessTokensResponseJson,
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
          `${errors.length} error(s) returned from the VehicleAdder_Mutation. Errors: ${JSON.stringify(errors)}`
        )
      }
    }
  } catch (error: any) {
    //TODO see this for typing of errors https://engineering.udacity.com/handling-errors-like-a-pro-in-typescript-d7a314ad4991
    errorToast = 'genericError'
    Sentry.captureException(error)
    await Sentry.flush(2000)
  } finally {
    if (errorToast) {
      res.redirect(`/?errorToast=${errorToast}`)
    } else {
      res.redirect(`/`)
    }
  }
}

const VehicleAdder_Mutation = graphql(/* GraphQL */ `
  mutation VehicleAdder_Mutation(
    $vin: String!
    $owner: String!
    $name: String!
    $brand: String!
    $accessTokensResponse: JSON!
  ) {
    vehicleCreate(
      input: { vin: $vin, owner: $owner, name: $name, brand: $brand, accessTokensResponse: $accessTokensResponse }
    ) {
      vehicle {
        vin
        id
      }
    }
  }
`)
