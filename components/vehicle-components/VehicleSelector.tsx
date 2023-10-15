import { useQuery } from '@apollo/client'
import { useAuth } from '@clerk/nextjs'
import styled from 'styled-components'
import { graphql } from '../../__generated__'
import { VehicleAdderCard } from './VehicleAdderCard'
import { VehicleCard } from './VehicleCard'

export const VehicleSelector = () => {
  const { userId } = useAuth()
  const { error, loading, data } = useQuery(VehicleSelector_Query, {
    variables: { first: 100, owner: userId as string },
    skip: !userId,
  })

  if (loading || !userId) {
    return <p>loading</p>
  }
  if (error) {
    throw error
  }

  return (
    <CardContainer>
      {data?.vehicleSearch?.edges.map((edge) => {
        const vehicle = edge.node
        return <VehicleCard vehicle={vehicle} key={vehicle.id} />
      })}

      <VehicleAdderCard />
    </CardContainer>
  )
}

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

export const VehicleSelector_Query = graphql(/* GraphQL */ `
  query VehicleSelector_Query($first: Int!, $owner: String!) {
    vehicleSearch(first: $first, filter: { owner: { eq: $owner } }) {
      edges {
        node {
          ...VehicleCard_VehicleFragment
          id
        }
      }
    }
  }
`)
