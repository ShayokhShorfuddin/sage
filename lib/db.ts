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

  client = new MongoClient(process.env.MONGODB_URI as string);
  logger.info("Created new MongoClient instance.");

  try {
    await client.connect();
    logger.info("Connected to the newly created MongoDB client!");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
  }

  logger.info("Returning newly created & connected MongoDB client.");
  return client;
}
