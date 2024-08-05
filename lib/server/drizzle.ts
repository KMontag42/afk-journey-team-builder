import "server-only";

import { drizzle } from "drizzle-orm/libsql";
import { turso } from "@/lib/server/turso";

export const drizzleClient = drizzle(turso);
