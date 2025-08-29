import { MongoClient } from "mongodb";
import logger from "@/logging/logger";

// Empty instance, for now
let client: MongoClient | null = null;

export default async function getMongoDbClient(): Promise<MongoClient> {
  // A client already exists
  if (client) {
    logger.info("A MongoDB client already exists. Reusing it.");
    return client;
  }

  try {
    client = new MongoClient(process.env.MONGODB_URI as string);
    logger.info("Created new MongoClient instance.");
  } catch {
    logger.error("Failed to create MongoDB client.");
    throw new Error("Failed to create MongoDB client");
  }

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
