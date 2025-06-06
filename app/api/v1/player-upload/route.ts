/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDIANRY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

// interface CloudinaryUploadResult {
//     public_id: string;
//     [key: string]: any
// }

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("avatar") as File | null;
    const playerName = formData.get("playerName") as string;
    const mobileNumber = formData.get("mobileNumber") as string;
    const position = formData.get("position") as string;
    const number = formData.get("number") as string;

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "hk-football" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as any);
        }
      );
      uploadStream.end(buffer);
    });

    const player = await prisma.playerModel.create({
      data: {
        playerName,
        number,
        avatar: result.secure_url,
        position,
        mobileNumber,
      },
    });

    return NextResponse.json(player);
  } catch (error) {
    console.log("UPload image failed", error);
    return NextResponse.json({ error: "Upload image failed" }, { status: 500 });
  }
}
