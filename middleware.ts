import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const path = req.nextUrl.pathname;

  if (!session?.user) {
    const url = new URL("/auth/signin", req.url);
    url.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(url);
  }

  if (path.startsWith("/admin") && session.user.role !== "ADMIN") {
    const url = new URL("/account", req.url);
    url.searchParams.set("error", "forbidden");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/docs/:path*", "/admin/:path*"],
};
