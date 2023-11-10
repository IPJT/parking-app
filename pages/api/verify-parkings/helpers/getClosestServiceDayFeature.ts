import { Coordinates } from '../../../../clients/HmRestApi'
import { Feature } from '../../../../clients/StockholmParkering'
import { getMinimumDistanceToFeature } from './getMinimumDistanceToFeature'

export function getClosestServiceDayFeature(location: Coordinates, features: [Feature, ...Feature[]]) {
  const distanceToFeature = features.reduce((closestFeature, currentFeature) => {
    const closestFeatureDistance = getMinimumDistanceToFeature(location, closestFeature)
    const currentFeatureDistance = getMinimumDistanceToFeature(location, currentFeature)
    return closestFeatureDistance < currentFeatureDistance ? closestFeature : currentFeature
  })

  return distanceToFeature
}
