/* import connectMongo from "@/lib/mongodb";
import PlayerModel from "@/models/Player";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Configuration
cloudinary.config({
  cloud_name: "sufian4se",
  api_key: "232387513623329",
  api_secret: "nxpaTsuEGwJZlIC8oOd8oXz5qnw", // Click 'View API Keys' above to copy your API secret
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const avatar = formData.get("avatar");
    const name = formData.get("name");
    const position = formData.get("position");
    const jersyNumber = formData.get("jersyNumber");

    if (!name || !position || !jersyNumber) {
      return NextResponse.json(
        { error: "Name, position, jersyNumber is required" },
        { status: 400 }
      );
    }

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

    await connectMongo();

    await PlayerModel.create({
      name,
      position,
      jersyNumber,
      avatar: result.secure_url,
    });

    return NextResponse.json(
      { message: "Player added successfully" },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add player" },
      { status: 500 }
    );
  }
} */

import connectMongo from "@/lib/mongodb";
import PlayerModel from "@/models/Player";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Cloudinary config
cloudinary.config({
  cloud_name: "sufian4se",
  api_key: "232387513623329",
  api_secret: "nxpaTsuEGwJZlIC8oOd8oXz5qnw",
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const avatar = formData.get("avatar");
    const coverImage = formData.get("coverImage"); // ← NEW
    const name = formData.get("name");
    const position = formData.get("position");
    const jersyNumber = formData.get("jersyNumber");

    if (!name || !position || !jersyNumber) {
      return NextResponse.json(
        { error: "Name, position, jersyNumber is required" },
        { status: 400 }
      );
    }

    // Helper to convert and upload an image to Cloudinary
    const uploadImage = async (file, folder) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "hkfootball" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });
    };

    const avatarResult = await uploadImage(avatar, "hkfootball/avatar");
    const coverResult = coverImage
      ? await uploadImage(coverImage, "hkfootball/cover")
      : null;

    await connectMongo();

    await PlayerModel.create({
      name,
      position,
      jersyNumber,
      avatar: avatarResult.secure_url,
      coverImage: coverResult?.secure_url || null, // ← Save the cover image
    });

    return NextResponse.json(
      { message: "Player added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to add player" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongo();
    const players = await PlayerModel.find();
    return NextResponse.json(players, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch players" },
      { status: 500 }
    );
  }
}
