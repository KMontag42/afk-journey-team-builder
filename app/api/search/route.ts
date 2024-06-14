import { turso } from "@/lib/turso";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return new Response(JSON.stringify({ formations: [] }), {
      status: 200,
    });
  }

  const formation = await turso.execute({
    sql: "SELECT * FROM formations WHERE name LIKE ?",
    args: [`%${query}%`],
  });

  if (!formation.rows.length) {
    return new Response(JSON.stringify({ formations: [] }), {
      status: 200,
    });
  }

  const formations = await Promise.all(
    formation.rows.map(async (formation) => {
      const user = await clerkClient.users.getUser(
        formation.user_id?.toString()!,
      );

      return {
        ...formation,
        user_id: user.username,
        user_image: user.imageUrl,
      };
    }),
  );

  return new Response(JSON.stringify({ formations }), { status: 200 });
}
