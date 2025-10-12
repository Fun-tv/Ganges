import { motion } from 'motion/react';
import { Instagram, Mail, MapPin, Phone, Linkedin, Globe } from 'lucide-react';
import logo from 'figma:asset/35424f6f7581dcd0957679d7cd3c9d5bfc8f9f2a.png';
import { Button } from './ui/button';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f1624] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.img 
              src={logo} 
              alt="Ganges Lite" 
              className="h-16 w-auto mb-4"
              whileHover={{ scale: 1.05 }}
            />
            <p className="text-gray-400 text-sm mb-4">
              Your trusted partner for international shipping from India. Shop from your favorite Indian stores and get it delivered worldwide.
            </p>
            <div className="space-y-2">
              <div className="flex items-start space-x-2 text-sm text-gray-400">
                <MapPin size={16} className="flex-shrink-0 mt-1 text-orange-400" />
                <span>Malviya Nagar, Jaipur, Rajasthan, India</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail size={16} className="text-orange-400" />
                <a href="mailto:gangescompany@gmail.com" className="hover:text-orange-400 transition-colors">
                  gangescompany@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Phone size={16} className="text-orange-400" />
                <a href="https://wa.me/918209893843" className="hover:text-orange-400 transition-colors">
                  +91 82098 93843
                </a>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="mb-4 text-orange-400">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#services" className="hover:text-orange-400 transition-colors">Package Forwarding</a>
              </li>
              <li>
                <a href="#personal-shopper" className="hover:text-orange-400 transition-colors">Personal Shopper</a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-400 transition-colors">Consolidation</a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-400 transition-colors">Storage</a>
              </li>
              <li>
                <a href="#shipping-rates" className="hover:text-orange-400 transition-colors">International Shipping</a>
              </li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="mb-4 text-orange-400">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#faq" className="hover:text-orange-400 transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#shipping-rates" className="hover:text-orange-400 transition-colors">Shipping Calculator</a>
              </li>
              <li>
                <a href="https://wa.me/918209893843" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">
                  Track Order
                </a>
              </li>
              <li>
                <a href="https://wa.me/918209893843" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#prohibited" className="hover:text-orange-400 transition-colors">Prohibited Items</a>
              </li>
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="mb-4 text-orange-400">Connect With Us</h4>
            <div className="flex space-x-4 mb-6">
              <motion.a 
                href="https://instagram.com/ganges_world" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram size={32} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/jayagr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={32} />
              </motion.a>
            </div>
            <div className="text-sm text-gray-400 space-y-3">
              <p className="mb-2">Founded by <span className="text-orange-400">Jay Agarwal</span></p>
              <p className="mb-3">Building a bridge between India and the World 🌏</p>
              
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-gray-300 border-gray-600 hover:bg-orange-500 hover:border-orange-500 hover:text-white"
                  onClick={() => window.open('https://ganges.world/', '_blank')}
                >
                  <Globe size={16} className="mr-2" />
                  Visit Ganges.world
                </Button>
                <p className="text-xs">Everything you want from India is here at Ganges - a trusted bridge to India for the world</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-700 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-center text-gray-400 text-sm">
            <p>&copy; 2025 Ganges Lite. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button onClick={() => onNavigate?.('privacy-policy')} className="hover:text-orange-400 transition-colors">Privacy Policy</button>
              <button onClick={() => onNavigate?.('terms-conditions')} className="hover:text-orange-400 transition-colors">Terms & Conditions</button>
              <button onClick={() => onNavigate?.('admin')} className="hover:text-orange-400 transition-colors">Admin</button>
            </div>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">
            Ganges Lite - Making international shipping from India simple, affordable, and reliable.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}