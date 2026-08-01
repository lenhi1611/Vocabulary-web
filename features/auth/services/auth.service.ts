import { SignInValues } from "../schemas/signIn.schema";
import { SignUpValues } from "../schemas/signUp.schema";
import { AuthResult } from "../types/auth";

export const authService = {
  async signIn({ email }: SignInValues): Promise<AuthResult> {
    return {
      user: { email },
      message: `Welcome back, ${email}! This demo login form is ready for your auth flow.`,
    };
  },

  async signUp({ email, fullName }: SignUpValues): Promise<AuthResult> {
    return {
      user: { email, fullName },
      message: `Thanks, ${fullName}! Your account is ready.`,
    };
  },
};
