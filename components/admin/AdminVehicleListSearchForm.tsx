import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { VehicleBrandEnum } from '../../utils/enums'
import { Button } from '../form/Button'
import { Input } from '../form/Input'
import { Select } from '../form/Select'
import styled from 'styled-components'

export interface IAdminVehicleListSearchFormValues {
  Vin?: string
  Name?: string
  Brand?: VehicleBrandEnum
  Owner?: string
}

export const AdminVehicleListSearchForm = ({
  setIsModalOpen,
  searchObjectRef,
  refetch,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  searchObjectRef: MutableRefObject<IAdminVehicleListSearchFormValues>
  refetch: any
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAdminVehicleListSearchFormValues>({
    defaultValues: searchObjectRef.current,
  })

  const onSubmit: SubmitHandler<IAdminVehicleListSearchFormValues> = (data) => {
    searchObjectRef.current = data
    setIsModalOpen(false)
    refetch({
      vin: data.Vin ? `(?i).*${data.Vin}.*` : '.*',
      name: data.Name ? `(?i).*${data.Name}.*` : '.*',
      brand: data.Brand ? `(?i).*${data.Brand}.*` : '.*',
      owner: data.Owner ? `(?i).*${data.Owner}.*` : '.*',
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input<IAdminVehicleListSearchFormValues> label='Vin' register={register} errors={errors} />
        <Input<IAdminVehicleListSearchFormValues> label='Name' register={register} errors={errors} />
        <Select<IAdminVehicleListSearchFormValues>
          label='Brand'
          options={Object.values(VehicleBrandEnum)}
          register={register}
          errors={errors}
        />
        <Input<IAdminVehicleListSearchFormValues> label='Owner' register={register} errors={errors} />
      </div>
      <ButtonWrapper>
        <Button variant='secondary' onClick={() => setIsModalOpen(false)}>
          Tillbaka
        </Button>
        <GrowingButton variant='primary' type='submit'>
          Sök
        </GrowingButton>
      </ButtonWrapper>
    </form>
  )
}

const ButtonWrapper = styled.div`
  margin-top: 1.5rem;
  display: flex;
  column-gap: 10px;
`

const GrowingButton = styled(Button)`
  flex-grow: 1;
`
