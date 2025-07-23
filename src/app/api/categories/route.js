import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const GET = async () => {
  const skip = Math.floor(1);
  try {
    const categories = await prisma.category.findMany({
      take: 6, // Ambil 6 teratas saja
      orderBy: {
        id: "desc", // Urutkan dari views terbesar
      },
    });
    const shuffled = categories.sort(() => 0.5 - Math.random());
    const categoriesacak = shuffled.slice(0, 6);

    return new NextResponse(JSON.stringify(categoriesacak), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
