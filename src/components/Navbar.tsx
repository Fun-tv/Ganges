import { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import logo from 'figma:asset/35424f6f7581dcd0957679d7cd3c9d5bfc8f9f2a.png';

interface NavbarProps {
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
  onNavigate?: (section: string) => void;
}

export function Navbar({ onLoginClick, onSignUpClick, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#1e3a5f] via-[#2a4a6f] to-[#1e3a5f] text-white sticky top-0 z-50 shadow-lg backdrop-blur-sm bg-opacity-95"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0 flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img src={logo} alt="Ganges Lite" className="h-12 w-auto" />
              <span className="text-2xl text-white">Ganges Lite</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'services', label: 'Services' },
                { id: 'shipping-rates', label: 'Shipping Rates' },
                { id: 'personal-shopper', label: 'Personal Shopper' },
                { id: 'offers', label: 'Offers' },
                { id: 'how-it-works', label: 'How it works?' }
              ].map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className="hover:text-orange-400 transition-colors cursor-pointer relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                </motion.a>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  className="bg-transparent hover:bg-orange-500 text-white border-orange-400 hover:border-orange-500 transition-all duration-300"
                  onClick={onLoginClick}
                >
                  Login
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={onSignUpClick}
                >
                  Sign Up
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4"
            >
              <div className="flex flex-col space-y-4">
                {[
                  { id: 'services', label: 'Services' },
                  { id: 'shipping-rates', label: 'Shipping Rates' },
                  { id: 'personal-shopper', label: 'Personal Shopper' },
                  { id: 'offers', label: 'Offers' },
                  { id: 'how-it-works', label: 'How it works?' }
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex flex-col space-y-2 pt-4">
                  <Button 
                    variant="outline" 
                    className="bg-transparent hover:bg-orange-500 text-white border-orange-400"
                    onClick={onLoginClick}
                  >
                    Login
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                    onClick={onSignUpClick}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/918209893843"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={28} />
        <motion.span 
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Chat with us on WhatsApp
        </motion.span>
        <motion.div
          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-3 h-3"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.a>
    </>
  );
}