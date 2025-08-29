import { MongoClient } from "mongodb";
import logger from "@/logger";

export default async function getMongoDbClient(): Promise<MongoClient> {
  /**
   * Creates a new MongoDB client, connects to it and returns it
   */
  const client = new MongoClient(process.env.MONGODB_URI as string);
  logger.info("Created new MongoClient instance.");

  try {
    await client.connect();
    logger.info("Connected to the newly created MongoDB client!");
  } catch {
    logger.error("Failed to connect to MongoDB.");
    throw new Error("Failed to connect to MongoDB");
  }

  logger.info("Returning newly created & connected MongoDB client.");

  return client;
}
