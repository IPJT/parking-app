import { useQuery } from '@apollo/client'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import styled from 'styled-components'
import { graphql } from '../../__generated__'
import { theme } from '../../styles/theme'
import { Button } from '../form/Button'
import { AdminVehicleItem } from './AdminVehicleItem'
import * as Dialog from '@radix-ui/react-dialog'
import { useRef, useState } from 'react'

export const AdminVehicleList = () => {
  const { data, loading, error, fetchMore } = useQuery(AdminVehicleList_Query, {
    variables: { owner: '.*' },
  })
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false)

  if (loading) {
    return <p>Loading</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  const totalHits = data?.vehicleSearch?.searchInfo?.totalHits

  const SearchDialog = (
    <Dialog.Root open={isSearchDialogOpen} onOpenChange={() => {}}>
      <Dialog.Portal>
        <StyledDialogOverlay />
        <StyledDialogContent>
          <StyledDialogTitle>Sök</StyledDialogTitle>
          <StyledFieldset className='Fieldset'>
            <StyledLabel className='Label' htmlFor='name'>
              Name
            </StyledLabel>
            <StyledInput className='Input' id='name' defaultValue='Pedro Duarte' autoComplete='false' />
          </StyledFieldset>
          <StyledFieldset className='Fieldset'>
            <StyledLabel className='Label' htmlFor='username'>
              Brand
            </StyledLabel>
            <StyledInput className='Input' id='username' defaultValue='peduarte' autoComplete='false' />
          </StyledFieldset>
          <StyledFieldset className='Fieldset'>
            <StyledLabel className='Label' htmlFor='username'>
              Status
            </StyledLabel>
            <StyledInput className='Input' id='username' defaultValue='peduarte' />
          </StyledFieldset>
          <StyledFieldset className='Fieldset'>
            <StyledLabel className='Label' htmlFor='username'>
              Owner
            </StyledLabel>
            <StyledInput className='Input' id='username' defaultValue='@peduarte' />
          </StyledFieldset>
          <Button variant='secondary' onClick={() => setIsSearchDialogOpen(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={() => setIsSearchDialogOpen(false)}>
            Search
          </Button>
        </StyledDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )

  return (
    <StyledDiv>
      <MagnifyingGlassIcon height='30px' width='30px' onClick={() => setIsSearchDialogOpen(true)} />
      {SearchDialog}

      <StyledTable>
        <tr>
          <th>Nr.</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Status</th>
          <th>Owner</th>
        </tr>
        {data?.vehicleSearch?.edges.map((edge, index) => {
          const vehicle = edge.node
          return (
            <tr>
              <td>{index + 1}</td>
              <AdminVehicleItem vehicle={vehicle} key={vehicle.id} />
            </tr>
          )
        })}
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

const StyledDialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`

const StyledDialogContent = styled(Dialog.Content)`
  background-color: ${theme.colors.scheme.lightShades};
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  color: ${theme.colors.scheme.darkShades};

  &:focus {
    outline: none;
  }
`

const StyledDialogTitle = styled(Dialog.Title)`
  margin: 0;
  font-weight: 500;
  color: ${theme.colors.scheme.darkShades};
  font-size: 20px;
`

const StyledFieldset = styled.fieldset`
  all: unset;
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 15px;
`

const StyledLabel = styled.label`
  font-size: 15px;
  color: ${theme.colors.scheme.darkAccent};
  width: 90px;
  text-align: right;
`

const StyledInput = styled.input`
  width: 100%;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 15px;
  line-height: 1;
  color: ${theme.colors.scheme.darkAccent};
  height: 35px;
  border: 1px solid ${theme.colors.scheme.lightAccent};
`

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

const AdminVehicleList_Query = graphql(/* GraphQL */ `
  query AdminVehicleList_Query($after: String, $owner: String!) {
    vehicleSearch(first: 10, after: $after, filter: { owner: { regex: $owner } }) {
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
