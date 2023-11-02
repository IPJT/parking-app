import { Coordinates } from '../../../clients/HmRestApi'
import { Feature, getServiceDaysCollection } from '../../../clients/StockholmParkering'
import { getMillisecondsUntilNextInterval } from './helpers/getMillisecondsUntilNextInterval'

export async function checkIfParkedLegally(location: Coordinates) {
  const serviceDaysCollection = await getServiceDaysCollection(location)
  console.log(JSON.stringify(serviceDaysCollection, null, 2))
  const closestServiceDay = serviceDaysCollection.features[0] //TODO-ian. Sort by distance

  const millisecondsUntilNextInterval = getMillisecondsUntilNextInterval(closestServiceDay.properties)

  console.log({ millisecondsUntilNextInterval })

  return true
}
