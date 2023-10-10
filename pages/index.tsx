import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { VehicleSelector } from '../components/vehicle-components/VehicleSelector'
import { Layout } from '../components/layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ERROR_TOASTS } from '../utils/enums'
import Toast, { ToastErrorObject } from '../components/Toast'

const Home = ({ errorToast }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const [openToast, setOpenToast] = useState(false)
  const [toastErrorObject, setToastErrorObject] = useState<ToastErrorObject>()

  useEffect(() => {
    if (errorToast) {
      setToastErrorObject(ERROR_TOASTS[errorToast])
      setOpenToast(true)
      router.replace('/', undefined, { shallow: true })
    }
  }, [])

  return (
    <Layout title='Parkering App'>
      {toastErrorObject && <Toast open={openToast} setOpen={setOpenToast} toastErrorObject={toastErrorObject} />}
      <VehicleSelector />
    </Layout>
  )
}

export const getServerSideProps = (async (context) => {
  const errorToast = context.query.errorToast as keyof typeof ERROR_TOASTS
  return { props: { errorToast: errorToast || null } }
}) satisfies GetServerSideProps<{
  errorToast: keyof typeof ERROR_TOASTS | null
}>

export default Home
