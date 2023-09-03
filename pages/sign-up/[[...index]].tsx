import { SignUp } from '@clerk/nextjs'
import { CenterWrapper } from '../sign-in/[[...index]]'

const SignUpPage = () => (
  <CenterWrapper>
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </CenterWrapper>
)

export default SignUpPage
