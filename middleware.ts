import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  ignoredRoutes: ['/api/vehicle/auth'],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
