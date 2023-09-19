import * as Dialog from '@radix-ui/react-dialog'
import { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'

type Props = {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  title: string
}

export const Modal = ({ isModalOpen, setIsModalOpen, children, title }: PropsWithChildren<Props>) => {
  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Dialog.Portal>
        <StyledDialogOverlay />
        <StyledDialogContent>
          <StyledDialogTitle>{title}</StyledDialogTitle>
          {children}
        </StyledDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const StyledDialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`

const StyledDialogContent = styled(Dialog.Content)`
  background-color: ${theme.colors.scheme.darkAccent};
  border-radius: 6px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 350px;
  max-height: 85vh;
  padding: 1.5rem;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
  }
`

const StyledDialogTitle = styled(Dialog.Title)`
  all: unset;
  display: block;
  margin-bottom: 1rem;
  font-weight: 500;
  color: ${theme.colors.scheme.lightShades};
  font-size: 20px;
  text-align: center;
`
