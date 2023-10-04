import * as React from 'react'
import * as RadixToast from '@radix-ui/react-toast'
import styled, { keyframes } from 'styled-components'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { theme } from '../styles/theme'
import Image from 'next/image'
import * as Sentry from '@sentry/nextjs'

export type ToastErrorObject = {
  title: string
  description: string
  type: 'error' | 'warning'
}

export const Toast = ({
  open,
  setOpen,
  toastErrorObject,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  toastErrorObject: ToastErrorObject
}) => {
  useEffect(() => {
    Sentry.captureMessage('Toast!!', { contexts: { toastErrorObject: { toastErrorObject } } })
  }, [])

  const getToastRootBackgroundColor = (type: ToastErrorObject['type']) => {
    switch (type) {
      case 'error':
        return theme.colors.semantics.danger

      case 'warning':
        return theme.colors.semantics.warning
    }
  }

  return (
    <RadixToast.Provider swipeDirection='right' duration={10000}>
      <StyledToastRoot
        open={open}
        onOpenChange={setOpen}
        $backgroundColor={getToastRootBackgroundColor(toastErrorObject.type)}
      >
        <StyledToastTitle>{toastErrorObject.title}</StyledToastTitle>
        <StyledToastDescription>{toastErrorObject.description}</StyledToastDescription>
        <StyledToastClose asChild>
          {/* Replace this with another icon */}
          <Image src='/plus-solid.svg' alt='plus icon' width={15} height={15} />
        </StyledToastClose>
      </StyledToastRoot>
      <StyledToastViewport />
    </RadixToast.Provider>
  )
}

export default Toast

const StyledToastClose = styled(RadixToast.Close)`
  position: absolute;
  top: 15px;
  right: 12px;
  transform: rotate(45deg);
  cursor: pointer;
`

const StyledToastViewport = styled(RadixToast.Viewport)`
  --viewport-padding: 1rem;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: var(--viewport-padding);
  gap: 10px;
  width: 390px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
`

const hide = keyframes`  
from {
  opacity: 1;
}
to {
  opacity: 0;
}
`
const slideIn = keyframes`  
from {
  transform: translateX(calc(100% + var(--viewport-padding)));
}
to {
  transform: translateX(0);
}
`
const swipeOut = keyframes`  
from {
  transform: translateX(var(--radix-toast-swipe-end-x));
}
to {
  transform: translateX(calc(100% + var(--viewport-padding)));
}
`

const StyledToastRoot = styled(RadixToast.Root)<{ $backgroundColor: string }>`
  position: relative;
  background-color: ${(props) => props.$backgroundColor};
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  padding: 15px;
  display: grid;
  grid-template-areas: 'title action' 'description action';
  grid-template-columns: auto max-content;
  column-gap: 15px;
  align-items: center;

  &[data-state='open'] {
    animation: ${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-state='closed'] {
    animation: ${hide} 100ms ease-in;
  }

  &[data-swipe='move'] {
    transform: translateX(var(--radix-toast-swipe-move-x));
  }

  &[data-swipe='cancel'] {
    transform: translateX(0);
    transition: transform 200ms ease-out;
  }

  &[data-swipe='end'] {
    animation: ${swipeOut} 100ms ease-out;
  }
`

const StyledToastTitle = styled(RadixToast.Title)`
  grid-area: title;
  margin-bottom: 5px;
  font-weight: 500;
  color: var(--slate-12);
  font-size: 15px;
`

const StyledToastDescription = styled(RadixToast.Description)`
  grid-area: description;
  margin: 0;
  color: var(--slate-11);
  font-size: 13px;
  line-height: 1.3;
`
