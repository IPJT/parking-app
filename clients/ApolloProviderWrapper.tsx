import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from, gql } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useAuth } from '@clerk/nextjs'
import { relayStylePagination } from '@apollo/client/utilities'

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAFBASE_API_URL as string,
})

export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
  const { getToken } = useAuth()

  const client = useMemo(() => {
    const authMiddleware = setContext(async (operation, { headers }) => {
      const token = await getToken({ template: 'grafbase' })

      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      }
    })

    return new ApolloClient({
      link: from([authMiddleware, httpLink]),
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              vehicleCollection: relayStylePagination(),
              vehicleSearch: relayStylePagination(),
            },
          },
        },
      }),
    })
  }, [getToken])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
