import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

export const apolloClientOnServer = new ApolloClient({
  link: createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAFBASE_API_URL,
    headers: {
      'x-api-key':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTYwMTc1OTEsImlzcyI6ImdyYWZiYXNlIiwiYXVkIjoiMDFIQkg4REI0SkhQQllIUUpQWlpGVFQ4OTgiLCJqdGkiOiIwMUhCSDhEQjlHQk1SQlNNM0NNMk1aQlRGRSIsImVudiI6InByb2R1Y3Rpb24iLCJwdXJwb3NlIjoicHJvamVjdC1hcGkta2V5In0.C9Uh6JiLHzvOVmtkGvPO5UtMkjjzYBusVs3ppo6Z7jU' as string,
    },
  }),
  cache: new InMemoryCache(),
})
