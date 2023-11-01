import { fetchVehicleLocation } from '../../../clients/HmRestApi'
import { Location, VehicleFragment, refreshAccessTokenAndSaveToDB } from './helpers'

export async function getVehicleLocation(vehicle: VehicleFragment): Promise<Location> {
  //Use refresh token to obtain new accessTokensResponse

  const accessToken = await refreshAccessTokenAndSaveToDB(vehicle)

  console.log(accessToken)

  const vehicleLocation = fetchVehicleLocation(accessToken)

  return { x: '1', y: '2' }

  //Write accessTokensResponseJson and location to DB
}
