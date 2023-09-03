import { SignedIn, SignedOut } from '@clerk/nextjs'
import type { NextPage } from 'next'
import Link from 'next/link'
import { Layout } from '../components/layout'
import { VehicleSelector } from '../components/VehicleSelector'

const Home: NextPage = () => {
  return (
    <main>
      <SignedIn>
        <Layout title="Start Page">
          <VehicleSelector />
        </Layout>
      </SignedIn>
      <SignedOut>
        <p>Sign up for an account to get started</p>
        <Link href="/sign-up">
          <button>Sign Up</button>
        </Link>
      </SignedOut>
    </main>
  )
}

export default Home
