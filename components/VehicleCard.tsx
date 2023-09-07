import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

export type Vehicle = {
  id: string
  name: string
  brand: string
  status: string
  owner?: string
}

export const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <GenericCard $borderColor={`${vehicle.status === 'Pending' ? 'orange' : 'none'}`}>
      <p>{vehicle.name}</p>
      <Image src={`/${vehicle.brand}.svg`} alt='plus icon' width={70} height={70} />
      <p>{vehicle.status === 'Pending' ? 'Väntar på godkännande' : 'Redo!'}</p>
    </GenericCard>
  )
}

export const GenericCard = styled.div<{ $borderColor?: string }>`
  max-width: 300px;
  min-width: 300px;
  height: 200px;
  border: ${(props) => (props.$borderColor === 'orange' ? 'orange 2px solid' : 'unset')};
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.secondary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }
`