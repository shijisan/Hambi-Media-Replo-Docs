import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface Params {
  skip: string;
}

export async function POST(req: Request){

  const session = await auth();
  console.log(session?.user);

  if (!session?.user.id){
    return NextResponse.json({message: "Unauthorized"}, { status: 401});
  }
  
  const {title, content, tags} = await req.json();
  const authorId = session?.user.id;

  const newDoc = await prisma.documentation.create({
    data: {
      title,
      content,
      tags,
      authorId
    }
  })

  return NextResponse.json(newDoc);
}