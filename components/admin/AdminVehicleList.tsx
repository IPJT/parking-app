import { useMutation, useQuery } from '@apollo/client'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import { graphql } from '../../__generated__'
import { theme } from '../../styles/theme'
import { Modal } from '../Modal'
import { Button } from '../form/Button'
import { AdminVehicleItem } from './AdminVehicleItem'
import { AdminVehicleListSearchForm, IAdminVehicleListSearchFormValues } from './AdminVehicleListSearchForm'

export const AdminVehicleList = () => {
  const [deleteVehicle] = useMutation(VehicleDelete_Mutation)
  const { data, loading, error, fetchMore, refetch } = useQuery(AdminVehicleList_Query, {
    variables: {
      vin: '.*',
      name: '.*',
      brand: '.*',
      owner: '.*',
    },
  })
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const searchObjectRef = useRef<IAdminVehicleListSearchFormValues>({})

  if (loading) {
    return <p>Loading</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  const totalHits = data?.vehicleSearch?.searchInfo?.totalHits

  return (
    <StyledDiv>
      <MagnifyingGlassIcon height='30px' width='30px' onClick={() => setIsSearchModalOpen(true)} />
      <Modal isModalOpen={isSearchModalOpen} setIsModalOpen={setIsSearchModalOpen} title='Sök'>
        <AdminVehicleListSearchForm
          setIsModalOpen={setIsSearchModalOpen}
          refetch={refetch}
          searchObjectRef={searchObjectRef}
        />
      </Modal>

      <StyledTable>
        <tbody>
          <tr>
            <th>Nr.</th>
            <th>Vin</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Owner</th>
          </tr>
          {data?.vehicleSearch?.edges.map((edge, index) => {
            const vehicle = edge.node
            return (
              <tr key={vehicle.id}>
                <td>{index + 1}</td>
                <AdminVehicleItem vehicle={vehicle} />
                <Button
                  onClick={() => {
                    deleteVehicle({ variables: { id: vehicle.id } })
                    refetch()
                  }}
                  variant='danger'
                >
                  {' '}
                  Delete
                </Button>
              </tr>
            )
          })}
        </tbody>
      </StyledTable>

      <div>
        {data?.vehicleSearch?.pageInfo.hasNextPage && (
          <Button
            variant='primary'
            onClick={() =>
              fetchMore({
                variables: {
                  after: data.vehicleSearch?.pageInfo.endCursor,
                },
              })
            }
          >
            Load more
          </Button>
        )}
      </div>
      <p>Total hits: {totalHits}</p>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`

const StyledTable = styled.table`
  th {
    padding-right: 40px;
    padding-bottom: 10px;
  }

  td {
    padding: 10px;
  }

  tr:nth-child(even) {
    background-color: ${theme.colors.scheme.darkAccent};
  }
`

export const AdminVehicleList_Query = graphql(/* GraphQL */ `
  query AdminVehicleList_Query($after: String, $vin: String!, $name: String!, $brand: String!, $owner: String!) {
    vehicleSearch(
      first: 10
      after: $after
      filter: {
        ALL: [
          { vin: { regex: $vin } }
          { name: { regex: $name } }
          { brand: { regex: $brand } }
          { owner: { regex: $owner } }
        ]
      }
    ) {
      edges {
        node {
          ...AdminVehicleItem_VehicleFragment
          id
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

const VehicleDelete_Mutation = graphql(/* GraphQL */ `
  mutation VehicleDelete_Mutation($id: ID!) {
    vehicleDelete(by: { id: $id }) {
      deletedId
    }
  }
`)
