import React from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

type ButtonTypes = 'primary' | 'secondary' | 'danger'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonTypes
}

export const Button = React.forwardRef<HTMLButtonElement, Props>((props: Props, forwardedRef) => {
  const { variant, ...otherProps } = props
  return <StyledButton $variant={variant} {...otherProps} ref={forwardedRef} />
})

const handleColorType = (color: ButtonTypes) => {
  switch (color) {
    case 'primary':
      return theme.colors.scheme.mainBrand

    case 'secondary':
      return theme.colors.grey

    case 'danger':
      return theme.colors.semantics.danger
  }
}

const StyledButton = styled.button<{ $variant: ButtonTypes }>`
  all: unset;
  color: ${(props) => props.theme.colors.scheme.lightShades};
  text-align: center;
  background-color: ${(props) => handleColorType(props.$variant)};
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
`
