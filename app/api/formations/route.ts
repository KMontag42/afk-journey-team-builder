import { turso } from "@/lib/server/turso";

export async function POST(request: Request) {
  const body = await request.json();
  const { formation, artifact, layout, user_id, name } = body;

  await turso.execute({
    sql: `INSERT INTO formations (formation, artifact, layout, user_id, name) VALUES (?, ?, ?, ?, ?)`,
    args: [formation, artifact, layout, user_id, name],
  });

  const row = await turso.execute({
    sql: `SELECT id FROM formations WHERE user_id = ? ORDER BY id DESC LIMIT 1`,
    args: [user_id],
  });

  return new Response(JSON.stringify({ success: "yes", id: row.rows[0].id }), {
    status: 201,
  });
}
