"use server";

import { getUser } from "@/lib/server/users";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function AdminHome() {
  const { userId } = auth();

  if (!userId) {
    auth().redirectToSignIn();
    return;
  }

  const { admin } = await getUser(userId);

  if (!admin) {
    notFound();
  }

  return (
    <div className="container flex flex-col items-center">
      <h1>Admin Home</h1>
      <p>Welcome to the admin dashboard</p>
    </div>
  );
}
