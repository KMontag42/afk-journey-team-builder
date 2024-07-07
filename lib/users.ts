import "server-only";

import { clerkClient } from "@clerk/nextjs/server";

export type ClerkUser = {
  user_id?: string;
  user_image: string;
};

export async function getUser(id: string) {
  const user = await clerkClient.users.getUser(id);

  return {
    user_id: user.username || user.firstName || undefined,
    user_image: user.imageUrl,
  };
}
