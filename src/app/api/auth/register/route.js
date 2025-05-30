import connectMongo from "@/lib/mongodb";
import UserModel from "@/models/Users";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { email, password } = await req.json();

    if (!email && !password) {
      return NextResponse.json(
        { error: "email and password are required" },
        { status: 400 }
      );
    }

    await connectMongo();

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already registered!" },
        { status: 400 }
      );
    }

    await UserModel.create({
      email,
      password,
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "User register Failed" },
      { status: 500 }
    );
  }
}
