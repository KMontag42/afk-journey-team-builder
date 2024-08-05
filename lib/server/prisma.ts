import "server-only";

import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { turso } from "@/lib/server/turso";

const adapter = new PrismaLibSQL(turso);
export const prisma = new PrismaClient({ adapter });

export async function getFormations() {
  return await prisma.formations.findMany();
}

export async function getFormation(id: number) {
  return await prisma.formations.findUnique({
    where: {
      id: id,
    },
  });
}

export async function getRosters() {
  return await prisma.roster.findMany();
}
