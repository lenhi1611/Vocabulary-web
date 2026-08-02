import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { signToken, verifyRefreshToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token is required" },
        { status: 400 },
      );
    }

    const payload = verifyRefreshToken(refreshToken);
    // find the refresh token in the database
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!storedToken) {
      return NextResponse.json(
        { message: "Invalid refresh token" },
        { status: 401 },
      );
    }

    // check if the refresh token has expired
    if (storedToken.expiresAt < new Date()) {
      return NextResponse.json(
        { message: "Refresh token has expired" },
        { status: 401 },
      );
    }

    // generate a new access token
    const newAccessToken = signToken({
      userId: payload.userId,
      email: payload.email,
    });

    // return the new access token
    const response = NextResponse.json(
      { message: "Token refreshed successfully", token: newAccessToken },
      { status: 200 },
    );
    response.cookies.set("token", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
