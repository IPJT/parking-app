import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { LabelInputContainer } from './Input'

type SelectProps<T extends FieldValues> = {
  label: Path<T>
  register: UseFormRegister<T>
  options: string[]
}

export const Select = <T extends FieldValues>({ label, options, register }: SelectProps<T>) => {
  return (
    <LabelInputContainer>
      <StyledLabel htmlFor={label}>{label}</StyledLabel>
      <StyledSelect id={label} {...register(label)}>
        <option></option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </StyledSelect>
    </LabelInputContainer>
  )
}

const StyledLabel = styled.label`
  font-size: 15px;
  color: ${theme.colors.scheme.darkAccent};
  width: 50px;
`

const StyledSelect = styled.select`
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 15px;
  line-height: 1;
  color: ${theme.colors.scheme.darkAccent};
  height: 35px;
  border: 1px solid ${theme.colors.scheme.lightAccent};
`
