import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "@/lib/jwt";
import { ConflictError, UnauthorizedError } from "@/lib/error";

export const authService = {
  async register({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name?: string;
  }) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      throw new ConflictError("Email is already registered", "EMAIL_EXISTS");

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, password: hashed, name },
    });

    return authService._issueTokens(user.id, user.email);
  },

  async login({ email, password }: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      throw new UnauthorizedError(
        "Invalid email or password",
        "INVALID_CREDENTIALS",
      );

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      throw new UnauthorizedError(
        "Invalid email or password",
        "INVALID_CREDENTIALS",
      );

    return authService._issueTokens(user.id, user.email);
  },

  async refresh(token: string) {
    if (!token)
      throw new UnauthorizedError(
        "No refresh token provided",
        "MISSING_REFRESH_TOKEN",
      );

    const payload = verifyRefreshToken(token);
    const stored = await prisma.refreshToken.findUnique({ where: { token } });
    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedError(
        "Refresh token is invalid",
        "INVALID_REFRESH_TOKEN",
      );
    }

    const accessToken = signAccessToken({
      userId: payload.userId,
      email: payload.email,
    });
    return { accessToken };
  },

  async logout(token: string) {
    if (token) {
      await prisma.refreshToken.deleteMany({ where: { token } });
    }
  },

  async _issueTokens(userId: string, email: string) {
    const accessToken = signAccessToken({ userId, email });
    const refreshToken = signRefreshToken({ userId, email });

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken, refreshToken };
  },
};
