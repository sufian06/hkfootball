import connectMongo from "@/lib/mongodb";
import PlayerModel from "@/models/Player";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, position, jersyNumber } = await req.json();

    if (!name || !position || !jersyNumber) {
      return NextResponse.json(
        { error: "Name, position, jersyNumber is required" },
        { status: 400 }
      );
    }

    await connectMongo();

    await PlayerModel.create({ name, position, jersyNumber });

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
