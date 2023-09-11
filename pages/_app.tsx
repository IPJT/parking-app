import { ClerkLoaded, ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'
import { GlobalStyle } from '../styles/global-style'
import { ApolloProviderWrapper } from '../ApolloProviderWrapper'

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
