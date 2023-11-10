import { VehicleFragment } from './helpers/refreshAccessTokenAndSaveToDB'
import { clerkClient } from '@clerk/nextjs'

export async function notifyOwner(owner: VehicleFragment['owner'], millisecondsUntilIllegalParking: number) {
  const clerkUserId = owner
  const phoneNumber = await getPhoneNumber(clerkUserId)
}

async function getPhoneNumber(userId: string) {
  const user = await clerkClient.users.getUser(userId)
  const primaryPhoneNumberId = user.primaryPhoneNumberId

  const phoneNumber = user.phoneNumbers.find((phoneNumber) => phoneNumber.id === primaryPhoneNumberId)?.phoneNumber

  if (!phoneNumber) {
    throw new Error(`User with clerkUserId: ${userId} has no primary phone number`)
  }
}
