import type { NextPage } from 'next'
import { VehicleSelector } from '../components/VehicleSelector'
import { Layout } from '../components/layout'

const Home: NextPage = () => {
  return (
    <Layout title='Parkering App'>
      <VehicleSelector />
    </Layout>
  )
}

export default Home
