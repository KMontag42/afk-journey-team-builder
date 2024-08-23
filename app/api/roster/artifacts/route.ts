import { ArtifactData, createOrUpdateArtifacts } from "@/lib/server/roster";

export async function POST(request: Request) {
  const body = (await request.json()) as ArtifactData[];
  const rosterId = await createOrUpdateArtifacts(body);

  if (!rosterId) {
    return new Response(JSON.stringify({ success: "no" }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ success: "yes", id: rosterId }), {
    status: 200,
  });
}
