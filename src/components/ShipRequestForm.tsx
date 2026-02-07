import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Truck } from 'lucide-react';
import { toast } from 'sonner';

interface ShipRequestFormProps {
  onBack: () => void;
  packageId?: string;
}

export function ShipRequestForm({ onBack, packageId }: ShipRequestFormProps) {
  const [formData, setFormData] = useState({
    destination: '',
    shippingMethod: '',
    insurance: false,
    specialInstructions: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Ship request created successfully!');
    onBack();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-3xl mx-auto"
    >
      <Button
        variant="outline"
        onClick={onBack}
        className="mb-6"
      >
        <ArrowLeft className="mr-2" size={16} />
        Back to Locker
      </Button>

      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardTitle className="flex items-center text-2xl">
            <Truck className="mr-3" size={28} />
            Create Ship Request
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {packageId && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Package ID</p>
                <p className="text-lg">{packageId}</p>
              </div>
            )}

            <div>
              <Label>Destination Country *</Label>
              <Select
                value={formData.destination}
                onValueChange={(value: string) => setFormData({ ...formData, destination: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USA">United States</SelectItem>
                  <SelectItem value="CAN">Canada</SelectItem>
                  <SelectItem value="UAE">United Arab Emirates</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="AUS">Australia</SelectItem>
                  <SelectItem value="SGP">Singapore</SelectItem>
                  <SelectItem value="GER">Germany</SelectItem>
                  <SelectItem value="FRA">France</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Shipping Method *</Label>
              <Select
                value={formData.shippingMethod}
                onValueChange={(value: string) => setFormData({ ...formData, shippingMethod: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select shipping method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy Shipping (10-25 days)</SelectItem>
                  <SelectItem value="express">Express Shipping (3-10 days)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Add Insurance (Optional)</Label>
              <Select
                value={formData.insurance ? 'yes' : 'no'}
                onValueChange={(value: string) => setFormData({ ...formData, insurance: value === 'yes' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No Insurance</SelectItem>
                  <SelectItem value="yes">Add Insurance (+$5)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Special Instructions (Optional)</Label>
              <Textarea
                value={formData.specialInstructions}
                onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                placeholder="Any special handling instructions..."
                rows={4}
              />
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> You will receive a shipping quote via email within 24 hours. Payment must be completed before shipment processing.
              </p>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">
                Submit Ship Request
              </Button>
              <Button type="button" variant="outline" onClick={onBack}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
