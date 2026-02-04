import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Tag, Gift, Zap, Star, TrendingDown, Clock, Copy } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { toast } from 'sonner';
import amazonLogo from 'figma:asset/7931787465ff2cbdd40523e712afe66f9a823ab6.png';
import flipkartLogo from 'figma:asset/adb4f864912c3e6a56954622989dd71d57fbcbd2.png';
import myntraLogo from 'figma:asset/73983d44b2e928490eaf938eb8ba58e16b1e0b82.png';
import ajioLogo from 'figma:asset/8f0f3f2c0b708ed51c01f9bfbeef2ea3eee10b61.png';

export function DiwaliOffersSection() {
  const [showCoupon, setShowCoupon] = useState(false);
  const offers = [
    {
      title: 'Big Fashion Festival',
      store: 'Myntra',
      discount: 'Up to 80% OFF',
      icon: '👗',
      logo: myntraLogo,
      color: 'from-pink-500 to-purple-600',
      bgColor: 'bg-pink-50'
    },
    {
      title: 'The Big Billion Days',
      store: 'Flipkart',
      discount: 'Up to 90% OFF',
      icon: '🛍️',
      logo: flipkartLogo,
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Great Indian Festival',
      store: 'Amazon',
      discount: 'Mega Savings',
      icon: '🎁',
      logo: amazonLogo,
      color: 'from-orange-400 to-yellow-500',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Giant Fashion Sale',
      store: 'AJIO',
      discount: 'Flat 70% OFF',
      icon: '✨',
      logo: ajioLogo,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  return (
    <section id="diwali-offers" className="py-20 px-4 bg-gradient-to-br from-orange-600 via-pink-600 to-purple-700 relative overflow-hidden">
      {/* Animated Diyas/Lamps */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -50,
            rotate: 0
          }}
          animate={{
            y: window.innerHeight + 50,
            rotate: 360,
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        >
          🪔
        </motion.div>
      ))}

      {/* Fireworks Effect */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`firework-${i}`}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
            opacity: 0
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            repeatDelay: Math.random() * 5
          }}
        >
          <Sparkles className="text-yellow-300" size={30} />
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-6xl mb-4"
          >
            🎆
          </motion.div>
          <motion.h2
            className="text-5xl md:text-7xl mb-6 text-white"
            animate={{
              textShadow: [
                '0 0 20px rgba(255,255,255,0.5)',
                '0 0 40px rgba(255,255,255,0.8)',
                '0 0 20px rgba(255,255,255,0.5)'
              ]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Diwali Dhamaka Offers! 🎉
          </motion.h2>
          <p className="text-xl text-yellow-100 mb-4">
            Festival of Lights, Festival of Shopping!
          </p>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="inline-flex items-center space-x-2 bg-yellow-400 text-orange-900 px-6 py-3 rounded-full"
          >
            <Clock size={20} />
            <span>Limited Time Offers!</span>
          </motion.div>
        </motion.div>

        {/* Main Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.store}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <Card className={`${offer.bgColor} border-4 border-white shadow-2xl overflow-hidden relative`}>
                <motion.div
                  className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${offer.color} rounded-bl-full flex items-center justify-center`}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                >
                  <Star className="text-white" size={24} />
                </motion.div>
                <CardContent className="p-6 relative z-10">
                  <div className="bg-white p-3 rounded-lg mb-4 w-fit">
                    <img src={offer.logo} alt={offer.store} className="h-10 w-auto object-contain" />
                  </div>
                  <h3 className="text-2xl mb-2">{offer.title}</h3>
                  <p className={`text-sm bg-gradient-to-r ${offer.color} bg-clip-text text-transparent mb-3`}>
                    {offer.store}
                  </p>
                  <motion.div
                    className={`bg-gradient-to-r ${offer.color} text-white px-4 py-2 rounded-lg inline-block`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    {offer.discount}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Special Diwali Bonus */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-6xl"
                initial={{
                  x: Math.random() * 100 + '%',
                  y: Math.random() * 100 + '%',
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block"
              >
                <Gift className="text-orange-600 mx-auto mb-4" size={64} />
              </motion.div>
              <h3 className="text-4xl mb-4 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Special Diwali Shipping Bonus!
              </h3>
              <p className="text-xl text-gray-600 mb-6">
                Celebrate this Diwali with extra savings on international shipping
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-orange-100 to-orange-200 p-6 rounded-2xl text-center"
              >
                <TrendingDown className="text-orange-600 mx-auto mb-3" size={40} />
                <h4 className="text-2xl mb-2">20% OFF</h4>
                <p className="text-gray-700">Shipping Charges</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-pink-100 to-pink-200 p-6 rounded-2xl text-center"
              >
                <Zap className="text-pink-600 mx-auto mb-3" size={40} />
                <h4 className="text-2xl mb-2">Express</h4>
                <p className="text-gray-700">Free Upgrade</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-2xl text-center"
              >
                <Tag className="text-purple-600 mx-auto mb-3" size={40} />
                <h4 className="text-2xl mb-2">Extra $10</h4>
                <p className="text-gray-700">Wallet Credit</p>
              </motion.div>
            </div>

            <div className="text-center">
              {!showCoupon ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white px-12 py-6 text-xl shadow-2xl"
                    onClick={() => setShowCoupon(true)}
                  >
                    <Sparkles className="mr-2" />
                    Claim Your Diwali Bonus Now!
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-2xl inline-block"
                >
                  <p className="text-white mb-3">Your Diwali Coupon Code:</p>
                  <div className="bg-white p-4 rounded-lg flex items-center space-x-4">
                    <code className="text-3xl text-orange-600">DIWALIBONUS</code>
                    <Button
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText('DIWALIBONUS');
                        toast.success('Coupon code copied!');
                      }}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <Copy size={16} className="mr-2" />
                      Copy
                    </Button>
                  </div>
                  <p className="text-white text-sm mt-3">Use this code at checkout for your Diwali bonus!</p>
                </motion.div>
              )}
              <p className="text-sm text-gray-500 mt-4">
                *Offer valid till Diwali. Terms & Conditions apply.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}