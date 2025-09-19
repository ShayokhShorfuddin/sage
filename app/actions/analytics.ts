'use server';

import client from '@/lib/db';
import type { CouldNotConnectToDb } from '@/types/interview-types';

type TypeGetHiredAndRejectedCounts =
  | {
      success: false;
      data: CouldNotConnectToDb;
    }
  | {
      success: true;
      data: {
        totalHires: number;
        totalRejections: number;
      };
    };

// Get all data necessary for analytics
async function getAnalyticsData(): Promise<TypeGetAnalyticsData> {
  // Connect to MongoDB
  try {
    await client.connect();
  } catch {
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

  let totalInterviews: number;
  let pendingInterviews: number;
  let completedInterviews: number;
  let longestConversation: number;
  let shortestConversation: number;
  let totalHires: number;
  let totalRejections: number;

  try {
    // Total Interviews
    totalInterviews = await interviewsCollection.countDocuments();

    // Pending Interviews
    pendingInterviews = await interviewsCollection.countDocuments({
      isInterviewDone: false,
    });

    // Completed Interviews
    completedInterviews = await interviewsCollection.countDocuments({
      isInterviewDone: true,
    });

    // Longest Conversation
    const longestInterview = await interviewsCollection
      .aggregate([
        {
          $project: {
            chatHistoryLength: { $size: '$chatHistory' },
          },
        },
        { $sort: { chatHistoryLength: -1 } },
        { $limit: 1 },
      ])
      .toArray();

    // If there are no interviews, set longestConversation to 0
    longestConversation =
      longestInterview.length > 0 ? longestInterview[0].chatHistoryLength : 0;

    // Shortest Conversation
    const shortestInterview = await interviewsCollection
      .aggregate([
        {
          $project: {
            chatHistoryLength: { $size: '$chatHistory' },
          },
        },
        { $sort: { chatHistoryLength: 1 } },
        { $limit: 1 },
      ])
      .toArray();

    // If there are no interviews, set shortestConversation to 0
    shortestConversation =
      shortestInterview.length > 0 ? shortestInterview[0].chatHistoryLength : 0;

    // Total Hires and Total Rejections
    const hireRejectionCounts = await getHiredAndRejectedCounts();

    if (hireRejectionCounts.success === false) {
      return {
        success: false,
        data: {
          reason: 'failed_to_fetch_analytics_data',
          error: 'Failed to fetch analytics data.',
        },
      };
    }

    totalHires = hireRejectionCounts.data.totalHires;
    totalRejections = hireRejectionCounts.data.totalRejections;
  } catch {
    return {
      success: false,
      data: {
        reason: 'failed_to_fetch_analytics_data',
        error: 'Failed to fetch analytics data.',
      },
    };
  }

  return {
    success: true,
    data: {
      totalInterviews,
      pendingInterviews,
      completedInterviews,
      longestConversation,
      shortestConversation,
      averageConversation: (longestConversation + shortestConversation) / 2,
      totalHires,
      totalRejections,
    },
  };
}

// Get all documents from the "reports" collection so that we can figure out how many hires and rejections there are
async function getHiredAndRejectedCounts(): Promise<TypeGetHiredAndRejectedCounts> {
  // Connect to MongoDB
  try {
    await client.connect();
  } catch {
    return {
      success: false,
      data: {
        reason: 'db_connection_failure',
        error: 'Failed to connect to database',
      },
    };
  }

  const database = client.db('Sage');

  const reportsCollection = database.collection('reports');

  const [totalHires, totalRejections] = await Promise.all([
    reportsCollection.countDocuments({ isHired: true }),
    reportsCollection.countDocuments({ isHired: false }),
  ]);

  return {
    success: true,
    data: {
      totalHires,
      totalRejections,
    },
  };
}

export type TypeGetAnalyticsData =
  | {
      success: false;
      data: { reason: string; error: string };
    }
  | {
      success: true;
      data: {
        totalInterviews: number;
        pendingInterviews: number;
        completedInterviews: number;
        longestConversation: number;
        shortestConversation: number;
        averageConversation: number;
        totalHires: number;
        totalRejections: number;
      };
    };

export { getAnalyticsData };
