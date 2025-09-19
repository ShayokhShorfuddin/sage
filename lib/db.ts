import { MongoClient } from 'mongodb';
import logger from '@/logger';

export default async function getMongoDbClient(): Promise<
  { success: true; client: MongoClient } | { success: false }
> {
  // Creates a new MongoDB client, connects to it and returns it
  const mongoClient = new MongoClient(process.env.MONGODB_URI as string);
  logger.info('Created new MongoClient instance.');

  try {
    await mongoClient.connect();
    logger.info('Connected to the newly created MongoDB client!');
  } catch {
    logger.error('Failed to connect to MongoDB.');
    return { success: false };
  }

  logger.info('Returning newly created & connected MongoDB client.');

  return { success: true, client: mongoClient };
}
