'use server';
import type { Document } from 'mongodb';
import getMongoDbClient from '@/lib/db';
import type { Success, TypePastInterviews } from '@/types/history-types';

// Grab the past interviews from the database
async function getPastInterviews(): Promise<TypePastInterviews> {
  // Connecting to MongoDB
  const client = await getMongoDbClient();
  if (client.success === false) {
    return {
      success: false,
      data: {
        reason: 'db_connection_failure',
        error: 'Failed to connect to database',
      },
    };
  }

  const database = client.client.db('Sage');
  const interviewsCollection = database.collection('interviews');

  let response: Document[];

  try {
    response = await interviewsCollection
      .aggregate([
        { $addFields: { messageCount: { $size: '$chatHistory' } } },

        // Latest interviews first
        { $sort: { interviewDate: -1 } },

        // 1. drop only the fields you don’t need
        { $unset: ['_id', 'chatHistory'] },

        // 2. rename / format the ones you keep
        {
          $project: {
            routeId: '$uniqueId',
            interviewer: '$interviewerName',
            conversationLength: '$messageCount',
            date: {
              $dateToString: { date: '$interviewDate', format: '%d %B, %Y' },
            },
          },
        },
      ])
      .toArray();
  } catch {
    // Close the MongoDB client connection
    await client.client.close();

    return {
      success: false,
      data: {
        reason: 'failed_to_fetch_past_interviews',
        error: 'Failed to fetch past interviews.',
      },
    };
  }

  // Closing the connection
  await client.client.close();

  return {
    success: true,
    data: response as Success[],
  };
}

export { getPastInterviews };
