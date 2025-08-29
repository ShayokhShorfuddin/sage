"use server";

import { hash } from "bcryptjs";
import getMongoDbClient from "@/lib/db";

type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
};

// Register a new user
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
    return { success: false, message: "User already exists." };
  }

  // Generate a hashed password
  const hashedPassword = await hash(password, 11);

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

export { RegisterUserAction };
