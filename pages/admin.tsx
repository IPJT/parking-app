import { getAuth } from '@clerk/nextjs/server'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { AdminPanel } from '../components/admin/AdminPanel'
import { Layout } from '../components/layout'
import { Button } from '../components/form/Button'
import { normalConsolelogAndThrow } from './testPage'
import Link from 'next/link'

const AdminPage = ({ orgRole }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const isAdmin = orgRole === 'admin'

  if (!isAdmin) {
    return (
      <Layout title='Parkering App'>
        <>This page is for admins only</>
      </Layout>
    )
  }

  return (
    <Layout title='Parkering App'>
      <AdminPanel />
      <Button variant='primary' onClick={normalConsolelogAndThrow}>
        Run normalConsolelogAndThrow
      </Button>
      <Link href={'/testPage'}>
        <Button variant='primary'>Run normalConsolelogAndThrow on server</Button>
      </Link>
    </Layout>
  )
}

export const getServerSideProps = (async (context) => {
  const { orgRole } = getAuth(context.req)

  if (!orgRole) {
    return { props: { orgRole: null } }
  }

  return { props: { orgRole } }
}) satisfies GetServerSideProps<{
  orgRole: string | null
}>

export default AdminPage
