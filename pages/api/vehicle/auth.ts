import { NextApiRequest, NextApiResponse } from 'next'
import { graphql } from '../../../__generated__'
import { apolloClientOnServer } from '../../../clients/ApolloClientOnServer'
import { exchangeAuthCodeWithToken } from '../../../clients/hmAccessTokens'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      code: authCode,
      error: authError,
      state: vehicleData,
    } = req.query as { code?: string; error?: string; state?: string }

    if (!vehicleData) {
      throw new Error('state(vehicleData) was not set as a query param by High Mobility')
    }

    if (!authCode) {
      throw new Error(`No authCode was received from HM. Error from HM: ${authError}`)
    }

    const response = await exchangeAuthCodeWithToken(authCode)

    if (response.status !== 200) {
      throw new Error(
        `Access token could not be fetched from access-token API. Error from HM: ${await response.json()}`
      )
    }

    //use Token to obtain vin through the vehicle-info api

    const vehicleDataObject = JSON.parse(vehicleData) as { name: string; brand: string; owner: string } //TODO. Add zod-validation

    //make vin a unique field on the Vehicle type in db
    //If we get an error for duplicate VINS, tell it to the user!
    const accessTokensReponse = await response.json()
    const { errors } = await apolloClientOnServer.mutate({
      mutation: VehicleAdder_Mutation,
      variables: { ...vehicleDataObject, accessTokensReponse: accessTokensReponse },
    })

    if (errors) {
      throw new Error(
        `accessTokensReponse couldn't be saved to the DB. Here is the first of potentially more errors ${errors[0].toString()}}`
      )
    }
  } catch (error) {
    res.redirect('/?errorToast=an-error-occured-during-auth-flow')
    throw error //TODO-ian wtf do I do here? I need to log this! Include something traceable in all the log. E.g. userId + carName
  }
  res.redirect('/')
}

const VehicleAdder_Mutation = graphql(/* GraphQL */ `
  mutation VehicleAdder_Mutation($owner: String!, $name: String!, $brand: String!, $accessTokensReponse: JSON!) {
    vehicleCreate(input: { owner: $owner, name: $name, brand: $brand, accessTokensReponse: $accessTokensReponse }) {
      vehicle {
        id
      }
    }
  }
`)
