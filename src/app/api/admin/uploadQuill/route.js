import { NextResponse } from "next/server";
import imagekit from "@/lib/imagekit"; // pastikan sudah disiapkan

export async function POST(req) {
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
