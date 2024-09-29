import "server-only";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import {
  roster,
  rosterArtifacts,
  rosterHeroes,
  rosterLevels,
} from "@/drizzle/schema";
import { drizzleClient } from "@/lib/server/drizzle";
import { AscensionLevel } from "@/lib/characters";

const drizzle = drizzleClient;

export async function createOrUpdateRoster(userId: string): Promise<string> {
  const values = {
    lastUpdate: new Date().toISOString(),
    userId: userId,
  };
  try {
    const createOrUpdateResponse = await drizzle
      .insert(roster)
      .values(values)
      .onConflictDoUpdate({
        target: [roster.userId],
        set: { lastUpdate: values.lastUpdate },
      })
      .returning({ id: roster.id });

    return createOrUpdateResponse[0].id.toString();
  } catch (e) {
    throw e;
  }
}

export type ArtifactData = {
  artifactId: number;
  level: number;
};

export async function createOrUpdateArtifact(
  rosterId: number,
  artifact: ArtifactData,
): Promise<string> {
  const values = {
    rosterId: rosterId,
    artifactId: artifact.artifactId,
    level: artifact.level,
  };
  try {
    const createOrUpdateResponse = await drizzle
      .insert(rosterArtifacts)
      .values(values)
      .onConflictDoUpdate({
        target: [rosterArtifacts.rosterId, rosterArtifacts.artifactId],
        set: { level: values.level },
      })
      .returning({ id: rosterArtifacts.id });

    return createOrUpdateResponse[0].id.toString();
  } catch (e) {
    throw e;
  }
}

export async function createOrUpdateArtifacts(
  artifacts: ArtifactData[],
): Promise<string | false> {
  const { userId } = auth();

  if (userId) {
    const rosterId = await createOrUpdateRoster(userId);
    await Promise.all(
      artifacts.map(
        async (a) => await createOrUpdateArtifact(parseInt(rosterId), a),
      ),
    );
    return rosterId;
  } else {
    return false;
  }
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
): Promise<string> {
  const values = {
    rosterId: rosterId,
    levelId: level.levelId,
    level: level.level,
  };
  try {
    const createOrUpdateResponse = await drizzle
      .insert(rosterLevels)
      .values(values)
      .onConflictDoUpdate({
        target: [rosterLevels.rosterId, rosterLevels.levelId],
        set: { level: values.level },
      })
      .returning({ id: rosterLevels.id });

    return createOrUpdateResponse[0].id.toString();
  } catch (e) {
    throw e;
  }
}

export async function createOrUpdateLevels(
  levels: LevelData[],
): Promise<string | false> {
  const { userId } = auth();

  if (userId) {
    const rosterId = await createOrUpdateRoster(userId);
    await Promise.all(
      levels.map((l) => createOrUpdateLevel(parseInt(rosterId), l)),
    );
    return rosterId;
  } else {
    return false;
  }
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

export type HeroData = {
  heroId: number;
  ascension: AscensionLevel;
  equipment: number;
};

export async function createOrUpdateHero(
  rosterId: number,
  hero: HeroData,
): Promise<string> {
  const values = {
    rosterId: rosterId,
    heroId: hero.heroId,
    ascension: hero.ascension,
    equipment: hero.equipment,
  };

  try {
    const createOrUpdateResponse = await drizzle
      .insert(rosterHeroes)
      .values(values)
      .onConflictDoUpdate({
        target: [rosterHeroes.rosterId, rosterHeroes.heroId],
        set: { ascension: values.ascension, equipment: values.equipment },
      })
      .returning({ id: rosterHeroes.id });

    return createOrUpdateResponse[0].id.toString();
  } catch (e) {
    throw e;
  }
}

export async function createOrUpdateHeroes(
  heroes: HeroData[],
): Promise<string | false> {
  const { userId } = auth();

  if (userId) {
    const rosterId = await createOrUpdateRoster(userId);
    await Promise.all(
      heroes.map((h) => createOrUpdateHero(parseInt(rosterId), h)),
    );
    return rosterId;
  } else {
    return false;
  }
}

export async function getRosterHeroes(userId: string): Promise<HeroData[]> {
  const heroData = (await drizzle
    .select({
      heroId: rosterHeroes.heroId,
      ascension: rosterHeroes.ascension,
      equipment: rosterHeroes.equipment,
    })
    .from(rosterHeroes)
    .leftJoin(roster, eq(roster.id, rosterHeroes.rosterId))
    .where(eq(roster.userId, userId))
    .orderBy(rosterHeroes.heroId)) as HeroData[];

  return heroData;
}
