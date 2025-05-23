import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ docId: string }> } 
) {
  const { docId } = await context.params;

  const fetchedDoc = await prisma.documentation.findFirst({
    where: {
      id: docId,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  if (!fetchedDoc) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  return NextResponse.json(fetchedDoc);
}
