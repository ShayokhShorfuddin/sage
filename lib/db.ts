import { MongoClient } from "mongodb";

// Empty instance, for now
let client: MongoClient | null = null;

export default async function getMongoDbClient(): Promise<MongoClient> {
  // A client already exists
  if (client) {
    // console.log("Reusing existing MongoDB client");
    return client;
  }

  client = new MongoClient(process.env.MONGODB_URI as string);

  try {
    await client.connect();
    // console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }

  //   console.log("Created new MongoDB client and returning it");
  return client;
}
