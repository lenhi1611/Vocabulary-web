import { api } from "@/lib/axios";
import { SignInValues } from "../schemas/signIn.schema";
import { SignUpValues } from "../schemas/signUp.schema";
import { AuthResult } from "../types/auth";

export const authService = {
  async signIn({ email, password }: SignInValues): Promise<AuthResult> {
    return api.post("/auth/login", { email, password }).then((response) => {
      console.log("Response from signIn:", response.data); // Log the response data for debugging
      return response.data as AuthResult;
    });
  },

  async signUp({
    email,
    fullName,
    password,
  }: SignUpValues): Promise<AuthResult> {
    return api
      .post("/auth/register", { email, fullName, password })
      .then((response) => {
        console.log("Response from signUp:", response.data); // Log the response data for debugging
        return response.data as AuthResult;
      });
  },

  async refreshToken(): Promise<AuthResult> {
    return api.post("/auth/refresh").then((response) => {
      console.log("Response from refreshToken:", response.data); // Log the response data for debugging
      return response.data as AuthResult;
    });
  },

  async logout(): Promise<AuthResult> {
    return api.post("/auth/logout").then((response) => {
      console.log("Response from logout:", response.data); // Log the response data for debugging
      return response.data as AuthResult;
    });
  },
};
