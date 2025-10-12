import { motion } from 'motion/react';
import { Package, Plane, ShoppingCart, Users, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';

export function ServicesSection() {
  const services = [
    {
      icon: Package,
      title: 'Package Forwarding',
      description: 'Get a free virtual Indian address. Shop from any Indian online store and ship to your doorstep worldwide.',
      features: ['Free Indian Address', 'Consolidate Packages', 'Save on Shipping', 'Package Photos'],
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: ShoppingCart,
      title: 'Personal Shopper',
      description: 'Cannot checkout on Indian websites? Our personal shoppers will purchase items on your behalf.',
      features: ['Shop Any Website', 'Expert Assistance', 'Secure Payments', 'Product Verification'],
      color: 'from-purple-500 to-purple-700'
    },
    {
      icon: Plane,
      title: 'International Shipping',
      description: 'Ship to 220+ countries with the most affordable rates. Fast, secure, and reliable delivery.',
      features: ['220+ Countries', 'Multiple Carriers', 'Track Packages', 'Insurance Available'],
      color: 'from-orange-500 to-orange-700'
    },
    {
      icon: Users,
      title: 'Assisted Purchase',
      description: 'Need help? Our team will assist you with finding products, negotiating prices, and quality checks.',
      features: ['Product Sourcing', 'Price Negotiation', 'Quality Control', '24/7 Support'],
      color: 'from-green-500 to-green-700'
    }
  ];

  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border-2 border-orange-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full">
              What We Offer
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to shop from India and ship worldwide
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="p-6 hover:shadow-2xl transition-all duration-300 h-full border-2 border-transparent hover:border-orange-400">
                <motion.div 
                  className={`bg-gradient-to-r ${service.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <motion.li 
                      key={idx} 
                      className="text-sm text-gray-700 flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (idx * 0.1) }}
                    >
                      <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}