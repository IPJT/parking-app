import { Dispatch, SetStateAction } from 'react'
import { graphql } from '../../__generated__'
import { VehicleBrandEnum } from '../../utils/enums'
import { Button } from '../form/Button'
import styled from 'styled-components'
import { Input } from '../form/Input'
import { Select } from '../form/Select'
import { SubmitHandler, useForm } from 'react-hook-form'

export interface IVehicleAdderFormValues {
  Name: string
  Brand: VehicleBrandEnum
}

const LABEL_STRINGS: { [Key in keyof IVehicleAdderFormValues]: string } = {
  Name: 'Bilens namn',
  Brand: 'Bilens fabrikat',
}

export const VehicleAdderForm = ({ setIsExpanded }: { setIsExpanded: Dispatch<SetStateAction<boolean>> }) => {
  const { register, handleSubmit } = useForm<IVehicleAdderFormValues>()

  const onSubmit: SubmitHandler<IVehicleAdderFormValues> = (data) => {
    console.log(data)
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input<IVehicleAdderFormValues> label='Name' required={true} register={register} labelStrings={LABEL_STRINGS} />
        <Select<IVehicleAdderFormValues>
          label='Brand'
          options={Object.values(VehicleBrandEnum)}
          register={register}
          labelStrings={LABEL_STRINGS}
        />
      </div>
      <ButtonWrapper>
        <Button variant='secondary' onClick={() => setIsExpanded(false)}>
          Tillbaka
        </Button>
        <GrowingButton variant='primary' type='submit'>
          Sök
        </GrowingButton>
      </ButtonWrapper>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`

const ButtonWrapper = styled.div`
  margin-top: 1.5rem;
  display: flex;
  column-gap: 10px;
`

const GrowingButton = styled(Button)`
  flex-grow: 1;
`

const VehicleAdder_Mutation = graphql(/* GraphQL */ `
  mutation VehicleAdder_Mutation($owner: String!, $name: String!, $status: String!, $brand: String!) {
    vehicleCreate(input: { owner: $owner, name: $name, status: $status, brand: $brand }) {
      vehicle {
        id
      }
    }
  }
`)
