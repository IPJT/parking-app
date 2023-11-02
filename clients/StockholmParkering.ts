import { Coordinates } from './HmRestApi'

const apiUri = process.env.STOCKHOLM_PARKING_API_URI
const apiKey = process.env.STOCKHOLM_PARKING_API_KEY

export async function getServiceDaysCollection(location: Coordinates) {
  if (!apiUri || !apiKey) {
    throw new Error('getServiceDaysCollection failed due to environment variables not defined')
  }
  const url = new URL(`${apiUri}/servicedagar/within`)

  const searchParams: { [key: string]: string } = {
    lat: location.latitude.toString(),
    lng: location.longitude.toString(),
    radius: '100',
    outputFormat: 'json',
    apiKey: apiKey,
  }

  Object.keys(searchParams).forEach((key) => url.searchParams.append(key, searchParams[key]))

  const response = await fetch(url.toString(), {
    method: 'GET',
  })

  if (response.status !== 200) {
    const errorJson = await response.json()
    throw new Error(`Service days could not be fetched. Error from API: ${JSON.stringify(errorJson, null, 2)}`)
  }

  const responseJson: FeatureCollection = await response.json() //TODO-ian. Parse/zod-validate

  return responseJson
}

type Geometry = {
  type: 'LineString'
  coordinates: [number, number][]
}

type Properties = {
  START_TIME: number
  END_TIME: number
  START_WEEKDAY: string
  STREET_NAME?: string
  CITY_DISTRICT?: string
}

export type Feature = {
  type: 'Feature'
  geometry: Geometry
  properties: Properties
}

type FeatureCollection = {
  type: 'FeatureCollection'
  features: Feature[]
  totalFeatures: number
  numberMatched: number
  numberReturned: number
  timeStamp: string
}
