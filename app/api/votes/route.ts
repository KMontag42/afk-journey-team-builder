import { turso } from "@/lib/turso";

export async function POST(request: Request) {
  const body = await request.json();
  const { formation_id, user_id } = body;

  try {
    await turso.execute({
      sql: "INSERT INTO votes (formation_id, user_id) VALUES (?, ?)",
      args: [formation_id, user_id],
    });

    return new Response(null, { status: 204 });
  } catch (e) {
    return new Response(null, { status: 500 });
  }
}
