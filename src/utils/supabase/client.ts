import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Create Supabase client
const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Database types
export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  wallet_balance: number;
  referral_code?: string;
  referred_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: string;
  user_id: string;
  tracking_number: string;
  description?: string;
  weight_kg?: number;
  declared_value?: number;
  shipping_method?: 'Economy' | 'Ganges One';
  status: 'Pending' | 'Warehouse' | 'In Transit' | 'Customs' | 'Out for Delivery' | 'Delivered';
  warehouse_arrival_date?: string;
  estimated_delivery_date?: string;
  shipping_cost?: number;
  additional_charges?: number;
  packing_service_wood?: boolean;
  packing_service_bubble?: boolean;
  packing_service_fragile?: boolean;
  destination_address?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  type: 'Credit' | 'Debit';
  amount: number;
  description?: string;
  reference_id?: string;
  payment_method?: string;
  status: 'Pending' | 'Completed' | 'Failed' | 'Refunded';
  created_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'Percentage' | 'Fixed';
  discount_value: number;
  max_discount?: number;
  min_order_value: number;
  valid_from?: string;
  valid_until?: string;
  usage_limit?: number;
  used_count: number;
  is_active: boolean;
  created_at: string;
}

export interface PersonalShopperRequest {
  id: string;
  user_id: string;
  product_url: string;
  product_name?: string;
  quantity: number;
  budget?: number;
  size_color_preferences?: string;
  additional_notes?: string;
  status: 'Pending' | 'Quote Sent' | 'Accepted' | 'Purchased' | 'Cancelled';
  quote_amount?: number;
  service_fee?: number;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PackageTracking {
  id: string;
  package_id: string;
  status: string;
  location?: string;
  description?: string;
  created_at: string;
}

// Helper function to get current user
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  
  // Get user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  return { user, profile };
}

// Helper function to get access token
export async function getAccessToken() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token || null;
}

// Helper function to sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}
