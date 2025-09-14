import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import getMongoDbClient from "./db";

const client = await getMongoDbClient();

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
});
