'use server';

import {
  GoogleGenerativeAI,
  type Schema,
  SchemaType,
} from '@google/generative-ai';
import getMongoDbClient from '@/lib/db';
import logger from '@/logger';
import { GetChatHistoryAndCompletionAction } from './interview';

async function ReportGenerationAction({
  routeId,
}: {
  routeId: string;
}): Promise<TypeReportResponse> {
  // First we check if report for this routeId already exists in DB
  // If so, we will return that instead of generating a new one

  const reportExists = await checkIfReportExists({ routeId });

  // Return existing report from DB
  if (reportExists.success) {
    return {
      success: true,
      data: {
        isHired: reportExists.data.isHired,
        reasonForNoHire: reportExists.data.reasonForNoHire,
        knowledgeScore: reportExists.data.knowledgeScore,
        communicationScore: reportExists.data.communicationScore,
        codeQualityScore: reportExists.data.codeQualityScore,
      },
    };
  }

  // If report doesn't exist, we will first check if that interview exists or not
  const response = await GetChatHistoryAndCompletionAction({ routeId });

  // Interview doesn't exist
  if (!response.success) {
    return {
      success: false,
      data: {
        reason: response.data.reason,
        error: response.data.error,
      },
    };
  }

  // If Interview exists, we need to see if that interview has been completed or not
  if (!response.data.isInterviewDone) {
    return {
      success: false,
      data: {
        reason: 'unfinished_interview',
        error: 'Finish the interview first to generate report.',
      },
    };
  }

  // At this point, we know that interview exists and is completed

  // Generate a new report
  const chatHistory = response.data.chatHistory
    .map((msg) => {
      return `${msg.role}: ${msg.parts[0].text}`;
    })
    .join('\n');

  const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

  const model = genAi.getGenerativeModel({
    model: 'gemini-2.5-pro',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: ReportGenerationSchema,
    },
  });

  let geminiJsonReply: {
    isHired: boolean;
    reasonForNoHire: string;
    knowledgeScore: number;
    communicationScore: number;
    codeQualityScore: number;
  };

  try {
    const response = await model.generateContent(
      ReportGenerationSystemPrompt({ chatHistory }),
    );

    geminiJsonReply = JSON.parse(response.response.text());

    logger.info(
      `Gemini reporting generation: ${JSON.stringify(geminiJsonReply)}`,
    );
  } catch {
    return {
      success: false,
      data: {
        reason: 'gemini_response_failure',
        error: 'Failed to generate response from Gemini',
      },
    };
  }

  // Connect to MongoDB
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
  const reportsCollection = database.collection('reports');

  // Saving to response to database
  await reportsCollection.insertOne({
    uniqueId: routeId,
    isHired: geminiJsonReply.isHired,
    reasonForNoHire: geminiJsonReply.reasonForNoHire,
    knowledgeScore: geminiJsonReply.knowledgeScore,
    communicationScore: geminiJsonReply.communicationScore,
    codeQualityScore: geminiJsonReply.codeQualityScore,
  });

  // Close the MongoDB client connection
  await client.client.close();

  return {
    success: true,
    data: {
      isHired: geminiJsonReply.isHired,
      reasonForNoHire: geminiJsonReply.reasonForNoHire,
      knowledgeScore: geminiJsonReply.knowledgeScore,
      communicationScore: geminiJsonReply.communicationScore,
      codeQualityScore: geminiJsonReply.codeQualityScore,
    },
  };
}

async function checkIfReportExists({
  routeId,
}: {
  routeId: string;
}): Promise<TypeReportResponse> {
  //   Connect to MongoDB
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
  const reportsCollection = database.collection('reports');

  const reportData = await reportsCollection.findOne({
    uniqueId: routeId,
  });

  // Close the connection
  await client.client.close();

  if (!reportData) {
    return {
      success: false,
      data: { reason: 'no_report_found', error: "Couldn't find report" },
    };
  }

  return {
    success: true,
    data: {
      isHired: reportData.isHired,
      reasonForNoHire: reportData.reasonForNoHire,
      knowledgeScore: reportData.knowledgeScore,
      communicationScore: reportData.communicationScore,
      codeQualityScore: reportData.codeQualityScore,
    },
  };
}

function ReportGenerationSystemPrompt({
  chatHistory,
}: {
  chatHistory: string;
}) {
  return `
Below is the full interview conversation.
Evaluate the candidate according to the instructions you received.

-----
${chatHistory}
-----

## CANDIDATE EVALUATION CRITERIA

1. **Final Performance Score out of 100**
2. **Final Hiring Decision:** Hire if final performance is 90 or above out of 100, otherwise no hire
3. **If NO HIRE:** Specific reasons and what the candidate needs to improve before reapplying
`;
}

const ReportGenerationSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    isHired: {
      type: SchemaType.BOOLEAN,
      description:
        'Whether the candidate is hired or not. If final performance is 90 or above out of 100, then true, otherwise false',
    },

    reasonForNoHire: {
      type: SchemaType.STRING,
      description:
        'If the candidate is not hired, provide specific reasons and what the candidate needs to improve before reapplying. If the candidate is hired, this should be an empty string',
    },

    finalScore: {
      type: SchemaType.NUMBER,
      description: 'Final performance score out of 100',
    },

    knowledgeScore: {
      type: SchemaType.NUMBER,
      description: 'Score out of 10 for technical knowledge',
    },

    communicationScore: {
      type: SchemaType.NUMBER,
      description: 'Score out of 10 for communication skills',
    },

    codeQualityScore: {
      type: SchemaType.NUMBER,
      description: 'Score out of 10 for their quality of code',
    },
  },

  required: [
    'isHired',
    'finalScore',
    'knowledgeScore',
    'reasonForNoHire',
    'codeQualityScore',
    'communicationScore',
  ],
};

export type TypeReportResponse =
  | {
      success: false;
      data: { reason: string; error: string };
    }
  | {
      success: true;
      data: {
        isHired: boolean;
        reasonForNoHire: string;
        knowledgeScore: number;
        communicationScore: number;
        codeQualityScore: number;
      };
    };

export { ReportGenerationAction };
