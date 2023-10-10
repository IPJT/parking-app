import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'
import { FragmentType, graphql, useFragment } from '../../__generated__'
import { getVehicleStatusColor, getVehicleStatusString, getVehicleStatus } from '../../utils/vehicleHelpers'
import { VehicleModal } from './VehicleModal'

type Props = {
  vehicle: FragmentType<typeof VehicleCard_VehicleFragment>
}

export const VehicleCard = (props: Props) => {
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false)
  const vehicle = useFragment(VehicleCard_VehicleFragment, props.vehicle)
  const vehicleStatus = getVehicleStatus(vehicle)

  return (
    <>
      <GenericCard $borderColor={getVehicleStatusColor(vehicleStatus)} onClick={() => setIsVehicleModalOpen(true)}>
        <p>{vehicle.name}</p>
        <Image src={`/${vehicle.brand.toLowerCase()}.svg`} alt='plus icon' width={70} height={70} />
        <p>{getVehicleStatusString(vehicleStatus)}</p>
      </GenericCard>
      <VehicleModal isModalOpen={isVehicleModalOpen} setIsModalOpen={setIsVehicleModalOpen} vehicle={vehicle} />
    </>
  )
}

const VehicleCard_VehicleFragment = graphql(/* GraphQL */ `
  fragment VehicleCard_VehicleFragment on Vehicle {
    id
    name
    brand
    accessTokensReponse
    vin
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
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  }
`
