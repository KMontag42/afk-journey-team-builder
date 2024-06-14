import { turso } from "@/lib/turso";

import { clerkClient } from "@clerk/nextjs/server";

import BaseLayout from "@/components/layouts/base";
import Arena1Layout from "@/components/layouts/Arena1";
import Arena2Layout from "@/components/layouts/Arena2";
import Arena3Layout from "@/components/layouts/Arena3";
import Arena4Layout from "@/components/layouts/Arena4";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const layouts: {
  [key: string]: { Component: React.ElementType; numTiles: number };
} = {
  0: { Component: BaseLayout, numTiles: 13 },
  1: { Component: Arena1Layout, numTiles: 10 },
  2: { Component: Arena2Layout, numTiles: 10 },
  3: { Component: Arena3Layout, numTiles: 9 },
  4: { Component: Arena4Layout, numTiles: 11 },
};

export default async function FormationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const response = await turso.execute({
    sql: "SELECT * FROM formations WHERE id = ?",
    args: [id],
  });

  if (!response.rows.length) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }

  const formation = response.rows[0];
  const Layout = layouts[formation.layout?.toString()!].Component;
  const formationArray = formation.formation?.toString().split(",");
  const user = await clerkClient.users.getUser(formation.user_id!.toString());

  return (
    <div className="flex flex-col items-center mr-6 my-4">
      <Layout formation={formationArray} spell={formation.spell} />
      <p className="pt-4">{user.username}</p>
      <Avatar>
        <AvatarImage src={user.imageUrl} />
        <AvatarFallback>{user.username}</AvatarFallback>
      </Avatar>
    </div>
  );
}
