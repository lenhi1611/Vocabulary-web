import { handleError } from "@/lib/response";
import { Request, Response, NextFunction } from "express"
import { AppError } from "@/lib/error"

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return handleError(res, err.message, {
      statusCode: err.statusCode,
      code: err.code,
    });
  }

  if (err.constructor.name === "PrismaClientKnownRequestError") {
    const prismaErr = err as any;
    if (prismaErr.code === "P2002") {
      return handleError(res, "Data already exists", {
        statusCode: 409,
        code: "DUPLICATE_ENTRY",
      });
    }
    if (prismaErr.code === "P2025") {
      return handleError(res, "Data not found", {
        statusCode: 404,
        code: "NOT_FOUND",
      });
    }
  }

  console.error("Unexpected error:", err);
  return handleError(res, "An unexpected error occurred", {
    statusCode: 500,
    code: "INTERNAL_ERROR",
  });
}