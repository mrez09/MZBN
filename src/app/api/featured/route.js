import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const featured = await prisma.post.aggregateRaw({
      pipeline: [
        {
          $match: {
            isFeatured: true,
          },
        },
        {
          $lookup: {
            from: "User",
            localField: "userEmail",
            foreignField: "email",
            as: "user",
          },
        },
        {
          $lookup: {
            from: "Category",
            localField: "catSlug",
            foreignField: "slug",
            as: "cat",
          },
        },
        { $unwind: "$user" },
        { $unwind: "$cat" },
        {
          $project: {
            title: 1,
            desc: 1,
            slug: 1,
            image: 1,
            views: 1,
            createdAt: 1,
            isFeatured: 1,
            "user.name": 1,
            "cat.title": 1,
          },
        },
        { $sample: { size: 1 } },
      ],
    });

    //uji tampil 30hari
    //console.log("LAST MONTH", lastMonth);
    //console.log("TODAY", today);
    //console.log("FEATURED RESULT", featured);

    return new NextResponse(JSON.stringify(featured), { status: 200 });
  } catch (err) {
    //uji tampil 30hari
    //console.error("Featured error:", err);
    //console.log("LAST MONTH", lastMonth);
    //console.log("TODAY", today);
    //console.log("FEATURED RESULT", featured);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
