import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Supabase admin client
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

// Enable logger
app.use("*", logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  })
);

// Middleware to verify user authentication
async function verifyAuth(authHeader: string | null) {
  if (!authHeader?.startsWith("Bearer ")) {
    return { user: null, error: "No authorization token" };
  }
  
  const token = authHeader.split(" ")[1];
  const { data, error } = await supabase.auth.getUser(token);
  
  if (error || !data.user) {
    return { user: null, error: "Invalid or expired token" };
  }
  
  return { user: data.user, error: null };
}

// Middleware to verify admin
async function verifyAdmin(authHeader: string | null) {
  const { user, error } = await verifyAuth(authHeader);
  if (error || !user) {
    return { isAdmin: false, error: error || "Unauthorized" };
  }
  
  // Check if user is admin (you can customize this logic)
  const adminEmails = ["gangescompany@gmail.com", "jay@ganges.world"];
  const isAdmin = adminEmails.includes(user.email || "");
  
  if (!isAdmin) {
    return { isAdmin: false, error: "Admin access required" };
  }
  
  return { isAdmin: true, error: null, userId: user.id };
}

// Health check endpoint
app.get("/make-server-9f100126/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ==================== AUTHENTICATION ROUTES ====================

// Sign up new user
app.post("/make-server-9f100126/auth/signup", async (c) => {
  try {
    const { email, password, fullName, phone } = await c.req.json();
    
    if (!email || !password || !fullName) {
      return c.json({ error: "Email, password, and full name are required" }, 400);
    }
    
    // Create user with auto email confirmation
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm since email server not configured
      user_metadata: { full_name: fullName, phone: phone || "" },
    });
    
    if (authError) {
      console.error("Signup error:", authError);
      return c.json({ error: authError.message }, 400);
    }
    
    // Generate referral code
    const referralCode = `GNG${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    // Create user profile
    const { error: profileError } = await supabase.from("user_profiles").insert({
      id: authData.user.id,
      full_name: fullName,
      email,
      phone: phone || null,
      wallet_balance: 0,
      referral_code: referralCode,
    });
    
    if (profileError) {
      console.error("Profile creation error:", profileError);
      // Don't fail signup if profile creation fails
    }
    
    return c.json({
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        fullName,
      },
      message: "Account created successfully! You can now sign in.",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return c.json({ error: "Signup failed. Please try again." }, 500);
  }
});

// Sign in user
app.post("/make-server-9f100126/auth/signin", async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }
    
    // Note: signInWithPassword must be called from the client side
    // This endpoint is for server-side validation/additional logic
    return c.json({
      message: "Please use client-side signInWithPassword",
      endpoint: "supabase.auth.signInWithPassword({ email, password })",
    });
  } catch (error) {
    console.error("Signin error:", error);
    return c.json({ error: "Sign in failed" }, 500);
  }
});

// Get current user profile
app.get("/make-server-9f100126/auth/profile", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { user, error } = await verifyAuth(authHeader);
  
  if (error || !user) {
    return c.json({ error: error || "Unauthorized" }, 401);
  }
  
  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  
  if (profileError) {
    console.error("Profile fetch error:", profileError);
    return c.json({ error: "Failed to fetch profile" }, 500);
  }
  
  return c.json({ user, profile });
});

// Update user profile
app.put("/make-server-9f100126/auth/profile", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { user, error: authError } = await verifyAuth(authHeader);
  
  if (authError || !user) {
    return c.json({ error: authError || "Unauthorized" }, 401);
  }
  
  try {
    const updates = await c.req.json();
    
    const { error } = await supabase
      .from("user_profiles")
      .update({
        full_name: updates.fullName,
        phone: updates.phone,
        address_line1: updates.addressLine1,
        address_line2: updates.addressLine2,
        city: updates.city,
        state: updates.state,
        country: updates.country || "India",
        pincode: updates.pincode,
      })
      .eq("id", user.id);
    
    if (error) {
      console.error("Profile update error:", error);
      return c.json({ error: "Failed to update profile" }, 500);
    }
    
    return c.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Profile update error:", error);
    return c.json({ error: "Update failed" }, 500);
  }
});

// ==================== PACKAGE ROUTES ====================

// Create new package/shipment
app.post("/make-server-9f100126/packages", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { user, error: authError } = await verifyAuth(authHeader);
  
  if (authError || !user) {
    return c.json({ error: authError || "Unauthorized" }, 401);
  }
  
  try {
    const packageData = await c.req.json();
    
    // Generate tracking number
    const trackingNumber = `GNG${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    const { data, error } = await supabase.from("packages").insert({
      user_id: user.id,
      tracking_number: trackingNumber,
      description: packageData.description,
      weight_kg: packageData.weight,
      declared_value: packageData.declaredValue,
      shipping_method: packageData.shippingMethod,
      status: "Pending",
      destination_address: packageData.destinationAddress,
      packing_service_wood: packageData.packingServices?.includes("Wood Crating"),
      packing_service_bubble: packageData.packingServices?.includes("Bubble Wrap"),
      packing_service_fragile: packageData.packingServices?.includes("Fragile Stickers"),
    }).select().single();
    
    if (error) {
      console.error("Package creation error:", error);
      return c.json({ error: "Failed to create package" }, 500);
    }
    
    // Add initial tracking entry
    await supabase.from("package_tracking").insert({
      package_id: data.id,
      status: "Pending",
      location: "Warehouse - Jaipur",
      description: "Shipment request received",
    });
    
    return c.json({
      success: true,
      package: data,
      trackingNumber,
      message: "Shipment request created successfully",
    });
  } catch (error) {
    console.error("Package creation error:", error);
    return c.json({ error: "Failed to create package" }, 500);
  }
});

// Get user's packages
app.get("/make-server-9f100126/packages", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { user, error: authError } = await verifyAuth(authHeader);
  
  if (authError || !user) {
    return c.json({ error: authError || "Unauthorized" }, 401);
  }
  
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  
  if (error) {
    console.error("Packages fetch error:", error);
    return c.json({ error: "Failed to fetch packages" }, 500);
  }
  
  return c.json({ packages: data });
});

// Get package by tracking number
app.get("/make-server-9f100126/packages/track/:trackingNumber", async (c) => {
  const trackingNumber = c.req.param("trackingNumber");
  
  const { data: packageData, error: packageError } = await supabase
    .from("packages")
    .select("*")
    .eq("tracking_number", trackingNumber)
    .single();
  
  if (packageError || !packageData) {
    return c.json({ error: "Package not found" }, 404);
  }
  
  // Get tracking history
  const { data: tracking, error: trackingError } = await supabase
    .from("package_tracking")
    .select("*")
    .eq("package_id", packageData.id)
    .order("created_at", { ascending: false });
  
  if (trackingError) {
    console.error("Tracking fetch error:", trackingError);
  }
  
  return c.json({
    package: packageData,
    tracking: tracking || [],
  });
});

// Update package status (Admin only)
app.put("/make-server-9f100126/packages/:id/status", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { isAdmin, error: adminError } = await verifyAdmin(authHeader);
  
  if (!isAdmin) {
    return c.json({ error: adminError || "Admin access required" }, 403);
  }
  
  try {
    const packageId = c.req.param("id");
    const { status, location, description } = await c.req.json();
    
    // Update package status
    const { error: updateError } = await supabase
      .from("packages")
      .update({ status })
      .eq("id", packageId);
    
    if (updateError) {
      console.error("Status update error:", updateError);
      return c.json({ error: "Failed to update status" }, 500);
    }
    
    // Add tracking entry
    await supabase.from("package_tracking").insert({
      package_id: packageId,
      status,
      location: location || "",
      description: description || `Package status updated to ${status}`,
    });
    
    return c.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    console.error("Status update error:", error);
    return c.json({ error: "Update failed" }, 500);
  }
});

// ==================== WALLET ROUTES ====================

// Get wallet balance
app.get("/make-server-9f100126/wallet/balance", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { user, error: authError } = await verifyAuth(authHeader);
  
  if (authError || !user) {
    return c.json({ error: authError || "Unauthorized" }, 401);
  }
  
  const { data, error } = await supabase
    .from("user_profiles")
    .select("wallet_balance")
    .eq("id", user.id)
    .single();
  
  if (error) {
    console.error("Balance fetch error:", error);
    return c.json({ error: "Failed to fetch balance" }, 500);
  }
  
  return c.json({ balance: data.wallet_balance || 0 });
});

// Get transaction history
app.get("/make-server-9f100126/wallet/transactions", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { user, error: authError } = await verifyAuth(authHeader);
  
  if (authError || !user) {
    return c.json({ error: authError || "Unauthorized" }, 401);
  }
  
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  
  if (error) {
    console.error("Transactions fetch error:", error);
    return c.json({ error: "Failed to fetch transactions" }, 500);
  }
  
  return c.json({ transactions: data });
});

// Add funds to wallet
app.post("/make-server-9f100126/wallet/add-funds", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { user, error: authError } = await verifyAuth(authHeader);
  
  if (authError || !user) {
    return c.json({ error: authError || "Unauthorized" }, 401);
  }
  
  try {
    const { amount, paymentMethod, referenceId } = await c.req.json();
    
    if (!amount || amount <= 0) {
      return c.json({ error: "Invalid amount" }, 400);
    }
    
    // Get current balance
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("wallet_balance")
      .eq("id", user.id)
      .single();
    
    const currentBalance = profile?.wallet_balance || 0;
    const newBalance = currentBalance + amount;
    
    // Update wallet balance
    const { error: updateError } = await supabase
      .from("user_profiles")
      .update({ wallet_balance: newBalance })
      .eq("id", user.id);
    
    if (updateError) {
      console.error("Wallet update error:", updateError);
      return c.json({ error: "Failed to update wallet" }, 500);
    }
    
    // Record transaction
    await supabase.from("transactions").insert({
      user_id: user.id,
      type: "Credit",
      amount,
      description: "Wallet top-up",
      payment_method: paymentMethod || "Razorpay",
      reference_id: referenceId,
      status: "Completed",
    });
    
    return c.json({
      success: true,
      newBalance,
      message: `₹${amount} added to wallet successfully`,
    });
  } catch (error) {
    console.error("Add funds error:", error);
    return c.json({ error: "Failed to add funds" }, 500);
  }
});

// Deduct from wallet (Internal use)
app.post("/make-server-9f100126/wallet/deduct", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { user, error: authError } = await verifyAuth(authHeader);
  
  if (authError || !user) {
    return c.json({ error: authError || "Unauthorized" }, 401);
  }
  
  try {
    const { amount, description, referenceId } = await c.req.json();
    
    // Get current balance
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("wallet_balance")
      .eq("id", user.id)
      .single();
    
    const currentBalance = profile?.wallet_balance || 0;
    
    if (currentBalance < amount) {
      return c.json({ error: "Insufficient balance" }, 400);
    }
    
    const newBalance = currentBalance - amount;
    
    // Update wallet balance
    await supabase
      .from("user_profiles")
      .update({ wallet_balance: newBalance })
      .eq("id", user.id);
    
    // Record transaction
    await supabase.from("transactions").insert({
      user_id: user.id,
      type: "Debit",
      amount,
      description,
      reference_id: referenceId,
      status: "Completed",
    });
    
    return c.json({ success: true, newBalance });
  } catch (error) {
    console.error("Deduct funds error:", error);
    return c.json({ error: "Failed to deduct funds" }, 500);
  }
});

// ==================== COUPON ROUTES ====================

// Validate and apply coupon
app.post("/make-server-9f100126/coupons/validate", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { user, error: authError } = await verifyAuth(authHeader);
  
  if (authError || !user) {
    return c.json({ error: authError || "Unauthorized" }, 401);
  }
  
  try {
    const { code, orderValue } = await c.req.json();
    
    // Get coupon
    const { data: coupon, error: couponError } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", code.toUpperCase())
      .eq("is_active", true)
      .single();
    
    if (couponError || !coupon) {
      return c.json({ error: "Invalid coupon code", valid: false }, 400);
    }
    
    // Check expiry
    if (coupon.valid_until && new Date(coupon.valid_until) < new Date()) {
      return c.json({ error: "Coupon has expired", valid: false }, 400);
    }
    
    // Check usage limit
    if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
      return c.json({ error: "Coupon usage limit reached", valid: false }, 400);
    }
    
    // Check minimum order value
    if (orderValue < coupon.min_order_value) {
      return c.json({
        error: `Minimum order value ₹${coupon.min_order_value} required`,
        valid: false,
      }, 400);
    }
    
    // Check if user already used this coupon
    const { data: usage } = await supabase
      .from("coupon_usage")
      .select("*")
      .eq("coupon_id", coupon.id)
      .eq("user_id", user.id)
      .single();
    
    if (usage) {
      return c.json({ error: "Coupon already used", valid: false }, 400);
    }
    
    // Calculate discount
    let discount = 0;
    if (coupon.discount_type === "Percentage") {
      discount = (orderValue * coupon.discount_value) / 100;
      if (coupon.max_discount && discount > coupon.max_discount) {
        discount = coupon.max_discount;
      }
    } else {
      discount = coupon.discount_value;
    }
    
    return c.json({
      valid: true,
      discount,
      finalAmount: orderValue - discount,
      couponId: coupon.id,
    });
  } catch (error) {
    console.error("Coupon validation error:", error);
    return c.json({ error: "Validation failed", valid: false }, 500);
  }
});

// Apply coupon (mark as used)
app.post("/make-server-9f100126/coupons/apply", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { user, error: authError } = await verifyAuth(authHeader);
  
  if (authError || !user) {
    return c.json({ error: authError || "Unauthorized" }, 401);
  }
  
  try {
    const { couponId } = await c.req.json();
    
    // Increment usage count
    const { data: coupon } = await supabase
      .from("coupons")
      .select("used_count")
      .eq("id", couponId)
      .single();
    
    await supabase
      .from("coupons")
      .update({ used_count: (coupon?.used_count || 0) + 1 })
      .eq("id", couponId);
    
    // Record usage
    await supabase.from("coupon_usage").insert({
      coupon_id: couponId,
      user_id: user.id,
    });
    
    return c.json({ success: true, message: "Coupon applied successfully" });
  } catch (error) {
    console.error("Coupon apply error:", error);
    return c.json({ error: "Failed to apply coupon" }, 500);
  }
});

// Get all active coupons (public)
app.get("/make-server-9f100126/coupons", async (c) => {
  const { data, error } = await supabase
    .from("coupons")
    .select("code, discount_type, discount_value, min_order_value, valid_until")
    .eq("is_active", true)
    .gte("valid_until", new Date().toISOString());
  
  if (error) {
    console.error("Coupons fetch error:", error);
    return c.json({ error: "Failed to fetch coupons" }, 500);
  }
  
  return c.json({ coupons: data });
});

// ==================== PERSONAL SHOPPER ROUTES ====================

// Submit personal shopper request
app.post("/make-server-9f100126/personal-shopper/request", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { user, error: authError } = await verifyAuth(authHeader);
  
  if (authError || !user) {
    return c.json({ error: authError || "Unauthorized" }, 401);
  }
  
  try {
    const requestData = await c.req.json();
    
    const { data, error } = await supabase.from("personal_shopper_requests").insert({
      user_id: user.id,
      product_url: requestData.productUrl,
      product_name: requestData.productName,
      quantity: requestData.quantity || 1,
      budget: requestData.budget,
      size_color_preferences: requestData.preferences,
      additional_notes: requestData.notes,
      status: "Pending",
    }).select().single();
    
    if (error) {
      console.error("Request creation error:", error);
      return c.json({ error: "Failed to create request" }, 500);
    }
    
    return c.json({
      success: true,
      request: data,
      message: "Request submitted successfully. We'll contact you soon!",
    });
  } catch (error) {
    console.error("Personal shopper request error:", error);
    return c.json({ error: "Failed to submit request" }, 500);
  }
});

// Get user's personal shopper requests
app.get("/make-server-9f100126/personal-shopper/requests", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { user, error: authError } = await verifyAuth(authHeader);
  
  if (authError || !user) {
    return c.json({ error: authError || "Unauthorized" }, 401);
  }
  
  const { data, error } = await supabase
    .from("personal_shopper_requests")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  
  if (error) {
    console.error("Requests fetch error:", error);
    return c.json({ error: "Failed to fetch requests" }, 500);
  }
  
  return c.json({ requests: data });
});

// ==================== REFERRAL ROUTES ====================

// Get referral code and stats
app.get("/make-server-9f100126/referrals/my-code", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { user, error: authError } = await verifyAuth(authHeader);
  
  if (authError || !user) {
    return c.json({ error: authError || "Unauthorized" }, 401);
  }
  
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("referral_code")
    .eq("id", user.id)
    .single();
  
  // Get referral count
  const { count } = await supabase
    .from("referrals")
    .select("*", { count: "exact", head: true })
    .eq("referrer_id", user.id)
    .eq("status", "Completed");
  
  return c.json({
    referralCode: profile?.referral_code,
    totalReferrals: count || 0,
    rewardPerReferral: 200,
    totalEarned: (count || 0) * 200,
  });
});

// Apply referral code during signup
app.post("/make-server-9f100126/referrals/apply", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { user, error: authError } = await verifyAuth(authHeader);
  
  if (authError || !user) {
    return c.json({ error: authError || "Unauthorized" }, 401);
  }
  
  try {
    const { referralCode } = await c.req.json();
    
    // Find referrer
    const { data: referrer } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("referral_code", referralCode.toUpperCase())
      .single();
    
    if (!referrer) {
      return c.json({ error: "Invalid referral code" }, 400);
    }
    
    // Create referral record
    await supabase.from("referrals").insert({
      referrer_id: referrer.id,
      referred_user_id: user.id,
      status: "Completed",
    });
    
    // Add reward to referrer's wallet
    const { data: referrerProfile } = await supabase
      .from("user_profiles")
      .select("wallet_balance")
      .eq("id", referrer.id)
      .single();
    
    await supabase
      .from("user_profiles")
      .update({ wallet_balance: (referrerProfile?.wallet_balance || 0) + 200 })
      .eq("id", referrer.id);
    
    // Record transaction
    await supabase.from("transactions").insert({
      user_id: referrer.id,
      type: "Credit",
      amount: 200,
      description: "Referral reward",
      status: "Completed",
    });
    
    return c.json({ success: true, message: "Referral applied successfully" });
  } catch (error) {
    console.error("Referral apply error:", error);
    return c.json({ error: "Failed to apply referral" }, 500);
  }
});

// ==================== ADMIN ROUTES ====================

// Get admin dashboard stats
app.get("/make-server-9f100126/admin/stats", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { isAdmin, error: adminError } = await verifyAdmin(authHeader);
  
  if (!isAdmin) {
    return c.json({ error: adminError || "Admin access required" }, 403);
  }
  
  // Get total users
  const { count: totalUsers } = await supabase
    .from("user_profiles")
    .select("*", { count: "exact", head: true });
  
  // Get total packages
  const { count: totalPackages } = await supabase
    .from("packages")
    .select("*", { count: "exact", head: true });
  
  // Get pending packages
  const { count: pendingPackages } = await supabase
    .from("packages")
    .select("*", { count: "exact", head: true })
    .eq("status", "Pending");
  
  // Get total revenue (sum of all debit transactions)
  const { data: transactions } = await supabase
    .from("transactions")
    .select("amount")
    .eq("type", "Debit");
  
  const totalRevenue = transactions?.reduce((sum, t) => sum + Number(t.amount), 0) || 0;
  
  // Get personal shopper requests
  const { count: shopperRequests } = await supabase
    .from("personal_shopper_requests")
    .select("*", { count: "exact", head: true })
    .eq("status", "Pending");
  
  return c.json({
    totalUsers: totalUsers || 0,
    totalPackages: totalPackages || 0,
    pendingPackages: pendingPackages || 0,
    totalRevenue,
    pendingShopperRequests: shopperRequests || 0,
  });
});

// Get all users (Admin)
app.get("/make-server-9f100126/admin/users", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { isAdmin, error: adminError } = await verifyAdmin(authHeader);
  
  if (!isAdmin) {
    return c.json({ error: adminError || "Admin access required" }, 403);
  }
  
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .order("created_at", { ascending: false });
  
  if (error) {
    console.error("Users fetch error:", error);
    return c.json({ error: "Failed to fetch users" }, 500);
  }
  
  return c.json({ users: data });
});

// Get all packages (Admin)
app.get("/make-server-9f100126/admin/packages", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { isAdmin, error: adminError } = await verifyAdmin(authHeader);
  
  if (!isAdmin) {
    return c.json({ error: adminError || "Admin access required" }, 403);
  }
  
  const { data, error } = await supabase
    .from("packages")
    .select(`
      *,
      user_profiles (
        full_name,
        email,
        phone
      )
    `)
    .order("created_at", { ascending: false });
  
  if (error) {
    console.error("Packages fetch error:", error);
    return c.json({ error: "Failed to fetch packages" }, 500);
  }
  
  return c.json({ packages: data });
});

// Get all personal shopper requests (Admin)
app.get("/make-server-9f100126/admin/personal-shopper", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { isAdmin, error: adminError } = await verifyAdmin(authHeader);
  
  if (!isAdmin) {
    return c.json({ error: adminError || "Admin access required" }, 403);
  }
  
  const { data, error } = await supabase
    .from("personal_shopper_requests")
    .select(`
      *,
      user_profiles (
        full_name,
        email,
        phone
      )
    `)
    .order("created_at", { ascending: false });
  
  if (error) {
    console.error("Shopper requests fetch error:", error);
    return c.json({ error: "Failed to fetch requests" }, 500);
  }
  
  return c.json({ requests: data });
});

// Update personal shopper request (Admin)
app.put("/make-server-9f100126/admin/personal-shopper/:id", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { isAdmin, error: adminError } = await verifyAdmin(authHeader);
  
  if (!isAdmin) {
    return c.json({ error: adminError || "Admin access required" }, 403);
  }
  
  try {
    const requestId = c.req.param("id");
    const updates = await c.req.json();
    
    const { error } = await supabase
      .from("personal_shopper_requests")
      .update({
        status: updates.status,
        quote_amount: updates.quoteAmount,
        service_fee: updates.serviceFee,
        admin_notes: updates.adminNotes,
      })
      .eq("id", requestId);
    
    if (error) {
      console.error("Update error:", error);
      return c.json({ error: "Failed to update request" }, 500);
    }
    
    return c.json({ success: true, message: "Request updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    return c.json({ error: "Update failed" }, 500);
  }
});

// Create coupon (Admin)
app.post("/make-server-9f100126/admin/coupons", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { isAdmin, error: adminError } = await verifyAdmin(authHeader);
  
  if (!isAdmin) {
    return c.json({ error: adminError || "Admin access required" }, 403);
  }
  
  try {
    const couponData = await c.req.json();
    
    const { data, error } = await supabase.from("coupons").insert({
      code: couponData.code.toUpperCase(),
      discount_type: couponData.discountType,
      discount_value: couponData.discountValue,
      max_discount: couponData.maxDiscount,
      min_order_value: couponData.minOrderValue || 0,
      valid_until: couponData.validUntil,
      usage_limit: couponData.usageLimit,
      is_active: true,
    }).select().single();
    
    if (error) {
      console.error("Coupon creation error:", error);
      return c.json({ error: "Failed to create coupon" }, 500);
    }
    
    return c.json({ success: true, coupon: data });
  } catch (error) {
    console.error("Coupon creation error:", error);
    return c.json({ error: "Failed to create coupon" }, 500);
  }
});

// ==================== DATABASE INITIALIZATION ====================

// Initialize database with sample data (run once)
app.post("/make-server-9f100126/admin/init-db", async (c) => {
  const authHeader = c.req.header("Authorization");
  const { isAdmin, error: adminError } = await verifyAdmin(authHeader);
  
  if (!isAdmin) {
    return c.json({ error: adminError || "Admin access required" }, 403);
  }
  
  try {
    // Create sample coupons
    const sampleCoupons = [
      {
        code: "WELCOME50",
        discount_type: "Fixed",
        discount_value: 50,
        min_order_value: 500,
        valid_until: "2025-12-31",
        usage_limit: 1000,
        is_active: true,
      },
      {
        code: "DIWALI100",
        discount_type: "Fixed",
        discount_value: 100,
        min_order_value: 1000,
        valid_until: "2025-11-15",
        usage_limit: 500,
        is_active: true,
      },
      {
        code: "SAVE20",
        discount_type: "Percentage",
        discount_value: 20,
        max_discount: 500,
        min_order_value: 2000,
        valid_until: "2025-12-31",
        usage_limit: null,
        is_active: true,
      },
    ];
    
    for (const coupon of sampleCoupons) {
      await supabase.from("coupons").upsert(coupon, { onConflict: "code" });
    }
    
    return c.json({
      success: true,
      message: "Database initialized with sample data",
    });
  } catch (error) {
    console.error("DB initialization error:", error);
    return c.json({ error: "Initialization failed" }, 500);
  }
});

Deno.serve(app.fetch);
