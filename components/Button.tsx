import styled from 'styled-components'
import { theme } from '../styles/theme'
import { MouseEventHandler } from 'react'

type ButtonTypes = 'primary' | 'secondary'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonTypes
}

export const Button = ({ variant, ...props }: Props) => {
  return <StyledButton $variant={variant} {...props} />
}

const handleColorType = (color: ButtonTypes) => {
  switch (color) {
    case 'primary':
      return theme.colors.scheme.mainBrand

    case 'secondary':
      return theme.colors.grey
  }
}

const StyledButton = styled.button<{ $variant: ButtonTypes }>`
  color: ${(props) => props.theme.colors.scheme.lightShades};
  text-align: center;
  background-color: ${(props) => handleColorType(props.$variant)};
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
`
