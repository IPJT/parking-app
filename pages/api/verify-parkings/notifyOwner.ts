import { VehicleFragment } from './helpers/refreshAccessTokenAndSaveToDB'
import { clerkClient } from '@clerk/nextjs'

export async function notifyOwner(vehicle: VehicleFragment, millisecondsUntilIllegalParking: number) {
  const userId = vehicle.owner
  const phoneNumber = await getPhoneNumber(userId)
}

async function getPhoneNumber(userId: string) {
  const user = await clerkClient.users.getUser(userId)
  const primaryPhoneNumberId = user.primaryPhoneNumberId

  const phoneNumber = user.phoneNumbers.find((phoneNumber) => phoneNumber.id === primaryPhoneNumberId)?.phoneNumber

  if (!phoneNumber) {
    throw new Error('User has no primary phone number')
  }
}
