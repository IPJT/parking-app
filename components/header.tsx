import { OrganizationSwitcher, UserButton, useOrganization, useOrganizationList } from '@clerk/nextjs'
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import Image from 'next/image'
import { theme } from '../styles/theme'

export const Header = ({ title = 'Parking App' }: { title?: string }) => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  const { membership } = useOrganization()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <header>
        <StyledNav>
          <StyledDiv>
            <Link href='/'>
              <Image src='/logo.png' alt='plus icon' width={40} height={40} />{' '}
            </Link>
            {membership?.role === 'admin' && <Link href='/admin'>Admin Page</Link>}
          </StyledDiv>

          {(userMemberships?.count ?? 0) > 0 && <OrganizationSwitcher />}

          <UserButton afterSignOutUrl='/' />
        </StyledNav>
      </header>
    </>
  )
}

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: 0;
  padding: 1rem 1rem;
  border-bottom: solid 1px ${theme.colors.scheme.darkAccent};
  min-height: 40px;
`
