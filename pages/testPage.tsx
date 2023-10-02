import { getAuth } from '@clerk/nextjs/server'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { AdminPanel } from '../components/admin/AdminPanel'
import { Layout } from '../components/layout'
import { Button } from '../components/form/Button'

const TestPage = () => {
  return <Layout title='Parkering App'></Layout>
}

export const getServerSideProps = async () => {
  normalConsolelogAndThrow()
  return { props: {} }
}

const EXAMPLE_STRING_TO_BE_LOGGED = 'This is just a normal string'
const EXAMPLE_OBJECT_TO_BE_LOGGED = {
  numberProp: 123,
  stringProp: EXAMPLE_STRING_TO_BE_LOGGED,
  objProp: {
    numberProp: 321,
    stringProp: 'Another String',
  },
}

export function normalConsolelogAndThrow() {
  console.log(EXAMPLE_STRING_TO_BE_LOGGED)
  console.log(EXAMPLE_OBJECT_TO_BE_LOGGED)
  throw new Error('This is an error thrown by normalConsolelogAndThrow')
}

export default TestPage
