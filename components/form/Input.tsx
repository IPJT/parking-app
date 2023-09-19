import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { FieldValue, FieldValues, Path, UseFormRegister } from 'react-hook-form'

type InputProps<T extends FieldValues> = {
  label: Path<T>
  register: UseFormRegister<T>
  required: boolean
  labelStrings?: { [Key in keyof T]: string }
}

export const Input = <T extends FieldValues>({ label, register, required, labelStrings }: InputProps<T>) => {
  return (
    <LabelInputContainer>
      <StyledLabel htmlFor={label}>{labelStrings ? labelStrings[label] : label}</StyledLabel>
      <StyledInput id={label} {...register(label, { required })} />
    </LabelInputContainer>
  )
}

export const LabelInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const StyledLabel = styled.label`
  font-size: 15px;
  color: ${theme.colors.scheme.lightShades};
`

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 15px;
  line-height: 1;
  color: ${theme.colors.scheme.lightShades};
  height: 35px;
  border: 1px solid ${theme.colors.scheme.lightAccent};
  background-color: rgba(0, 0, 0, 0.1);
`
