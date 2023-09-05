import { SignedIn, SignedOut } from '@clerk/nextjs'
import type { NextPage } from 'next'
import Link from 'next/link'
import { Layout } from '../components/layout'
import { VehicleSelector } from '../components/VehicleSelector'

const Home: NextPage = () => {
  return (
    <Layout title="Parkering App">
      <VehicleSelector />
    </Layout>
  )
}

export default Home
