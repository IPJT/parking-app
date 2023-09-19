import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../form/Button'
import { VehicleAdderForm } from './VehicleAdderForm'
import { GenericCard } from './VehicleCard'

export const VehicleAdderCard = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return isExpanded ? (
    <GenericCard>
      <VehicleAdderForm setIsExpanded={setIsExpanded} />
    </GenericCard>
  ) : (
    <GenericCard onClick={() => setIsExpanded(true)}>
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
