import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const videos = await prisma.playerModel.findMany({
      orderBy: { goals: "desc" },
    });
    return NextResponse.json(videos);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error fetching videos" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
