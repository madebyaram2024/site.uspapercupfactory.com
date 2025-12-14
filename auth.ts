
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/lib/db";

// const prisma = new PrismaClient(); // Removed local instance


export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                // @ts-expect-error Fixes type mismatch in library

                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await db.user.findUnique({
                where: { id: token.sub }
            });

            if (!existingUser) return token;
            token.role = existingUser.role;
            return token;
        }
    },
    ...authConfig,
    providers: [
        ...authConfig.providers.filter((p: any) => p.id !== "credentials"), // eslint-disable-line @typescript-eslint/no-explicit-any
        Credentials({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const email = credentials.email as string;
                const password = credentials.password as string;

                const user = await db.user.findUnique({
                    where: { email }
                });

                if (!user || !user.password) return null;

                const passwordsMatch = await bcrypt.compare(password, user.password);

                if (passwordsMatch) return user;

                return null;
            }
        })
    ]
});
