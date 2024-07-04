import { NextRequest } from "next/server";
import { turso } from "@/lib/turso";
import { getUser } from "@/lib/users";

async function searchFormations(query: string) {
  const formation = await turso.execute({
    sql: "SELECT * FROM formations WHERE name LIKE (:q) OR tag LIKE (:q) OR formation LIKE (:q)",
    args: { q: `%${query}%` },
  });

  if (!formation.rows.length) {
    return [];
  }

  const formations = await Promise.all(
    formation.rows.map(async (formation) => {
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
