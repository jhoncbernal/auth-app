import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NEXT_AUTH } from "@/backend/shared/config";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Get the path of the request
  const pathname = request.nextUrl.pathname;
  const method = request.method;

  // If required token, verify it
  if (
    (pathname === "/api/map/areas-by-coordinates" && method === "POST") ||
    (pathname === "/api/map/locations-by-coordinate-group" && method === "POST")
  ) {
    try {
      const token = request.headers.get("Authorization") as string;
      const decoded = await jwtVerify(
        token,
        new TextEncoder().encode(NEXT_AUTH.jwtSecret as string),
      );
      // add the decoded token to the request object
     request.headers.set("decoded", JSON.stringify(decoded));
      return NextResponse.next();
    } catch (error:unknown) {
      return NextResponse.json(
        {
          error: `Unauthorized ${error}`,
        },
        {
          status: 401,
        },
      );
    }
  }



  // Get the session
  const session = await getToken({
    req: request,
    secret: NEXT_AUTH.jwtSecret,
  });

  if (!session) {
    // If Allowed API route, keep going
    if (
      pathname.includes("/api/socket.io") ||
      pathname.startsWith("/api/auth/") ||
      pathname.startsWith("/api/data-deletion")
    )
      return NextResponse.next();

    // If not allowed API route, return unauthorized
    if (pathname.startsWith("/api/"))
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
  }

  // If Allowed Route, keep going
  if (/^\/api\/report\/[a-zA-Z0-9]+$/.test(pathname))
    return NextResponse.next();

  return NextResponse.next();
}

// specify the path regex to apply the middleware to
export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
