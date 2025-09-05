// "use server";

// import { redirect } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";
// import getMongoDbClient from "@/lib/db";
// import { GeminiClient } from "@/lib/gemini-client";

// // Generate unique route and redirect user
// async function createInterviewRouteAction({
//   interviewerName,
// }: {
//   interviewerName: "Milton Anderson" | "Alice Bennett";
// }) {
//   console.log("Creating interview route for:", interviewerName);
//   // Generate unique ID for the interview session
//   const time = Date.now();
//   const uniqueId = uuidv4();
//   const finalUniqueId = uniqueId + time;

//   // Connecting to MongoDB
//   const client = await getMongoDbClient();
//   const database = client.db("Sage");
//   const interviewsCollection = database.collection("interviews");

//   // Creating a new interview session
//   await interviewsCollection.insertOne({
//     uniqueId: finalUniqueId,
//     interviewerName,
//     // Since a fresh new interview session is being created, we will initialize the chat history as an empty array.
//     chatHistory: [],
//     interviewDate: new Date(),
//   });

//   // Close the database connection
//   await client.close();

//   redirect(`/home/interview/${finalUniqueId}`);
// }

// // Get chat history for a specific route
// async function GetChatHistoryAction(routeId: string) {
//   const client = await getMongoDbClient();
//   const database = client.db("Sage");
//   const interviewsCollection = database.collection("interviews");

//   const interviewData = await interviewsCollection.findOne({
//     uniqueId: routeId,
//   });

//   // Close connection
//   client.close();

//   if (!interviewData) {
//     return {
//       success: false,
//       reason: "no_interview_data",
//       error: "Unable to find interview data.",
//     };
//   }

//   // Return the chat history;
//   return {
//     success: true,
//     data: {
//       chatHistory: interviewData.chatHistory,
//     },
//   };
// }

// // Send a message to Gemini!
// async function SendMessageToGeminiAction({
//   routeId,
//   message,
// }: {
//   routeId: string;
//   message: string;
// }) {
//   // Get Gemini client instance for the specific route
//   const gemini = await GeminiClient.getInstance({ currentRouteId: routeId });

//   // We would like to get the chatHistory for the specific route
//   // First of all, let's get the conversation data for this interview through dynamic route id
//   const client = await getMongoDbClient();
//   const database = client.db("Sage");
//   const interviewsCollection = database.collection("interviews");

//   const interviewData = await interviewsCollection.findOne({
//     uniqueId: routeId,
//   });

//   if (!interviewData) {
//     return {
//       success: false,
//       reason: "no_interview_data",
//       error: "Unable to find interview data.",
//     };
//   }

//   // Get the chat history
//   const chatHistory = interviewData.chatHistory;

//   const chat = ;

//   // Close mongoDB connection
//   await client.close();
// }

// // Start a fresh new interview
// // async function GetInterviewDataAction({
// //   routeId,
// // }: {
// //   routeId: string;
// // }): Promise<InterviewSuccess | InterviewFailure> {
// //   // First of all, let's get the conversation data for this interview through dynamic route id
// //   const client = await getMongoDbClient();
// //   const database = client.db("Sage");
// //   const interviewsCollection = database.collection("interviews");

// //   const interviewData = await interviewsCollection.findOne({
// //     uniqueId: routeId,
// //   });

// if (!interviewData) {
//   return {
//     success: false,
//     reason: "no_interview_data",
//     error: "Unable to find interview data.",
//   };
// }

// // Get the interviewer name and chat history
// const interviewerName = interviewData.interviewerName;
// const chatHistory = interviewData.chatHistory;

// //   // But if chatHistory is not empty, we will simply return the existing chat history to the frontend.
// //   if (chatHistory.length > 0) {
// //     return {
// //       success: true,
// //       data: {
// //         interviewerName: interviewerName,
// //         chatHistory: chatHistory,
// //       },
// //     };
// //   }

// //   // If it's a totally new fresh interview, we will start the interview by providing our model with the interviewer role-play prompt, let it generate a response, store that response inside MongoDB chatHistory for that specific route id and finally return a the history data to the frontend which contains the initial response from the model so that React can render that.

// //   // TODO: // const response = await prepareGemini(interviewerName);

// //   // If we encounter an error while preparing the Gemini response
// //   if (!response.success) {
// //     return {
// //       success: false,
// //       error: (response as PrepareGeminiFailure).error,
// //     };
// //   }

// //   // If the response is successful, we will store the initial response in the chat history
// //   chatHistory.push({
// //     role: "model",
// //     parts: [{ text: (response as PrepareGeminiSuccess).data.text }],
// //   });

// //   try {
// //     await interviewsCollection.updateOne(
// //       { uniqueId: routeId },
// //       { $set: { chatHistory: chatHistory } },
// //     );
// //   } catch (error) {
// //     return {
// //       success: false,
// //       error: error,
// //     };
// //   }

// //   // If everything went alright, we will return the response from Gemini to the frontend
// //   return {
// //     success: true,
// //     data: {
// //       text: (response as PrepareGeminiSuccess).data.text,
// //     },
// //   };
// // }

// // async function replyToGemini({
// //   interviewerName,
// // }: {
// //   interviewerName: string;
// // }): Promise<PrepareGeminiSuccess | PrepareGeminiFailure> {
// // const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
// // const model = genAi.getGenerativeModel({
// //   model: "gemini-2.5-pro",
// //   systemInstruction: InterviewerInstructions({ interviewerName }),
// // });

// //   const chat = model.startChat({
// //     history: [],
// //   });

// //   try {
// //     const result =
// //       await chat.sendMessage(
// //         // InterviewerInstructions({ interviewerName }),
// //       );

// //     const response = result.response.text();

// //     return {
// //       success: true,
// //       data: {
// //         text: response,
// //       },
// //     };
// //   } catch (error) {
// //     return {
// //       success: false,
// //       error: error,
// //     };
// //   }
// // }

// export { createInterviewRouteAction, GetChatHistoryAction };

// // [
// //   { role: "user", parts: [{ text: "First message from the user." }] },
// //   { role: "model", parts: [{ text: "First response from the AI model." }] },
// //   { role: "user", parts: [{ text: "Second message from the user." }] },
// //   { role: "model", parts: [{ text: "Second response from the AI model." }] },
// //   // ...and so on
// // ];
