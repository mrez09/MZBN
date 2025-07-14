import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.clone();

  const isProtectedRoute =
    url.pathname.startsWith("/write") ||
    url.pathname.startsWith("/listposts") ||
    url.pathname.startsWith("/editwrite") ||
    url.pathname.startsWith("/admin");

  // 🔒 Belum login
  if (isProtectedRoute && !token) {
    url.pathname = "/login";
    url.searchParams.set("message", "unauthorized");
    return NextResponse.redirect(url);
  }

  // 🔒 Login tapi bukan admin
  if (isProtectedRoute && token?.role !== "admin") {
    url.pathname = "/unauthorized";
    url.searchParams.set("message", "not_admin");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/write",
    "/write/:path*",
    "/listposts",
    "/listposts/:path",
    "/editwrite/:path*",
    "/admin/:path*",
  ],
};
