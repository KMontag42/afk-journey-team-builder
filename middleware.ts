import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const protectedPaths = createRouteMatcher(["/admin(.*)"]);
const formationEditPaths = createRouteMatcher(["/formations/(.*)/edit"]);

export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims } = auth();

  if (
    (!userId && protectedPaths(req)) ||
    (userId && protectedPaths(req) && sessionClaims?.role !== "admin")
  ) {
    return NextResponse.rewrite(new URL("/not-found", req.url));
  }

  if (formationEditPaths(req)) {
    if (!userId) {
      return auth().redirectToSignIn();
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
