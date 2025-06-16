import { supabase, isSupabaseConfigured } from './supabase';
import type { AuthUser } from './auth';

export type SubscriptionTier = 'free' | 'premium';

export async function upgradeSubscription(userId: string): Promise<AuthUser> {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured. Please set up your environment variables.');
  }

  const { data, error } = await supabase
    .from('users')
    .update({
      subscription_status: 'premium',
      subscription_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function checkSubscriptionStatus(userId: string): Promise<SubscriptionTier> {
  if (!isSupabaseConfigured() || !supabase) {
    return 'free';
  }

  const { data, error } = await supabase
    .from('users')
    .select('subscription_status, subscription_end_date')
    .eq('id', userId)
    .single();

  if (error) throw error;

  if (data.subscription_status === 'premium') {
    const endDate = new Date(data.subscription_end_date);
    if (endDate > new Date()) {
      return 'premium';
    }
    // Subscription expired
    await supabase
      .from('users')
      .update({ subscription_status: 'free', subscription_end_date: null })
      .eq('id', userId);
  }

  return 'free';
}
