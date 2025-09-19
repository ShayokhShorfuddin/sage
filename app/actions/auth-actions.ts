'use server';

import { APIError } from 'better-auth/api';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import getFriendlyErrorMessage from '@/lib/auth-errors';
import type { TypeSignIn, TypeSignUp } from '@/types/auth-actions-type';

export async function signUp({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<TypeSignUp> {
  let userName: string;

  try {
    const result = await auth.api.signUpEmail({
      body: { name, email, password },
    });
    userName = result.user.name;
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        reason: error.body?.code as string,
        message: getFriendlyErrorMessage(error.body?.code as string),
      };
    } else {
      return {
        success: false,
        reason: 'unknown_error',
        message: 'An unknown error occurred.',
      };
    }
  }

  return { success: true, userName: userName };
}

export async function credentialSignIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<TypeSignIn> {
  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      asResponse: true,
    });

    if (!response.ok) {
      return {
        success: false,
        reason: 'unauthorized',
        message: 'Invalid email or password.',
      };
    }
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        reason: error.body?.code as string,
        message: getFriendlyErrorMessage(error.body?.code as string),
      };
    }
    // Unknown error
    return {
      success: false,
      reason: 'unknown_error',
      message: 'An unknown error occurred.',
    };
  }

  return { success: true };
}

export async function logout() {
  await auth.api.signOut({
    // This endpoint requires session cookies.
    headers: await headers(),
  });
}
