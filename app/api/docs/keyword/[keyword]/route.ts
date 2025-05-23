import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ keyword: string }> }
) {
  const awaitedParams = await params;
  const keyword = awaitedParams.keyword;

  console.log("Searching for keyword:", keyword);

  try {
    const keywordMatch = await prisma.documentation.findMany({
      where: {
        OR: [
          { title: { contains: keyword, mode: "insensitive" } },
          { tags: { has: keyword } },  
        ],
      },
    });
    return NextResponse.json(keywordMatch);
  } catch (error) {
    console.error("API error fetching docs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
