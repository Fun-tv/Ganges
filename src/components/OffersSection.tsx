import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Gift, Percent, Zap, CreditCard, Users, Star } from 'lucide-react';

interface OffersSectionProps {
  onSignUpClick?: () => void;
}

export function OffersSection({ onSignUpClick }: OffersSectionProps) {
  const currentOffers = [
    {
      icon: Gift,
      title: 'Welcome Bonus',
      discount: '$25 OFF',
      description: 'Get $25 off on your first shipment',
      code: 'WELCOME25',
      validity: 'Valid for new users',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Percent,
      title: 'Bulk Shipping',
      discount: 'Up to 40% OFF',
      description: 'Save more when you ship multiple packages together',
      code: 'BULK40',
      validity: 'Min 3 packages',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'Express Delivery',
      discount: '20% OFF',
      description: 'Special discount on express shipping services',
      code: 'EXPRESS20',
      validity: 'Valid until Dec 2025',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: CreditCard,
      title: 'Wallet Bonus',
      discount: '10% Extra',
      description: 'Get 10% extra on wallet recharge above $100',
      code: 'WALLET10',
      validity: 'Min recharge $100',
      color: 'from-green-500 to-green-600'
    }
  ];

  const seasonalOffers = [
    {
      title: 'Festival Special',
      description: 'Ship your festival shopping with massive discounts',
      discount: 'Up to 50% OFF',
      period: 'Limited Time'
    },
    {
      title: 'Student Discount',
      description: 'Special rates for students studying abroad',
      discount: '15% OFF',
      period: 'Year Round'
    },
    {
      title: 'Referral Bonus',
      description: 'Refer friends and earn $10 for each successful referral',
      discount: '$10 Each',
      period: 'Unlimited'
    }
  ];

  const membershipBenefits = [
    'Priority customer support',
    'Free package consolidation',
    'Extended storage up to 90 days',
    'Exclusive member-only discounts',
    'Free package photos & inspection',
    'Express customs clearance'
  ];

  return (
    <section id="offers" className="py-16 px-4 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-orange-500 text-white px-4 py-2">
            Limited Time Offers
          </Badge>
          <h2 className="text-4xl mb-4">Amazing Deals & Offers</h2>
          <p className="text-xl text-gray-600">
            Save more with our exclusive discounts and promotional offers
          </p>
        </div>

        {/* Current Offers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {currentOffers.map((offer, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className={`bg-gradient-to-r ${offer.color} p-6 text-white`}>
                <offer.icon className="w-12 h-12 mb-3" />
                <h3 className="text-2xl mb-2">{offer.discount}</h3>
                <p className="text-lg">{offer.title}</p>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">{offer.description}</p>
                <div className="bg-gray-100 rounded p-3 mb-3">
                  <p className="text-xs text-gray-600 mb-1">Promo Code</p>
                  <p className="font-mono text-lg text-orange-600">{offer.code}</p>
                </div>
                <p className="text-xs text-gray-500">{offer.validity}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Seasonal Offers */}
        <div className="mb-12">
          <h3 className="text-3xl text-center mb-8">Seasonal Offers</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {seasonalOffers.map((offer, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Star className="w-10 h-10 text-orange-500" />
                  </div>
                  <h4 className="text-xl mb-2">{offer.title}</h4>
                  <p className="text-gray-600 mb-4">{offer.description}</p>
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-3 mb-2">
                    <p className="text-2xl">{offer.discount}</p>
                  </div>
                  <p className="text-sm text-gray-500">{offer.period}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Premium Membership */}
        <Card className="p-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-orange-400" />
                <h3 className="text-3xl">Premium Membership</h3>
              </div>
              <p className="text-xl mb-6 text-gray-300">
                Join our premium membership and unlock exclusive benefits
              </p>
              <div className="space-y-3 mb-6">
                {membershipBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-orange-500 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-xs">✓</span>
                    </div>
                    <span className="text-gray-200">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-300 mb-2">Membership Fee</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl">$49</span>
                  <span className="text-gray-400">/year</span>
                  <span className="ml-auto bg-green-500 px-3 py-1 rounded-full text-sm">
                    Save $200+/year
                  </span>
                </div>
              </div>
              <Button 
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white w-full md:w-auto"
                onClick={onSignUpClick}
              >
                Become a Premium Member
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-white/5 rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">🎁</div>
                <p className="text-xl mb-2">Limited Time Offer</p>
                <p className="text-3xl text-orange-400 mb-4">First Month Free</p>
                <p className="text-gray-400">Use code: PREMIUM1M</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Newsletter Signup */}
        <div className="mt-12 text-center bg-orange-100 rounded-lg p-8">
          <h3 className="text-2xl mb-4">Stay Updated with Latest Offers</h3>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter and never miss out on exclusive deals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300"
            />
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
