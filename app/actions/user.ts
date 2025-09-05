"use server";

import { compare, hash } from "bcryptjs";
import { signIn, signOut } from "@/auth";
import getMongoDbClient from "@/lib/db";
import logger from "@/logger";

type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
};

type LoginUserInput = {
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

  await signOut({
    redirectTo: "/",
  });
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

// Login user with email and password
async function LoginUserAction({ email, password }: LoginUserInput) {
  const client = await getMongoDbClient();
  const database = client.db("Sage");
  const usersCollection = database.collection("users");

  // Find the user by email
  const user = await usersCollection.findOne({ email });

  if (!user) {
    return {
      success: false,
      reason: "user_not_found",
      message: "User not found.",
    };
  }

  // If the user registered using Google auth, there is no password stored in the database. So user.hashedPassword will be undefined. We will prompt the user to login with Google instead.
  if (!user.hashedPassword) {
    return {
      success: false,
      reason: "google_auth_required",
      message: "Please login with Google.",
    };
  }

  // Verify the password
  const isValidPassword = await compare(password, user.hashedPassword);

  if (!isValidPassword) {
    return {
      success: false,
      reason: "invalid_password",
      message: "Invalid password.",
    };
  }

  // Close the MongoDB client connection
  client.close();

  return { success: true };
}

export {
  RegisterUserAction,
  GoogleAuthAction,
  LogoutUserAction,
  LoginUserAction,
};
