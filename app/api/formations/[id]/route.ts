import { turso } from '@/lib/turso';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const formation = await turso.execute({
    sql: 'SELECT * FROM formations WHERE id = ?',
    args: [id],
  });

  if (!formation.rows.length) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  }

  return new Response(JSON.stringify({ ...formation.rows[0] }), { status: 200 });
}
