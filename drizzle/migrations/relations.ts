import { relations } from "drizzle-orm/relations";
import { formations, votes } from "./schema";

export const votesRelations = relations(votes, ({ one }) => ({
  formation: one(formations, {
    fields: [votes.formationId],
    references: [formations.id],
  }),
}));

export const formationsRelations = relations(formations, ({ many }) => ({
  votes: many(votes),
}));
