import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

export const apolloClientOnServer = new ApolloClient({
  link: createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAFBASE_API_URL,
    headers: {
      'x-api-key': process.env.X_API_KEY as string,
    },
  }),
  cache: new InMemoryCache(),
})
