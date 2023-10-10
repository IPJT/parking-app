import { useMutation } from '@apollo/client'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { graphql } from '../../__generated__'
import { VehicleCard_VehicleFragmentFragment } from '../../__generated__/graphql'
import { Modal } from '../Modal'
import { Button } from '../form/Button'
import { VehicleSelector_Query } from './VehicleSelector'

type Props = {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  vehicle: VehicleCard_VehicleFragmentFragment
}

export const VehicleModal = ({ isModalOpen, setIsModalOpen, vehicle }: Props) => {
  const [deleteVehicle] = useMutation(VehicleDelete_Mutation, { refetchQueries: [VehicleSelector_Query] })
  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={vehicle.name}>
      <b>Vin: </b>
      <span>{vehicle.vin}</span>
      <br />
      <b>Bilmärke: </b>
      <span>{vehicle.brand}</span>
      <ButtonWrapper>
        <Button
          variant='danger'
          onClick={() => {
            if (window.confirm('Är du säker på att du vill ta bort bilen?')) {
              deleteVehicle({ variables: { id: vehicle.id } })
              setIsModalOpen(false)
            }
          }}
        >
          Radera bilen
        </Button>
        <Button variant='secondary' onClick={() => setIsModalOpen(false)}>
          Tillbaka
        </Button>
      </ButtonWrapper>
    </Modal>
  )
}

const ButtonWrapper = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const VehicleDelete_Mutation = graphql(/* GraphQL */ `
  mutation VehicleDelete_Mutation($id: ID!) {
    vehicleDelete(by: { id: $id }) {
      deletedId
    }
  }
`)
