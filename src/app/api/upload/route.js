import { NextResponse } from "next/server";
//import ImageKit from "imagekit";
import imagekit from "@/lib/imagekit";
export const dynamic = "force-dynamic";

//const imagekit = new ImageKit({
//  publicKey: process.env.IMAGEKIT_PUBLIC,
//  privateKey: process.env.IMAGEKIT_PRIVATE,
//  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
//});

export const POST = async (req) => {
  const data = await req.formData();
  const file = data.get("file");
  const oldFileId = data.get("oldFileId");

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();

  try {
    // ✅ Hapus gambar lama jika ada
    if (oldFileId) {
      try {
        await imagekit.deleteFile(oldFileId);
      } catch (err) {
        console.warn("Gagal hapus file lama:", err.message);
      }
    }

    // ✅ Upload file (pakai buffer langsung)
    const uploadRes = await imagekit.upload({
      file: Buffer.from(buffer), // ⬅️ ini pakai buffer langsung, bukan base64
      fileName: file.name,
    });

    return NextResponse.json({
      url: uploadRes.url,
      fileId: uploadRes.fileId,
    });
  } catch (err) {
    console.error("Upload gagal:", err.message);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
};
// PUT: Update post dari aichan
export const PUT = async (req, { params }) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse("Not authenticated", { status: 401 });
  }

  const data = await req.formData();

  const image = data.get("image");
  const imageFileId = data.get("imageFileId");
  const oldImageFileId = data.get("oldImageFileId");

  // ✅ Hapus gambar lama jika berbeda
  if (oldImageFileId && imageFileId && oldImageFileId !== imageFileId) {
    try {
      await imagekit.deleteFile(oldImageFileId);
    } catch (err) {
      console.error("Gagal hapus gambar lama:", err.message);
    }
  }

  try {
    const updatedPost = await prisma.post.update({
      where: { slug: params.slug },
      data: {
        title: data.get("title"),
        desc: data.get("desc"),
        catSlug: data.get("catSlug"),
        isFeatured: data.get("isFeatured") === "true",
        createdAt: new Date(data.get("createdAt")),
        image,
        imageFileId,
      },
    });

    return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
  } catch (err) {
    console.error("Update error:", err);
    return new NextResponse("Update failed", { status: 500 });
  }
};
