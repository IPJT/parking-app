import { UserButton } from '@clerk/nextjs'
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import Image from 'next/image'

export const Header = ({ title = 'Parking App' }: { title?: string }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <header>
        <StyledNav>
          <Link href='/'>
            <Image src='/logo.png' alt='plus icon' width={40} height={40} />{' '}
          </Link>

          <UserButton afterSignOutUrl='/' />
        </StyledNav>
      </header>
    </>
  )
}

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: 0;
  padding: 1rem 1rem;
  border-bottom: solid 1px rgba(255, 255, 255, 0.2);
  min-height: 40px;
`
