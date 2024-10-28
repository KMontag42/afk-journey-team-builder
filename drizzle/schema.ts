import { sqliteTable, integer, text, unique } from "drizzle-orm/sqlite-core";

export const formations = sqliteTable("formations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  formation: text("formation", { length: 255 }).notNull(),
  artifact: text("artifact", { length: 255 }).notNull(),
  layout: integer("layout").notNull(),
  userId: text("user_id", { length: 255 }).notNull(),
  name: text("name", { length: 255 }).notNull(),
  tags: text("tags", { mode: "json" }).$type<string[]>().default([]),
});

export const votes = sqliteTable(
  "votes",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    formationId: integer("formation_id")
      .references(() => formations.id)
      .notNull(),
    userId: text("user_id", { length: 255 }).notNull(),
  },
  (t) => ({
    unq: unique().on(t.formationId, t.userId),
  }),
);

export const roster = sqliteTable(
  "roster",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    lastUpdate: integer("last_update", { mode: "timestamp" }),
    userId: text("user_id", { length: 255 }),
  },
  (t) => ({
    unq: unique().on(t.userId),
  }),
);

export type FormationSelect = typeof formations.$inferSelect;
export type VoteSelect = typeof votes.$inferSelect;
export type FormationWithVotes = FormationSelect & {
  votes?: VoteSelect[];
  voteCount?: number;
};
export type RosterSelect = typeof roster.$inferSelect;
