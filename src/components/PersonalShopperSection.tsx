import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { 
  ShoppingCart, CreditCard, Package, Truck, CheckCircle2, 
  AlertCircle, ArrowRight, DollarSign, Shield, Clock, Star
} from 'lucide-react';
import amazonLogo from 'figma:asset/7931787465ff2cbdd40523e712afe66f9a823ab6.png';
import flipkartLogo from 'figma:asset/adb4f864912c3e6a56954622989dd71d57fbcbd2.png';
import myntraLogo from 'figma:asset/73983d44b2e928490eaf938eb8ba58e16b1e0b82.png';
import ajioLogo from 'figma:asset/8f0f3f2c0b708ed51c01f9bfbeef2ea3eee10b61.png';

interface PersonalShopperSectionProps {
  onGetStartedClick?: () => void;
}

export function PersonalShopperSection({ onGetStartedClick }: PersonalShopperSectionProps) {
  const steps = [
    {
      icon: ShoppingCart,
      step: 1,
      title: 'Search Products',
      description: 'Search products from any Indian online store such as Amazon.in, Flipkart or Myntra.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Package,
      step: 2,
      title: 'Fill up Order Form',
      description: 'Copy the links of the products you want to purchase and paste them on Ganges Lite order form.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: CreditCard,
      step: 3,
      title: 'We Do The Shopping',
      description: 'Once you submit the order form, we\'ll make the purchase on your behalf. Any difference in the total cost will be settled at the end reflected in your Ganges Lite Account.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Truck,
      step: 4,
      title: 'Make a Ship Request',
      description: 'Once you\'re done shopping; make a Ship Request. We\'ll consolidate your packages into one shipment; cutting the shipping costs down by 80%.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: CheckCircle2,
      step: 5,
      title: 'You Pay, We\'ll Dispatch',
      description: 'Once we\'ve confirmed your payment, your order will be dispatched & be on its way to you (taking just 3-6 days)!',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const festivals = [
    { name: 'Myntra', event: 'Big Fashion Festival', icon: '👗', logo: myntraLogo },
    { name: 'Flipkart', event: 'The Big Billion Days', icon: '🛍️', logo: flipkartLogo },
    { name: 'Amazon', event: 'Great Indian Festival', icon: '🎁', logo: amazonLogo },
    { name: 'AJIO', event: 'Giant Fashion Sale', icon: '✨', logo: ajioLogo }
  ];

  const whyUse = [
    'Indian retailers or Indian Online sites do not accept international card',
    'Indian retailers only accept an Indian billing address',
    'Indian retailers do not ship to your country',
    'Indian retailers do not accept your country IP address',
    'India Online stores won\'t allow you to register unless you have an active Indian Mobile Number, to which your One Time Password (OTP) will be sent'
  ];

  return (
    <section id="personal-shopper" className="py-20 px-4 bg-gradient-to-b from-white via-orange-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-6 py-3 rounded-full mb-6"
          >
            <AlertCircle size={24} />
            <span>Not Able to Purchase from certain Indian Sites, Due to Payment Hassles?</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Don't Worry
            </span>
          </h2>
          <p className="text-3xl mb-4">Our Personal Shopper, Do The Shopping for You!</p>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            If you are overseas and want to shop from India, occasionally you would have to go through some hassles in the process. Either your international cards won't be accepted or order won't go through on account of you not having Indian credentials mostly.
          </p>
        </motion.div>

        {/* Festival Sales Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {festivals.map((festival, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-orange-500 to-pink-600 text-white p-6 rounded-2xl text-center"
            >
              <div className="bg-white p-3 rounded-lg mb-3 mx-auto w-fit">
                <img src={festival.logo} alt={festival.name} className="h-12 w-auto object-contain" />
              </div>
              <div className="text-sm mb-1">{festival.name}</div>
              <div className="text-xs opacity-90">{festival.event}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* How Does Personal Shopper Help */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl md:text-4xl text-center mb-12">
            How Does a Personal Shopper Help?
          </h3>
          <Card className="border-2 border-orange-300">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-orange-100 p-3 rounded-full">
                  <ShoppingCart className="text-orange-600" size={32} />
                </div>
                <div>
                  <h4 className="text-2xl mb-4">We'll Shop For You</h4>
                  <p className="text-gray-700 text-lg">
                    All you have to do is, let us know what you intend to buy; we'll make the purchase for you.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Here is how it all goes down */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl md:text-4xl text-center mb-4">Here is how it all goes down</h3>
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-6 py-3 rounded-full">
              <DollarSign size={20} />
              <span>Assisted Purchase (Shopping For You) - Service Charges: 7%</span>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="h-full border-2 border-gray-200 hover:border-orange-400 transition-all duration-300 hover:shadow-xl">
                    <CardContent className="p-6">
                      <motion.div 
                        className={`bg-gradient-to-r ${item.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="text-white" size={28} />
                      </motion.div>
                      <div className="text-sm text-gray-500 mb-2 text-center">Step {item.step}</div>
                      <h4 className="text-lg mb-3 text-center">{item.title}</h4>
                      <p className="text-sm text-gray-600 text-center">{item.description}</p>
                    </CardContent>
                  </Card>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="text-orange-500" size={24} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Why Personal Assistant Service */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="border-2 border-blue-300 bg-blue-50">
            <CardContent className="p-8">
              <h3 className="text-2xl md:text-3xl mb-6 text-center">Why Personal Assistant Service?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {whyUse.map((reason, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 bg-white p-4 rounded-lg"
                  >
                    <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">{reason}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Service Fee Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-2 border-green-300 bg-green-50">
              <CardContent className="p-8">
                <DollarSign className="text-green-600 mb-4" size={48} />
                <h3 className="text-2xl mb-4">What is Personal Assistant Service Fee?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <span>7% of total purchase</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <span>Personal Shopper orders with more than 15 items per online seller will incur an ₹50 per item cost for every item over 15</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <span>Simple – Easy – Economic Solutions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-2 border-purple-300 bg-purple-50">
              <CardContent className="p-8">
                <Shield className="text-purple-600 mb-4" size={48} />
                <h3 className="text-2xl mb-4">Important Notes</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <Star className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                    <span>Can I use Personal Shopper to purchase a Gift card / Coupon?<br />
                    <span className="text-sm text-gray-600">Yes, kindly make sure it should be transferable.</span></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <AlertCircle className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                    <span>Can I Replace/cancel the Coupon/Gift card?<br />
                    <span className="text-sm text-gray-600">Any Coupon/Gift Card post delivery will not be applicable for return/refund/replacement under any circumstance.</span></span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 text-white p-12 rounded-3xl text-center"
        >
          <h3 className="text-3xl md:text-4xl mb-6">
            Shop without credit card with our Personal Shopper Service
          </h3>
          <p className="text-xl mb-8 text-orange-100">
            No more barriers to shopping in India - Because We Make Your Shopping Experience Rich & Easy!
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-12 py-6 text-xl"
              onClick={onGetStartedClick}
            >
              Get Started Now
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}