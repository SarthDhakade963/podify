import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id?: string | null;
      email?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string | null;
    accessToken?: string;
  }
}

export interface User {
  id?: string;
  email?: string | null;
  accessToken?: string;
}
