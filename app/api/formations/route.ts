import { turso } from "@/lib/turso";

export async function POST(request: Request) {
  const body = await request.json();
  const { formation, artifact, layout, user_id, name } = body;

  await turso.execute({
    sql: "INSERT INTO formations (formation, artifact, layout, user_id, name) VALUES (?, ?, ?, ?, ?)",
    args: [formation, artifact, layout, user_id, name],
  });

  return new Response(JSON.stringify({ success: "yes" }), { status: 201 });
}