import { useOrganization } from '@clerk/nextjs'
import { getAuth } from '@clerk/nextjs/server'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

const AdminPage = ({ orgRole }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const isAdmin = orgRole === 'admin'

  if (!isAdmin) {
    return <>This page is for admins only</>
  }

  return <>Välkommen till admin-sidan</>
}

export const getServerSideProps = (async (context) => {
  const { orgRole } = getAuth(context.req)

  return { props: { orgRole: orgRole ?? null } }
}) satisfies GetServerSideProps<{
  orgRole: string | null
}>

export default AdminPage
