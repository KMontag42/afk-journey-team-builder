import { turso } from "@/lib/turso";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const body = await request.json();
  const { formation, spell, layout, user_id } = body;

  const short_url = uuidv4();

  await turso.execute({
    sql: 'INSERT INTO formations (formation, spell, layout, user_id, short_url) VALUES (?, ?, ?, ?, ?)',
    args: [formation, spell, layout, user_id, short_url],
  });
  
  return new Response(JSON.stringify({ success: "yes" }), { status: 201 });
}
