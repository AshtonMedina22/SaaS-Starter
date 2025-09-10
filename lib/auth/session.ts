import { createClient } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export async function getSession() {
  const supabase = await createClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session) {
    return null;
  }
  
  return session;
}

export async function getUser(): Promise<User | null> {
  const session = await getSession();
  return session?.user || null;
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
}

export async function signUpWithEmail(email: string, password: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  return { data, error };
}

export async function resetPassword(email: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.BASE_URL}/auth/reset-password`,
  });
  
  return { data, error };
}

export async function updatePassword(password: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.updateUser({
    password,
  });
  
  return { data, error };
}
