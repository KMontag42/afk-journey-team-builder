import { HeroData, createOrUpdateHeroes } from "@/lib/server/roster";

export async function POST(request: Request) {
  const body = (await request.json()) as HeroData[];
  const rosterId = await createOrUpdateHeroes(body);

  if (!rosterId) {
    return new Response(JSON.stringify({ success: "no" }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ success: "yes", id: rosterId }), {
    status: 200,
  });
}
