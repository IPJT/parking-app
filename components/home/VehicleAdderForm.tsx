import { useMutation } from '@apollo/client'
import { useAuth } from '@clerk/nextjs'
import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { graphql } from '../../__generated__'
import { VehicleBrandEnum } from '../../utils/enums'
import { Button } from '../form/Button'
import { Input } from '../form/Input'
import { Select } from '../form/Select'
import { VechicleSelector_Query } from './VehicleSelector'

export interface IVehicleAdderFormValues {
  Name: string
  Brand: VehicleBrandEnum
}

const LABEL_STRINGS: { [Key in keyof IVehicleAdderFormValues]: string } = {
  Name: 'Bilens namn',
  Brand: 'Bilens fabrikat',
}

export const VehicleAdderForm = ({ setIsExpanded }: { setIsExpanded: Dispatch<SetStateAction<boolean>> }) => {
  const { userId } = useAuth()
  const [addVehicle, { loading }] = useMutation(VehicleAdder_Mutation, { refetchQueries: [VechicleSelector_Query] })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IVehicleAdderFormValues>()

  const onSubmit: SubmitHandler<IVehicleAdderFormValues> = async (formData) => {
    if (!userId) {
      throw new Error('No userID was found') //TODO-ian. Hur hanterar man detta på bästa sätt?
    }

    const { data: mutationData, errors } = await addVehicle({
      variables: { name: formData.Name, brand: formData.Brand, owner: userId },
    })

    if (errors && errors.length > 0) {
      throw new Error(errors[0].message)
    }

    const newVehicleId = mutationData?.vehicleCreate?.vehicle?.id

    if (!newVehicleId) {
      throw new Error('A vehicle could not be created in the database')
    }

    const queryParams = [
      `client_id=${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}`,
      `app_id=${process.env.NEXT_PUBLIC_HM_APP_ID}`,
      `redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`,
      `state=${newVehicleId}`,
    ]

    const redirectUrl = `${process.env.NEXT_PUBLIC_HM_AUTH_URI}?${queryParams.join('&')}`
    window.location.assign(redirectUrl)
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input<IVehicleAdderFormValues>
          label='Name'
          register={register}
          validationRules={{
            required: { value: true, message: 'Ange ett namn för bilen' },
            minLength: { value: 5, message: 'Bilens namn måste vara minst 5 tecken långt' },
          }}
          labelStrings={LABEL_STRINGS}
          errors={errors}
        />

        <Select<IVehicleAdderFormValues>
          label='Brand'
          options={Object.values(VehicleBrandEnum)}
          register={register}
          labelStrings={LABEL_STRINGS}
          validationRules={{
            validate: (value) =>
              Object.values(VehicleBrandEnum).includes(value as VehicleBrandEnum) || 'Välj ett bilmärke',
          }}
          errors={errors}
        />
      </div>
      <ButtonWrapper>
        <Button variant='secondary' onClick={() => setIsExpanded(false)}>
          Tillbaka
        </Button>
        <GrowingButton variant='primary' type='submit'>
          {loading ? 'Laddar...' : 'Lägg till'}
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
  mutation VehicleAdder_Mutation($owner: String!, $name: String!, $brand: String!) {
    vehicleCreate(input: { owner: $owner, name: $name, brand: $brand }) {
      vehicle {
        id
      }
    }
  }
`)
