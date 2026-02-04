/**
 * Analytics Utilities
 * Track user events and page views
 */

// Google Analytics
export const initGA = (trackingId: string) => {
  if (typeof window !== 'undefined' && trackingId) {
    // Load GA script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    // Initialize GA
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', trackingId);
  }
};

// Track page view
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', import.meta.env.VITE_GOOGLE_ANALYTICS_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Common event trackers
export const analytics = {
  // User actions
  signUp: () => trackEvent('User', 'Sign Up', 'New User Registration'),
  login: () => trackEvent('User', 'Login', 'User Login'),
  logout: () => trackEvent('User', 'Logout', 'User Logout'),

  // Package actions
  createShipRequest: () => trackEvent('Package', 'Create Ship Request', 'New Shipment'),
  trackPackage: (trackingNumber: string) =>
    trackEvent('Package', 'Track Package', trackingNumber),

  // Personal Shopper
  createPersonalShopperRequest: () =>
    trackEvent('Personal Shopper', 'Create Request', 'New Shopping Request'),

  // Wallet
  addFunds: (amount: number) =>
    trackEvent('Wallet', 'Add Funds', 'Wallet Topup', amount),

  // Coupons
  applyCoupon: (couponCode: string) =>
    trackEvent('Coupon', 'Apply Coupon', couponCode),

  // Referral
  copyReferralCode: () => trackEvent('Referral', 'Copy Code', 'Share Referral'),

  // Support
  clickWhatsApp: () => trackEvent('Support', 'Click WhatsApp', 'WhatsApp Contact'),
  contactEmail: () => trackEvent('Support', 'Click Email', 'Email Contact'),

  // Navigation
  viewSection: (sectionName: string) =>
    trackEvent('Navigation', 'View Section', sectionName),

  // Admin
  adminLogin: () => trackEvent('Admin', 'Login', 'Admin Access'),
};

// Facebook Pixel (Optional)
export const initFacebookPixel = (pixelId: string) => {
  if (typeof window !== 'undefined' && pixelId) {
    const fbq = (window as any).fbq || function (...args: any[]) {
      ((window as any).fbq.q = (window as any).fbq.q || []).push(args);
    };
    (window as any).fbq = fbq;
    fbq('init', pixelId);
    fbq('track', 'PageView');
  }
};

// Track conversions
export const trackConversion = (eventName: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, { value: value });
  }
};
