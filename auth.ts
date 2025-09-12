import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import getMongoDbClient from "./lib/db";

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
        const client = await getMongoDbClient();
        const database = client.db("Sage");
        const usersCollection = database.collection("users");

        // Check if the user already exists
        const existingUser = await usersCollection.findOne({
          email: profile.email,
        });

        // If user exists, it means they registered before and are just signing in
        if (existingUser) {
          // Close the MongoDB client connection
          await client.close();

          return true;
        }

        // If it's the user's first time signing in, create a new account
        await usersCollection.insertOne({
          name: profile.name,
          email: profile.email,
        });

        // Close the MongoDB client connection
        await client.close();

        return true;
      }

      // If anything above fails, we will deny the registration attempt
      return false;
    },

    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },

  pages: {
    signIn: "/login",
  },
});
