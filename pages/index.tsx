import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { VehicleSelector } from '../components/home/VehicleSelector'
import { Layout } from '../components/layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home = ({ errorToast }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  useEffect(() => {
    if (errorToast) {
      router.replace('/', undefined, { shallow: true })
    }
  }, [])

  return (
    <Layout title='Parkering App'>
      {errorToast && <p>Hej</p>}
      <VehicleSelector />
    </Layout>
  )
}

export const getServerSideProps = (async (context) => {
  const errorToast = context.query.errorToast as string | undefined
  return { props: { errorToast: errorToast || null } }
}) satisfies GetServerSideProps<{
  errorToast: string | null
}>

export default Home
