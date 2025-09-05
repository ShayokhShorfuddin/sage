// import {
//   type GenerativeModel,
//   GoogleGenerativeAI,
// } from "@google/generative-ai";
// import { createClient } from "redis";
// import logger from "@/logger";

// class GeminiClient {
//   private static _instance: GeminiClient;
//   private model: GenerativeModel;
//   private interviewerName: string;
//   private currentRouteId: string; // The reason to provide routeID is the following: Since we allow the user to create multiple conversations with Gemini and GeminiClient is a single instance in the backend, how is it supposed to keep track if it is role-playing as Milton or Alice? Suppose the user is on interview/abc123 route and interviewing with "Alice". If the user initiates a new interview with "Milton" while not finishing the current one, how would out GeminiClient singleton in the backend understand it's not longer Alice and it has to be Milton? As a remedy, we are hoping to use the routeId to create_new/override_existing GeminiClient singleton.

//   // Prevents `new GeminiClient()` elsewhere
//   private constructor({
//     currentRouteId,
//     interviewerName,
//   }: { currentRouteId: string; interviewerName: string }) {
//     logger.info("[Gemini Client] instantiated");

//     const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

//     this.currentRouteId = currentRouteId;
//     this.interviewerName = interviewerName;

//     this.model = genAi.getGenerativeModel({
//       model: "gemini-2.5-pro",
//       systemInstruction: InterviewerInstructions({
//         interviewerName: this.interviewerName,
//       }),
//     });
//   }

//   //   Public accessor
//   public static async getInstance({
//     currentRouteId,
//   }: {
//     currentRouteId: string;
//   }): Promise<GeminiClient> {
//     if (!GeminiClient._instance) {
//       /* Persist on Node global to survive HMR & serverless re-uses */
//       const globalSafe = global as typeof globalThis & {
//         __gemini?: GeminiClient;
//       };

//       const interviewerName = await getInterviewerNameFromRouteId({
//         routeId: currentRouteId,
//       });

//       if (!interviewerName) {
//         throw new Error("Interviewer name not found for the given routeId");
//       }

//       if (!globalSafe.__gemini) {
//         globalSafe.__gemini = new GeminiClient({
//           currentRouteId,
//           interviewerName,
//         });
//       } else {
//         // A singleton already exists in the global safe. So we need to check if the route has changed or not. If the routeId has changed, we need to create a new instance. Otherwise, just reuse the existing singleton
//         if (globalSafe.__gemini.currentRouteId !== currentRouteId) {
//           globalSafe.__gemini = new GeminiClient({
//             currentRouteId,
//             interviewerName,
//           });
//         }
//       }

//       GeminiClient._instance = globalSafe.__gemini;
//     }

//     return GeminiClient._instance;
//   }
// }

// if (typeof window !== "undefined") {
//   /* Crash if imported on the client */
//   throw new Error("GeminiClient is server-only");
// }

// export { GeminiClient };

// async function getInterviewerNameFromRouteId({
//   routeId,
// }: {
//   routeId: string;
// }): Promise<string | null> {
//   const redis = RedisClient();
//   await redis.connect();

//   const result = await redis.get(routeId);
//   console.log(result);

//   redis.destroy();

//   return result;
// }

// function RedisClient() {
//   const client = createClient({
//     username: "default",
//     password: process.env.REDIS_PASSWORD as string,
//     socket: {
//       host: process.env.REDIS_HOST as string,
//       port: Number(process.env.REDIS_PORT),
//     },
//   });

//   client.on("error", (err) => console.log("Redis Client Error", err));

//   return client;
// }
