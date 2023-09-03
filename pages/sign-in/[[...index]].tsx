import { SignIn } from '@clerk/nextjs'
import styled from 'styled-components'

const SignInPage = () => (
  <CenterWrapper>
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </CenterWrapper>
)

export const CenterWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`

export default SignInPage
