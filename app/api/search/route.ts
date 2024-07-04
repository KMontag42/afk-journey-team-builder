import { NextRequest } from "next/server";
import { searchFormations } from "@/lib/server/formations";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return new Response(JSON.stringify({ formations: [] }), {
      status: 200,
    });
  }

  const formations = await searchFormations(query);

  return new Response(JSON.stringify({ formations }), { status: 200 });
}
