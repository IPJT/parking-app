import { VehicleCard_VehicleFragmentFragment } from '../__generated__/graphql'
import { theme } from '../styles/theme'
import { VehicleStatusEnum } from './enums'

export function getVehicleStatus(vehicle: VehicleCard_VehicleFragmentFragment) {
  const accessTokensResponse = vehicle.accessTokensResponse //todo add zod-validation

  switch (accessTokensResponse.status) {
    case 'pending':
      return VehicleStatusEnum.pending

    case 'approved':
      return VehicleStatusEnum.approved

    default:
      throw new Error(`Unvalid accessTokensResponse.status for vehicle with ID: ${vehicle.id}`)
  }
}

export function getVehicleStatusColor(vehicleStatus: VehicleStatusEnum) {
  switch (vehicleStatus) {
    case VehicleStatusEnum.pending:
      return theme.colors.semantics.warning

    case VehicleStatusEnum.approved:
      return theme.colors.semantics.success
  }
}

export function getVehicleStatusString(vehicleStatus: VehicleStatusEnum) {
  switch (vehicleStatus) {
    case VehicleStatusEnum.pending:
      return 'Väntar på godkännande'

    case VehicleStatusEnum.approved:
      return 'Godkänd'
  }
}
