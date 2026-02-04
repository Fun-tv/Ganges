import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ShippingRatesSection } from './components/ShippingRatesSection';
import { PersonalShopperSection } from './components/PersonalShopperSection';
import { DiwaliOffersSection } from './components/DiwaliOffersSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ShopWorldwideSection } from './components/ShopWorldwideSection';
import { ChallengesSection } from './components/ChallengesSection';
import { CustomerProblemsSection } from './components/CustomerProblemsSection';
import { IndianStoresSection } from './components/IndianStoresSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ProhibitedSection } from './components/ProhibitedSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { AdminLogin } from './admin/AdminLogin';
import { AdminPanel } from './admin/AdminPanel';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsConditions } from './components/TermsConditions';
import { AuthModal } from './components/AuthModal';
import { Toaster } from './components/ui/sonner';
import { supabase } from './lib/supabaseClient';
import { toast } from 'sonner';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'admin-login' | 'admin' | 'privacy-policy' | 'terms-conditions'>('landing');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);

      if (event === 'SIGNED_IN') {
        toast.success('Signed in successfully!');
      } else if (event === 'SIGNED_OUT') {
        setCurrentView('landing');
        setIsAuthenticated(false);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const handleLogin = () => {
    if (isAuthenticated) {
      setCurrentView('dashboard');
    } else {
      setAuthModalMode('signin');
      setIsAuthModalOpen(true);
    }
  };

  const handleSignUp = () => {
    setAuthModalMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
    toast.success('Welcome to Ganges Lite!');
  };

  const handleBackToHome = () => {
    setCurrentView('landing');
    setIsAdminAuthenticated(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (section: string) => {
    if (section === 'privacy-policy' || section === 'terms-conditions') {
      setCurrentView(section as any);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'admin') {
      setCurrentView('admin-login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    setCurrentView('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentView('admin-login');
  };

  if (currentView === 'dashboard') {
    return <Dashboard onBackToHome={handleBackToHome} />;
  }

  if (currentView === 'admin-login') {
    return (
      <>
        <AdminLogin onLogin={handleAdminLogin} onBackToHome={handleBackToHome} />
        <Toaster />
      </>
    );
  }

  if (currentView === 'admin') {
    return (
      <>
        <AdminPanel onBackToHome={handleBackToHome} onLogout={handleAdminLogout} />
        <Toaster />
      </>
    );
  }

  if (currentView === 'privacy-policy') {
    return (
      <>
        <PrivacyPolicy onBack={handleBackToHome} />
        <Toaster />
      </>
    );
  }

  if (currentView === 'terms-conditions') {
    return (
      <>
        <TermsConditions onBack={handleBackToHome} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar onLoginClick={handleLogin} onSignUpClick={handleSignUp} onNavigate={handleNavigate} />
      <HeroSection onSignUpClick={handleSignUp} />
      <CustomerProblemsSection />
      <ServicesSection />
      <HowItWorksSection />
      <ShippingRatesSection />
      <PersonalShopperSection onGetStartedClick={handleSignUp} />
      <div id="offers">
        <DiwaliOffersSection />
      </div>
      <IndianStoresSection />
      <ShopWorldwideSection onGetStartedClick={handleSignUp} />
      <ChallengesSection />
      <TestimonialsSection />
      <ProhibitedSection />
      <FAQSection />
      <Footer onNavigate={handleNavigate} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        defaultMode={authModalMode}
      />

      <Toaster />
    </div>
  );
}