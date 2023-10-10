import { Dispatch, SetStateAction, useState } from 'react'
import { Modal } from '../Modal'
import { VehicleCard_VehicleFragmentFragment } from '../../__generated__/graphql'

type Props = {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  vehicle: VehicleCard_VehicleFragmentFragment
}

export const VehicleModal = ({ isModalOpen, setIsModalOpen, vehicle }: Props) => {
  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={vehicle.name}>
      <b>Vin: </b>
      <span>{vehicle.vin}</span>
      <br />
      <b>Bilmärke: </b>
      <span>{vehicle.brand}</span>
    </Modal>
  )
}
