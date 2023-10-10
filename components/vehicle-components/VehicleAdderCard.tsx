import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'
import { VehicleAdderForm } from './VehicleAdderForm'
import { GenericCard } from './VehicleCard'
import { theme } from '../../styles/theme'

export const VehicleAdderCard = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return isExpanded ? (
    <GenericCard $borderColor={theme.colors.scheme.lightAccent}>
      <VehicleAdderForm setIsExpanded={setIsExpanded} />
    </GenericCard>
  ) : (
    <GenericCard $borderColor={theme.colors.scheme.lightAccent} onClick={() => setIsExpanded(true)}>
      <PlusWrapper>
        <Image src='/plus-solid.svg' alt='plus icon' width={70} height={70} />
      </PlusWrapper>
      <p>Lägg till en ny bil</p>
    </GenericCard>
  )
}

const PlusWrapper = styled.div`
  position: relative;
  top: 25%;
`
