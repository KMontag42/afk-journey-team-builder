import "server-only";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { roster, rosterArtifacts, rosterLevels } from "@/drizzle/schema";
import { drizzleClient } from "@/lib/server/drizzle";
import { AscensionLevel, CharacterClass, Faction } from "@/lib/characters";

const drizzle = drizzleClient;

export async function createOrUpdateRoster(
  userId: string,
): Promise<string | false> {
  const values = {
    lastUpdate: new Date().toISOString(),
    userId: userId,
  };
  const createOrUpdateResponse = await drizzle
    .insert(roster)
    .values(values)
    .onConflictDoUpdate({
      target: [roster.userId],
      set: { lastUpdate: values.lastUpdate },
    })
    .returning({ id: roster.id });
  return createOrUpdateResponse
    ? createOrUpdateResponse[0].id.toString()
    : false;
}

export type ArtifactData = {
  artifactId: number;
  level: number;
};

export async function createOrUpdateArtifact(
  rosterId: number,
  artifact: ArtifactData,
): Promise<string | false> {
  const values = {
    rosterId: rosterId,
    artifactId: artifact.artifactId,
    level: artifact.level,
  };
  const createOrUpdateResponse = await drizzle
    .insert(rosterArtifacts)
    .values(values)
    .onConflictDoUpdate({
      target: [rosterArtifacts.rosterId, rosterArtifacts.artifactId],
      set: { level: values.level },
    })
    .returning({ id: rosterArtifacts.id });

  return createOrUpdateResponse
    ? createOrUpdateResponse[0].id.toString()
    : false;
}

export async function createOrUpdateArtifacts(
  artifacts: ArtifactData[],
): Promise<string | false> {
  const { userId } = auth();

  let rosterId: any;
  if (userId) {
    rosterId = await createOrUpdateRoster(userId);
    artifacts.forEach((artifact: any) => {
      createOrUpdateArtifact(rosterId, artifact);
    });
  } else {
    return false;
  }

  return rosterId;
}

export async function getRosterArtifacts(
  userId: string,
): Promise<ArtifactData[]> {
  const artifactData = (await drizzle
    .select({
      artifactId: rosterArtifacts.artifactId,
      level: rosterArtifacts.level,
    })
    .from(rosterArtifacts)
    .leftJoin(roster, eq(roster.id, rosterArtifacts.rosterId))
    .where(eq(roster.userId, userId))
    .orderBy(rosterArtifacts.artifactId)) as ArtifactData[];

  return artifactData;
}

export type LevelData = {
  levelId: number;
  level: number;
};

export async function createOrUpdateLevel(
  rosterId: number,
  level: LevelData,
): Promise<string | false> {
  const values = {
    rosterId: rosterId,
    levelId: level.levelId,
    level: level.level,
  };
  const createOrUpdateResponse = await drizzle
    .insert(rosterLevels)
    .values(values)
    .onConflictDoUpdate({
      target: [rosterLevels.rosterId, rosterLevels.levelId],
      set: { level: values.level },
    })
    .returning({ id: rosterLevels.id });

  return createOrUpdateResponse
    ? createOrUpdateResponse[0].id.toString()
    : false;
}

export async function createOrUpdateLevels(
  levels: LevelData[],
): Promise<string | false> {
  const { userId } = auth();

  let rosterId: any;
  if (userId) {
    rosterId = await createOrUpdateRoster(userId);
    levels.forEach((level: any) => {
      createOrUpdateLevel(rosterId, level);
    });
  } else {
    return false;
  }

  return rosterId;
}

export async function getRosterLevels(userId: string): Promise<LevelData[]> {
  const levelData = (await drizzle
    .select({
      levelId: rosterLevels.levelId,
      level: rosterLevels.level,
    })
    .from(rosterLevels)
    .leftJoin(roster, eq(roster.id, rosterLevels.rosterId))
    .where(eq(roster.userId, userId))
    .orderBy(rosterLevels.levelId)) as LevelData[];

  return levelData;
}
