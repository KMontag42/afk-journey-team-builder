import { NextRequest } from "next/server";
import { searchFormations } from "@/lib/server/formations";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || undefined;
  const tags = searchParams.get("t") || undefined;
  const characters = searchParams.get("c") || undefined;

  if (!query && !tags && !characters) {
    return new Response(JSON.stringify({ formations: [] }), {
      status: 200,
    });
  }

  const formations = await searchFormations(query, tags, characters);

  return new Response(JSON.stringify({ formations }), { status: 200 });
}
