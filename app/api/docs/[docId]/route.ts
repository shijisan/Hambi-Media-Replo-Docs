import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  docId: string;
}

export async function GET(req: Request, {params}: {params: Params}){
    // i can also use slug instead of docId for better SEO but not appropriate for current use case

    const docId = params.docId;

    const fetchedDoc = await prisma.documentation.findFirst({
        where: {
            id: docId
        },
        include: {
            author: {
                select: {name: true}
            }
        }
    });

    if (!fetchedDoc) {
        return NextResponse.json({error: "Document not found"}, { status: 404});
    }

    return NextResponse.json(fetchedDoc);
}