import { ReactNode } from 'react'
import { Header } from './header'
import styled from 'styled-components'

type Props = { children?: ReactNode; title?: string }

export const Layout = ({ children, title }: Props) => (
  <>
    <Header title={title} />
    <ContentWrapper>{children}</ContentWrapper>
  </>
)

const ContentWrapper = styled.div`
  padding: 1rem 1rem;
`
