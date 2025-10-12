import { motion } from 'motion/react';
import { UserPlus, ShoppingBag, Send, Home } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'SIGN-UP',
      description: 'Sign up easily for a FREE Indian Virtual Address',
      icon: UserPlus,
      bgColor: 'from-blue-500 to-blue-600',
      delay: 0
    },
    {
      number: '02',
      title: 'SHOP',
      description: 'Shop from top Indian e-commerce stores & marketplaces',
      icon: ShoppingBag,
      bgColor: 'from-purple-500 to-purple-600',
      delay: 0.2
    },
    {
      number: '03',
      title: 'SHIP',
      description: 'Ship your consolidated parcel to your global address',
      icon: Send,
      bgColor: 'from-orange-500 to-orange-600',
      delay: 0.4
    },
    {
      number: '04',
      title: 'RECEIVE',
      description: 'Get it at your door within 3-6 days from India',
      icon: Home,
      bgColor: 'from-green-500 to-green-600',
      delay: 0.6
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full blur-3xl opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-4xl md:text-5xl mb-4">How does it work?</h2>
          <p className="text-center text-xl text-gray-600 mb-16">
            Get started in 4 simple steps
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: step.delay, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative"
              >
                <div className={`bg-gradient-to-br ${step.bgColor} p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full`}>
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="text-white/90 mb-4"
                  >
                    <Icon size={56} />
                  </motion.div>
                  <div className="text-white/80 mb-3">
                    <span className="text-lg">{step.number}</span>
                  </div>
                  <h3 className="text-white mb-3 text-2xl">
                    {step.title}
                  </h3>
                  <p className="text-white/90">
                    {step.description}
                  </p>
                </div>

                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10"
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    <div className="text-orange-500 text-3xl">→</div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '1+', label: 'Happy Customer', subtext: 'New company launched Oct 2025' },
            { value: '220+', label: 'Countries Ready to Ship' },
            { value: '50+', label: 'Indian Marketplaces', subtext: 'Purchase from any store' },
            { value: '80%', label: 'Shipping Savings' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center bg-white p-6 rounded-xl shadow-lg"
            >
              <motion.div
                className="text-3xl md:text-4xl bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-600">{stat.label}</div>
              {stat.subtext && <div className="text-xs text-gray-500 mt-1">{stat.subtext}</div>}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}