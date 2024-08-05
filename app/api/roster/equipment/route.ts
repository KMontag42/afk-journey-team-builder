import { prisma } from "@/lib/server/prisma";

export async function GET() {
  const formation = await prisma.formations.findUnique({
    where: {
      id: 3,
    },
  });

  if (!formation) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }

  console.log(formation);

  return new Response(JSON.stringify({ ...formation }), {
    status: 200,
  });
}
