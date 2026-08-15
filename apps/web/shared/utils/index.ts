import axios from "axios";

export function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error?.message ?? fallback;
  }
  return fallback;
}

export function getInitials(value: string): string {
  const parts = value.trim().split(/\s+/);
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return value.slice(0, 2).toUpperCase();
}