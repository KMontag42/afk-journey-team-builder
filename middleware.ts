import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedPaths = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims } = auth();

  if (!userId && protectedPaths(req) && sessionClaims?.role !== "admin") {
    return auth().redirectToSignIn();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
