import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Middleware will automatically redirect to signin if not authenticated
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - auth (auth pages)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - root page (/) - login page
     */
    "/dashboard/:path*",
    "/add/:path*",
  ],
}
