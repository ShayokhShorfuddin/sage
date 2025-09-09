"use server";

import { renderToStream } from "@react-pdf/renderer";
import logger from "@/logger";
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
      data: string; // base64 encoded PDF
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
  // We need to get the chatHistory
  console.log("Started generating PDF");
  const response = await GetChatHistoryAction(routeId);
  console.log("Got Response from GetChatHistoryAction");

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

  console.log("generated pdf : ", buffer.toString("base64"));

  return {
    success: true,
    data: `data:application/pdf;base64,${buffer.toString("base64")}`,
  };
}

// import { renderToStream } from "@react-pdf/renderer"; */}
// import darklogo from "@/lib/darklogo";
// import type { NoChatHistory } from "@/types/interview-types";
// import PdfStructure from "../home/history/_components/PDFStructure";
// import { GetChatHistoryAction } from "./interview";
// import { generateQrcode } from "./qrcode-generation";
// // Return type for PdfGenerationAction
// type TypePdfGenerationAction =
//   | {
//       success: false;
//       data: NoChatHistory;
//     }
//   | {
//       success: true;
//       data: string; // base64 encoded PDF
//     };
// async function PdfGenerationAction({
// date,
// candidate,
// interviewer,
// absoluteUrl,
// routeId,
// }: {
// date: string;
// candidate: string;
// interviewer: string;
// absoluteUrl: string;
// routeId: string;
// }): Promise<TypePdfGenerationAction> {
//   // We need to get the chatHistory
//   console.log("Started generating PDF");
//   const response = await GetChatHistoryAction(routeId);
//   console.log("Got Response from GetChatHistoryAction");
//   if (!response.success) {
//     return {
//       success: false,
//       data: {
//         reason: "no_chat_history",
//         error: response.data.error,
//       },
//     };
//   }
//   const chatHistory = response.data.chatHistory;
//   const conversationForPdf = chatHistory.map((message) => ({
//     role: message.role,
//     text: message.parts[0].text,
//   }));
//   const darkLogoBuffer = Buffer.from(darklogo, "base64");
//   const qrcodeSource = await generateQrcode({ text: absoluteUrl });
//   const testing = [
//     {
//       role: "model",
//       text: "Hello. I'm doing well, thank you. Welcome. My name is Milton Anderson, and I'm a Senior Frontend Engineer here at NVIDIA. I'll be conyour technical interview today. We'll spend about the next hour or so discussing your experidiving into some technical concepts across the frontend landscape, and working through a ccoding problems. To start, could you please tell me a bit about yourself and your experience as a Frontend De",
//     },
//     {
//       role: "model",
//       text: "Hello. I'm doing well, thank you. Welcome. My name is Milton Anderson, and I'm a Senior Frontend Engineer here at NVIDIA. I'll be conyour technical interview today. We'll spend about the next hour or so discussing your experidiving into some technical concepts across the frontend landscape, and working through a ccoding problems. To start, could you please tell me a bit about yourself and your experience as a Frontend De",
//     },
//     {
//       role: "model",
//       text: "Hello. I'm doing well, thank you. Welcome. My name is Milton Anderson, and I'm a Senior Frontend Engineer here at NVIDIA. I'll be conyour technical interview today. We'll spend about the next hour or so discussing your experidiving into some technical concepts across the frontend landscape, and working through a ccoding problems. To start, could you please tell me a bit about yourself and your experience as a Frontend De",
//     },
//   ];
//   console.log("Generating PDF stream...");
//   const stream = await renderToStream(
//     <PdfStructure
// interviewer={interviewer}
// date={date}
// candidate={candidate}
// logoBuffer={darkLogoBuffer}
// qrcodeSrc={qrcodeSource}
// // conversation={conversationForPdf}
// conversation={testing}
//     />,
//   );
//   console.log("Chunking...");
// /* Convert Node stream → Uint8Array */
// const chunks: Buffer[] = [];
// for await (const chunk of stream) chunks.push(Buffer.from(chunk));
// const buffer = Buffer.concat(chunks);
// /* Return base64 so the action stays serialisable */
// return { success: true, data: buffer.toString("base64") };
// }
// export { PdfGenerationAction }; */}
