'use server';

import { APIError } from 'better-auth';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import getFriendlyErrorMessage from '@/lib/auth-errors';
import type { TypeSignUp } from '@/types/auth-actions-type';

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
        reason: 'UNKNOWN_ERROR',
        message: 'An unknown error outside of APIError occurred.',
      };
    }
  }

  return { success: true, userName: userName };
}
