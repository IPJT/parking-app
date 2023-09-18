import { useQuery } from '@apollo/client'
import { useAuth } from '@clerk/nextjs'
import styled from 'styled-components'
import { graphql } from '../__generated__'
import { VehicleAdder } from './VehicleAdder'
import { VehicleCard } from './VehicleCard'

export const VehicleSelector = () => {
  const { userId } = useAuth()
  const { error, loading, data } = useQuery(VechicleSelector_Query, {
    variables: { first: 100, owner: userId as string },
    skip: !userId,
  })

  if (loading || !userId) {
    return <p>loading</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <CardContainer>
      {data?.vehicleSearch?.edges.map((edge) => {
        const vehicle = edge.node
        return <VehicleCard vehicle={vehicle} key={vehicle.id} />
      })}

      <VehicleAdder />
    </CardContainer>
  )
}

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

export const VechicleSelector_Query = graphql(/* GraphQL */ `
  query VechicleSelector_Query($first: Int!, $owner: String!) {
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
