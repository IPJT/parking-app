import { useMutation } from '@apollo/client'
import { useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { graphql } from '../__generated__'
import { Button } from './Button'
import { GenericCard } from './VehicleCard'
import { VechicleSelector_Query } from './VehicleSelector'

export const VehicleAdder = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return isExpanded ? <VehicleAdderForm setIsExpanded={setIsExpanded} /> : <AddButton setIsExpanded={setIsExpanded} />
}

const VehicleAdderForm = ({ setIsExpanded }: { setIsExpanded: Dispatch<SetStateAction<boolean>> }) => {
  const { userId } = useAuth()
  const [addCar, { loading, error }] = useMutation(VehicleAdder_Mutation, {
    refetchQueries: [VechicleSelector_Query],
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault() // Prevent the browser from reloading the page

    const formData = new FormData(event.currentTarget)

    const jsonData = Object.fromEntries(formData.entries())

    const vehicle = {
      owner: userId as string,
      name: jsonData['car-name'] as string,
      status: 'Pending',
      brand: jsonData['car-brand'] as string,
    }

    await addCar({ variables: { ...vehicle } })
    setIsExpanded(false)
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <InputWrapper>
        <label>
          Bilens namn: <input name='car-name'></input>
        </label>

        <label>
          Bilmärke:{' '}
          <select name='car-brand'>
            <option value='bmw'>BMW</option>
            <option value='audi'>Audi</option>
          </select>
        </label>
      </InputWrapper>

      {error && <StyledError>{error.message}</StyledError>}
      <ButtonWrapper>
        <Button variant='secondary' onClick={() => setIsExpanded(false)}>
          Tillbaka
        </Button>
        <GrowingButton variant='primary' type='submit'>
          {loading ? 'Loading...' : 'Lägg till'}
        </GrowingButton>
      </ButtonWrapper>
    </StyledForm>
  )
}

const GrowingButton = styled(Button)`
  flex-grow: 1;
`

const StyledError = styled.p`
  color: red;
`

const StyledForm = styled.form`
  width: 300px;
  height: 200px;
  padding: 1rem;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.scheme.darkAccent};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`

const ButtonWrapper = styled.div`
  display: flex;
  column-gap: 10px;
`

const AddButton = ({ setIsExpanded }: { setIsExpanded: Dispatch<SetStateAction<boolean>> }) => {
  return (
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

const VehicleAdder_Mutation = graphql(/* GraphQL */ `
  mutation VehicleAdder_Mutation($owner: String!, $name: String!, $status: String!, $brand: String!) {
    vehicleCreate(input: { owner: $owner, name: $name, status: $status, brand: $brand }) {
      vehicle {
        id
      }
    }
  }
`)
