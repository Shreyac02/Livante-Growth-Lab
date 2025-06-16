import { supabase, isSupabaseConfigured } from './supabase';

export type AuthUser = {
  id: string;
  email: string;
  full_name?: string;
  subscription_status: 'free' | 'premium';
  subscription_end_date?: string;
};

export async function signUp(email: string, password: string, full_name: string) {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured. Please set up your environment variables.');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
      },
    },
  });

  if (error) throw error;

  if (data.user) {
    await supabase.from('users').insert([
      {
        id: data.user.id,
        email: data.user.email,
        full_name,
        subscription_status: 'free',
      },
    ]);
  }

  return data;
}

export async function signIn(email: string, password: string) {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured. Please set up your environment variables.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured. Please set up your environment variables.');
  }

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!isSupabaseConfigured() || !supabase) {
    return null;
  }

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  return data;
}

export async function updateSubscription(userId: string, status: 'free' | 'premium') {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured. Please set up your environment variables.');
  }

  const { data, error } = await supabase
    .from('users')
    .update({
      subscription_status: status,
      subscription_end_date: status === 'premium' 
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
        : null,
    })
    .eq('id', userId);

  if (error) throw error;
  return data;
}
