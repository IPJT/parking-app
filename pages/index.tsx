import type { NextPage } from 'next'
import { VehicleSelector } from '../components/VehicleSelector'
import { Layout } from '../components/layout'
import { useAuth } from '@clerk/nextjs'

const Home = () => {
  return (
    <Layout title='Parkering App'>
      <VehicleSelector />
    </Layout>
  )
}

export default Home
