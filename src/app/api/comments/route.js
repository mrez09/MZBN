import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

//All Comment Bro
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  console.log(searchParams);
  const postSlug = searchParams.get("postSlug");

  try {
    const comments = await prisma.comment.findMany({
      where: {
        ...(postSlug && { postSlug }),
      },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(comments, { status: 200 }));
  } catch (err) {
    //console.log(err);
    console.error("Error saat membuat komentar:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

//Create a Comment Bro
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  //console.log(searchParams);

  try {
    const body = await req.json();
    const comment = await prisma.comment.create({
      data: { ...body, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(comment, { status: 200 }));
  } catch (err) {
    console.error("Error saat membuat komentar:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
