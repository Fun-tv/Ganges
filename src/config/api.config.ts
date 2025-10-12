/**
 * API Configuration for Ganges Lite
 * 
 * This file contains all API endpoints and configuration settings.
 * Replace these placeholder values with your actual backend API URLs.
 */

// Backend API Base URL
// For development: http://localhost:3000/api
// For production: https://api.gangeslite.com or your backend URL
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.gangeslite.com';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    logout: `${API_BASE_URL}/auth/logout`,
    refresh: `${API_BASE_URL}/auth/refresh`,
    forgotPassword: `${API_BASE_URL}/auth/forgot-password`,
    resetPassword: `${API_BASE_URL}/auth/reset-password`,
  },

  // User Profile
  user: {
    profile: `${API_BASE_URL}/user/profile`,
    updateProfile: `${API_BASE_URL}/user/profile`,
    addresses: `${API_BASE_URL}/user/addresses`,
    documents: `${API_BASE_URL}/user/documents`,
    preferences: `${API_BASE_URL}/user/preferences`,
  },

  // Packages & Locker
  packages: {
    list: `${API_BASE_URL}/packages`,
    details: (id: string) => `${API_BASE_URL}/packages/${id}`,
    track: (trackingNumber: string) => `${API_BASE_URL}/packages/track/${trackingNumber}`,
    locker: `${API_BASE_URL}/packages/locker`,
  },

  // Shipments
  shipments: {
    create: `${API_BASE_URL}/shipments`,
    list: `${API_BASE_URL}/shipments`,
    details: (id: string) => `${API_BASE_URL}/shipments/${id}`,
    calculate: `${API_BASE_URL}/shipments/calculate`,
  },

  // Personal Shopper
  personalShopper: {
    create: `${API_BASE_URL}/personal-shopper/requests`,
    list: `${API_BASE_URL}/personal-shopper/requests`,
    details: (id: string) => `${API_BASE_URL}/personal-shopper/requests/${id}`,
  },

  // Wallet
  wallet: {
    balance: `${API_BASE_URL}/wallet/balance`,
    addFunds: `${API_BASE_URL}/wallet/add-funds`,
    transactions: `${API_BASE_URL}/wallet/transactions`,
  },

  // Coupons & Referrals
  coupons: {
    list: `${API_BASE_URL}/coupons`,
    apply: `${API_BASE_URL}/coupons/apply`,
    referral: `${API_BASE_URL}/referrals`,
  },

  // Admin
  admin: {
    login: `${API_BASE_URL}/admin/login`,
    dashboard: `${API_BASE_URL}/admin/dashboard`,
    customers: `${API_BASE_URL}/admin/customers`,
    requests: `${API_BASE_URL}/admin/requests`,
    shipments: `${API_BASE_URL}/admin/shipments`,
  },
};

// WhatsApp Support
export const WHATSAPP_NUMBER = '918209893843';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// Company Information
export const COMPANY_INFO = {
  name: 'Ganges Lite',
  founder: 'Jay Agarwal',
  email: 'gangescompany@gmail.com',
  instagram: '@ganges_world',
  instagramUrl: 'https://instagram.com/ganges_world',
  address: {
    line1: 'Ganges, Horizon Tower',
    line2: 'Malviya Nagar, Jaipur, Rajasthan',
    landmark: 'Near World Trade Park',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302017',
    country: 'India',
  },
  phone: '+91 82098 93843',
};

// Payment Gateway Configuration
// Replace with your actual payment gateway credentials
export const PAYMENT_CONFIG = {
  // For Stripe
  stripePublishableKey: process.env.REACT_APP_STRIPE_KEY || 'pk_test_YOUR_STRIPE_KEY',
  
  // For Razorpay (Popular in India)
  razorpayKey: process.env.REACT_APP_RAZORPAY_KEY || 'rzp_test_YOUR_RAZORPAY_KEY',
  
  // For PayPal
  paypalClientId: process.env.REACT_APP_PAYPAL_CLIENT_ID || 'YOUR_PAYPAL_CLIENT_ID',
};

// Shipping Configuration
export const SHIPPING_CONFIG = {
  expressDays: '3-5',
  standardDays: '7-10',
  economyDays: '15-20',
  baseRates: {
    express: 45,
    standard: 28,
    economy: 18,
  },
  weightUnit: 'kg',
  currencySymbol: '$',
};

// Personal Shopper Configuration
export const PERSONAL_SHOPPER_CONFIG = {
  serviceFeePercentage: 7,
  minOrderValue: 500, // in INR
  maxOrderValue: 100000, // in INR
};

// Feature Flags
export const FEATURES = {
  enablePayments: false, // Set to true when payment gateway is configured
  enableRealTimeTracking: false, // Set to true when tracking API is integrated
  enableDocumentUpload: false, // Set to true when file storage is configured
  enableEmailNotifications: false, // Set to true when email service is configured
  enableSMSNotifications: false, // Set to true when SMS service is configured
};

// Environment
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
