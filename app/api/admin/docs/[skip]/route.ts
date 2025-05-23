import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: { params: Promise<{ skip: string }> }
) {
  const { skip } = await context.params;
  const take = 10;

  const docs = await prisma.documentation.findMany({
    take,
    skip: parseInt(skip),
  });

  return NextResponse.json(docs);
}
