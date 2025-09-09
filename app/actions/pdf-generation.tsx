"use server";

import { renderToStream } from "@react-pdf/renderer";
import type { NoChatHistory } from "@/types/interview-types";
import PdfStructure from "../home/history/_components/PDFStructure";
import { GetChatHistoryAction } from "./interview";
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
  const response = await GetChatHistoryAction(routeId);

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

  const chatHistory = response.data.chatHistory;

  //   Converting chat history to a format suitable for PDF
  const conversationForPdf = chatHistory.map((message) => ({
    role: message.role,
    text: message.parts[0].text,
  }));

  const qrcodeSource = await generateQrcode({ text: absoluteUrl });

  const stream = await renderToStream(
    <PdfStructure
      interviewer={interviewer}
      date={date}
      candidate={candidate}
      qrcodeSrc={qrcodeSource}
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
