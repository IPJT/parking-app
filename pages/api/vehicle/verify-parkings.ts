import * as Sentry from '@sentry/nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { graphql } from '../../../__generated__'
import { apolloClientOnServer } from '../../../clients/ApolloClientOnServer'
import { CheckParkedLegallyTime } from '../../../utils/enums'
import { verifyParkingAndNotifyOwner } from './verify-parkings/verifyParkingAndNotifyOwner'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
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

  const promiseArray = vehicles.map((vehicle) => verifyParkingAndNotifyOwner(vehicle))

  const responses = await Promise.all(promiseArray)

  const successes = responses.filter((response) => response.isSuccess)
  const failures = responses.filter((response) => !response.isSuccess)

  Sentry.captureMessage(
    `verifyParkingAndNotifyOwner was successfully executed for ${successes.length} vehicles. It failed for ${failures.length} vehicles`
  )

  response.status(200).json({
    message: `verifyParkingAndNotifyOwner was successfully executed for ${successes.length} vehicles. It failed for ${failures.length} vehicles`,
  })
}

//TODO: Pagination?
//TODO: THis query doesn't work. Try e.g. PM10
const VehicleSearch_Query = graphql(/* GraphQL */ `
  query VehicleSearch_Query($time: String!) {
    vehicleSearch(first: 100, query: $time, fields: ["verifyParkingTimeArray"]) {
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
