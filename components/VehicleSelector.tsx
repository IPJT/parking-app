import Image from 'next/image'
import styled from 'styled-components'

export const VehicleSelector = () => {
  return (
    <div>
      <VehicleContainer>
        <PlusWrapper>
          <Image src="/plus-solid.svg" alt="plus icon" width={70} height={70} />
        </PlusWrapper>
        <TextWrapper>Lägg till en ny bil</TextWrapper>
      </VehicleContainer>
    </div>
  )
}

const VehicleContainer = styled.div`
  width: 300px;
  height: 200px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.secondary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`

const PlusWrapper = styled.image`
  position: relative;
  top: 30%;
`

const TextWrapper = styled.p``
