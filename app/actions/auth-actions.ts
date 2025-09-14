"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

async function signUp({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const result = await auth.api.signUpEmail({
    // biome-ignore lint/style/useNamingConvention: <bro its a library function, not really in my control>
    body: { name, email, password, callbackURL: "/home" },
  });

  return result;
}

async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const result = await auth.api.signInEmail({
    // biome-ignore lint/style/useNamingConvention: <bro its a library function, not really in my control>
    body: { email, password, callbackURL: "/home" },
  });

  return result;
}

async function signOut({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const result = await auth.api.signOut({ headers: await headers() });

  return result;
}
