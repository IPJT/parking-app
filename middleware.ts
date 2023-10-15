import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  ignoredRoutes: ['/api/vehicle/auth', '/api/vehicle/location'],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
