import { getVehicleLocation } from './getVehicleLocation'
import { VehicleFragment } from './helpers'
import { notifyOwner } from './notifyOwner'
import { verifyParking } from './verifyParking'
import * as Sentry from '@sentry/nextjs'

type VerifyParkingAndNotifyOwnerResponse = {
  isSuccess: boolean
}

async function verifyParkingAndNotifyOwner(vehicle: VehicleFragment): Promise<VerifyParkingAndNotifyOwnerResponse> {
  try {
    const vehicleLocation = await getVehicleLocation(vehicle)

    const isVehicleParkedLegally = await verifyParking(vehicleLocation)

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
