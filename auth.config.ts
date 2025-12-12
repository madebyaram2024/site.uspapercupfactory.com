
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // Placeholder for email/pass if needed later
        Credentials({
            async authorize(credentials) {
                return null; // TODO: Implement if needed
            }
        })
    ],
    // pages: {
    //     signIn: "/auth/login",
    //     error: "/auth/error",
    // }
} satisfies NextAuthConfig;
