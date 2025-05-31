import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: "sufian4se",
  api_key: "232387513623329",
  api_secret: "nxpaTsuEGwJZlIC8oOd8oXz5qnw",
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const avatar = formData.get("avatar");

    const bytes = await avatar.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "hkfootball" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    console.log(result);

    return NextResponse.json(
      { message: "Upload successful", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Image upload failed:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
