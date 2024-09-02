import { relations } from "drizzle-orm/relations";
import {
  formations,
  roster,
  rosterArtifacts,
  rosterHeroes,
  rosterLevels,
  votes,
} from "./schema";

export const votesRelations = relations(votes, ({ one }) => ({
  formation: one(formations, {
    fields: [votes.formationId],
    references: [formations.id],
  }),
}));

export const formationsRelations = relations(formations, ({ many }) => ({
  votes: many(votes),
}));

export const artifactsRelations = relations(rosterArtifacts, ({ one }) => ({
  roster: one(roster, {
    fields: [rosterArtifacts.rosterId],
    references: [roster.id],
  }),
}));

export const levelsRelations = relations(rosterLevels, ({ one }) => ({
  roster: one(roster, {
    fields: [rosterLevels.rosterId],
    references: [roster.id],
  }),
}));

export const heroesRelations = relations(rosterHeroes, ({ one }) => ({
  roster: one(roster, {
    fields: [rosterHeroes.rosterId],
    references: [roster.id],
  }),
}));

export const rosterRelations = relations(roster, ({ many }) => ({
  rosterArtifacts: many(rosterArtifacts),
  rosterLevels: many(rosterLevels),
  rosterHeroes: many(rosterHeroes),
}));
