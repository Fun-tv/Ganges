import { motion } from 'motion/react';
import { Globe, Calendar, Shield } from 'lucide-react';
import surveyImage1 from 'figma:asset/4c3162c3942571e445a70a53df398fb9d912d5c7.png';
import surveyImage2 from 'figma:asset/eeea6bb5d9f710e16405f21b8f137ceb5e9d2a90.png';

export function ChallengesSection() {
  const challenges = [
    {
      icon: Globe,
      title: 'Limited International Shipping',
      description: 'Many Indian stores don\'t ship internationally',
      color: 'text-blue-500'
    },
    {
      icon: Calendar,
      title: 'High Shipping Costs',
      description: 'International shipping can be extremely expensive',
      color: 'text-purple-500'
    },
    {
      icon: Shield,
      title: 'Payment Restrictions',
      description: 'International cards often not accepted by Indian retailers',
      color: 'text-blue-500'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl mb-4">
            Challenges for International Shoppers to Shop in India
          </h2>
          <p className="text-xl text-gray-600">
            We understand the problems you face
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className={`${challenge.color} mb-6 flex justify-center`}>
                  <Icon size={64} strokeWidth={1.5} />
                </div>
                <h3 className="mb-4">
                  {challenge.title}
                </h3>
                <p className="text-gray-600">
                  {challenge.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Survey and Customer Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl mb-4">Understanding Your Challenges</h3>
            <p className="text-lg text-gray-600">
              Real insights from our customer interviews
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <img 
                src={surveyImage1} 
                alt="Customer Interview - Understanding pain points" 
                className="w-full h-[400px] object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <img 
                src={surveyImage2} 
                alt="Customer Interview - Discovering solutions" 
                className="w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
              <h4 className="text-xl mb-2 text-orange-600">Customer Pain Points</h4>
              <p className="text-gray-700">
                Through extensive surveys and interviews with our target audience, we identified the key challenges 
                international shoppers face when trying to purchase from India.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h4 className="text-xl mb-2 text-blue-600">Our Solution</h4>
              <p className="text-gray-700">
                Ganges Lite addresses these challenges by providing a seamless bridge between Indian e-commerce 
                and international customers, making Indian products accessible worldwide.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h4 className="text-xl mb-2 text-green-600">Proven Results</h4>
              <p className="text-gray-700">
                Our first customer experienced the difference - fast delivery, transparent pricing, and 
                exceptional service that exceeded expectations.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}