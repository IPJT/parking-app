import { NextApiRequest, NextApiResponse } from 'next'
import { graphql } from '../../../__generated__'
import { apolloClientOnServer } from '../../../services/ApolloClientOnServer'
import { exchangeAuthCodeWithToken } from '../../../services/hmAccessTokens'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      code: authCode,
      error: authError,
      state: vehicleId,
    } = req.query as { code?: string; error?: string; state?: string }

    if (!vehicleId) {
      throw new Error('state(vehicleId) was not set as a query param by High Mobility')
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

    const accessTokensReponse = await response.json()
    const { errors } = await apolloClientOnServer.mutate({
      mutation: VehicleAddAccessTokensReponse_Mutation,
      variables: { id: vehicleId, accessTokensReponse: accessTokensReponse },
    })

    if (errors) {
      throw new Error(
        `accessTokensReponse couldn't be saved to the DB. Here is the first of potentially more errors ${errors[0].toString()}}`
      )
    }
  } catch (error) {
    throw error //TODO-ian wtf do I do here?
  } finally {
    res.redirect('/?test=123')
  }
}

const VehicleAddAccessTokensReponse_Mutation = graphql(/* GraphQL */ `
  mutation VehicleAddAccessTokensReponse_Mutation($id: ID!, $accessTokensReponse: JSON!) {
    vehicleUpdate(by: { id: $id }, input: { accessTokensReponse: $accessTokensReponse }) {
      vehicle {
        id
      }
    }
  }
`)
