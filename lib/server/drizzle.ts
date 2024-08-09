import "server-only";

import { drizzle } from "drizzle-orm/libsql";
import { turso } from "@/lib/server/turso";
import * as tables from "@/drizzle/schema";
import * as relations from "@/drizzle/relations";

export const drizzleClient = drizzle(turso, {
  schema: { ...tables, ...relations },
});
