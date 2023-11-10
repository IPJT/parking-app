import { Coordinates } from '../../../../clients/HmRestApi'
import { Feature } from '../../../../clients/StockholmParkering'
import { getClosestServiceDayFeature } from './getClosestServiceDayFeature'
import * as getMinimumDistanceToFeatureHelper from './getMinimumDistanceToFeature'
import { getMockedFeature } from './test-helpers/getMockedFeature'

jest.mock('./getMinimumDistanceToFeature', () => {
  return {
    __esModule: true, //    <----- this __esModule: true is important
    ...jest.requireActual('./getMinimumDistanceToFeature'),
  }
})

const _getMinimumDistanceToFeature = getMinimumDistanceToFeatureHelper.getMinimumDistanceToFeature

describe('getClosestServiceDayFeature', () => {
  const location = { latitude: 59.3293, longitude: 18.0686 } // Stockholm, Sweden

  const firstFeature = getMockedFeature({ coordinates: [], streetName: '1st street' })
  const secondFeature = getMockedFeature({ coordinates: [], streetName: '2nd street' })
  const thirdFeature = getMockedFeature({ coordinates: [], streetName: '3rd street' })

  const features: [Feature, ...Feature[]] = [firstFeature, secondFeature, thirdFeature]

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should return the closest feature - 1', () => {
    const getMinimumDistanceToFeatureMock = jest.spyOn(getMinimumDistanceToFeatureHelper, 'getMinimumDistanceToFeature')
    getMinimumDistanceToFeatureMock.mockImplementation((location: Coordinates, feature: Feature) => {
      if (feature.properties.STREET_NAME === '1st street') {
        return 1
      } else if (feature.properties.STREET_NAME === '2nd street') {
        return 2
      } else if (feature.properties.STREET_NAME === '3rd street') {
        return 3
      }
      return _getMinimumDistanceToFeature(location, feature)
    })

    const result = getClosestServiceDayFeature(location, features)

    expect(result).toEqual(features[0])
    expect(getMinimumDistanceToFeatureMock).toHaveBeenCalledTimes(4)
    expect(getMinimumDistanceToFeatureMock).toHaveBeenCalledWith(location, features[0])
    expect(getMinimumDistanceToFeatureMock).toHaveBeenCalledWith(location, features[1])
    expect(getMinimumDistanceToFeatureMock).toHaveBeenCalledWith(location, features[2])
  })

  it('should return the closest feature - 2', () => {
    const getMinimumDistanceToFeatureMock = jest.spyOn(getMinimumDistanceToFeatureHelper, 'getMinimumDistanceToFeature')
    getMinimumDistanceToFeatureMock.mockImplementation((location: Coordinates, feature: Feature) => {
      if (feature.properties.STREET_NAME === '1st street') {
        return 4
      } else if (feature.properties.STREET_NAME === '2nd street') {
        return 2
      } else if (feature.properties.STREET_NAME === '3rd street') {
        return 3
      }
      return _getMinimumDistanceToFeature(location, feature)
    })

    const result = getClosestServiceDayFeature(location, features)

    expect(result).toEqual(features[1])
    expect(getMinimumDistanceToFeatureMock).toHaveBeenCalledTimes(4)
    expect(getMinimumDistanceToFeatureMock).toHaveBeenCalledWith(location, features[0])
    expect(getMinimumDistanceToFeatureMock).toHaveBeenCalledWith(location, features[1])
    expect(getMinimumDistanceToFeatureMock).toHaveBeenCalledWith(location, features[2])
  })

  it('should return the closest feature - 3', () => {
    const getMinimumDistanceToFeatureMock = jest.spyOn(getMinimumDistanceToFeatureHelper, 'getMinimumDistanceToFeature')
    getMinimumDistanceToFeatureMock.mockImplementation((location: Coordinates, feature: Feature) => {
      if (feature.properties.STREET_NAME === '1st street') {
        return 4
      } else if (feature.properties.STREET_NAME === '2nd street') {
        return 5
      } else if (feature.properties.STREET_NAME === '3rd street') {
        return 0.1
      }
      return _getMinimumDistanceToFeature(location, feature)
    })

    const result = getClosestServiceDayFeature(location, features)

    expect(result).toEqual(features[2])
    expect(getMinimumDistanceToFeatureMock).toHaveBeenCalledTimes(4)
    expect(getMinimumDistanceToFeatureMock).toHaveBeenCalledWith(location, features[0])
    expect(getMinimumDistanceToFeatureMock).toHaveBeenCalledWith(location, features[1])
    expect(getMinimumDistanceToFeatureMock).toHaveBeenCalledWith(location, features[2])
  })

  it('should return the closest feature - 4', () => {
    const getMinimumDistanceToFeatureMock = jest.spyOn(getMinimumDistanceToFeatureHelper, 'getMinimumDistanceToFeature')
    getMinimumDistanceToFeatureMock.mockImplementation((location: Coordinates, feature: Feature) => {
      if (feature.properties.STREET_NAME === '1st street') {
        return 4
      } else if (feature.properties.STREET_NAME === '2nd street') {
        return 5
      } else if (feature.properties.STREET_NAME === '3rd street') {
        return 0.1
      }
      return _getMinimumDistanceToFeature(location, feature)
    })

    const result = getClosestServiceDayFeature(location, [features[0]])

    expect(result).toEqual(features[0])
    expect(getMinimumDistanceToFeatureMock).toHaveBeenCalledTimes(0)
  })
})
