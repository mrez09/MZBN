import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import { getAuthSession } from "@/utils/auth";
export const dynamic = "force-dynamic";
//import { getUploadAuthParams } from "@imagekit/next/server"

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const cat = searchParams.get("cat");
  const POST_PER_PAGE = 5;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      postStatus: "PUBLISHED",
      ...(cat && { catSlug: cat }),
    },
    orderBy: {
      createdAt: "desc",
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);

    return new NextResponse(JSON.stringify({ posts, count }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

//Create a Post Bro

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC,
  privateKey: process.env.IMAGEKIT_PRIVATE,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// CREATE A POST
export const POST = async (req) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
      status: 401,
    });
  }

  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const desc = formData.get("desc");
    const slug = formData.get("slug");
    const catSlug = formData.get("catSlug");
    const isFeaturedRaw = formData.get("isFeatured");
    const isFeatured = isFeaturedRaw === "true";
    const createdAt = formData.get("createdAt");
    const postStatus = formData.get("postStatus");
    const imageUrl = formData.get("imageUrl");

    // Debugging - log semua isi
    console.log("🔎 Form Data:", {
      title,
      desc,
      slug,
      catSlug,
      isFeatured,
      createdAt,
      postStatus,
      imageUrl,
      userEmail: session.user?.email,
    });

    // Validasi minimal
    if (
      !title ||
      !desc ||
      !slug ||
      !catSlug ||
      !createdAt ||
      !imageUrl ||
      !postStatus
    ) {
      return new NextResponse(JSON.stringify({ message: "Field is missing" }), {
        status: 400,
      });
    }

    const post = await prisma.post.create({
      data: {
        title,
        desc,
        slug,
        catSlug,
        isFeatured,
        createdAt: new Date(createdAt),
        postStatus,
        image: imageUrl,
        userEmail: session.user.email,
      },
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.error("❌ POST ERROR:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!", error: err.message }),
      { status: 500 }
    );
  }
};
