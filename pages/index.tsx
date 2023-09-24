import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { VehicleSelector } from '../components/home/VehicleSelector'
import { Layout } from '../components/layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ERROR_TOASTS } from '../utils/enums'

const Home = ({ errorToast }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  useEffect(() => {
    if (errorToast) {
      router.replace('/', undefined, { shallow: true })
    }
  }, [])

  return (
    <Layout title='Parkering App'>
      {errorToast && <p>{errorToast}</p>}
      <VehicleSelector />
    </Layout>
  )
}

export const getServerSideProps = (async (context) => {
  const errorToast = context.query.errorToast as keyof typeof ERROR_TOASTS | undefined
  return { props: { errorToast: errorToast || null } }
}) satisfies GetServerSideProps<{
  errorToast: string | null
}>

export default Home
