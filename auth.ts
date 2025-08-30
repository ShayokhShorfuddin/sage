import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile) {
        // return profile.email_verified && profile.email.endsWith("@example.com");
        // TODO: Retain data into server and handle rest of the logic
        console.log(profile.name, profile.email, profile.email_verified);
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },

  pages: {
    signIn: "/login",
  },
});
