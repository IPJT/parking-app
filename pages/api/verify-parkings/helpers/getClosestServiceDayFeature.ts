import { Coordinates } from '../../../../clients/HmRestApi'
import { Feature } from '../../../../clients/StockholmParkering'

export function getClosestServiceDayFeature(location: Coordinates, features: [Feature, ...Feature[]]) {
  const distanceToFeature = features.reduce((closestFeature, currentFeature) => {
    const closestFeatureDistance = getDistanceToFeature(location, closestFeature)
    const currentFeatureDistance = getDistanceToFeature(location, currentFeature)
    return closestFeatureDistance < currentFeatureDistance ? closestFeature : currentFeature
  })

  return distanceToFeature
}

export function getDistanceToFeature(location: Coordinates, feature: Feature) {
  const distanceToClosestPointInFeature = feature.geometry.coordinates.reduce((closestDistance, currentPoint) => {
    const currentDistance = getDistanceToPoint(location, currentPoint)
    return closestDistance < currentDistance ? closestDistance : currentDistance
  }, Infinity)

  console.log({ name: feature.properties.STREET_NAME, distance: distanceToClosestPointInFeature })

  return distanceToClosestPointInFeature
}

export function getDistanceToPoint(location: Coordinates, point: Feature['geometry']['coordinates'][number]) {
  const longDistance = Math.abs(location.longitude - point[0])
  const latDistance = Math.abs(location.latitude - point[1])

  return Math.sqrt(longDistance ** 2 + latDistance ** 2)
}
