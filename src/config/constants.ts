/**
 * Application Constants
 */

// Default locker format
export const LOCKER_NUMBER_FORMAT = 'GL-XXXXX-XXXXXX';

// Sample locker number for demo
export const DEMO_LOCKER_NUMBER = 'GL-27H21-451753';

// Sample user data for demo
export const DEMO_USER = {
  name: 'Robert',
  email: 'robert@example.com',
  phone: '+1 234 567 8900',
  country: 'United States',
  lockerNumber: DEMO_LOCKER_NUMBER,
  memberSince: '2025-09-28',
  referralCode: 'ROBERT2025',
};

// Coupon codes
export const ACTIVE_COUPONS = [
  {
    code: 'DIWALI25',
    discount: '25% OFF',
    description: 'Diwali Special - Get 25% off on shipping',
    validUntil: '2025-11-05',
    color: 'from-orange-500 to-pink-600',
  },
  {
    code: 'FIRST10',
    discount: '$10 OFF',
    description: 'First time user discount',
    validUntil: '2025-12-31',
    color: 'from-blue-500 to-purple-600',
  },
  {
    code: 'SAVE20',
    discount: '20% OFF',
    description: 'Save on consolidated shipments',
    validUntil: '2025-11-30',
    color: 'from-green-500 to-teal-600',
  },
];

// Shipping methods
export const SHIPPING_METHODS = [
  {
    id: 'express',
    name: 'Express',
    carrier: 'DHL/FedEx',
    duration: '3-5 days',
    price: 45,
  },
  {
    id: 'standard',
    name: 'Standard',
    carrier: 'India Post',
    duration: '7-10 days',
    price: 28,
  },
  {
    id: 'economy',
    name: 'Economy',
    carrier: 'Surface Mail',
    duration: '15-20 days',
    price: 18,
  },
];

// Admin credentials (CHANGE THESE IN PRODUCTION!)
export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'ganges2025',
};

// Status colors
export const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  processing: 'bg-blue-100 text-blue-800 border-blue-300',
  completed: 'bg-green-100 text-green-800 border-green-300',
  cancelled: 'bg-red-100 text-red-800 border-red-300',
  'in-transit': 'bg-blue-100 text-blue-800 border-blue-300',
  delivered: 'bg-green-100 text-green-800 border-green-300',
  ready: 'bg-purple-100 text-purple-800 border-purple-300',
  active: 'bg-green-100 text-green-800 border-green-300',
  inactive: 'bg-gray-100 text-gray-800 border-gray-300',
};

// Countries list
export const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'Singapore',
  'UAE',
  'Saudi Arabia',
  'New Zealand',
  'Netherlands',
  'Sweden',
  'Norway',
  'Denmark',
  'Switzerland',
  'Italy',
  'Spain',
];

// Indian stores
export const INDIAN_STORES = [
  { name: 'Amazon India', url: 'https://www.amazon.in' },
  { name: 'Flipkart', url: 'https://www.flipkart.com' },
  { name: 'Myntra', url: 'https://www.myntra.com' },
  { name: 'Ajio', url: 'https://www.ajio.com' },
  { name: 'Nykaa', url: 'https://www.nykaa.com' },
  { name: 'Meesho', url: 'https://www.meesho.com' },
  { name: 'Snapdeal', url: 'https://www.snapdeal.com' },
  { name: 'Tata Cliq', url: 'https://www.tatacliq.com' },
];

// Prohibited items categories
export const PROHIBITED_CATEGORIES = [
  'Weapons & Ammunition',
  'Explosives & Fireworks',
  'Illegal Drugs & Narcotics',
  'Hazardous Materials',
  'Flammable Liquids',
  'Live Animals',
  'Perishable Food Items',
  'Currency & Precious Metals',
  'Counterfeit Goods',
  'Adult Content',
  'Tobacco Products',
  'Prescription Medications',
];

// Document types
export const DOCUMENT_TYPES = {
  idProof: 'ID Proof',
  addressProof: 'Address Proof',
  customsDeclaration: 'Customs Declaration',
  invoice: 'Invoice',
  other: 'Other',
};

// Notification preferences
export const NOTIFICATION_TYPES = {
  email: 'Email Notifications',
  sms: 'SMS Notifications',
  whatsapp: 'WhatsApp Updates',
  promotional: 'Promotional Offers',
  packageUpdates: 'Package Updates',
  shipmentAlerts: 'Shipment Alerts',
};
