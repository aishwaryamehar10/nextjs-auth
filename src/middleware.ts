import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  //authenticated users
  const isPublicPath = path === "/login" || path === "/signup"; //this should not be visible to someone who has token
  //extracting the token
  const token = request.cookies.get("token")?.value || ""; //if there is a token get the value otherwise empty

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  //if url is not public and token is not there then you need to login first
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};
