import { useAuth } from '@clerk/nextjs'
import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { VehicleBrandEnum } from '../../utils/enums'
import { Button } from '../form/Button'
import { Input } from '../form/Input'
import { Select } from '../form/Select'

export interface IVehicleAdderFormValues {
  Name: string
  Brand: VehicleBrandEnum
}

const LABEL_STRINGS: { [Key in keyof IVehicleAdderFormValues]: string } = {
  Name: 'Bilens namn',
  Brand: 'Bilmärke',
}

export const VehicleAdderForm = ({ setIsExpanded }: { setIsExpanded: Dispatch<SetStateAction<boolean>> }) => {
  const { userId } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IVehicleAdderFormValues>()

  const onSubmit: SubmitHandler<IVehicleAdderFormValues> = async (formData) => {
    if (!userId) {
      throw new Error('No userID was found') //TODO-ian. Hur hanterar man detta på bästa sätt?
    }

    const vehicleData = { name: formData.Name, brand: formData.Brand, owner: userId }

    const queryParams = [
      `client_id=${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}`,
      `app_id=${process.env.NEXT_PUBLIC_HM_APP_ID}`,
      `redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`,
      `state=${JSON.stringify(vehicleData)}`,
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
          Påbörja autentisering
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
