import axios from "axios";

export function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error?.message ?? fallback;
  }
  return fallback;
}