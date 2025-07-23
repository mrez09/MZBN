import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
//import { getUploadAuthParams } from "@imagekit/next/server"

export const GET = async () => {
  const oneMonthAgo = new Date();
  const today = new Date();
  //oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); //setelah 1 bulan
  const lastMonth = new Date(
    today.getFullYear() - 12,
    today.getMonth(),
    today.getDate()
  ); //sebelum 1 bulan

  try {
    const popular = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc", // Urutkan dari views terbesar
      },
      where: {
        createdAt: {
          gte: lastMonth,
          lt: today,
        },
        isFeatured: true,
        postStatus: "PUBLISHED",
      },

      take: 3, // Ambil 5 teratas saja
      include: {
        user: {
          select: {
            name: true, // Ambil hanya nama user
          },
        },
        cat: {
          select: {
            title: true, // Ambil hanya nama user
            slug: true,
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(popular), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
