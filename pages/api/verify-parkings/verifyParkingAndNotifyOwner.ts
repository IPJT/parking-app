import { getVehicleLocation } from './getVehicleLocation'
import { VehicleFragment } from './helpers/refreshAccessTokenAndSaveToDB'
import { notifyOwner } from './notifyOwner'
import { checkIfParkedLegally } from './verifyParking'
import * as Sentry from '@sentry/nextjs'

type VerifyParkingAndNotifyOwnerResponse = {
  isSuccess: boolean
}

async function verifyParkingAndNotifyOwner(vehicle: VehicleFragment): Promise<VerifyParkingAndNotifyOwnerResponse> {
  try {
    const vehicleLocation = await getVehicleLocation(vehicle)

    console.log(vehicleLocation)

    const isVehicleParkedLegally = await checkIfParkedLegally(vehicleLocation)

    if (!isVehicleParkedLegally) {
      await notifyOwner(vehicle)
    }

    return {
      isSuccess: true,
    }
  } catch (error) {
    console.log(error)
    Sentry.captureException(error)
    await Sentry.flush(2000)
    return {
      isSuccess: false,
    }
  }
}

export { verifyParkingAndNotifyOwner }
