import connectMongo from "@/lib/mongodb";
import MatchModel from "@/models/Match";
import PlayerModel from "@/models/Player";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      oponentTeamName,
      oponentTeamGoals,
      homeTeamGoals,
      players,
      scorers,
    } = await req.json();
    console.log(oponentTeamName);

    await connectMongo();

    // create match
    const match = await MatchModel.create({
      oponentTeamName,
      oponentTeamGoals,
      homeTeamGoals,
      players,
      scorers,
    });

    // played match increment
    await PlayerModel.updateMany({}, { $inc: { matches: 1 } });

    // increment goals for scorers
    for (const scorer of scorers || []) {
      await PlayerModel.findByIdAndUpdate(scorer.playerId, {
        $inc: { goals: scorer.goals },
      });
    }

    return NextResponse.json(
      { message: "Match created successfully" },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create match" },
      { status: 500 }
    );
  }
}
