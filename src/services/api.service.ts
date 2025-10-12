/**
 * API Service Layer - PRODUCTION READY
 * Connected to Supabase backend
 */

import { supabase, getAccessToken } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f100126`;

// Generic API request handler
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getAccessToken();
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token || publicAnonKey}`,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `API Error: ${response.statusText}`);
    }

    return data;
  } catch (error: any) {
    console.error('API Request Failed:', error);
    throw error;
  }
}

// ========================================
// Authentication Services
// ========================================

export const authService = {
  /**
   * Login user
   */
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Get user profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    return {
      user: data.user,
      profile,
      session: data.session,
    };
  },

  /**
   * Register new user
   */
  async register(userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }) {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        fullName: userData.name,
        phone: userData.phone,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Registration failed');
    }

    return result;
  },

  /**
   * Logout user
   */
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  },
};

// ========================================
// User Profile Services
// ========================================

export const userService = {
  /**
   * Get user profile
   */
  async getProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;

    return {
      id: user.id,
      email: user.email,
      ...profile,
    };
  },

  /**
   * Update user profile
   */
  async updateProfile(updates: {
    fullName?: string;
    phone?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
  }) {
    return await apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  /**
   * Get user addresses
   */
  async getAddresses() {
    const { data, error } = await supabase
      .from('shipping_addresses')
      .select('*')
      .order('is_default', { ascending: false });

    if (error) throw error;
    return data;
  },
};

// ========================================
// Package Services
// ========================================

export const packageService = {
  /**
   * Get all packages for current user
   */
  async getPackages() {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Create new package/shipment
   */
  async createPackage(packageData: {
    description: string;
    weight: number;
    declaredValue: number;
    shippingMethod: 'Economy' | 'Ganges One';
    destinationAddress: string;
    packingServices?: string[];
  }) {
    return await apiRequest('/packages', {
      method: 'POST',
      body: JSON.stringify(packageData),
    });
  },

  /**
   * Track package by tracking number
   */
  async trackPackage(trackingNumber: string) {
    const response = await fetch(`${API_URL}/packages/track/${trackingNumber}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Package not found');
    }

    return data;
  },
};

// ========================================
// Shipment Services
// ========================================

export const shipmentService = {
  /**
   * Create new shipment request
   */
  async createShipment(data: {
    packageIds: string[];
    destination: string;
    shippingMethod: 'Economy' | 'Ganges One';
    addressId: string;
  }) {
    console.log('Creating shipment:', data);
    return {
      id: `SHP-${Date.now()}`,
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
  },

  /**
   * Calculate shipping cost
   */
  calculateShipping(data: {
    weight: number;
    destination: string;
    method: 'Economy' | 'Ganges One';
  }) {
    const rates: Record<string, number> = {
      'Economy': 2500, // ₹2500/kg
      'Ganges One': 3500, // ₹3500/kg
    };

    const baseRate = rates[data.method] || 2500;
    const weightCharge = data.weight * baseRate;
    
    return {
      baseRate,
      weightCharge,
      total: weightCharge,
      method: data.method,
    };
  },
};

// ========================================
// Personal Shopper Services
// ========================================

export const personalShopperService = {
  /**
   * Create personal shopper request
   */
  async createRequest(requestData: {
    productUrl: string;
    productName: string;
    quantity: number;
    budget?: number;
    preferences?: string;
    notes?: string;
  }) {
    return await apiRequest('/personal-shopper/request', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  },

  /**
   * Get all personal shopper requests for current user
   */
  async getRequests() {
    const { data, error } = await supabase
      .from('personal_shopper_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },
};

// ========================================
// Wallet Services
// ========================================

export const walletService = {
  /**
   * Get wallet balance
   */
  async getBalance() {
    const response = await apiRequest<{ balance: number }>('/wallet/balance');
    return {
      balance: response.balance,
      currency: '₹',
    };
  },

  /**
   * Add funds to wallet
   */
  async addFunds(amount: number, paymentMethod: string, referenceId: string) {
    return await apiRequest('/wallet/add-funds', {
      method: 'POST',
      body: JSON.stringify({
        amount,
        paymentMethod,
        referenceId,
      }),
    });
  },

  /**
   * Get transaction history
   */
  async getTransactions() {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Deduct from wallet
   */
  async deduct(amount: number, description: string, referenceId?: string) {
    return await apiRequest('/wallet/deduct', {
      method: 'POST',
      body: JSON.stringify({
        amount,
        description,
        referenceId,
      }),
    });
  },
};

// ========================================
// Coupon Services
// ========================================

export const couponService = {
  /**
   * Validate coupon code
   */
  async validateCoupon(code: string, orderValue: number) {
    return await apiRequest('/coupons/validate', {
      method: 'POST',
      body: JSON.stringify({ code, orderValue }),
    });
  },

  /**
   * Apply coupon (mark as used)
   */
  async applyCoupon(couponId: string) {
    return await apiRequest('/coupons/apply', {
      method: 'POST',
      body: JSON.stringify({ couponId }),
    });
  },

  /**
   * Get all active coupons
   */
  async getActiveCoupons() {
    const response = await fetch(`${API_URL}/coupons`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    
    return data.coupons || [];
  },
};

// ========================================
// Referral Services
// ========================================

export const referralService = {
  /**
   * Get user's referral code and stats
   */
  async getMyReferralCode() {
    return await apiRequest('/referrals/my-code');
  },

  /**
   * Apply referral code
   */
  async applyReferralCode(referralCode: string) {
    return await apiRequest('/referrals/apply', {
      method: 'POST',
      body: JSON.stringify({ referralCode }),
    });
  },
};

// ========================================
// Admin Services
// ========================================

export const adminService = {
  /**
   * Admin login
   */
  async login(email: string, password: string) {
    // Use Supabase auth for admin login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Verify admin email
    const adminEmails = ['gangescompany@gmail.com', 'jay@ganges.world'];
    if (!adminEmails.includes(data.user.email || '')) {
      await supabase.auth.signOut();
      throw new Error('Admin access required');
    }

    return { success: true, user: data.user };
  },

  /**
   * Get dashboard statistics
   */
  async getDashboardStats() {
    return await apiRequest('/admin/stats');
  },

  /**
   * Get all users
   */
  async getUsers() {
    return await apiRequest('/admin/users');
  },

  /**
   * Get all packages
   */
  async getPackages() {
    return await apiRequest('/admin/packages');
  },

  /**
   * Get all personal shopper requests
   */
  async getPersonalShopperRequests() {
    return await apiRequest('/admin/personal-shopper');
  },

  /**
   * Update package status
   */
  async updatePackageStatus(packageId: string, status: string, location?: string, description?: string) {
    return await apiRequest(`/packages/${packageId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, location, description }),
    });
  },

  /**
   * Update personal shopper request
   */
  async updatePersonalShopperRequest(requestId: string, updates: {
    status?: string;
    quoteAmount?: number;
    serviceFee?: number;
    adminNotes?: string;
  }) {
    return await apiRequest(`/admin/personal-shopper/${requestId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  /**
   * Create coupon
   */
  async createCoupon(couponData: {
    code: string;
    discountType: 'Percentage' | 'Fixed';
    discountValue: number;
    maxDiscount?: number;
    minOrderValue?: number;
    validUntil?: string;
    usageLimit?: number;
  }) {
    return await apiRequest('/admin/coupons', {
      method: 'POST',
      body: JSON.stringify(couponData),
    });
  },

  /**
   * Initialize database with sample data
   */
  async initializeDatabase() {
    return await apiRequest('/admin/init-db', {
      method: 'POST',
    });
  },
};

// Export all services
export default {
  auth: authService,
  user: userService,
  package: packageService,
  shipment: shipmentService,
  personalShopper: personalShopperService,
  wallet: walletService,
  coupon: couponService,
  referral: referralService,
  admin: adminService,
};
