import { graphql } from '../../../../__generated__'
import { apolloClientOnServer } from '../../../../clients/ApolloClientOnServer'
import { refreshAccessToken } from '../../../../clients/HmOAuthApi'
import { fetchVehicleLocation } from '../../../../clients/HmRestApi'
import { Location, VehicleFragment } from './helpers'

export async function getVehicleLocation(vehicle: VehicleFragment): Promise<Location> {
  //Use refresh token to obtain new accessTokensResponse
  const tokenResponse = await refreshAccessToken(vehicle.accessTokensResponse['refresh_token'])
  if (tokenResponse.status !== 200) {
    throw new Error(
      `Access token could not be refreshed via access-token API. Error from HM: ${await tokenResponse.json()}`
    )
  }
  const accessTokensResponseJson = await tokenResponse.json() //TODO. Use zod to verify there is a accessToken in the response

  await apolloClientOnServer.mutate({
    mutation: ModifyAccessTokensResponseOnVehicle_Mutation,
    variables: { vin: vehicle.vin, newAccessTokensResponse: accessTokensResponseJson },
  })

  const vehicleLocation = fetchVehicleLocation(accessTokensResponseJson['access_token'])

  return { x: '1', y: '2' }

  //Write accessTokensResponseJson and location to DB
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
