import { useQuery } from '@apollo/client'
import { graphql } from '../../__generated__'
import { isNotNullish } from '../../utils/isNotNullis'
import { AdminVehicleItem } from './AdminVehicleItem'

export const AdminVehicleList = () => {
  const { data, loading, error } = useQuery(GET_ALL_VEHICLES, { variables: { first: 10 } })

  if (loading) {
    return <p>Loading</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  const totalHits = data?.vehicleSearch?.searchInfo?.totalHits

  return (
    <li>
      {data?.vehicleSearch?.edges.map((vehicle) => {
        return <AdminVehicleItem vehicle={vehicle.node} />
      })}
    </li>
  )
}

const GET_ALL_VEHICLES = graphql(/* GraphQL */ `
  query GetAllVehicles($first: Int!, $after: String) {
    vehicleSearch(first: $first, after: $after) {
      edges {
        node {
          ...AdminVehicleItem_VehicleFragment
        }
      }
      searchInfo {
        totalHits
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`)
