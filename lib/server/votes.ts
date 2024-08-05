import "server-only";

import { drizzleClient } from "@/lib/server/drizzle";
import { votes } from "@/drizzle/migrations/schema";

export async function createVote(formationId: number, userId: string) {
  await drizzleClient
    .insert(votes)
    .values({
      formationId,
      userId,
    })
    .execute();
}
