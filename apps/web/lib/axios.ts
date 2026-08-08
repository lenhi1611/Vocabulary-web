
import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
export const api = axios.create({
  baseURL: `${baseURL}/api`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})