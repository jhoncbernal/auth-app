import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      emailVerified?: boolean | null;
      phone?: string | null;
      id?: string | null;
      emailVerified?: Date | null
      permissions?: string[] | null;
    } & DefaultSession["user"];
  }
}
