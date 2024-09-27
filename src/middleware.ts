import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NEXT_AUTH } from "@/backend/shared/config";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Get the path of the request
  const pathname = request.nextUrl.pathname;

  // Allow unauthenticated access to /login
  if (pathname === "/login") {
    return NextResponse.next();
  }

  // Get the session
  const session = await getToken({
    req: request,
    secret: NEXT_AUTH.jwtSecret,
  });

  // If no session is found, handle the response
  if (!session) {
    // Allow some API routes to proceed without a session
    if (
      pathname.includes("/api/socket.io") ||
      pathname.startsWith("/api/auth/") ||
      pathname.startsWith("/api/data-deletion")
    ) {
      return NextResponse.next();
    }

    // Block access to other API routes
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // Redirect non-API requests to login if no session
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow request to proceed if authenticated
  return NextResponse.next();
}

// specify the path regex to apply the middleware to
export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
