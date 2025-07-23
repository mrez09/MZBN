import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const posts = await prisma.post.findMany({
      include: { user: true, cat: true }, // sesuaikan relasi
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error fetching posts" },
      { status: 500 }
    );
  }
};
