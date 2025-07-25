import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";
export const dynamic = "force-dynamic";

//Single Post untuk post
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// PUT: Update post dari aichan
export const PUT = async (req, { params }) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse("Not authenticated", { status: 401 });
  }

  try {
    const body = await req.json();
    const image = body.image || null;
    const imageFileId = body.imageFileId || null;

    const updatedPost = await prisma.post.update({
      where: { slug: params.slug },
      data: {
        title: body.title,
        desc: body.desc,
        catSlug: body.catSlug,
        isFeatured: body.isFeatured,
        postStatus: body.postStatus,
        createdAt: new Date(body.createdAt),
        image: image,
        imageFileId: imageFileId,
      },
    });

    return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
  } catch (err) {
    console.error("PUT ERROR:", err);
    return new NextResponse("Update failed", { status: 500 });
  }
};
