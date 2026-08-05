import { verifyToken } from "@/lib/jwt";
import { NextRequest } from "next/server";

export const getUserFromRequest = async (request: NextRequest) => {
    const token = request.cookies.get("accessToken")?.value;
    if (!token) {
        return null;
    }
    try {
        return verifyToken(token);
    } catch {
        return null;
    }
}