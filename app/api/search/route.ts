import { NextRequest } from "next/server";
import { turso } from "@/lib/turso";
import { getUser } from "@/lib/users";
import { auth } from "@clerk/nextjs/server";

async function searchFormations(query: string) {
  // if there is a user, we need to join votes to get the user's votes
  const { userId } = auth();
  let queryResponse;

  if (userId) {
    queryResponse = await turso.execute({
      sql: `
        SELECT
            f.*,
            v.id AS currentUserLiked
        FROM
            formations f
        LEFT JOIN
            votes v
        ON
            f.id = v.formation_id
        AND
            v.user_id = (:userId)
        WHERE f.name LIKE (:q) OR f.tag LIKE (:q) OR f.formation LIKE (:q);
      `,
      args: { q: `%${query}%`, userId },
    });
  } else {
    queryResponse = await turso.execute({
      sql: "SELECT * FROM formations WHERE name LIKE (:q) OR tag LIKE (:q) OR formation LIKE (:q)",
      args: { q: `%${query}%` },
    });
  }

  if (!queryResponse.rows.length) {
    return [];
  }

  const formations = await Promise.all(
    queryResponse.rows.map(async (formation) => {
      const user = await getUser(formation.user_id?.toString()!);

      return {
        ...formation,
        ...user,
      };
    }),
  );

  return formations;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return new Response(JSON.stringify({ formations: [] }), {
      status: 200,
    });
  }

  const formations = await searchFormations(query);

  return new Response(JSON.stringify({ formations }), { status: 200 });
}
