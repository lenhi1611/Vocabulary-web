import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@/lib/jwt";
import { handleError } from "@/lib/response";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.access_token;
  if (!token) {
    handleError(res, "Access token is missing", {
      statusCode: 401,
      code: "MISSING_TOKEN",
    });
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch {
    handleError(res, "Invalid token", {
      statusCode: 401,
      code: "INVALID_TOKEN",
    });
  }
}
