import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Star, Quote, Building2, GraduationCap, MapPin } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600">
            Real stories from satisfied customers around the world
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-2 border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-orange-100 p-4 rounded-full">
                    <Quote className="text-orange-600" size={32} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                      ))}
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      "I was searching for the book 'Co-Intelligence Revolution' by Venkat Ramaswamy, a fellow IIT Madras alumnus. 
                      It wasn't available on Amazon.com until February 2026, but Ganges Lite made it possible for me to get it in 
                      October - within just 10 days of placing my order! The service was incredibly fast and reliable. Highly recommended 
                      for anyone wanting to get products from India to anywhere in the world."
                    </p>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-xl text-orange-600 mb-2">Viswa Reddy</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Building2 size={16} className="text-gray-400" />
                              <span>Product Manager at Jio</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin size={16} className="text-gray-400" />
                              <span>New Jersey, USA</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <GraduationCap size={16} className="text-gray-400" />
                              <span>IIT Madras Alumnus</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm">
                          ✓ Verified Customer
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Loading more customers */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-100 to-pink-100 px-8 py-4 rounded-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <Star className="text-orange-600" size={24} />
            </motion.div>
            <span className="text-lg text-gray-700">
              And many more happy customers are loading...
            </span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <Star className="text-pink-600" size={24} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}