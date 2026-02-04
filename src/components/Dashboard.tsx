import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, Package, Truck, ShoppingCart, Store, Tag, Ticket,
  XCircle, HelpCircle, Calculator, FileText, Map, Gift, Menu, X,
  Copy, Wallet, ChevronRight, Home, MessageCircle, TrendingUp, Users,
  DollarSign, Clock, CheckCircle, AlertCircle, Sparkles, User, Upload,
  Download, Settings, CreditCard, LogOut, Loader2, Lock, Bookmark,
  MapPin, Book, ShoppingBag, Percent, Archive, Edit, Plus, ExternalLink
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';
import logo from 'figma:asset/35424f6f7581dcd0957679d7cd3c9d5bfc8f9f2a.png';
import { ProhibitedSection } from './ProhibitedSection';
import { FAQSection } from './FAQSection';
import { IndianStoresSection } from './IndianStoresSection';
import { ShipRequestForm } from './ShipRequestForm';
import { PersonalShopperRequest } from './PersonalShopperRequest';
import { supabase } from '../lib/supabaseClient';
import type { UserProfile, Package as PackageType, Transaction, Coupon } from '../types/supabase';
import { packageService, walletService, couponService, referralService } from '../services/api.service';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';

interface DashboardProps {
  onBackToHome?: () => void;
}

interface ShippingAddress {
  id?: string;
  name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export function Dashboard({ onBackToHome }: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showShipRequest, setShowShipRequest] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>();
  const [showPersonalShopperRequest, setShowPersonalShopperRequest] = useState(false);
  const [calcWeight, setCalcWeight] = useState('1');
  const [calcCountry, setCalcCountry] = useState('USA');
  const [showCalcResults, setShowCalcResults] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<'Economy' | 'Ganges One'>('Economy');

  // Real user data
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [lockerNumber, setLockerNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit profile states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    phone: '',
    country: ''
  });

  // Address book states
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [newAddress, setNewAddress] = useState<ShippingAddress>({
    name: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });

  // Document upload
  const [uploading, setUploading] = useState(false);

  // Packing options
  const [packingOptions, setPackingOptions] = useState({
    discardShoeBoxes: false,
    extraPackaging: false,
    giftWrap: false,
    giftNote: ''
  });

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        toast.error('Please sign in to access dashboard');
        onBackToHome?.();
        return;
      }

      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        throw new Error('Failed to load profile');
      }

      setUserProfile(profile);
      setWalletBalance(profile?.wallet_balance || 0);
      setReferralCode(profile?.referral_code || '');
      setLockerNumber(profile?.locker_number || '');
      setEditForm({
        full_name: profile?.full_name || '',
        phone: profile?.phone || '',
        country: profile?.country || 'India'
      });

      // Fetch packages
      try {
        const packagesData = await packageService.getPackages();
        setPackages(packagesData || []);
      } catch (err) {
        console.error('Packages fetch error:', err);
        setPackages([]);
      }

      // Fetch transactions
      try {
        const transactionsData = await walletService.getTransactions();
        setTransactions(transactionsData || []);
      } catch (err) {
        console.error('Transactions fetch error:', err);
        setTransactions([]);
      }

      // Fetch active coupons
      try {
        const couponsData = await couponService.getActiveCoupons();
        setCoupons(couponsData || []);
      } catch (err) {
        console.error('Coupons fetch error:', err);
        setCoupons([]);
      }

      // Fetch addresses
      try {
        const { data: addressData } = await supabase
          .from('shipping_addresses')
          .select('*')
          .eq('user_id', user.id);
        setAddresses(addressData || []);
      } catch (err) {
        console.error('Addresses fetch error:', err);
      }

    } catch (err: any) {
      console.error('Dashboard data fetch error:', err);
      setError(err.message || 'Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
      onBackToHome?.();
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  const handleCopyAddress = () => {
    const address = `${userProfile?.full_name || 'Customer'}\nLocker: ${lockerNumber}\nGanges, Horizon Tower\nMalviya Nagar, Jaipur, Rajasthan\nNear World Trade Park\nJaipur - 302017, Rajasthan, India\nContact: +91 82098 93843`;
    navigator.clipboard.writeText(address).then(() => {
      toast.success('Address copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy address');
    });
  };

  const handleCopyReferralCode = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode).then(() => {
        toast.success('Referral code copied!');
      }).catch(() => {
        toast.error('Failed to copy code');
      });
    }
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success('Coupon code copied!');
    }).catch(() => {
      toast.error('Failed to copy coupon');
    });
  };

  const handleWhatsAppPayment = () => {
    const message = `Hi, I want to add funds to my Ganges Lite wallet.\n\nUser: ${userProfile?.full_name}\nLocker: ${lockerNumber}\nEmail: ${userProfile?.email}\nPhone: ${userProfile?.phone || 'Not provided'}\n\nI will send payment confirmation screenshot.`;
    const whatsappUrl = `https://wa.me/918209893843?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Opening WhatsApp...');
  };

  const handleUpdateProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: editForm.full_name,
          phone: editForm.phone,
          country: editForm.country
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profile updated successfully!');
      setIsEditingProfile(false);
      fetchUserData();
    } catch (err) {
      console.error('Update error:', err);
      toast.error('Failed to update profile');
    }
  };

  const handleAddAddress = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('shipping_addresses')
        .insert({
          user_id: user.id,
          ...newAddress
        });

      if (error) throw error;

      toast.success('Address added successfully!');
      setShowAddressDialog(false);
      setNewAddress({
        name: '',
        phone: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
      });
      fetchUserData();
    } catch (err) {
      console.error('Add address error:', err);
      toast.error('Failed to add address');
    }
  };

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUploading(true);

      const fileName = `${user.id}/${Date.now()}_${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      toast.success('Document uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err);
      toast.error('Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  // ALL MENU ITEMS - COMPLETE LIST
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'virtual-address', icon: Map, label: 'Virtual Address' },
    { id: 'locker', icon: Lock, label: 'Locker' },
    { id: 'shipment', icon: Truck, label: 'Shipment' },
    { id: 'personal-shopper', icon: ShoppingCart, label: 'Personal Shopper' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' },
    { id: 'address-book', icon: MapPin, label: 'Address Book' },
    { id: 'documents', icon: FileText, label: 'Documents' },
    { id: 'shipping-preferences', icon: Settings, label: 'Shipping Preferences' },
    { id: 'indian-stores', icon: Store, label: 'Indian Stores' },
    { id: 'store-offers', icon: Percent, label: 'Store Offers' },
    { id: 'coupons', icon: Ticket, label: 'Coupons Available' },
    { id: 'prohibited', icon: XCircle, label: 'Prohibited Items' },
    { id: 'faq', icon: HelpCircle, label: 'FAQ' },
    { id: 'calculator', icon: Calculator, label: 'Shipping Calculator' },
    { id: 'blog', icon: Book, label: 'Blog' },
    { id: 'refer', icon: Gift, label: 'Refer and Earn' },
  ];

  const calculateShipping = () => {
    const weight = parseFloat(calcWeight) || 1;
    const ceilingWeight = Math.ceil(weight); // Round up to nearest kg

    const rates = {
      'Economy': 2500,
      'Ganges One': 3500
    };

    const rate = rates[shippingMethod];
    const cost = ceilingWeight * rate;

    setShowCalcResults(true);
    toast.success(`Estimated cost: ₹${cost.toLocaleString()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    const isDatabaseError = error.includes('user_profiles') || error.includes('schema cache') || error.includes('table');

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-8">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl text-center mb-4">
              {isDatabaseError ? '🚨 Database Setup Required!' : 'Error Loading Dashboard'}
            </h2>

            {isDatabaseError ? (
              <div className="space-y-4 text-left">
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <p className="text-red-800 mb-2">
                    <strong>The database tables haven't been created yet!</strong>
                  </p>
                  <p className="text-red-700 text-sm">
                    Error: {error}
                  </p>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <h3 className="text-lg mb-2">✅ Fix This Now (5 minutes):</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Open your Supabase dashboard</li>
                    <li>Go to <strong>SQL Editor</strong></li>
                    <li>Click <strong>New query</strong></li>
                    <li>Open file: <code className="bg-white px-2 py-1 rounded">/supabase/migrations/001_initial_schema.sql</code></li>
                    <li>Copy ALL 450+ lines</li>
                    <li>Paste into SQL Editor</li>
                    <li>Click <strong>RUN</strong></li>
                    <li>Wait for "Success" message</li>
                    <li>Refresh this page</li>
                  </ol>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={fetchUserData}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    I've Run the SQL - Refresh Now
                  </Button>
                  <Button
                    onClick={onBackToHome}
                    variant="outline"
                    className="flex-1"
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600 text-center mb-4">{error}</p>
                <div className="space-y-2">
                  <Button onClick={fetchUserData} className="w-full">
                    Try Again
                  </Button>
                  <Button onClick={onBackToHome} variant="outline" className="w-full">
                    Back to Home
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const packageStats = {
    warehouse: packages.filter(p => p.status === 'Warehouse').length,
    inTransit: packages.filter(p => p.status === 'In Transit').length,
    delivered: packages.filter(p => p.status === 'Delivered').length,
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Welcome Card */}
            <Card className="border-2 border-orange-200">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-pink-600 text-white">
                <div>
                  <p className="text-sm opacity-90">Welcome back</p>
                  <CardTitle className="text-3xl">{userProfile?.full_name || 'Customer'} 👋</CardTitle>
                  <p className="text-sm opacity-90 mt-2">Locker: {lockerNumber}</p>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-200">
                    <div className="flex items-center space-x-3">
                      <div className="bg-yellow-100 p-3 rounded-lg">
                        <Package className="text-yellow-600" size={28} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Referral Code</p>
                        <p className="text-xl">{referralCode || 'Loading...'}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <Wallet className="text-green-600" size={28} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Wallet Balance</p>
                        <p className="text-xl">₹{walletBalance.toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Package Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'At Warehouse', count: packageStats.warehouse, icon: Package, iconColor: 'text-blue-500', barColor: 'bg-blue-500' },
                { label: 'In Transit', count: packageStats.inTransit, icon: Truck, iconColor: 'text-orange-500', barColor: 'bg-orange-500' },
                { label: 'Delivered', count: packageStats.delivered, icon: CheckCircle, iconColor: 'text-green-500', barColor: 'bg-green-500' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <stat.icon className={`mx-auto mb-3 ${stat.iconColor}`} size={48} />
                      <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
                      <p className="text-4xl mb-4">{stat.count}</p>
                      <div className={`h-2 ${stat.barColor} rounded-full`}></div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent Packages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Packages
                  <Button
                    onClick={() => setActiveSection('locker')}
                    variant="outline"
                    size="sm"
                  >
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {packages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No packages yet</p>
                    <p className="text-sm mt-2">Start shopping and ship to your Ganges address!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {packages.slice(0, 3).map((pkg, index) => {
                      const statusColors = {
                        'Pending': { text: 'text-gray-600', bg: 'bg-gray-50' },
                        'Warehouse': { text: 'text-blue-600', bg: 'bg-blue-50' },
                        'In Transit': { text: 'text-orange-600', bg: 'bg-orange-50' },
                        'Customs': { text: 'text-purple-600', bg: 'bg-purple-50' },
                        'Out for Delivery': { text: 'text-yellow-600', bg: 'bg-yellow-50' },
                        'Delivered': { text: 'text-green-600', bg: 'bg-green-50' },
                      };

                      const colors = statusColors[pkg.status] || statusColors['Pending'];

                      return (
                        <motion.div
                          key={pkg.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`${colors.bg} p-4 rounded-lg`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="mb-1">{pkg.description || 'Package'}</p>
                              <p className="text-sm text-gray-600">Tracking: {pkg.tracking_number}</p>
                              <p className="text-sm text-gray-600">Weight: {pkg.weight_kg} kg</p>
                              <p className="text-sm text-gray-600">Method: {pkg.shipping_method}</p>
                            </div>
                            <div className="text-right">
                              <span className={`${colors.text} px-3 py-1 rounded-full text-sm bg-white`}>
                                {pkg.status}
                              </span>
                              <p className="text-sm text-gray-600 mt-2">
                                {new Date(pkg.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'virtual-address':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Map className="mr-2" />
                  Your Virtual Indian Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-orange-50 to-pink-50 p-6 rounded-lg border-2 border-orange-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Ship your packages to:</p>
                      <div className="space-y-1">
                        <p className="text-lg">{userProfile?.full_name || 'Your Name'}</p>
                        <p className="text-gray-700">Locker: {lockerNumber}</p>
                        <p className="text-gray-700">Ganges, Horizon Tower</p>
                        <p className="text-gray-700">Malviya Nagar, Jaipur, Rajasthan</p>
                        <p className="text-gray-700">Near World Trade Park</p>
                        <p className="text-gray-700">Jaipur - 302017, Rajasthan, India</p>
                        <p className="text-gray-700">Contact: +91 82098 93843</p>
                      </div>
                    </div>
                    <Button onClick={handleCopyAddress} className="bg-orange-500 hover:bg-orange-600">
                      <Copy className="mr-2" size={16} />
                      Copy Address
                    </Button>
                  </div>
                  <div className="mt-6 p-4 bg-white rounded-lg">
                    <p className="text-sm text-gray-600">
                      📦 Use this address when shopping from Amazon India, Flipkart, Myntra, and more!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'locker':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Locker Policy */}
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <h3 className="text-lg mb-3 flex items-center">
                  <Clock className="mr-2 text-blue-600" />
                  Locker Storage Policy
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>✅ <strong>FREE Storage:</strong> First 20 days - No charges!</p>
                  <p>⚠️ <strong>After 20 days:</strong> ₹100 per day from 21st day onwards</p>
                  <p>💳 <strong>Payment:</strong> Automatically deducted from your wallet</p>
                  <p>📦 <strong>To Ship:</strong> Create a ship request below to get your parcel delivered</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Lock className="mr-2" />
                    My Locker - Packages at Warehouse
                  </span>
                  <Button
                    onClick={fetchUserData}
                    variant="outline"
                    size="sm"
                  >
                    Refresh
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {packages.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">No packages in locker yet</p>
                    <p className="text-sm">Your packages will appear here once they arrive at our warehouse</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {packages.map((pkg) => {
                      const statusColors = {
                        'Pending': { text: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' },
                        'Warehouse': { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
                        'In Transit': { text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
                        'Customs': { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
                        'Out for Delivery': { text: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
                        'Delivered': { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
                      };

                      const colors = statusColors[pkg.status] || statusColors['Pending'];

                      const daysInLocker = Math.floor((new Date().getTime() - new Date(pkg.created_at).getTime()) / (1000 * 60 * 60 * 24));
                      const storageCharge = daysInLocker > 20 ? (daysInLocker - 20) * 100 : 0;

                      return (
                        <Card key={pkg.id} className={`border-2 ${colors.border}`}>
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="text-lg mb-2">{pkg.description || 'Package'}</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                  <p>Tracking: {pkg.tracking_number}</p>
                                  <p>Status: <span className={colors.text}>{pkg.status}</span></p>
                                  <p>Weight: {pkg.weight_kg} kg</p>
                                  <p>Method: {pkg.shipping_method}</p>
                                  <p>Value: ₹{pkg.declared_value}</p>
                                  <p>Days in locker: {daysInLocker}</p>
                                  {storageCharge > 0 && (
                                    <p className="col-span-2 text-red-600">
                                      Storage charge: ₹{storageCharge} (will be deducted from wallet)
                                    </p>
                                  )}
                                </div>
                                {pkg.status === 'Warehouse' && (
                                  <Button
                                    className="mt-4"
                                    onClick={() => {
                                      setSelectedPackage(pkg.id);
                                      setShowShipRequest(true);
                                    }}
                                  >
                                    Create Ship Request
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {showShipRequest && (
              <ShipRequestForm
                packageId={selectedPackage}
                onClose={() => {
                  setShowShipRequest(false);
                  setSelectedPackage(undefined);
                }}
              />
            )}
          </motion.div>
        );

      case 'shipment':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="mr-2" />
                  Shipment Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {packages.filter(p => p.status === 'In Transit' || p.status === 'Out for Delivery' || p.status === 'Delivered').length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Truck className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">No active shipments</p>
                      <p className="text-sm">Shipments in transit will appear here</p>
                    </div>
                  ) : (
                    packages.filter(p => p.status === 'In Transit' || p.status === 'Out for Delivery' || p.status === 'Delivered').map((pkg) => (
                      <Card key={pkg.id} className="border-2 border-orange-200">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm text-gray-600">Tracking ID</p>
                                <p className="">{pkg.tracking_number}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Courier Partner</p>
                                <p className="">{pkg.courier_partner || 'Ganges Express'}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Weight</p>
                                <p className="">{pkg.weight_kg} kg</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Expected Delivery</p>
                                <p className="">{pkg.expected_delivery || 'Calculating...'}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Status</p>
                                <p className="text-orange-600">{pkg.status}</p>
                              </div>
                            </div>

                            {/* Tracking Timeline */}
                            <div className="space-y-4 mt-6">
                              <div className="flex items-start gap-4">
                                <div className="bg-green-500 rounded-full p-2">
                                  <CheckCircle className="text-white" size={20} />
                                </div>
                                <div>
                                  <p className="text-sm">Package Received at Warehouse</p>
                                  <p className="text-xs text-gray-500">{new Date(pkg.created_at).toLocaleDateString()}</p>
                                </div>
                              </div>

                              <div className="flex items-start gap-4">
                                <div className={`${pkg.status === 'In Transit' || pkg.status === 'Out for Delivery' || pkg.status === 'Delivered' ? 'bg-orange-500' : 'bg-gray-300'} rounded-full p-2`}>
                                  <Truck className="text-white" size={20} />
                                </div>
                                <div>
                                  <p className="text-sm">In Transit</p>
                                  <p className="text-xs text-gray-500">Currently shipping</p>
                                </div>
                              </div>

                              <div className="flex items-start gap-4">
                                <div className={`${pkg.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-300'} rounded-full p-2`}>
                                  <CheckCircle className="text-white" size={20} />
                                </div>
                                <div>
                                  <p className="text-sm">Delivered</p>
                                  <p className="text-xs text-gray-500">{pkg.status === 'Delivered' ? 'Completed' : 'Pending'}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'personal-shopper':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {!showPersonalShopperRequest ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="mr-2" />
                    Personal Shopper Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
                      <h3 className="text-xl mb-4">🛍️ We Shop For You!</h3>
                      <p className="text-gray-700 mb-4">
                        Can't shop from Indian stores? No problem! We'll purchase products on your behalf.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Service Fee</p>
                          <p className="text-2xl text-purple-600">7% of product value</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Processing Time</p>
                          <p className="text-2xl text-purple-600">1-2 business days</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => setShowPersonalShopperRequest(true)}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        Request Personal Shopper
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-lg">How it works:</h4>
                      <div className="grid md:grid-cols-4 gap-4">
                        {[
                          { step: '1', title: 'Submit Request', desc: 'Provide product details & URL' },
                          { step: '2', title: 'Get Quote', desc: 'We calculate total cost' },
                          { step: '3', title: 'Make Payment', desc: 'Pay via WhatsApp' },
                          { step: '4', title: 'We Shop', desc: 'We buy and ship to you' }
                        ].map((item) => (
                          <div key={item.step} className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <span className="text-xl text-purple-600">{item.step}</span>
                            </div>
                            <p className="text-sm mb-1">{item.title}</p>
                            <p className="text-xs text-gray-600">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <PersonalShopperRequest onClose={() => setShowPersonalShopperRequest(false)} />
            )}
          </motion.div>
        );

      case 'profile':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <User className="mr-2" />
                    Profile Information
                  </span>
                  {!isEditingProfile ? (
                    <Button
                      onClick={() => setIsEditingProfile(true)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="mr-2" size={16} />
                      Edit Profile
                    </Button>
                  ) : null}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditingProfile ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        value={editForm.full_name}
                        onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <Input
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Country</Label>
                      <Input
                        value={editForm.country}
                        onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleUpdateProfile}>
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditingProfile(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Full Name</label>
                      <p className="text-lg">{userProfile?.full_name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Email</label>
                      <p className="text-lg">{userProfile?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Phone</label>
                      <p className="text-lg">{userProfile?.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Locker Number</label>
                      <p className="text-lg">{lockerNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Referral Code</label>
                      <p className="text-lg flex items-center gap-2">
                        {referralCode}
                        <Copy
                          className="w-4 h-4 cursor-pointer text-orange-500"
                          onClick={handleCopyReferralCode}
                        />
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Member Since</label>
                      <p className="text-lg">
                        {new Date(userProfile?.created_at || '').toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Country</label>
                      <p className="text-lg">{userProfile?.country || 'India'}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'wallet':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wallet className="mr-2" />
                  My Wallet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-xl mb-6">
                  <p className="text-sm opacity-90 mb-2">Available Balance</p>
                  <p className="text-4xl mb-4">₹{walletBalance.toLocaleString()}</p>
                  <div className="flex gap-4">
                    <Button
                      onClick={handleWhatsAppPayment}
                      className="bg-white text-green-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <MessageCircle size={18} />
                      Add Funds via WhatsApp
                    </Button>
                  </div>
                  <div className="mt-4 bg-white/20 backdrop-blur p-3 rounded-lg">
                    <p className="text-sm flex items-center gap-2">
                      <CreditCard size={16} />
                      Payment Gateway: <span className="bg-white/30 px-2 py-1 rounded">Stripe Coming Soon</span>
                    </p>
                  </div>
                </div>

                {/* Payment Instructions */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="text-lg mb-3 flex items-center gap-2">
                    <MessageCircle className="text-blue-600" />
                    How to Add Funds
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>Click "Add Funds via WhatsApp" button above</li>
                    <li>Chat with us about the amount you want to add</li>
                    <li>We'll provide payment details (UPI/Bank Transfer)</li>
                    <li>Make payment and send screenshot</li>
                    <li>Admin will approve and credit your wallet within 1 hour</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg">Recent Transactions</h3>
                  {transactions.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No transactions yet</p>
                  ) : (
                    transactions.slice(0, 10).map((txn) => (
                      <div key={txn.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p>{txn.description}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(txn.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <p className={`text-lg ${txn.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                          {txn.type === 'Credit' ? '+' : '-'}₹{txn.amount}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'address-book':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <MapPin className="mr-2" />
                    Address Book
                  </span>
                  <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="mr-2" size={16} />
                        Add New Address
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Address</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Full Name</Label>
                          <Input
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input
                            value={newAddress.phone}
                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Address Line 1</Label>
                          <Input
                            value={newAddress.address_line1}
                            onChange={(e) => setNewAddress({ ...newAddress, address_line1: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Address Line 2</Label>
                          <Input
                            value={newAddress.address_line2}
                            onChange={(e) => setNewAddress({ ...newAddress, address_line2: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>City</Label>
                            <Input
                              value={newAddress.city}
                              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>State</Label>
                            <Input
                              value={newAddress.state}
                              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Pincode</Label>
                            <Input
                              value={newAddress.pincode}
                              onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Country</Label>
                            <Input
                              value={newAddress.country}
                              onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                            />
                          </div>
                        </div>
                        <Button onClick={handleAddAddress} className="w-full">
                          Save Address
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {addresses.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">No addresses saved</p>
                    <p className="text-sm">Add your shipping address for faster checkout</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {addresses.map((addr) => (
                      <Card key={addr.id} className="border-2 border-orange-200">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg mb-2">{addr.name}</h3>
                              <p>{addr.address_line1}</p>
                              {addr.address_line2 && <p>{addr.address_line2}</p>}
                              <p>{addr.city}, {addr.state}</p>
                              <p>{addr.pincode}</p>
                              <p>{addr.country}</p>
                              <p className="mt-2">Phone: {addr.phone}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'documents':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2" />
                  Documents & ID Proof
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    📄 Please upload your ID proof (Passport, Aadhaar, Driver's License, etc.) for verification purposes.
                  </p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="mb-4">Upload your ID Proof</p>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleDocumentUpload}
                    disabled={uploading}
                    className="max-w-xs mx-auto"
                  />
                  {uploading && (
                    <p className="mt-4 text-sm text-gray-600">
                      <Loader2 className="inline animate-spin mr-2" size={16} />
                      Uploading...
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'shipping-preferences':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2" />
                  Shipping Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg mb-4">Default Shipping Method</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="border-2 border-orange-500 bg-orange-50">
                      <CardContent className="p-6 text-center">
                        <p className="mb-2">Economy Shipping</p>
                        <p className="text-2xl mb-2">₹2500/kg</p>
                        <p className="text-sm text-gray-600">15-20 days delivery</p>
                        <p className="text-sm text-green-600 mt-2">✓ Currently Selected</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-gray-200">
                      <CardContent className="p-6 text-center">
                        <p className="mb-2">Ganges One Express</p>
                        <p className="text-2xl mb-2">₹3500/kg</p>
                        <p className="text-sm text-gray-600">7-15 days delivery</p>
                        <Button size="sm" className="mt-2">Select</Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Additional Packing Options */}
                <div>
                  <h3 className="text-lg mb-4">Additional Packing Options (₹90 each)</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="">Discard Shoe Boxes</p>
                        <p className="text-sm text-gray-600">Save space and weight</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">₹90</span>
                        <Checkbox
                          checked={packingOptions.discardShoeBoxes}
                          onCheckedChange={(checked: boolean) =>
                            setPackingOptions({ ...packingOptions, discardShoeBoxes: checked as boolean })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="">Extra Packaging Material</p>
                        <p className="text-sm text-gray-600">Additional bubble wrap and protection</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">₹90</span>
                        <Checkbox
                          checked={packingOptions.extraPackaging}
                          onCheckedChange={(checked: boolean) =>
                            setPackingOptions({ ...packingOptions, extraPackaging: checked as boolean })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="">Gift Wrap</p>
                        <p className="text-sm text-gray-600">Beautiful gift wrapping</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">₹90</span>
                        <Checkbox
                          checked={packingOptions.giftWrap}
                          onCheckedChange={(checked: boolean) =>
                            setPackingOptions({ ...packingOptions, giftWrap: checked as boolean })
                          }
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Label>Gift Note (₹90)</Label>
                      <Textarea
                        placeholder="Add a personalized message..."
                        value={packingOptions.giftNote}
                        onChange={(e) => setPackingOptions({ ...packingOptions, giftNote: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg mb-4">Package Consolidation</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      ✓ Automatically consolidate packages arriving within 7 days
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                      Save up to 80% on shipping costs by combining multiple packages
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Package arrival notifications</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Shipping updates via email</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Promotional offers & discounts</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'indian-stores':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <IndianStoresSection />
          </motion.div>
        );

      case 'store-offers':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-3xl mb-6">🎉 Exclusive Store Offers</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { store: 'Amazon India', offer: 'Flat 10% OFF on Electronics', code: 'GANGES10', color: 'from-orange-500 to-yellow-600' },
                { store: 'Flipkart', offer: '₹500 OFF on orders above ₹3000', code: 'FLIP500', color: 'from-blue-500 to-indigo-600' },
                { store: 'Myntra', offer: 'Buy 2 Get 1 Free on Fashion', code: 'FASHION3', color: 'from-pink-500 to-rose-600' },
                { store: 'Ajio', offer: '20% OFF + Free Shipping', code: 'AJIO20', color: 'from-purple-500 to-pink-600' },
                { store: 'Nykaa', offer: '₹200 OFF on Beauty Products', code: 'BEAUTY200', color: 'from-green-500 to-teal-600' },
                { store: 'FirstCry', offer: '15% OFF on Baby Products', code: 'BABY15', color: 'from-yellow-500 to-orange-600' },
              ].map((offer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="overflow-hidden border-2 border-transparent hover:border-orange-400">
                    <div className={`h-2 bg-gradient-to-r ${offer.color}`} />
                    <CardContent className="p-6">
                      <h3 className="text-xl mb-2">{offer.store}</h3>
                      <p className="text-gray-600 mb-4">{offer.offer}</p>
                      <div className="flex items-center justify-between">
                        <code className="bg-gray-100 px-3 py-1 rounded text-sm">{offer.code}</code>
                        <Button
                          size="sm"
                          onClick={() => handleCopyCoupon(offer.code)}
                        >
                          <Copy className="mr-1" size={14} />
                          Copy
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'coupons':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-3xl mb-6">Available Coupons</h2>
            {coupons.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center text-gray-500">
                  <Ticket className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No coupons available at the moment</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {coupons.map((coupon, index) => (
                  <motion.div
                    key={coupon.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="border-2 border-transparent hover:border-orange-400 overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-orange-500 to-pink-600" />
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl mb-2">{coupon.code}</h3>
                            <p className="text-gray-600 text-sm">
                              {coupon.discount_type === 'Percentage'
                                ? `${coupon.discount_value}% OFF`
                                : `₹${coupon.discount_value} OFF`}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleCopyCoupon(coupon.code)}
                          >
                            <Copy className="mr-1" size={14} />
                            Copy
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Min order: ₹{coupon.min_order_value}
                        </p>
                        {coupon.valid_until && (
                          <p className="text-sm text-gray-600">
                            Valid until: {new Date(coupon.valid_until).toLocaleDateString()}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        );

      case 'prohibited':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ProhibitedSection />
          </motion.div>
        );

      case 'faq':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <FAQSection />
          </motion.div>
        );

      case 'calculator':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="mr-2" />
                  Shipping Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Package Weight (kg)</label>
                    <Input
                      type="number"
                      value={calcWeight}
                      onChange={(e) => setCalcWeight(e.target.value)}
                      placeholder="Enter weight in kg"
                      min="0.1"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Weight will be rounded up to nearest kg (e.g., 1.2kg = 2kg)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Shipping Method</label>
                    <div className="grid grid-cols-2 gap-4">
                      <Card
                        className={`cursor-pointer border-2 ${shippingMethod === 'Economy' ? 'border-orange-500' : 'border-gray-200'}`}
                        onClick={() => setShippingMethod('Economy')}
                      >
                        <CardContent className="p-4 text-center">
                          <p className="mb-1">Economy</p>
                          <p className="text-2xl">₹2500</p>
                          <p className="text-sm text-gray-600">per kg</p>
                          <p className="text-xs text-gray-500 mt-2">15-20 days</p>
                        </CardContent>
                      </Card>
                      <Card
                        className={`cursor-pointer border-2 ${shippingMethod === 'Ganges One' ? 'border-orange-500' : 'border-gray-200'}`}
                        onClick={() => setShippingMethod('Ganges One')}
                      >
                        <CardContent className="p-4 text-center">
                          <p className="mb-1">Ganges One</p>
                          <p className="text-2xl">₹3500</p>
                          <p className="text-sm text-gray-600">per kg</p>
                          <p className="text-xs text-gray-500 mt-2">7-15 days</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <Button
                    onClick={calculateShipping}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    Calculate Shipping Cost
                  </Button>

                  {showCalcResults && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 p-6 rounded-lg border-2 border-green-200"
                    >
                      <p className="text-sm text-gray-600 mb-2">Estimated Shipping Cost</p>
                      <p className="text-3xl text-green-600 mb-2">
                        ₹{(Math.ceil(parseFloat(calcWeight) || 1) * (shippingMethod === 'Economy' ? 2500 : 3500)).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {shippingMethod} - {Math.ceil(parseFloat(calcWeight) || 1)} kg (rounded up)
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        * This is an estimate. Actual cost will be provided before delivery.
                      </p>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'blog':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="mr-2" />
                  Blog & Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Book className="w-16 h-16 mx-auto mb-4 text-orange-500" />
                  <h3 className="text-xl mb-4">Visit Our Blog</h3>
                  <p className="text-gray-600 mb-6">
                    Read our latest articles, shipping tips, and international shopping guides
                  </p>
                  <Button
                    onClick={() => window.open('https://shipglobal.in/blogs/', '_blank')}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <ExternalLink className="mr-2" size={18} />
                    Visit ShipGlobal Blog
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'refer':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="mr-2" />
                  Refer and Earn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-8 rounded-xl mb-6">
                  <h3 className="text-2xl mb-4">Earn ₹200 per referral!</h3>
                  <p className="mb-6">Share your referral code with friends and earn ₹200 for each successful signup</p>

                  <div className="bg-white/20 backdrop-blur p-4 rounded-lg">
                    <p className="text-sm opacity-90 mb-2">Your Referral Code</p>
                    <div className="flex items-center gap-4">
                      <p className="text-3xl flex-1">{referralCode}</p>
                      <Button
                        onClick={handleCopyReferralCode}
                        className="bg-white text-purple-600 hover:bg-gray-100"
                      >
                        <Copy className="mr-2" size={16} />
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg">How it works</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-xl">1</span>
                      </div>
                      <p className="text-sm">Share your code with friends</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-xl">2</span>
                      </div>
                      <p className="text-sm">They sign up using your code</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-xl">3</span>
                      </div>
                      <p className="text-sm">Both earn ₹200 wallet credit</p>
                    </div>
                  </div>

                  {/* Share buttons */}
                  <div className="flex gap-3 flex-wrap">
                    <Button
                      onClick={() => {
                        const text = `Join Ganges Lite and get ₹200 free! Use my code: ${referralCode}\n\nhttps://lite.ganges.world`;
                        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
                        window.open(whatsappUrl, '_blank');
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <MessageCircle className="mr-2" size={16} />
                      Share on WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Bar */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            <div className="flex items-center gap-3">
              <img src={logo} alt="Ganges Lite" className="h-8" />
              <span className="text-xl hidden sm:block">GANGES LITE</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToHome}
            >
              <Home className="mr-2" size={18} />
              Home
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2" size={18} />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar - Bluish background with gradient active state */}
        <div className="hidden md:block w-72 bg-gradient-to-b from-blue-900 to-blue-950 text-white border-r border-blue-800 overflow-y-auto flex-shrink-0">
          <div className="p-4 space-y-2">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveSection(item.id);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeSection === item.id
                  ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg'
                  : 'hover:bg-blue-800 text-gray-300 hover:text-white'
                  }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mobile Sidebar */}
        <motion.div
          initial={false}
          animate={{ x: sidebarOpen ? 0 : -300 }}
          className="fixed md:hidden inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-blue-900 to-blue-950 text-white border-r border-blue-800 overflow-y-auto"
          style={{ top: '57px' }}
        >
          <div className="p-4 space-y-2">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeSection === item.id
                  ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg'
                  : 'hover:bg-blue-800 text-gray-300 hover:text-white'
                  }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:ml-0">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
