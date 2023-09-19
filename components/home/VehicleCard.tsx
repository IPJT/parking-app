import Image from 'next/image'
import styled from 'styled-components'
import { FragmentType, graphql, useFragment } from '../../__generated__'
import { theme } from '../../styles/theme'

type Props = {
  vehicle: FragmentType<typeof VehicleCard_VehicleFragment>
}

export const VehicleCard = (props: Props) => {
  const vehicle = useFragment(VehicleCard_VehicleFragment, props.vehicle)

  return (
    <GenericCard $borderColor={`${vehicle.status === 'Pending' ? 'orange' : 'none'}`}>
      <p>{vehicle.name}</p>
      <Image src={`/${vehicle.brand}.svg`} alt='plus icon' width={70} height={70} />
      <p>{vehicle.status === 'Pending' ? 'Väntar på godkännande' : 'Redo!'}</p>
    </GenericCard>
  )
}

const VehicleCard_VehicleFragment = graphql(/* GraphQL */ `
  fragment VehicleCard_VehicleFragment on Vehicle {
    name
    brand
    status
  }
`)

export const GenericCard = styled.div<{ $borderColor?: string }>`
  max-width: 300px;
  min-width: 300px;
  height: 200px;
  border: ${(props) => (props.$borderColor === 'orange' ? `${theme.colors.semantics.warning} 2px solid` : 'unset')};
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
