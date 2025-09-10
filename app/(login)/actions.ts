'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { signInWithEmail, signUpWithEmail, signOut, updatePassword, resetPassword } from '@/lib/auth/session';
import { getUser } from '@/lib/auth/session';
import { validatedAction, validatedActionWithUser } from '@/lib/auth/middleware';

const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100)
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const { email, password } = data;

  const { data: authData, error } = await signInWithEmail(email, password);

  if (error || !authData.user) {
    return {
      error: 'Invalid email or password. Please try again.',
      email,
      password
    };
  }

  const redirectTo = formData.get('redirect') as string | null;
  if (redirectTo === 'checkout') {
    const priceId = formData.get('priceId') as string;
    // Handle checkout redirect if needed
    redirect(`/pricing?priceId=${priceId}`);
  }

  redirect('/dashboard');
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const signUp = validatedAction(signUpSchema, async (data, formData) => {
  const { email, password } = data;

  const { data: authData, error } = await signUpWithEmail(email, password);

  if (error || !authData.user) {
    return {
      error: error?.message || 'Failed to create account. Please try again.',
      email,
      password
    };
  }

  // The organization and membership will be created automatically by the trigger
  // defined in your Supabase database

  const redirectTo = formData.get('redirect') as string | null;
  if (redirectTo === 'checkout') {
    const priceId = formData.get('priceId') as string;
    redirect(`/pricing?priceId=${priceId}`);
  }

  redirect('/dashboard');
});

export async function signOutAction() {
  await signOut();
  redirect('/sign-in');
}

const updatePasswordSchema = z.object({
  newPassword: z.string().min(8).max(100),
  confirmPassword: z.string().min(8).max(100)
});

export const updatePasswordAction = validatedActionWithUser(
  updatePasswordSchema,
  async (data, _, user) => {
    const { newPassword, confirmPassword } = data;

    if (confirmPassword !== newPassword) {
      return {
        newPassword,
        confirmPassword,
        error: 'New password and confirmation password do not match.'
      };
    }

    const { error } = await updatePassword(newPassword);

    if (error) {
      return {
        newPassword,
        confirmPassword,
        error: error.message || 'Failed to update password.'
      };
    }

    return {
      success: 'Password updated successfully.'
    };
  }
);

const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address')
});

export const resetPasswordAction = validatedAction(
  resetPasswordSchema,
  async (data) => {
    const { email } = data;

    const { error } = await resetPassword(email);

    if (error) {
      return {
        email,
        error: error.message || 'Failed to send reset email.'
      };
    }

    return {
      success: 'Password reset email sent successfully.'
    };
  }
);
