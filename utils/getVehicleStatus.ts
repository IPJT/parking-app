import { VehicleCard_VehicleFragmentFragment } from '../__generated__/graphql'
import { VehicleStatusEnum } from './enums'

export function getVehicleStatus(vehicle: VehicleCard_VehicleFragmentFragment) {
  const accessTokensReponse = vehicle.accessTokensReponse //todo add zod-validation

  switch (accessTokensReponse.status) {
    case 'pending':
      return VehicleStatusEnum.pending

    case 'approved':
      return VehicleStatusEnum.approved

    default:
      throw new Error(`Unvalid accessTokensReponse.status for vehicle with ID: ${vehicle.id}`)
  }
}
