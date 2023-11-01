export async function fetchVehicleLocation({ vin, accessToken }: { vin: string; accessToken: string }) {
  const response = await fetch(`${process.env.HIGH_MOBILITY_REST_API_URI}/v1/vehicle-data/autoapi-13/${vin}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (response.status !== 200) {
    const errorJson = await response.json()
    throw new Error(
      `Vehicle location could not be fetched from HIGH_MOBILITY_REST_API for vehicle with vin: ${vin}. Error from HM: ${JSON.stringify(
        errorJson,
        null,
        2
      )}`
    )
  }

  const responseJson: HMRestApiResponse = await response.json() //TODO-ian. Parse/zod-validate

  return responseJson.vehicle_location.coordinates.data
}

type HMRestApiResponse = {
  brand: string
  vin: string
  diagnostics: {
    odometer: DiagnosticData<{ value: string; unit: string }>
  }
  vehicle_location: {
    coordinates: DiagnosticData<Coordinates>
  }
  request_id: string
}

type DiagnosticData<T> = {
  data: T
  timestamp: string
  failure: string
}

export type Coordinates = {
  latitude: number
  longitude: number
}
