import LatLonNvectorSpherical from 'geodesy/latlon-nvector-spherical'
import { Coordinates } from '../../../../clients/HmRestApi'
import { Feature } from '../../../../clients/StockholmParkering'

export function getMinimumDistanceToFeature(location: Coordinates, feature: Feature) {
  const linestringCoordinates = feature.geometry.coordinates

  if (linestringCoordinates.length < 2) {
    throw new Error('Linestring must have at least 2 coordinates')
  }

  const p1 = new LatLonNvectorSpherical(location.latitude, location.longitude)

  let minimumDistance = Number.MAX_VALUE

  // Iterate over each segment in the linestring
  for (let index = 0; index < linestringCoordinates.length - 1; index++) {
    const pathStartPoint = linestringCoordinates[index]
    const pathEndPoint = linestringCoordinates[index + 1]
    const startLatLon = new LatLonNvectorSpherical(pathStartPoint[1], pathStartPoint[0])
    const endLatLon = new LatLonNvectorSpherical(pathEndPoint[1], pathEndPoint[0])

    const nearestPointOnSegment = p1.nearestPointOnSegment(startLatLon, endLatLon)

    const distanceToNearestPointOnSegment = p1.distanceTo(nearestPointOnSegment)

    // Update the minimum distance if the current segment is closer
    minimumDistance = Math.min(minimumDistance, distanceToNearestPointOnSegment)
  }

  return minimumDistance
}
