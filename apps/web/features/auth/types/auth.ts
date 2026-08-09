export type AuthUser = {
  email: string;
  fullName?: string;
};

export type AuthResult = {
  user: AuthUser;
  message: string;
};
