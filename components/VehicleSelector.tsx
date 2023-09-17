import { useQuery } from '@apollo/client'
import { useAuth } from '@clerk/nextjs'
import styled from 'styled-components'
import { graphql } from '../__generated__'
import { Car } from '../__generated__/graphql'
import { VehicleAdder } from './VehicleAdder'
import { VehicleCard } from './VehicleCard'

export const VehicleSelector = () => {
  const { userId } = useAuth()
  const { error, loading, data } = useQuery(GET_CARS_FOR_USER, {
    variables: { first: 100, owner: userId as string },
    skip: !userId,
  })

  if (loading || !userId) {
    return <p>loading</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  const cars = (data?.carSearch?.edges ?? []).reduce((acc, curr) => {
    if (!curr) {
      return acc
    }
    acc.push(curr.node)
    return acc
  }, [] as Car[])

  return (
    <CardContainer>
      {cars.map((vehicle) => (
        <VehicleCard vehicle={vehicle} key={vehicle.id} />
      ))}

      <VehicleAdder />
    </CardContainer>
  )
}

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

export const GET_CARS_FOR_USER = graphql(/* GraphQL */ `
  query GetAllVehiclesForUser($first: Int!, $owner: String!) {
    carSearch(first: $first, filter: { owner: { eq: $owner } }) {
      edges {
        node {
          name
          brand
          owner
          status
          id
          createdAt
          updatedAt
        }
      }
    }
  }
`)
