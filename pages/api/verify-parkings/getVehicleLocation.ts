import { fetchVehicleLocation } from '../../../clients/HmRestApi'
import { VehicleFragment, refreshAccessTokenAndSaveToDB } from './helpers'

export async function getVehicleLocation(vehicle: VehicleFragment) {
  //Use refresh token to obtain new accessTokensResponse

  const accessToken = await refreshAccessTokenAndSaveToDB(vehicle)

  const vehicleLocation = await fetchVehicleLocation({ vin: vehicle.vin, accessToken }) //TODO -save vehicleLocation to DB

  return vehicleLocation
}
