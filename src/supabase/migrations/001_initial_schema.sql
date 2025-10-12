-- Ganges Lite - Complete Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================== TABLES ====================

-- User profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  pincode TEXT,
  wallet_balance DECIMAL(10, 2) DEFAULT 0.00,
  referral_code TEXT UNIQUE,
  referred_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Packages table
CREATE TABLE IF NOT EXISTS public.packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  tracking_number TEXT UNIQUE NOT NULL,
  description TEXT,
  weight_kg DECIMAL(8, 2),
  declared_value DECIMAL(10, 2),
  shipping_method TEXT CHECK (shipping_method IN ('Economy', 'Ganges One')),
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Warehouse', 'In Transit', 'Customs', 'Out for Delivery', 'Delivered')),
  warehouse_arrival_date DATE,
  estimated_delivery_date DATE,
  shipping_cost DECIMAL(10, 2),
  additional_charges DECIMAL(10, 2) DEFAULT 0.00,
  packing_service_wood BOOLEAN DEFAULT FALSE,
  packing_service_bubble BOOLEAN DEFAULT FALSE,
  packing_service_fragile BOOLEAN DEFAULT FALSE,
  destination_address TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table (wallet)
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('Credit', 'Debit')),
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT,
  reference_id TEXT,
  payment_method TEXT,
  status TEXT DEFAULT 'Completed' CHECK (status IN ('Pending', 'Completed', 'Failed', 'Refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coupons table
CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT CHECK (discount_type IN ('Percentage', 'Fixed')),
  discount_value DECIMAL(10, 2) NOT NULL,
  max_discount DECIMAL(10, 2),
  min_order_value DECIMAL(10, 2) DEFAULT 0.00,
  valid_from DATE DEFAULT CURRENT_DATE,
  valid_until DATE,
  usage_limit INTEGER,
  used_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coupon usage tracking
CREATE TABLE IF NOT EXISTS public.coupon_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  coupon_id UUID REFERENCES public.coupons(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(coupon_id, user_id)
);

-- Personal shopper requests
CREATE TABLE IF NOT EXISTS public.personal_shopper_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  product_url TEXT NOT NULL,
  product_name TEXT,
  quantity INTEGER DEFAULT 1,
  budget DECIMAL(10, 2),
  size_color_preferences TEXT,
  additional_notes TEXT,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Quote Sent', 'Accepted', 'Purchased', 'Cancelled')),
  quote_amount DECIMAL(10, 2),
  service_fee DECIMAL(10, 2),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Referrals table
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  referred_user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  reward_amount DECIMAL(10, 2) DEFAULT 200.00,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Completed', 'Paid')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shipping addresses
CREATE TABLE IF NOT EXISTS public.shipping_addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  label TEXT,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT DEFAULT 'India',
  pincode TEXT NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Package tracking history
CREATE TABLE IF NOT EXISTS public.package_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_id UUID REFERENCES public.packages(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  location TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== ROW LEVEL SECURITY ====================

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_shopper_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_usage ENABLE ROW LEVEL SECURITY;

-- User profiles policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Packages policies
DROP POLICY IF EXISTS "Users can view own packages" ON public.packages;
CREATE POLICY "Users can view own packages" ON public.packages
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create packages" ON public.packages;
CREATE POLICY "Users can create packages" ON public.packages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Transactions policies
DROP POLICY IF EXISTS "Users can view own transactions" ON public.transactions;
CREATE POLICY "Users can view own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Personal shopper policies
DROP POLICY IF EXISTS "Users can view own requests" ON public.personal_shopper_requests;
CREATE POLICY "Users can view own requests" ON public.personal_shopper_requests
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create requests" ON public.personal_shopper_requests;
CREATE POLICY "Users can create requests" ON public.personal_shopper_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Shipping addresses policies
DROP POLICY IF EXISTS "Users can manage own addresses" ON public.shipping_addresses;
CREATE POLICY "Users can manage own addresses" ON public.shipping_addresses
  FOR ALL USING (auth.uid() = user_id);

-- Package tracking policies
DROP POLICY IF EXISTS "Users can view tracking for their packages" ON public.package_tracking;
CREATE POLICY "Users can view tracking for their packages" ON public.package_tracking
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.packages 
      WHERE packages.id = package_tracking.package_id 
      AND packages.user_id = auth.uid()
    )
  );

-- Referrals policies
DROP POLICY IF EXISTS "Users can view own referrals" ON public.referrals;
CREATE POLICY "Users can view own referrals" ON public.referrals
  FOR SELECT USING (auth.uid() = referrer_id OR auth.uid() = referred_user_id);

-- Coupons policies (public read)
DROP POLICY IF EXISTS "Anyone can view active coupons" ON public.coupons;
CREATE POLICY "Anyone can view active coupons" ON public.coupons
  FOR SELECT USING (is_active = true);

-- Coupon usage policies
DROP POLICY IF EXISTS "Users can view own coupon usage" ON public.coupon_usage;
CREATE POLICY "Users can view own coupon usage" ON public.coupon_usage
  FOR SELECT USING (auth.uid() = user_id);

-- ==================== INDEXES ====================

CREATE INDEX IF NOT EXISTS idx_packages_user_id ON public.packages(user_id);
CREATE INDEX IF NOT EXISTS idx_packages_tracking_number ON public.packages(tracking_number);
CREATE INDEX IF NOT EXISTS idx_packages_status ON public.packages(status);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_personal_shopper_user_id ON public.personal_shopper_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_personal_shopper_status ON public.personal_shopper_requests(status);
CREATE INDEX IF NOT EXISTS idx_shipping_addresses_user_id ON public.shipping_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_package_tracking_package_id ON public.package_tracking(package_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON public.referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON public.coupons(code);

-- ==================== FUNCTIONS & TRIGGERS ====================

-- Function for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at 
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_packages_updated_at ON public.packages;
CREATE TRIGGER update_packages_updated_at 
  BEFORE UPDATE ON public.packages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_personal_shopper_updated_at ON public.personal_shopper_requests;
CREATE TRIGGER update_personal_shopper_updated_at 
  BEFORE UPDATE ON public.personal_shopper_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==================== SAMPLE DATA ====================

-- Insert sample coupons
INSERT INTO public.coupons (code, discount_type, discount_value, max_discount, min_order_value, valid_until, usage_limit, is_active)
VALUES 
  ('WELCOME50', 'Fixed', 50, NULL, 500, '2025-12-31', 1000, true),
  ('DIWALI100', 'Fixed', 100, NULL, 1000, '2025-11-15', 500, true),
  ('SAVE20', 'Percentage', 20, 500, 2000, '2025-12-31', NULL, true),
  ('FIRST500', 'Fixed', 500, NULL, 5000, '2025-12-31', 200, true),
  ('MEGA30', 'Percentage', 30, 1000, 3000, '2025-12-31', 100, true)
ON CONFLICT (code) DO NOTHING;

-- ==================== VERIFICATION ====================

-- Verify tables exist
DO $$
BEGIN
  RAISE NOTICE 'Database schema created successfully!';
  RAISE NOTICE 'Tables: user_profiles, packages, transactions, coupons, coupon_usage, personal_shopper_requests, referrals, shipping_addresses, package_tracking';
  RAISE NOTICE 'Sample coupons added: WELCOME50, DIWALI100, SAVE20, FIRST500, MEGA30';
END $$;
