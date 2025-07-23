import { NextResponse } from "next/server";
import prisma from "@/utils/connect";
//perbaiki halaman ini.
export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { title: "asc" },
    });

    return NextResponse.json(categories);
  } catch (err) {
    console.error("Kategori fetch error:", err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
