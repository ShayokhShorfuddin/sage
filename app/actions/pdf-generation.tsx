"use server";

import { renderToStream } from "@react-pdf/renderer";
import getMongoDbClient from "@/lib/db";
import type { NoChatHistory } from "@/types/interview-types";
import PdfStructure from "../home/history/_components/PDFStructure";
import { GetChatHistoryAndCompletionAction } from "./interview";
import { generateQrcode } from "./qrcode-generation";

type TypePdfGenerationAction =
  | {
      success: false;
      data: NoChatHistory;
    }
  | {
      success: true;
      data: string;
    };

export default async function PdfGenerationAction({
  routeId,
  date,
  candidate,
  interviewer,
  absoluteUrl,
}: {
  routeId: string;
  date: string;
  candidate: string;
  interviewer: string;
  absoluteUrl: string;
}): Promise<TypePdfGenerationAction> {
  const response = await GetChatHistoryAndCompletionAction({ routeId });

  if (!response.success) {
    //   If we failed to get chat history, return error
    return {
      success: false,
      data: {
        reason: "no_chat_history",
        error: response.data.error,
      },
    };
  }

  // Getting employment status
  const isHired = await checkIfHired({ routeId });

  const chatHistory = response.data.chatHistory;

  //   Converting chat history to a format suitable for PDF
  const conversationForPdf = chatHistory.map((message) => ({
    role: message.role,
    text: message.parts[0].text,
  }));

  const qrcodeSource = await generateQrcode({ text: absoluteUrl });

  const stream = await renderToStream(
    <PdfStructure
      date={date}
      isHired={isHired}
      candidate={candidate}
      qrcodeSrc={qrcodeSource}
      interviewer={interviewer}
      conversation={conversationForPdf}
    />,
  );

  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  const buffer = Buffer.concat(chunks);

  return {
    success: true,
    data: `data:application/pdf;base64,${buffer.toString("base64")}`,
  };
}

// Check if the user has been hired or not
async function checkIfHired({
  routeId,
}: {
  routeId: string;
}): Promise<true | false | "pending"> {
  // Connect to MongoDB
  const client = await getMongoDbClient();
  const database = client.db("Sage");
  const reportsCollection = database.collection("reports");

  const interviewData = await reportsCollection.findOne({
    uniqueId: routeId,
  });

  // Closing the connection
  await client.close();

  // Report not found / no report generated for this interview
  if (!interviewData) {
    return "pending";
  }

  return interviewData.isHired;
}
