import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { signToken, signRefreshToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const { email, fullName, password } = await request.json();
    console.log("Received registration data:", { email, fullName, password }); // Log the received data for debugging
    //check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        name: fullName,
        password: hashedPassword,
      },
    });

    // auto login after registration
    const payload = { userId: user.id, email: user.email };
    const token = signToken(payload);
    const refreshToken = signRefreshToken(payload);
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      },
    });

    // save token in cookie or return it in response
    const response = NextResponse.json(
      { message: "User created successfully", userId: user.id, token },
      { status: 201 },
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
