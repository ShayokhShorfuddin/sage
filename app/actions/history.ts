'use server';
import { captureException } from '@sentry/nextjs';
import type { Document } from 'mongodb';
import client from '@/lib/db';
import type { Success, TypePastInterviews } from '@/types/history-types';

// Grab the past interviews from the database
async function getPastInterviews({
  candidateEmail,
}: {
  candidateEmail: string;
}): Promise<TypePastInterviews> {
  // Connect to MongoDB
  try {
    await client.connect();
  } catch (error) {
    captureException(error);
    return {
      success: false,
      data: {
        reason: 'db_connection_failure',
        error: 'Failed to connect to database',
      },
    };
  }

  const database = client.db('Sage');
  const interviewsCollection = database.collection('interviews');

  let response: Document[];

  try {
    response = await interviewsCollection
      .aggregate([
        { $addFields: { messageCount: { $size: '$chatHistory' } } },

        { $match: { candidateEmail } },

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
    return {
      success: false,
      data: {
        reason: 'failed_to_fetch_past_interviews',
        error: 'Failed to fetch past interviews.',
      },
    };
  }
  // Closing the connection

  return {
    success: true,
    data: response as Success[],
  };
}

export { getPastInterviews };
