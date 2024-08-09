import { createFormation } from "@/lib/server/formations";

export async function POST(request: Request) {
  const body = await request.json();
  const newFormationId = await createFormation(body);

  if (!newFormationId) {
    return new Response(JSON.stringify({ success: "no" }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ success: "yes", id: newFormationId }), {
    status: 201,
  });
}
