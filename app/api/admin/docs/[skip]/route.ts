import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  skip: string;
}

export async function GET(
  request: Request,
  context: { params: { skip: string } }
) {
  const skip = parseInt(context.params.skip);
  const take = 10;

  const docs = await prisma.documentation.findMany({
    take,
    skip,
  });

  return NextResponse.json(docs);
}

