import {
  deleteFormation,
  getFormation,
  updateFormation,
} from "@/lib/server/formations";

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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const data = await req.json();

  await updateFormation(id, data);

  return new Response(JSON.stringify({ id }), { status: 200 });
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  await deleteFormation(id);

  return new Response(null, { status: 204 });
}
