import * as Sentry from '@sentry/nextjs'
import { Coordinates } from '../../../clients/HmRestApi'
import { FeatureCollection, getServiceDaysCollection } from '../../../clients/StockholmParkering'
import { isArrayLengthAtLeastOne } from '../../../utils/isArrayLengthAtLeastOne'
import { getClosestServiceDayFeature } from './helpers/getClosestServiceDayFeature'
import { getMillisecondsUntilNextInterval } from './helpers/getMillisecondsUntilNextInterval'

export async function getMillisecondsUntilIllegalParking(location: Coordinates) {
  let serviceDaysCollection: FeatureCollection | undefined
  let radius = 10
  while (!serviceDaysCollection || serviceDaysCollection.features.length === 0) {
    if (radius > 100) {
      break
    }
    serviceDaysCollection = await getServiceDaysCollection(location, radius)
    radius += 20
  }

  if (!serviceDaysCollection || !isArrayLengthAtLeastOne(serviceDaysCollection.features)) {
    throw new Error('No service days found, when searching with radius 100')
  }

  Sentry.captureMessage(
    `${serviceDaysCollection.features.length} service days found, when searching with radius ${radius}`
  )
  await Sentry.flush(2000)

  const closestServiceDay = getClosestServiceDayFeature(location, serviceDaysCollection.features)

  return getMillisecondsUntilNextInterval(closestServiceDay.properties)
}
