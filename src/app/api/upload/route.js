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
