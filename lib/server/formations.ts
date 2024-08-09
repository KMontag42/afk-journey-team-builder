import "server-only";

import { cache } from "react";
import { auth } from "@clerk/nextjs/server";

import { type ClerkUser, getUser } from "@/lib/server/users";
import { type FormationData } from "@/lib/formations";
import { and, eq, sql, count, like } from "drizzle-orm";
import { formations, votes } from "@/drizzle/schema";
import { drizzleClient } from "@/lib/server/drizzle";
import { alias } from "drizzle-orm/sqlite-core";

const drizzle = drizzleClient;

type FormationResult = {
  id: number;
  formation: string;
  artifact: string;
  layout: number;
  userId: string;
  name: string;
  voteCount: number | null;
  votes: any | null;
  currentUserLiked: number | null;
};

export function buildFormationJson(
  formation: FormationResult,
  user: ClerkUser,
): FormationData {
  return {
    id: parseInt(formation.id?.toString()!),
    formation: formation.formation?.toString()!,
    artifact: formation.artifact?.toString()!,
    layout: parseInt(formation.layout?.toString()!),
    name: formation.name?.toString()!,
    currentUserLiked:
      parseInt(formation.currentUserLiked?.toString()!) === 1 ? true : false,
    ...user,
  };
}

function _baseFormationQuery(userId: string | null) {
  const votes2 = alias(votes, "v2");
  if (userId) {
    return drizzle
      .select({
        id: formations.id,
        formation: formations.formation,
        artifact: formations.artifact,
        layout: formations.layout,
        name: formations.name,
        userId: formations.userId,
        voteCount: count(votes2.id).as("voteCount"),
        currentUserLiked: sql`CASE WHEN ${votes.id} IS NOT NULL THEN 1 ELSE 0 END`,
      })
      .from(formations)
      .leftJoin(
        votes,
        and(eq(votes.userId, userId), eq(votes.formationId, formations.id)),
      )
      .leftJoin(votes2, eq(formations.id, votes2.formationId))
      .groupBy(formations.id);
  } else {
    return drizzle
      .select({
        id: formations.id,
        formation: formations.formation,
        artifact: formations.artifact,
        layout: formations.layout,
        name: formations.name,
        userId: formations.userId,
        voteCount: count(votes2.id).as("voteCount"),
        currentUserLiked: sql`0`,
      })
      .from(formations)
      .leftJoin(votes2, eq(formations.id, votes2.formationId))
      .groupBy(formations.id);
  }
}

async function _getFormation(id: string): Promise<FormationData | false> {
  const { userId } = auth();
  const formation = (
    await _baseFormationQuery(userId)
      .where(eq(formations.id, parseInt(id)))
      .execute()
  )[0] as FormationResult;

  if (!formation) {
    return false;
  }

  const user = await getUser(formation.userId?.toString()!);

  return buildFormationJson(formation, user);
}

export const getFormation = cache(_getFormation);

export async function getFormationsForUserId(
  userId: string,
): Promise<FormationData[]> {
  const { userId: currentUserId } = auth();
  const userFormations = (await _baseFormationQuery(currentUserId)
    .where(eq(formations.userId, userId))
    .execute()) as FormationResult[];

  return await Promise.all(
    userFormations.map(async (formation) => {
      const user = await getUser(formation.userId?.toString()!);

      return buildFormationJson(formation, user);
    }),
  );
}

export async function searchFormations(
  query: string,
): Promise<FormationData[]> {
  // if there is a user, we need to join votes to get the user's votes
  const { userId } = auth();
  const queryResponse = (await _baseFormationQuery(userId)
    .where(like(formations.name, `%${query}%`))
    .orderBy(sql`voteCount DESC`)
    .execute()) as FormationResult[];

  const searchFormations = await Promise.all(
    queryResponse.map(async (formation) => {
      const user = await getUser(formation.userId?.toString()!);

      return buildFormationJson(formation, user);
    }),
  );

  return searchFormations;
}

async function _mostPopularFormations(limit: number): Promise<FormationData[]> {
  const { userId } = auth();
  const queryResponse = (await _baseFormationQuery(userId)
    .orderBy(sql`voteCount DESC`)
    .limit(limit)
    .execute()) as FormationResult[];

  return await Promise.all(
    queryResponse.map(async (formation) => {
      const user = await getUser(formation.userId?.toString()!);

      return buildFormationJson(formation, user);
    }),
  );
}

export const mostPopularFormations = cache(_mostPopularFormations);

type FormationCreateData = {
  formation: string[];
  artifact: string;
  layout: string;
  name: string;
};

export async function createFormation(
  formation: FormationCreateData,
): Promise<string | false> {
  const { userId } = auth();
  const values = {
    formation: formation.formation.join(","),
    artifact: formation.artifact,
    layout: parseInt(formation.layout),
    userId: userId,
    name: formation.name,
  };
  const createResponse = await drizzle
    .insert(formations)
    .values(values)
    .returning({ id: formations.id })
    .execute();

  return createResponse ? createResponse[0].id.toString() : false;
}

export async function deleteFormation(id: string): Promise<void> {
  await drizzle
    .delete(formations)
    .where(eq(formations.id, parseInt(id)))
    .execute();
}
