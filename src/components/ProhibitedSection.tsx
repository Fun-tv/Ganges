import { motion } from 'motion/react';
import { XCircle, AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const prohibitedItems = [
  'Adult Material', 'Agriculture Products (Eg. Ginger, garlic paste or whole)', 'Air Conditioner/Purifier',
  'Alcoholic Beverages', 'Animal Products', 'Animal Supplement', 'Antiques', 'Bakery Items',
  'Batteries (Propane, Butane, Hydrogen, Helium)', 'Battery Shells',
  'Beverages requiring refrigeration or other environmental control', 'Bubble gum (Singapore)',
  'Bulbs', 'Candles', 'Charcoal (Powder, Cream, etc.)', 'Cigarette / E-cigarette', 'Coffee',
  'Coins (Silver/Gold)', 'Currency Notes', 'Dal (Lentil)', 'Damaged/broken/used phones of any kind',
  'Debit/Credit Card', 'Driving Licence', 'Drone Cameras', 'DSLR Camera (Without Lens we can ship)',
  'Dyes (Hair, Textile, etc.)', 'Ghee', 'Gold, Silver and Gold/Silver Plated Products',
  'Government-issued documents', 'Hand Sanitizers', 'Hard Disk Containing Data', 'Herbs',
  'High Value Gadgets', 'Hing (Asafoetida)', 'Honey', 'Hookah Flavours', 'Hoverboard',
  'Human and animal remains, Ashes', 'Incense Sticks', 'Insulin', 'Laptop/Desktops', 'Lasers',
  'Lithium Batteries', 'Live Organs or Human Remains', 'Lottery Tickets, Gambling Devices',
  'Magnets', 'Matchbox', 'Mattress', 'Meat of Wild Animals', 'Medical Samples',
  'Meltable Chocolates', 'Millets', 'Money, Fake/Dummy/Collectable Cash, Payment Cards, Traveler Cheques',
  'Mosquito Repellent', 'Mustard', 'N95 & 4 Ply, 8 Ply Face Masks',
  'Organic Food (any items which has names as organic can\'t be shipped)', 'Paints',
  'Passports, IDs, Stamps, Gift Cards', 'Peacock Feathers (Any Bird)', 'Pepper & Salt',
  'Perfumes', 'Perishable Foods', 'Pickle', 'Plants & Seeds (Need Phytosanitary Certificates for seeds)',
  'Pornography', 'Power Bank', 'Radar detectors', 'Rice', 'Sambac & Tuberose',
  'Sandalwood & Red Sandal', 'Sealant', 'Speakers', 'Spectacles & Lenses', 'Steel Coating',
  'Television', 'Tonner & Ink',
  'Toy Weapons, Paint Ball Guns and BB guns, Antique weapons, Knives and Swords, Fake grenades, Items that could be used as weapons, etc',
  'Turmeric', 'Vape Liquid', 'Vibhuti & Kumkum', 'Walkie Talkie'
];

const restrictedCountries = [
  'China', 'Bangladesh', 'South Africa', 'Mexico', 'Brazil', 'Japan', 'Taiwan', 'African countries'
];

const bannedCountries = ['Pakistan', 'Myanmar', 'Iran', 'Iraq', 'Turkey'];

export function ProhibitedSection() {
  return (
    <section id="prohibited" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-6 py-3 rounded-full mb-6">
            <XCircle size={24} />
            <span>Important Information</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">What We Cannot Send</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Ganges Lite is unable to ship prohibited & non-approved restricted items on behalf of its customers.
          </p>
          <p className="text-sm text-gray-500 mt-2">Last Updated: 30th SEP 2021</p>
        </motion.div>

        {/* Main Warning */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="border-2 border-red-300 bg-red-50">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="text-red-600 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-xl text-red-900 mb-3">Prohibited Items List</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {prohibitedItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.01 }}
                        className="flex items-start space-x-2 text-sm"
                      >
                        <XCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Country Restrictions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 border-yellow-300 bg-yellow-50 h-full">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Info className="text-yellow-700" size={24} />
                  <h3 className="text-xl text-yellow-900">Broker Required</h3>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Countries where customers need to hire a broker to clear customs:
                </p>
                <div className="space-y-2">
                  {restrictedCountries.map((country, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-yellow-100 px-3 py-2 rounded-lg text-sm text-gray-800"
                    >
                      {country}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 border-red-300 bg-red-50 h-full">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <XCircle className="text-red-700" size={24} />
                  <h3 className="text-xl text-red-900">No Shipping Available</h3>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  We currently do not ship to these countries:
                </p>
                <div className="space-y-2">
                  {bannedCountries.map((country, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-red-100 px-3 py-2 rounded-lg text-sm text-gray-800"
                    >
                      {country}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Important Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-blue-50 border-2 border-blue-300 rounded-xl p-8 text-center"
        >
          <Info className="text-blue-600 mx-auto mb-4" size={48} />
          <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
            <strong>NOTE:</strong> We won't be able to ship this category of items internationally. However, the shipment of some items can vary depending on the country you are shipping to, as it is specific to the customs of that country.
          </p>
          <p className="text-gray-700 mb-6">
            If you still have any doubts, please get in touch with our customer support team before making an order because some sellers/e-commerce platforms do not accept the return of the products.
          </p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => window.open('https://wa.me/918209893843', '_blank')}
          >
            Contact Support on WhatsApp
          </Button>
        </motion.div>
      </div>
    </section>
  );
}