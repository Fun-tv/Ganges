import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function CustomerProblemsSection() {
  const problems = [
    {
      title: 'Payment Issues',
      description: 'International cards not accepted by Indian websites',
      impact: 'Unable to purchase desired products from India'
    },
    {
      title: 'Shipping Restrictions',
      description: 'Indian sellers don\'t ship internationally',
      impact: 'Missing out on authentic Indian products'
    },
    {
      title: 'Address Verification',
      description: 'Need Indian mobile number for OTP verification',
      impact: 'Cannot complete registration on Indian platforms'
    },
    {
      title: 'High Shipping Costs',
      description: 'Individual shipments are extremely expensive',
      impact: 'Products become unaffordable with shipping costs'
    },
    {
      title: 'Currency & Billing',
      description: 'Indian billing address required for purchases',
      impact: 'Transactions get rejected at checkout'
    },
    {
      title: 'IP Restrictions',
      description: 'Some Indian sites block international IP addresses',
      impact: 'Cannot even browse certain websites'
    }
  ];

  const solutions = [
    'Free Indian Virtual Address',
    'Personal Shopping Service',
    'Package Consolidation',
    'Up to 80% Shipping Savings',
    'OTP Verification Support',
    'International Payment Accepted'
  ];

  return (
    <section id="customer-problems" className="py-20 px-4 bg-gradient-to-b from-red-50 via-orange-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-6 py-3 rounded-full mb-6">
            <AlertCircle size={24} />
            <span>Real Problems, Real Solutions</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">
            We Understand Your <span className="text-red-600">Challenges</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            After talking with our target audience, we identified the core problems faced when shopping from India
          </p>
        </motion.div>

        {/* Customer Interview Images */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1758519289361-2615778e0e5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGN1c3RvbWVyJTIwaW50ZXJ2aWV3JTIwY29udmVyc2F0aW9ufGVufDF8fHx8MTc2MDAzNjc1M3ww&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Customer Interview 1" 
              className="w-full h-auto" 
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white text-lg">Understanding customer pain points through direct conversations</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1698565653934-e2326fec05e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMGZlZWRiYWNrJTIwZGlzY3Vzc2lvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzYwMDM2NzUzfDA&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Customer Interview 2" 
              className="w-full h-auto" 
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white text-lg">Identifying real-world challenges in international shopping</p>
            </div>
          </motion.div>
        </div>

        {/* Problems Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl text-center mb-8">Common Problems We Solve</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-red-200 hover:border-red-400 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={24} />
                      <h4 className="text-xl">{problem.title}</h4>
                    </div>
                    <p className="text-gray-700 mb-3">{problem.description}</p>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-sm text-red-800">
                        <strong>Impact:</strong> {problem.impact}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Solutions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-12 rounded-3xl"
        >
          <h3 className="text-3xl md:text-4xl text-center mb-8">How Ganges Lite Solves These Problems</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl"
              >
                <CheckCircle2 className="text-green-300 flex-shrink-0" size={28} />
                <span className="text-lg">{solution}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}