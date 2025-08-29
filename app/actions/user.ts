"use server";

import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
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

  const existingUser = await usersCollection.findOne({ email });

  if (existingUser) {
    return { success: false, message: "User already exists." };
  }

  const hashedPassword = await hash(password, 11);

  await usersCollection.insertOne({
    name,
    email,
    hashedPassword,
  });

  client.close();

  return { success: true };
}

export { RegisterUserAction };
