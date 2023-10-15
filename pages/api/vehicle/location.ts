import * as Sentry from '@sentry/nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { graphql } from '../../../__generated__'
import { apolloClientOnServer } from '../../../clients/ApolloClientOnServer'
import { CheckParkedLegallyTime } from '../../../utils/enums'
import { VehicleSearch_QueryQuery } from '../../../__generated__/graphql'
import { refreshAccessToken } from '../../../clients/HmOAuthApi'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  console.log('hej')
  try {
    const { time } = request.query as { time: CheckParkedLegallyTime } //TODO. Add zod

    const { data, errors } = await apolloClientOnServer.query({
      query: VehicleSearch_Query,
      variables: { time },
    })

    if (errors) {
      throw new Error(`${errors.length} error(s) returned from VehicleSearch_Query. Errors: ${JSON.stringify(errors)}`)
    }

    if (!data.vehicleSearch) {
      throw new Error(`No data returned from VehicleSearch_Query`)
    }

    if (data.vehicleSearch.searchInfo?.totalHits !== data.vehicleSearch.edges.length) {
      throw new Error(`Implement Pagination for VehicleSearch_Query`)
    }

    const vehicles = data.vehicleSearch?.edges.map((edge) => edge.node)

    Sentry.captureMessage(`${vehicles.length} vehicles for which location is to be fetched`)

    const promiseArray = vehicles.map((vehicle) => {
      return getVehicleLocation(vehicle)
    })

    await Promise.all(promiseArray)

    response.status(200).json({
      vehicles: JSON.stringify(vehicles.map((vehicle) => vehicle.vin)),
    })
  } catch (error) {
    Sentry.captureException(error)
    await Sentry.flush(2000)
    throw error
  }
}

//TODO: Pagination?
const VehicleSearch_Query = graphql(/* GraphQL */ `
  query VehicleSearch_Query($time: String!) {
    vehicleSearch(first: 100, query: $time, fields: ["checkParkedLegallyAt"]) {
      edges {
        node {
          vin
          owner
          accessTokensResponse
        }
      }
      searchInfo {
        totalHits
      }
    }
  }
`)

async function getVehicleLocation(
  vehicle: Exclude<VehicleSearch_QueryQuery['vehicleSearch'], null | undefined>['edges'][number]['node']
) {
  //Use refresh token to obtain new accessTokensResponse
  const tokenResponse = await refreshAccessToken(vehicle.accessTokensResponse['refresh_token'])
  if (tokenResponse.status !== 200) {
    throw new Error(
      `Access token could not be refreshed via access-token API. Error from HM: ${await tokenResponse.json()}`
    )
  }
  const accessTokensResponseJson = await tokenResponse.json() //TODO. Use zod to verify there is a accessToken in the response

  // Use the Access Token to build a JWT

  //use the REST API to fetch data with the JWT

  //Write accessTokensResponseJson and location to DB
}
