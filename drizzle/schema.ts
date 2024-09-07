import { sql } from "drizzle-orm";
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

export const roster = sqliteTable(
  "roster",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    lastUpdate: text("timestamp")
      .notNull()
      .default(sql`(current_timestamp)`),
    userId: text("user_id", { length: 255 }),
  },
  (t) => ({
    unq: unique().on(t.userId),
  }),
);

export const rosterArtifacts = sqliteTable(
  "roster_artifacts",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    rosterId: integer("roster_id").references(() => roster.id, {
      onDelete: "cascade",
    }),
    artifactId: integer("artifact_id"),
    level: integer("level"),
  },
  (t) => ({
    unq: unique().on(t.rosterId, t.artifactId),
  }),
);

export const rosterLevels = sqliteTable(
  "roster_levels",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    rosterId: integer("roster_id").references(() => roster.id, {
      onDelete: "cascade",
    }),
    levelId: integer("level_id"),
    level: integer("level"),
  },
  (t) => ({
    unq: unique().on(t.rosterId, t.levelId),
  }),
);

export const rosterHeroes = sqliteTable(
  "roster_heroes",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    rosterId: integer("roster_id").references(() => roster.id, {
      onDelete: "cascade",
    }),
    heroId: integer("hero_id"),
    ascension: text("ascension", { length: 255 }),
    equipment: integer("equipment"),
  },
  (t) => ({
    unq: unique().on(t.rosterId, t.heroId),
  }),
);

export const rosterEquipment = sqliteTable(
  "roster_equipment",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    rosterId: integer("roster_id").references(() => roster.id, {
      onDelete: "cascade",
    }),
    equipmentId: integer("equipment_id"),
    equipmentClass: text("equipment_class", { length: 255 }),
    armLevel: integer("arm_level"),
    bodyLevel: integer("body_level"),
    headLevel: integer("head_level"),
    legLevel: integer("leg_level"),
    ornamentLevel: integer("ornament_level"),
    weaponLevel: integer("weapon_level"),
  },
  (t) => ({
    unq: unique().on(t.rosterId, t.equipmentId, t.equipmentClass),
  }),
);
