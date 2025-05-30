import connectMongo from "@/lib/mongodb";
import PlayerModel from "@/models/Player";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectMongo();

    const { id } = await params;

    const player = await PlayerModel.findById(id);

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    return NextResponse.json(player, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch player" },
      { status: 500 }
    );
  }
}
