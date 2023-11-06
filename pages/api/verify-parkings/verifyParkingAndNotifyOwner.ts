import { getMillisecondsUntilIllegalParking } from './getMillisecondsUntilIllegalParking'
import { getVehicleLocation } from './getVehicleLocation'
import { VehicleFragment } from './helpers/refreshAccessTokenAndSaveToDB'
import { notifyOwner } from './notifyOwner'
import * as Sentry from '@sentry/nextjs'

type VerifyParkingAndNotifyOwnerResponse = {
  isSuccess: boolean
}

async function verifyParkingAndNotifyOwner(vehicle: VehicleFragment): Promise<VerifyParkingAndNotifyOwnerResponse> {
  try {
    const vehicleLocation = await getVehicleLocation(vehicle)

    const millisecondsUntilIllegalParking = await getMillisecondsUntilIllegalParking(vehicleLocation)

    if (millisecondsUntilIllegalParking < 24 * 60 * 60 * 1000) {
      await notifyOwner(vehicle, millisecondsUntilIllegalParking)
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
