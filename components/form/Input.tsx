import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { FieldErrors, FieldValue, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

type InputProps<T extends FieldValues> = {
  label: Path<T>
  register: UseFormRegister<T>
  validationRules?: RegisterOptions<T>
  labelStrings?: { [Key in keyof T]: string }
  errors: FieldErrors<T>
}

export const Input = <T extends FieldValues>({
  label,
  register,
  validationRules,
  labelStrings,
  errors,
}: InputProps<T>) => {
  const errorMessage = errors[label]?.message as string | undefined

  return (
    <LabelInputContainer>
      <StyledDiv>
        <StyledLabel htmlFor={label}>{labelStrings ? labelStrings[label] : label}</StyledLabel>
        {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
      </StyledDiv>
      <StyledInput id={label} {...register(label, validationRules)} />
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
