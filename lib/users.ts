import "server-only";

import { clerkClient } from "@clerk/nextjs/server";

export async function getUser(id: string) {
  const user = await clerkClient.users.getUser(id);

  return {
    user_id: user.username || user.firstName,
    user_image: user.imageUrl,
  };
}
