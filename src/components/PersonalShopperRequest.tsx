import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ArrowLeft, ShoppingCart, CheckCircle, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface PersonalShopperRequestProps {
  onBack: () => void;
}

export function PersonalShopperRequest({ onBack }: PersonalShopperRequestProps) {
  const [formData, setFormData] = useState({
    productUrl: '',
    productName: '',
    color: '',
    size: '',
    quantity: '1',
    pricePerItem: '',
    additionalNotes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.productUrl || !formData.productName || !formData.quantity || !formData.pricePerItem) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Personal shopper request submitted successfully! Our team will contact you within 24-48 hours.');

    // Reset form
    setFormData({
      productUrl: '',
      productName: '',
      color: '',
      size: '',
      quantity: '1',
      pricePerItem: '',
      additionalNotes: ''
    });

    // Go back after short delay
    setTimeout(() => onBack(), 2000);
  };

  const calculateServiceFee = () => {
    const price = parseFloat(formData.pricePerItem) || 0;
    const qty = parseInt(formData.quantity) || 1;
    const totalProductCost = price * qty;
    const serviceFee = totalProductCost * 0.07; // 7% service fee
    const total = totalProductCost + serviceFee;

    return {
      productCost: totalProductCost.toFixed(2),
      serviceFee: serviceFee.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const costs = calculateServiceFee();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Button
        variant="outline"
        onClick={onBack}
        className="mb-6"
      >
        <ArrowLeft className="mr-2" size={16} />
        Back to Personal Shopper
      </Button>

      <Card>
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardTitle className="flex items-center text-2xl">
            <ShoppingCart className="mr-3" size={28} />
            Create Personal Shopper Request
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product URL */}
            <div>
              <Label htmlFor="productUrl">Product URL *</Label>
              <Input
                id="productUrl"
                type="url"
                value={formData.productUrl}
                onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
                placeholder="https://www.amazon.in/product-name/dp/..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Paste the complete product URL from Amazon.in, Flipkart, Myntra, Ajio, etc.
              </p>
            </div>

            {/* Product Name */}
            <div>
              <Label htmlFor="productName">Product Name *</Label>
              <Input
                id="productName"
                type="text"
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                placeholder="e.g., Samsung Galaxy Watch, Ethnic Kurta Set"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Color */}
              <div>
                <Label htmlFor="color">Color/Variant</Label>
                <Input
                  id="color"
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="e.g., Blue, Red, Black"
                />
              </div>

              {/* Size */}
              <div>
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  type="text"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  placeholder="e.g., M, L, XL, 42"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quantity */}
              <div>
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                />
              </div>

              {/* Price Per Item */}
              <div>
                <Label htmlFor="pricePerItem">Price Per Item (₹) *</Label>
                <Input
                  id="pricePerItem"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.pricePerItem}
                  onChange={(e) => setFormData({ ...formData, pricePerItem: e.target.value })}
                  placeholder="e.g., 2500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the price shown on the product page in Indian Rupees
                </p>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                placeholder="Any specific requirements or preferences..."
                rows={4}
              />
            </div>

            {/* Cost Estimate */}
            {formData.pricePerItem && formData.quantity && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <DollarSign className="text-green-600 mr-2" size={24} />
                  <h4 className="text-lg">Estimated Cost Breakdown</h4>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Product Cost ({formData.quantity} × ₹{formData.pricePerItem})</span>
                    <span className="">₹{costs.productCost}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Service Fee (7%)</span>
                    <span className="">₹{costs.serviceFee}</span>
                  </div>
                  <div className="border-t-2 border-green-300 pt-3 flex justify-between items-center">
                    <span className="text-lg">Estimated Total</span>
                    <span className="text-2xl text-green-600">₹{costs.total}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mt-4">
                  * Final cost will be confirmed by our team after verifying the product price and availability.
                  Additional charges may apply for orders with more than 15 items per seller (₹50 per extra item).
                </p>
              </motion.div>
            )}

            {/* Service Information */}
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
              <h4 className="text-lg mb-4 flex items-center">
                <CheckCircle className="mr-2 text-orange-600" size={20} />
                What Happens Next?
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm">1</div>
                  <div>
                    <p className="text-sm">Our team verifies the product and confirms the final price</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm">2</div>
                  <div>
                    <p className="text-sm">You'll receive a detailed quote via email within 24-48 hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm">3</div>
                  <div>
                    <p className="text-sm">After payment confirmation, we purchase the item(s)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm">4</div>
                  <div>
                    <p className="text-sm">Item is delivered to your locker for international shipping</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                Submit Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
