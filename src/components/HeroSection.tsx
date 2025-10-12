import { Button } from './ui/button';
import { motion } from 'motion/react';
import { Sparkles, TrendingDown, Package, Plane, Truck, Globe } from 'lucide-react';

interface HeroSectionProps {
  onSignUpClick?: () => void;
}

export function HeroSection({ onSignUpClick }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#2a4a6f] to-[#1e3a5f] text-white py-20 px-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400 rounded-full opacity-20"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-orange-500/20 border border-orange-400/30 px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="text-orange-400" size={20} />
              <span className="text-sm">India to Worldwide Shipping Made Easy</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Get What You Love From{' '}
              <span className="text-orange-400">Indian Stores</span> Delivered
              To Your Doorstep.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-2 mb-8"
            >
              <TrendingDown className="text-green-400" size={32} />
              <p className="text-2xl">
                Save upto <span className="text-green-400">80%</span> on international shipping
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 shadow-2xl hover:shadow-orange-500/50 transition-all duration-300"
                  onClick={onSignUpClick}
                >
                  Sign up for FREE
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline"
                  className="bg-transparent hover:bg-white/10 text-white border-2 border-orange-400 hover:border-orange-300 px-8 py-6 transition-all duration-300"
                  onClick={() => {
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  ▶ Know more
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-12 flex flex-wrap gap-8 items-center"
            >
              <div className="text-center">
                <motion.div 
                  className="text-3xl mb-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  1+
                </motion.div>
                <div className="text-sm text-gray-300">Happy Customer</div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-3xl mb-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                >
                  220+
                </motion.div>
                <div className="text-sm text-gray-300">Countries Available</div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-3xl mb-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
                >
                  100%
                </motion.div>
                <div className="text-sm text-gray-300">Secure Shipping</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Animation */}
          <motion.div 
            className="flex justify-center items-center relative h-[500px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Central Globe/Circle */}
            <motion.div
              className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-orange-500/20 to-pink-500/20 backdrop-blur-sm border-2 border-orange-400/30"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.div
                className="absolute inset-4 rounded-full bg-gradient-to-br from-orange-500/10 to-pink-500/10 border border-orange-400/20"
                animate={{
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Floating Packages */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: Math.cos((i * 60 * Math.PI) / 180) * 180,
                  y: Math.sin((i * 60 * Math.PI) / 180) * 180,
                }}
                animate={{
                  y: [
                    Math.sin((i * 60 * Math.PI) / 180) * 180,
                    Math.sin((i * 60 * Math.PI) / 180) * 180 - 20,
                    Math.sin((i * 60 * Math.PI) / 180) * 180,
                  ],
                }}
                transition={{
                  duration: 2 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl shadow-2xl flex items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                >
                  <Package className="text-white" size={32} />
                </motion.div>
              </motion.div>
            ))}

            {/* Flying Planes/Shipping Icons */}
            <motion.div
              className="absolute"
              animate={{
                x: [-200, 200],
                y: [-50, -70, -50],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Plane className="text-orange-400" size={40} />
            </motion.div>

            <motion.div
              className="absolute"
              animate={{
                x: [200, -200],
                y: [50, 30, 50],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
                delay: 4
              }}
            >
              <Truck className="text-pink-400" size={40} />
            </motion.div>

            {/* Sparkle Effects */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute"
                initial={{
                  x: Math.cos((i * 45 * Math.PI) / 180) * 220,
                  y: Math.sin((i * 45 * Math.PI) / 180) * 220,
                  scale: 0,
                  opacity: 0
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="text-yellow-400" size={20} />
              </motion.div>
            ))}

            {/* Central Icon */}
            <motion.div
              className="absolute w-24 h-24 bg-gradient-to-br from-white to-orange-100 rounded-2xl shadow-2xl flex items-center justify-center z-10"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, -360],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Globe className="text-orange-600" size={48} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}