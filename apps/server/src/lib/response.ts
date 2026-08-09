import { Response } from "express";

type SuccessResponse<T> = {
  success: true;
  message?: string;
  data: T;
};

type ErrorResponse = {
  success: false;
  error: {
    message: string;
    code?: string;
  };
};

export const handleSuccessResponse = <T>(
  res: Response,
  data: T,
  options?: { statusCode?: number; message?: string },
): Response => {
  const response: SuccessResponse<T> = {
    success: true,
    ...(options?.message ? { message: options.message } : {}),
    data,
  };

  return res.status(options?.statusCode || 200).json(response);
};

export const handleError = (
  res: Response,
  error: string,
  options?: { statusCode?: number; code?: string },
) => {
  const response: ErrorResponse = {
    success: false,
    error: {
      message: error,
      code: options?.code || "INTERNAL_SERVER_ERROR",
    },
  };

  return res.status(options?.statusCode || 500).json(response);
};
