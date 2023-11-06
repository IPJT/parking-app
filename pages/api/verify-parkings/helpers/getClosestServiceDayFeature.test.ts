import { Feature } from '../../../../clients/StockholmParkering'
import { getClosestServiceDayFeature, getDistanceToFeature } from './getClosestServiceDayFeature'

describe('getClosestServiceDayFeature', () => {
  it('should return the closest service day feature when there is one feature', () => {
    const location = { latitude: 59.3293, longitude: 18.0686 } // Stockholm, Sweden
    const features: [Feature, ...Feature[]] = [
      getMockedFeature({ coordinates: [[18.1686, 59.3193]], streetName: 'Closest street' }),
    ]

    const result = getClosestServiceDayFeature(location, features)
    expect(result.properties.STREET_NAME).toBe('Closest street')
  })

  it('should return the closest service day feature when there are multiple features', () => {
    const location = { latitude: 59.32784, longitude: 18.05306 } // Stockholm, Sweden
    const closestFeature = getMockedFeature({
      coordinates: [
        [18.052655, 59.327859],
        [18.052567, 59.327858],
        [18.052566, 59.327858],
        [18.052139, 59.327855],
        [18.052135, 59.327855],
        [18.052035, 59.327856],
      ],
      streetName: 'Closest street',
    })
    const secondClosestFeature = getMockedFeature({
      coordinates: [
        [18.051288, 59.327894],
        [18.05152, 59.327877],
        [18.051774, 59.327863],
        [18.052086, 59.327858],
      ],
      streetName: '2nd closest street',
    })
    const thirdClosestFeature = getMockedFeature({
      coordinates: [
        [18.052539, 59.32714],
        [18.051921, 59.327082],
        [18.050604, 59.32697],
      ],
      streetName: '3rd closest street',
    })

    const result1 = getClosestServiceDayFeature(location, [secondClosestFeature, closestFeature, thirdClosestFeature])
    expect(result1.properties.STREET_NAME).toBe('Closest street')

    const result2 = getClosestServiceDayFeature(location, [secondClosestFeature, thirdClosestFeature])
    expect(result2.properties.STREET_NAME).toBe('2nd closest street')

    const result3 = getClosestServiceDayFeature(location, [thirdClosestFeature])
    expect(result3.properties.STREET_NAME).toBe('3rd closest street')

    const result4 = getClosestServiceDayFeature(location, [closestFeature, thirdClosestFeature])
    expect(result4.properties.STREET_NAME).toBe('Closest street')
  })
})

function getMockedFeature({
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

describe('getDistanceToFeature', () => {
  it('should return the distance to the closest point in the feature', () => {
    const location = { latitude: 59.3293, longitude: 18.0686 } // Stockholm, Sweden
    const feature = getMockedFeature({
      coordinates: [
        [18.1686, 59.3193],
        [18.1687, 59.3194],
        [18.1688, 59.3195],
      ],
      streetName: 'Test street',
    })

    const result = getDistanceToFeature(location, feature)
    expect(result).toBeCloseTo(0.10049875621121082, 1)
  })

  it('should return 0 if the location is inside the feature', () => {
    const location = { latitude: 59.3193, longitude: 18.1686 } // Inside the feature
    const feature = getMockedFeature({
      coordinates: [
        [18.1686, 59.3193],
        [18.1687, 59.3194],
        [18.1688, 59.3195],
      ],
      streetName: 'Test street',
    })

    const result = getDistanceToFeature(location, feature)
    expect(result).toBe(0)
  })
})
