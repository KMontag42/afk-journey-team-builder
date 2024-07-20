import { getFormation } from "@/lib/server/formations";
import { turso } from "@/lib/server/turso";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const formation = await getFormation(id);

  if (!formation) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ ...formation }), {
    status: 200,
  });
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  await turso.execute({
    sql: "DELETE FROM formations WHERE id = ?",
    args: [id],
  });

  return new Response(null, { status: 204 });
}
