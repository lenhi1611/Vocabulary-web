import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get("refreshToken")?.value;
    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token is required" },
        { status: 400 },
      );
    }

    // delete the refresh token from the database
    await prisma.refreshToken.delete({
      where: { token: refreshToken },
    });

    // clear the cookies
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 },
    );
    response.cookies.delete("token");
    response.cookies.delete("refreshToken");

    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
