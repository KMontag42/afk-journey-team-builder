import "server-only";

import { clerkClient } from "@clerk/nextjs/server";

export type ClerkUser = {
  user_id: string;
  username?: string;
  user_image: string;
  admin: boolean;
};

export function userData(user: any): ClerkUser {
  return {
    user_id: user.id || user.userId,
    username: user.username || user.firstName || undefined,
    user_image: user.imageUrl,
    admin: user["privateMetadata"] ? user["privateMetadata"]["admin"] : false,
  };
}
export async function getUser(id: string) {
  const user = await clerkClient.users.getUser(id);

  return userData(user);
}

export async function getUserByUsername(username: string) {
  const users = await clerkClient.users.getUserList({
    limit: 1,
    query: username,
  });

  if (users.totalCount === 0) {
    return null;
  }

  return userData(users.data[0]);
}
