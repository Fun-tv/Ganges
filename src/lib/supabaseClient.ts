/**
 * SUPABASE CLIENT - PRODUCTION READY
 * 
 * This file initializes the Supabase client with:
 * - Environment variable protection
 * - Session persistence (localStorage)
 * - Auto token refreshing
 * - Type definitions integration (optional, if generated)
 */

import { createClient } from '@supabase/supabase-js';

// Define environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logging (safe - only shows presence, not values)
console.log('🔍 Supabase Config Check:', {
  urlPresent: !!supabaseUrl,
  keyPresent: !!supabaseAnonKey,
  urlValue: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'MISSING',
});

// Validation - CRITICAL: No empty string fallbacks
if (!supabaseUrl || !supabaseAnonKey) {
  const errorMsg = '🚨 CRITICAL: Supabase configuration missing!\n' +
    'Required variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY\n' +
    `URL present: ${!!supabaseUrl}\n` +
    `KEY present: ${!!supabaseAnonKey}\n` +
    'Check your .env.local file and restart the dev server.';

  console.error(errorMsg);
  throw new Error(errorMsg);
}

// Create Client - NO FALLBACKS (fail fast if config missing)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storage: window.localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: { 'x-application-name': 'ganges-lite-frontend' },
  },
});

/**
 * Diagnostic Helper
 * Checks connection to Supabase and returns latency/status
 */
export async function checkSupabaseConnection(): Promise<{
  connected: boolean;
  latency?: number;
  error?: any;
}> {
  const start = performance.now();
  try {
    const { error } = await supabase.from('user_profiles').select('count', { count: 'exact', head: true });

    // PostgrestError doesn't have a 'status' property
    // We check for network errors by looking at the error code
    if (error && error.code !== 'PGRST116') {
      console.error('🔴 Supabase Network Error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      throw error;
    }

    const end = performance.now();
    console.log('✅ Supabase connection successful', { latency: `${(end - start).toFixed(2)}ms` });
    return { connected: true, latency: end - start };
  } catch (err: any) {
    console.error('🔴 Supabase connection check failed:', {
      message: err.message,
      name: err.name,
      stack: err.stack?.split('\n')[0],
    });
    return { connected: false, error: err };
  }
}
