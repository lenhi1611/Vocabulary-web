import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import { handleSuccessResponse } from "@/lib/response";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;
      const { accessToken, refreshToken } = await authService.register({
        email,
        password,
        name,
      });

      res.cookie("access_token", accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: 60 * 15 * 1000,
      });
      res.cookie("refresh_token", refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: 60 * 60 * 24 * 7 * 1000,
      });
      handleSuccessResponse(res, null, { message: "Registration successful" });
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await authService.login({
        email,
        password,
      });

      res.cookie("access_token", accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: 60 * 15 * 1000,
      });
      res.cookie("refresh_token", refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: 60 * 60 * 24 * 7 * 1000,
      });
      handleSuccessResponse(res, null, { message: "Login successful" });
    } catch (err) {
      next(err);
    }
  },

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.refresh_token;
      const { accessToken } = await authService.refresh(token);

      res.cookie("access_token", accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: 60 * 15 * 1000,
      });
      handleSuccessResponse(res, null, { message: "Token refreshed" });
    } catch (err) {
      next(err);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.refresh_token;
      await authService.logout(token);

      res.clearCookie("access_token");
      res.clearCookie("refresh_token");

      handleSuccessResponse(res, null, { message: "Logout successful" });
    } catch (err) {
      next(err);
    }
  },
};
