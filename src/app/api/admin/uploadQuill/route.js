import { NextResponse } from "next/server";
//import imagekit from "@/lib/imagekit"; // pastikan sudah disiapkan
export const dynamic = "force-dynamic";
import ImageKit from "imagekit";

export async function POST(req) {
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
  });

  if (!process.env.IMAGEKIT_PUBLIC_KEY) {
    console.warn("⚠️ IMAGEKIT_PUBLIC_KEY not set!");
    return new NextResponse(JSON.stringify({ error: "Missing config" }), {
      status: 500,
    });
  }
  try {
    // 1. Terima formData
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    // 2. Baca file sebagai Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Upload ke ImageKit
    const result = await imagekit.upload({
      file: buffer, // langsung buffer binary
      fileName: file.name,
      folder: "/quill-uploads", // opsional
    });

    // 4. Return URL ke frontend
    return NextResponse.json({ url: result.url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
