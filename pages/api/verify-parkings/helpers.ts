import { VehicleSearch_QueryQuery } from '../../../__generated__/graphql'
import { apolloClientOnServer } from '../../../clients/ApolloClientOnServer'
import { refreshAccessToken } from '../../../clients/HmOAuthApi'
import { graphql } from '../../../__generated__'

export type VehicleFragment = NonNullable<VehicleSearch_QueryQuery['vehicleSearch']>['edges'][number]['node']

export async function refreshAccessTokenAndSaveToDB(vehicle: VehicleFragment) {
  const tokenResponse = await refreshAccessToken(vehicle.accessTokensResponse['refresh_token'])
  if (tokenResponse.status !== 200) {
    throw new Error(
      `Access token could not be refreshed via access-token API. Error from HM: ${JSON.stringify(
        await tokenResponse.json(),
        null,
        2
      )}`
    )
  }
  const accessTokensResponseJson = await tokenResponse.json() //TODO. Use zod to verify there is a accessToken in the response

  const { errors } = await apolloClientOnServer.mutate({
    mutation: ModifyAccessTokensResponseOnVehicle_Mutation,
    variables: { vin: vehicle.vin, newAccessTokensResponse: accessTokensResponseJson },
  })

  if (errors) {
    throw new Error(
      `${
        errors.length
      } error(s) returned from the ModifyAccessTokensResponseOnVehicle_Mutation. Errors: ${JSON.stringify(errors)}`
    )
  }

  return accessTokensResponseJson['access_token']
}

const ModifyAccessTokensResponseOnVehicle_Mutation = graphql(/* GraphQL */ `
  mutation ModifyAccessTokensResponseOnVehicle_Mutation($vin: String!, $newAccessTokensResponse: JSON!) {
    vehicleUpdate(by: { vin: $vin }, input: { accessTokensResponse: $newAccessTokensResponse }) {
      vehicle {
        id
      }
    }
  }
`)
