import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { AlertCircle, Package, Plane } from 'lucide-react';
import { motion } from 'motion/react';

export function ShippingRatesSection() {
  const [weight, setWeight] = useState('1');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [country, setCountry] = useState('USA');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [showEstimate, setShowEstimate] = useState(false);

  const priorityCountries = [
    { code: 'USA', name: 'United States' },
    { code: 'CAN', name: 'Canada' },
    { code: 'UAE', name: 'United Arab Emirates' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'AUS', name: 'Australia' }
  ];

  const otherCountries = [
    { code: 'AFG', name: 'Afghanistan' },
    { code: 'ALB', name: 'Albania' },
    { code: 'DZA', name: 'Algeria' },
    { code: 'ARG', name: 'Argentina' },
    { code: 'ARM', name: 'Armenia' },
    { code: 'AUT', name: 'Austria' },
    { code: 'BHR', name: 'Bahrain' },
    { code: 'BGD', name: 'Bangladesh' },
    { code: 'BEL', name: 'Belgium' },
    { code: 'BTN', name: 'Bhutan' },
    { code: 'BRA', name: 'Brazil' },
    { code: 'BGR', name: 'Bulgaria' },
    { code: 'CHN', name: 'China' },
    { code: 'CZE', name: 'Czech Republic' },
    { code: 'DNK', name: 'Denmark' },
    { code: 'EGY', name: 'Egypt' },
    { code: 'FIN', name: 'Finland' },
    { code: 'FRA', name: 'France' },
    { code: 'DEU', name: 'Germany' },
    { code: 'GRC', name: 'Greece' },
    { code: 'HKG', name: 'Hong Kong' },
    { code: 'HUN', name: 'Hungary' },
    { code: 'IND', name: 'India' },
    { code: 'IDN', name: 'Indonesia' },
    { code: 'IRN', name: 'Iran' },
    { code: 'IRQ', name: 'Iraq' },
    { code: 'IRL', name: 'Ireland' },
    { code: 'ISR', name: 'Israel' },
    { code: 'ITA', name: 'Italy' },
    { code: 'JPN', name: 'Japan' },
    { code: 'JOR', name: 'Jordan' },
    { code: 'KWT', name: 'Kuwait' },
    { code: 'LBN', name: 'Lebanon' },
    { code: 'MYS', name: 'Malaysia' },
    { code: 'MDV', name: 'Maldives' },
    { code: 'MEX', name: 'Mexico' },
    { code: 'NPL', name: 'Nepal' },
    { code: 'NLD', name: 'Netherlands' },
    { code: 'NZL', name: 'New Zealand' },
    { code: 'NOR', name: 'Norway' },
    { code: 'OMN', name: 'Oman' },
    { code: 'PAK', name: 'Pakistan' },
    { code: 'PHL', name: 'Philippines' },
    { code: 'POL', name: 'Poland' },
    { code: 'PRT', name: 'Portugal' },
    { code: 'QAT', name: 'Qatar' },
    { code: 'ROU', name: 'Romania' },
    { code: 'RUS', name: 'Russia' },
    { code: 'SAU', name: 'Saudi Arabia' },
    { code: 'SGP', name: 'Singapore' },
    { code: 'ZAF', name: 'South Africa' },
    { code: 'KOR', name: 'South Korea' },
    { code: 'ESP', name: 'Spain' },
    { code: 'LKA', name: 'Sri Lanka' },
    { code: 'SWE', name: 'Sweden' },
    { code: 'CHE', name: 'Switzerland' },
    { code: 'TWN', name: 'Taiwan' },
    { code: 'THA', name: 'Thailand' },
    { code: 'TUR', name: 'Turkey' },
    { code: 'UKR', name: 'Ukraine' },
    { code: 'VNM', name: 'Vietnam' }
  ];

  // Convert weight to kg for calculation
  const weightInKg = weightUnit === 'lb' ? parseFloat(weight) * 0.453592 : parseFloat(weight);

  // Economy shipping rate: ₹2500 per kg
  const economyRatePerKg = 2500;
  const economyPriceINR = Math.round(weightInKg * economyRatePerKg);
  const economyPriceUSD = Math.round(economyPriceINR / 83);

  // Ganges One shipping rate: ₹3500 per kg
  const expressRatePerKg = 3500;
  const expressPriceINR = Math.round(weightInKg * expressRatePerKg);
  const expressPriceUSD = Math.round(expressPriceINR / 83);

  const economyPrice = currency === 'INR' ? economyPriceINR : economyPriceUSD;
  const expressPrice = currency === 'INR' ? expressPriceINR : expressPriceUSD;

  return (
    <section id="shipping-rates" className="py-20 px-4 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl mb-4"
          >
            Calculate Your Shipping Cost
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Get instant shipping estimates to your destination
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-2xl border-2 border-blue-200">
            <div className="space-y-6">
              {/* Currency Toggle */}
              <div className="flex items-center justify-between mb-6 p-4 bg-orange-50 rounded-lg">
                <span className="text-gray-700">Display prices in:</span>
                <div className="flex items-center space-x-4">
                  <span className={currency === 'INR' ? 'font-semibold text-orange-600' : 'text-gray-500'}>INR (₹)</span>
                  <Switch
                    checked={currency === 'USD'}
                    onCheckedChange={(checked) => setCurrency(checked ? 'USD' : 'INR')}
                  />
                  <span className={currency === 'USD' ? 'font-semibold text-orange-600' : 'text-gray-500'}>USD ($)</span>
                </div>
              </div>

              {/* Country Selection */}
              <div>
                <label className="block mb-2 text-gray-700">Destination Country</label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="w-full bg-white border-2 border-gray-300">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="font-semibold px-2 py-1 text-sm text-orange-600">Popular Destinations</div>
                    {priorityCountries.map((c) => (
                      <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>
                    ))}
                    <div className="border-t my-2"></div>
                    <div className="font-semibold px-2 py-1 text-sm text-gray-600">Other Countries</div>
                    {otherCountries.map((c) => (
                      <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Weight Input */}
              <div>
                <label className="block mb-2 text-gray-700">Package Weight</label>
                <div className="flex space-x-4">
                  <Input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="flex-1 bg-white border-2 border-gray-300"
                    placeholder="Enter weight"
                    min="0.1"
                    step="0.1"
                  />
                  <Select value={weightUnit} onValueChange={(value: 'kg' | 'lb') => setWeightUnit(value)}>
                    <SelectTrigger className="w-24 bg-white border-2 border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lb">lb</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Dimensions (Optional) */}
              <div>
                <label className="block mb-2 text-gray-700">Package Dimensions (Optional)</label>
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="bg-white border-2 border-gray-300"
                    placeholder="Length (cm)"
                  />
                  <Input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="bg-white border-2 border-gray-300"
                    placeholder="Width (cm)"
                  />
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="bg-white border-2 border-gray-300"
                    placeholder="Height (cm)"
                  />
                </div>
              </div>

              {/* Get Estimate Button or Shipping Options */}
              {!showEstimate ? (
                <div className="text-center mt-8">
                  <Button
                    onClick={() => setShowEstimate(true)}
                    className="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white px-12 py-6 text-xl"
                  >
                    Get Estimate
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  {/* Shipping Options */}
                  <div className="space-y-4">
                    <h3 className="text-xl mb-4">Shipping Options</h3>
                    
                    {/* Economy Shipping */}
                    <motion.div 
                      className="border-2 border-blue-300 rounded-lg p-6 hover:shadow-lg transition-all bg-blue-50"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Package className="text-blue-600" size={24} />
                            <h4 className="text-xl">Economy Shipping</h4>
                          </div>
                          <p className="text-gray-600 mb-2">Average in-transit time: <span className="font-bold">10-25 working days</span></p>
                          <p className="text-sm text-gray-500">Cost-effective option for non-urgent shipments</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl text-blue-600">
                            {currency === 'INR' ? '₹' : '$'}{economyPrice}
                          </p>
                          <p className="text-sm text-gray-500">for {weightInKg.toFixed(2)} kg</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Ganges One Shipping */}
                    <motion.div 
                      className="border-2 border-orange-400 rounded-lg p-6 hover:shadow-lg transition-all bg-orange-50"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Plane className="text-orange-600" size={24} />
                            <h4 className="text-xl">Ganges One - Express Shipping</h4>
                          </div>
                          <p className="text-gray-600 mb-2">Average in-transit time: <span className="font-bold">3-10 working days</span></p>
                          <p className="text-sm text-gray-500">Fast and reliable delivery with tracking</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl text-orange-600">
                            {currency === 'INR' ? '₹' : '$'}{expressPrice}
                          </p>
                          <p className="text-sm text-gray-500">for {weightInKg.toFixed(2)} kg</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mt-6">
                    <div className="flex items-start">
                      <AlertCircle className="text-yellow-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
                      <div className="text-sm text-gray-700">
                        <p className="font-semibold mb-1">Disclaimer</p>
                        <p>These shipping rates are estimates and may differ at checkout. For accurate pricing and more information, please contact our support team.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>

          {/* Contact Support */}
          <div className="text-center mt-8">
            <Button 
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => window.open('https://wa.me/918209893843', '_blank')}
            >
              Contact Support for Accurate Rates
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
