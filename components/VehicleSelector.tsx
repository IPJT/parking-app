import { useAuth, useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { VehicleAdder } from './VehicleAdder'
import { Vehicle, VehicleCard } from './VehicleCard'
import styled from 'styled-components'

export const VehicleSelector = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const { getToken, userId } = useAuth()

  const getVehiclesForUser = async (userId: string) => {
    fetch(process.env.NEXT_PUBLIC_GRAFBASE_API_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${await getToken({
          template: 'grafbase',
        })}`,
      },
      body: JSON.stringify({ query: getAllVehiclesForUser, variables: { userId } }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        const vehicles: Vehicle[] = (data.carSearch.edges as { node: Vehicle }[]).reduce((acc, curr) => {
          acc.push(curr.node)
          return acc
        }, [] as Vehicle[])
        setVehicles(vehicles)
      })
  }

  useEffect(() => {
    if (userId) {
      getVehiclesForUser(userId)
    }
  }, [userId])

  return (
    <CardContainer>
      {vehicles.map((vehicle: Vehicle) => (
        <VehicleCard vehicle={vehicle} key={vehicle.id} />
      ))}

      <VehicleAdder setVehicles={setVehicles} />
    </CardContainer>
  )
}

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

const getAllVehiclesForUser = /* GraphQL */ `
  query GetAllVehiclesForUser($userId: String!) {
    carSearch(first: 100, filter: { owner: { eq: $userId } }) {
      edges {
        node {
          name
          brand
          owner
          status
          id
        }
      }
    }
  }
`
