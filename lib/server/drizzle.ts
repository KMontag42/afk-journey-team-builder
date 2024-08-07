import "server-only";

import { drizzle } from "drizzle-orm/libsql";
import { turso } from "@/lib/server/turso";
import { formations, votes } from "@/drizzle/schema";
import { formationsRelations, votesRelations } from "@/drizzle/relations";

export const drizzleClient = drizzle(turso, {
  schema: { formations, votes, votesRelations, formationsRelations },
});
