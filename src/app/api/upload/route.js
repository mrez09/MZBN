import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC,
  privateKey: process.env.IMAGEKIT_PRIVATE,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const POST = async (req) => {
  const data = await req.formData();
  const file = data.get("file");
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");

  try {
    const res = await imagekit.upload({
      file: `data:${file.type};base64,${base64}`,
      fileName: file.name,
    });

    return NextResponse.json({ url: res.url });
  } catch (err) {
    console.error("Upload error:", err.message);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
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
