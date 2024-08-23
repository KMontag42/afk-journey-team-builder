import { LevelData, createOrUpdateLevels } from "@/lib/server/roster";

export async function POST(request: Request) {
  const body = (await request.json()) as LevelData[];
  const rosterId = await createOrUpdateLevels(body);

  if (!rosterId) {
    return new Response(JSON.stringify({ success: "no" }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ success: "yes", id: rosterId }), {
    status: 200,
  });
}
