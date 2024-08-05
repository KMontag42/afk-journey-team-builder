import { sqliteTable, integer, text, unique } from "drizzle-orm/sqlite-core";

export const formations = sqliteTable("formations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  formation: text("formation", { length: 255 }),
  artifact: text("artifact", { length: 255 }),
  layout: integer("layout"),
  userId: text("user_id", { length: 255 }),
  name: text("name", { length: 255 }),
});

export const votes = sqliteTable(
  "votes",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    formationId: integer("formation_id").references(() => formations.id),
    userId: text("user_id", { length: 255 }),
  },
  (t) => ({
    unq: unique().on(t.formationId, t.userId),
  }),
);
