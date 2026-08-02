
import jwt from "jsonwebtoken";

const rawSecret = process.env.JWT_SECRET;

const rawRefreshSecret = process.env.JWT_REFRESH_SECRET;

if (!rawSecret) {
    throw new Error("JWT_SECRET environment variable is not set");
}

const JWT_SECRET: string = rawSecret;

if (!rawRefreshSecret) {
    throw new Error("JWT_REFRESH_SECRET environment variable is not set");
}

const JWT_REFRESH_SECRET: string = rawRefreshSecret;

export type JwtPayload = {
    userId: string;
    email: string;
}

export function signToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
}

export function signRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload
}

export function verifyRefreshToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload
}