import { ClerkProvider } from '@clerk/nextjs'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { ApolloProviderWrapper } from '../ApolloProviderWrapper'
import { GlobalStyle } from '../styles/global-style'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ClerkProvider {...pageProps}>
        <ApolloProviderWrapper>
          <Component {...pageProps} />
        </ApolloProviderWrapper>
      </ClerkProvider>
    </ThemeProvider>
  )
}

export default MyApp
