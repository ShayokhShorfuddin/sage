"use server";

import { hash } from "bcryptjs";
import { signIn, signOut } from "@/auth";
import getMongoDbClient from "@/lib/db";
import logger from "@/logger";

type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
};

// Register user through Google auth
async function GoogleAuthAction() {
  logger.info("Initiating GoogleAuthAction.");
  await signIn("google", { redirectTo: "/home" });
}

// Logout the user
async function LogoutUserAction() {
  logger.info("Logging out user.");
  await signOut();
}

// Register a new user using Credentials
async function RegisterUserAction({
  name,
  email,
  password,
}: RegisterUserInput) {
  const client = await getMongoDbClient();
  const database = client.db("Sage");
  const usersCollection = database.collection("users");

  // Check if the user already exists
  const existingUser = await usersCollection.findOne({ email });

  if (existingUser) {
    return {
      success: false,
      reason: "user_exists",
      message: "User already exists.",
    };
  }

  // Generate a hashed password
  const hashedPassword = await hash(password, 10);

  // Register the new user
  await usersCollection.insertOne({
    name,
    email,
    hashedPassword,
  });

  // Close the MongoDB client connection
  client.close();

  return { success: true };
}

export { RegisterUserAction, GoogleAuthAction, LogoutUserAction };
