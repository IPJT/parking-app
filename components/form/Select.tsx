import { FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { LabelInputContainer } from './Input'

type SelectProps<T extends FieldValues> = {
  label: Path<T>
  register: UseFormRegister<T>
  validationRules?: RegisterOptions<T>
  options: string[]
  labelStrings?: { [Key in keyof T]: string }
  errors: FieldErrors<T>
}

export const Select = <T extends FieldValues>({
  label,
  options,
  register,
  validationRules,
  labelStrings,
  errors,
}: SelectProps<T>) => {
  const errorMessage = errors[label]?.message as string | undefined
  return (
    <LabelInputContainer>
      <StyledDiv>
        <StyledLabel htmlFor={label}>{labelStrings ? labelStrings[label] : label}</StyledLabel>
        {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
      </StyledDiv>

      <StyledSelect id={label} {...register(label, validationRules)}>
        <option></option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </StyledSelect>
    </LabelInputContainer>
  )
}

const StyledErrorMessage = styled.span`
  font-size: 13px;
  color: ${theme.colors.semantics.danger};
`

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  flex-wrap: wrap;
`

const StyledLabel = styled.label`
  font-size: 15px;
  color: ${theme.colors.scheme.lightShades};
`

const StyledSelect = styled.select`
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
