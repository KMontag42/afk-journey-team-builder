import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const protectedPaths = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims } = auth();

  if (
    (!userId && protectedPaths(req)) ||
    (userId && protectedPaths(req) && sessionClaims?.role !== "admin")
  ) {
    return NextResponse.rewrite(new URL("/not-found", req.url));
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
