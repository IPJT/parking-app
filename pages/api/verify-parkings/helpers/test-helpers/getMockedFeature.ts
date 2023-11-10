import { Feature } from '../../../../../clients/StockholmParkering'

export function getMockedFeature({
  coordinates,
  streetName,
}: {
  coordinates: [number, number][]
  streetName: string
}): Feature {
  return {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates,
    },
    properties: {
      START_TIME: 900,
      END_TIME: 1400,
      START_WEEKDAY: 'tisdag',
      STREET_NAME: streetName,
    },
  }
}
