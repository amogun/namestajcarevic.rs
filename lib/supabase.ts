import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Ensure environment variables are loaded
import 'dotenv/config';

// Supabase client for API operations
// Uses service role key for admin operations (bypasses RLS)
// For public operations, use anon key instead

let supabaseAdminClient: SupabaseClient | null = null;
let supabaseAnonClient: SupabaseClient | null = null;

export function getSupabaseAdminClient(): SupabaseClient {
  if (supabaseAdminClient) {
    return supabaseAdminClient;
  }

  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set. ' +
      'Get these from your Supabase project: Settings > API > service_role key'
    );
  }

  // Service role key bypasses Row Level Security (RLS) - use for admin operations
  supabaseAdminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  return supabaseAdminClient;
}

export function getSupabaseAnonClient(): SupabaseClient {
  if (supabaseAnonClient) {
    return supabaseAnonClient;
  }

  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim();

  if (!supabaseUrl || !anonKey) {
    throw new Error(
      'SUPABASE_URL and SUPABASE_ANON_KEY must be set. ' +
      'Get these from your Supabase project: Settings > API'
    );
  }

  // Anon key respects Row Level Security (RLS) - use for public operations
  supabaseAnonClient = createClient(supabaseUrl, anonKey);
  return supabaseAnonClient;
}

// Lazy initialization - only create client when needed
// This prevents errors during module load if env vars aren't set yet
export function getSupabase() {
  return getSupabaseAdminClient();
}