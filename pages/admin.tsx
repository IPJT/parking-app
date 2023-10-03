import { getAuth } from '@clerk/nextjs/server'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { AdminPanel } from '../components/admin/AdminPanel'
import { Layout } from '../components/layout'

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
