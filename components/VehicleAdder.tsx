import Image from 'next/image'
import { Dispatch, FormEventHandler, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { GenericCard, Vehicle } from './VehicleCard'
import { useAuth } from '@clerk/nextjs'

export const VehicleAdder = ({ setVehicles }: { setVehicles: Dispatch<SetStateAction<Vehicle[]>> }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return isExpanded ? (
    <VehicleAdderForm setIsExpanded={setIsExpanded} setVehicles={setVehicles} />
  ) : (
    <AddButton setIsExpanded={setIsExpanded} />
  )
}

const VehicleAdderForm = ({
  setIsExpanded,
  setVehicles,
}: {
  setIsExpanded: Dispatch<SetStateAction<boolean>>
  setVehicles: Dispatch<SetStateAction<Vehicle[]>>
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { getToken, userId } = useAuth()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault() // Prevent the browser from reloading the page
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData(event.currentTarget)

      const jsonData = Object.fromEntries(formData.entries())

      const vehicle = {
        owner: userId,
        name: jsonData['car-name'],
        status: 'Pending',
        brand: jsonData['car-brand'],
      }

      const response = await fetch(process.env.NEXT_PUBLIC_GRAFBASE_API_URL as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${await getToken({
            template: 'grafbase',
          })}`,
        },
        body: JSON.stringify({
          query: addVehicleForUserQuery,
          variables: { owner: vehicle.owner, name: vehicle.name, status: vehicle.status, brand: vehicle.brand },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.')
      }

      const { data } = await response.json()

      const newVehicle = data.carCreate.car as Vehicle

      setVehicles((vehicles) => {
        const vehiclesCopy = [...vehicles]
        vehiclesCopy.push(newVehicle)
        return vehiclesCopy
      })
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }

      console.error(error)
    } finally {
      setIsLoading(false) // Set loading to false when the request completes
    }
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

      {error && <StyledError>{error}</StyledError>}
      <ButtonWrapper>
        <button onClick={() => setIsExpanded(false)}>Tillbaka</button>
        <button type='submit'>{isLoading ? 'Loading...' : 'Submit'}</button>
      </ButtonWrapper>
    </StyledForm>
  )
}

const StyledError = styled.p`
  color: red;
`

const StyledForm = styled.form`
  max-width: 300px;
  height: 200px;
  padding: 1rem;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.secondary};
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

const addVehicleForUserQuery = /* GraphQL */ `
  mutation CarCreate($owner: String!, $name: String!, $status: String!, $brand: String!) {
    carCreate(input: { owner: $owner, name: $name, status: $status, brand: $brand }) {
      car {
        name
        brand
        status
        id
      }
    }
  }
`
