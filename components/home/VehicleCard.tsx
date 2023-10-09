import Image from 'next/image'
import styled from 'styled-components'
import { FragmentType, graphql, useFragment } from '../../__generated__'
import { theme } from '../../styles/theme'
import { getVehicleStatus } from '../../utils/getVehicleStatus'
import { VehicleStatusEnum } from '../../utils/enums'

type Props = {
  vehicle: FragmentType<typeof VehicleCard_VehicleFragment>
}

export const VehicleCard = (props: Props) => {
  const vehicle = useFragment(VehicleCard_VehicleFragment, props.vehicle)
  const vehicleStatus = getVehicleStatus(vehicle)

  return (
    <GenericCard $borderColor={getBorderColor(vehicleStatus)}>
      <p>{vehicle.name}</p>
      <Image src={`/${vehicle.brand.toLowerCase()}.svg`} alt='plus icon' width={70} height={70} />
      <p>{getStatusString(vehicleStatus)}</p>
    </GenericCard>
  )
}

const VehicleCard_VehicleFragment = graphql(/* GraphQL */ `
  fragment VehicleCard_VehicleFragment on Vehicle {
    id
    name
    brand
    accessTokensReponse
  }
`)

export const GenericCard = styled.div<{ $borderColor: string }>`
  max-width: 300px;
  min-width: 300px;
  height: 200px;
  border: ${(props) => `${props.$borderColor} 2px solid`};
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.scheme.darkAccent};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }
`

function getBorderColor(vehicleStatus: VehicleStatusEnum) {
  switch (vehicleStatus) {
    case VehicleStatusEnum.pending:
      return theme.colors.semantics.warning

    case VehicleStatusEnum.approved:
      return theme.colors.semantics.success
  }
}

function getStatusString(vehicleStatus: VehicleStatusEnum) {
  switch (vehicleStatus) {
    case VehicleStatusEnum.pending:
      return 'Väntar på godkännande'

    case VehicleStatusEnum.approved:
      return 'Godkänd'
  }
}
