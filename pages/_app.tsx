import { ClerkLoaded, ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'
import { GlobalStyle } from '../styles/global-style'

const publicPages = ['/', '/sign-in/[[...index]]', '/sign-up/[[...index]]']

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ClerkProvider {...pageProps}>
        <ClerkLoaded>
          {publicPages.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <>
              <SignedIn>
                <Component {...pageProps} />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          )}
        </ClerkLoaded>
      </ClerkProvider>
    </ThemeProvider>
  )
}

export default MyApp
