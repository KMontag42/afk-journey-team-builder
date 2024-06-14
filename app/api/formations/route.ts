import { turso } from "@/lib/turso";

export async function POST(request: Request) {
  const body = await request.json();
  const { formation, spell, layout, user_id, name, tag } = body;

  await turso.execute({
    sql: 'INSERT INTO formations (formation, spell, layout, user_id, name, tag) VALUES (?, ?, ?, ?, ?, ?)',
    args: [formation, spell, layout, user_id, name, tag],
  });
  
  return new Response(JSON.stringify({ success: "yes" }), { status: 201 });
}
