import { SignUp } from '@clerk/nextjs'
import { CenterWrapper } from '../sign-in/[[...index]]'

const SignUpPage = () => (
  <CenterWrapper>
    <SignUp />
  </CenterWrapper>
)

export default SignUpPage
