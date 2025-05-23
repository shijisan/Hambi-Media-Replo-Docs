// types/next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import type { Documentation } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string,
      role?: "USER" | "ADMIN";
    };
  }

  interface User extends DefaultUser {
    id: string,
    role?: "USER" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string,
    role?: "USER" | "ADMIN";
  }
}
