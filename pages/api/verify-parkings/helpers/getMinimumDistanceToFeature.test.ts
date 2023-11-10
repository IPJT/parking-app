import { getMinimumDistanceToFeature } from './getMinimumDistanceToFeature'
import { getMockedFeature } from './test-helpers/getMockedFeature'

describe('getMinimumDistanceToLinestring', () => {
  it("should throw an error if the linestring doesn't have at least 2 coordinates", () => {
    const location = { latitude: 59.3293, longitude: 18.0686 }
    const feature = getMockedFeature({
      coordinates: [[18.1686, 59.3193]],
      streetName: 'Test street',
    })

    expect(() => getMinimumDistanceToFeature(location, feature)).toThrow('Linestring must have at least 2 coordinates')
  })

  describe('should return the distance to the closest point on the line string', () => {
    it('when the closest point is one of the linestring points', () => {
      const location = { latitude: 59.3293, longitude: 18.0686 }
      const feature = getMockedFeature({
        coordinates: [
          [18.1106, 59.3253],
          [18.1687, 59.3194],
          [18.1688, 59.3195],
        ],
        streetName: 'Test street',
      })

      const result = getMinimumDistanceToFeature(location, feature) //The distance between the location and the first coordinate in the linestring (closest point on the linestring) is approx. 2425m
      expect(result).toBeGreaterThan(2420)
      expect(result).toBeLessThan(2430)
    })

    it('when the closest point is on the linestring', () => {
      const location = { latitude: 59.3257, longitude: 18.111 }
      const feature = getMockedFeature({
        coordinates: [
          [18.1106, 59.3253],
          [18.112, 59.3253],
        ],
        streetName: 'Test street',
      })

      const result = getMinimumDistanceToFeature(location, feature) //The distance between the location and the closest point on the linestring is approx. 45m
      expect(result).toBeGreaterThan(44)
      expect(result).toBeLessThan(46)
    })
  })

  it('should return 0 if the location is one of the coordinates in the linestring', () => {
    const feature = getMockedFeature({
      coordinates: [
        [18.1686, 59.3193],
        [18.1687, 59.3194],
        [18.1688, 59.3195],
      ],
      streetName: 'Test street',
    })

    const result1 = getMinimumDistanceToFeature({ latitude: 59.3193, longitude: 18.1686 }, feature)
    expect(result1).toBeCloseTo(0, 4)

    const result2 = getMinimumDistanceToFeature({ latitude: 59.3194, longitude: 18.1687 }, feature)
    expect(result2).toBeCloseTo(0, 4)

    const result3 = getMinimumDistanceToFeature({ latitude: 59.3195, longitude: 18.1688 }, feature)
    expect(result3).toBeCloseTo(0, 4)
  })
})
