import { Coordinates } from '../../../clients/HmRestApi'
import { Feature, getServiceDaysCollection } from '../../../clients/StockholmParkering'
import { getMillisecondsUntilNextInterval } from './helpers/getMillisecondsUntilNextInterval'

export async function getMillisecondsUntilIllegalParking(location: Coordinates) {
  const serviceDaysCollection = await getServiceDaysCollection(location)

  const closestServiceDay = serviceDaysCollection.features[0] //TODO-ian. Sort by distance

  return getMillisecondsUntilNextInterval(closestServiceDay.properties)
}
