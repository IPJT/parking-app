import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  ignoredRoutes: ['/api/vehicle/auth', '/api/vehicle/verify-parkings'], //TODO-ian - verify-parkings must be secured
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
