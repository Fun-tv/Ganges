import { motion } from 'motion/react';
import { Store, ExternalLink, Sparkles } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const indianStores = [
  { 
    name: 'Amazon India', 
    url: 'https://www.amazon.in',
    category: 'Everything Store',
    color: 'from-orange-400 to-yellow-500'
  },
  { 
    name: 'Flipkart', 
    url: 'https://www.flipkart.com',
    category: 'Electronics & Fashion',
    color: 'from-blue-500 to-blue-700'
  },
  { 
    name: 'Myntra', 
    url: 'https://www.myntra.com',
    category: 'Fashion & Lifestyle',
    color: 'from-pink-500 to-purple-600'
  },
  { 
    name: 'Ajio', 
    url: 'https://www.ajio.com',
    category: 'Fashion & Accessories',
    color: 'from-yellow-500 to-orange-600'
  },
  { 
    name: 'Nykaa', 
    url: 'https://www.nykaa.com',
    category: 'Beauty & Cosmetics',
    color: 'from-pink-400 to-pink-600'
  },
  { 
    name: 'Meesho', 
    url: 'https://www.meesho.com',
    category: 'Value Shopping',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    name: 'Snapdeal', 
    url: 'https://www.snapdeal.com',
    category: 'Variety Store',
    color: 'from-red-500 to-red-700'
  },
  { 
    name: 'FirstCry', 
    url: 'https://www.firstcry.com',
    category: 'Kids & Baby Products',
    color: 'from-blue-400 to-cyan-500'
  },
  { 
    name: 'Tata CLiQ', 
    url: 'https://www.tatacliq.com',
    category: 'Premium Shopping',
    color: 'from-indigo-500 to-blue-600'
  },
  { 
    name: 'BigBasket', 
    url: 'https://www.bigbasket.com',
    category: 'Groceries',
    color: 'from-green-500 to-green-700'
  },
  { 
    name: 'Pepperfry', 
    url: 'https://www.pepperfry.com',
    category: 'Furniture & Home',
    color: 'from-orange-600 to-red-600'
  },
  { 
    name: 'Lenskart', 
    url: 'https://www.lenskart.com',
    category: 'Eyewear',
    color: 'from-blue-600 to-purple-600'
  }
];

export function IndianStoresSection() {
  return (
    <section id="indian-stores" className="py-20 px-4 bg-gradient-to-b from-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              repeatDelay: Math.random() * 3
            }}
          >
            <Sparkles className="text-purple-300" size={20} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-6 py-3 rounded-full mb-6">
            <Store size={24} />
            <span>Shop From Top Brands</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">Popular Indian Online Stores</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Shop from India's biggest e-commerce platforms and get your items delivered worldwide with Ganges Lite
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {indianStores.map((store, index) => (
            <motion.div
              key={store.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="overflow-hidden border-2 border-transparent hover:border-purple-400 transition-all duration-300 cursor-pointer h-full">
                <div className={`h-2 bg-gradient-to-r ${store.color}`} />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${store.color} flex items-center justify-center`}>
                      <Store className="text-white" size={24} />
                    </div>
                    <motion.a
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  </div>
                  <h3 className="text-xl mb-2">{store.name}</h3>
                  <p className="text-sm text-gray-600">{store.category}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-white p-8 rounded-2xl shadow-xl"
        >
          <h3 className="text-2xl mb-4">And Many More!</h3>
          <p className="text-gray-600 mb-6">
            Shop from any Indian online store and use your Ganges Lite virtual address for delivery
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm">Amazon.in</span>
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">Flipkart.com</span>
            <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm">Myntra.com</span>
            <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">Ajio.com</span>
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">And 1000+ More</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}