// lib/auth.ts

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";

export const {handlers, auth, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        async session({session, token}) {
            if (token?.id) {
                (session.user as any).id = token.id;
            }
            if (token?.role) {
                (session.user as any).role = token.role;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role;
            }
            return token;
        }
    }
});