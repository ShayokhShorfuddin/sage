// "use server";

// import { APIError } from "better-auth";
// import { headers } from "next/headers";
// import { auth } from "@/lib/auth";

// export async function signUp({
//   name,
//   email,
//   password,
// }: {
//   name: string;
//   email: string;
//   password: string;
// }): RegisterUsee {
//   try {
//     const result = await auth.api.signUpEmail({
//       // biome-ignore lint/style/useNamingConvention: <bro its a library function, not really in my control>
//       body: { name, email, password, callbackURL: "/home" },
//     });

//     return result;
//   } catch (error) {
//     if (error instanceof APIError) {
//     }
//   }
// }

// export async function signIn({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) {
//   const result = await auth.api.signInEmail({
//     // biome-ignore lint/style/useNamingConvention: <bro its a library function, not really in my control>
//     body: { email, password, callbackURL: "/home" },
//   });

//   return result;
// }

// export async function signOut() {
//   const result = await auth.api.signOut({ headers: await headers() });

//   return result;
// }

// // "use server";

// // import { compare, hash } from "bcryptjs";
// // // import { signIn, signOut } from "@/auth";
// // import getMongoDbClient from "@/lib/db";
// // import logger from "@/logger";

// type RegisterUserInput = {
//   name: string;
//   email: string;
//   password: string;
// };

// // type LoginUserInput = {
// //   email: string;
// //   password: string;
// // };

// // // Register user through Google auth
// // async function GoogleAuthAction() {
// //   logger.info("Initiating GoogleAuthAction.");
// //   // await signIn("google", { redirectTo: "/home" });
// // }

// // // Logout the user
// // async function LogoutUserAction() {
// //   logger.info("Logging out user.");

// //   // await signOut({
// //   //   redirectTo: "/",
// //   // });
// // }

// // // Register a new user using Credentials
// // async function RegisterUserAction({
// //   name,
// //   email,
// //   password,
// // }: RegisterUserInput) {
// //   const client = await getMongoDbClient();
// //   const database = client.db("Sage");
// //   const usersCollection = database.collection("users");

// //   // Check if the user already exists
// //   const existingUser = await usersCollection.findOne({ email });

// //   if (existingUser) {
// //     // Close the MongoDB client connection
// //     await client.close();

// //     return {
// //       success: false,
// //       reason: "user_exists",
// //       message: "User already exists.",
// //     };
// //   }

// //   // Generate a hashed password
// //   const hashedPassword = await hash(password, 10);

// //   // Register the new user
// //   await usersCollection.insertOne({
// //     name,
// //     email,
// //     hashedPassword,
// //   });

// //   // Close the MongoDB client connection
// //   await client.close();

// //   return { success: true };
// // }

// // // Login user with email and password
// // async function LoginUserAction({ email, password }: LoginUserInput) {
// //   const client = await getMongoDbClient();
// //   const database = client.db("Sage");
// //   const usersCollection = database.collection("users");

// //   // Find the user by email
// //   const user = await usersCollection.findOne({ email });

// //   if (!user) {
// //     // Close the MongoDB client connection
// //     await client.close();

// //     return {
// //       success: false,
// //       reason: "user_not_found",
// //       message: "User not found.",
// //     };
// //   }

// //   // If the user registered using Google auth, there is no password stored in the database. So user.hashedPassword will be undefined. We will prompt the user to login with Google instead.
// //   if (!user.hashedPassword) {
// //     // Close the MongoDB client connection
// //     await client.close();

// //     return {
// //       success: false,
// //       reason: "google_auth_required",
// //       message: "Please login with Google.",
// //     };
// //   }

// //   // Verify the password
// //   const isValidPassword = await compare(password, user.hashedPassword);

// //   if (!isValidPassword) {
// //     // Close the MongoDB client connection
// //     await client.close();

// //     return {
// //       success: false,
// //       reason: "invalid_password",
// //       message: "Invalid password.",
// //     };
// //   }

// //   // Close the MongoDB client connection
// //   await client.close();

// //   return { success: true };
// // }

// // export {
// //   RegisterUserAction,
// //   GoogleAuthAction,
// //   LogoutUserAction,
// //   LoginUserAction,
// // };
