import { motion } from 'motion/react';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface TermsConditionsProps {
  onBack?: () => void;
}

export function TermsConditions({ onBack }: TermsConditionsProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-6"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Home
          </Button>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-orange-100 p-4 rounded-full">
              <FileText className="text-orange-600" size={48} />
            </div>
            <div>
              <h1 className="text-4xl">Terms & Conditions</h1>
              <p className="text-gray-600">Last Updated: October 7, 2025</p>
            </div>
          </div>
        </motion.div>

        <Card>
          <CardContent className="p-8 prose max-w-none">
            <p className="text-lg mb-6">
              Welcome to Ganges Lite. These Terms and Conditions ("Terms") govern your use of our website and services. By accessing or using Ganges Lite, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
            </p>

            <div className="bg-orange-50 p-6 rounded-lg mb-6">
              <p><strong>Company Information:</strong></p>
              <p><strong>Business Name:</strong> Ganges Lite</p>
              <p><strong>Business Type:</strong> Proprietorship Firm</p>
              <p><strong>Proprietor:</strong> Jay Agarwal</p>
              <p><strong>Location:</strong> Malviya Nagar, Jaipur, Rajasthan, India</p>
              <p><strong>Email:</strong> gangescompany@gmail.com</p>
              <p><strong>Phone:</strong> +91 82098 93843</p>
            </div>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By creating an account and using Ganges Lite services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as our Privacy Policy.
            </p>

            <h2>2. Services Provided</h2>
            <p>Ganges Lite operates as a proprietorship firm providing the following services:</p>
            <ul>
              <li>Package forwarding from India to international destinations</li>
              <li>Virtual Indian address for online shopping</li>
              <li>Personal shopping assistance for Indian e-commerce platforms</li>
              <li>Package consolidation and storage</li>
              <li>International shipping and logistics</li>
            </ul>

            <h2>3. User Accounts</h2>
            <h3>3.1 Registration</h3>
            <p>
              To use our services, you must create an account by providing accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials.
            </p>

            <h3>3.2 Account Responsibility</h3>
            <p>
              You are responsible for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account or any other breach of security.
            </p>

            <h2>4. Service Fees and Payment</h2>
            <h3>4.1 Package Forwarding</h3>
            <p>
              Shipping costs are calculated based on the weight, dimensions, and destination of your package. All fees must be paid before shipment processing.
            </p>

            <h3>4.2 Personal Shopper Service</h3>
            <p>
              Our personal shopper service charges a 7% service fee on the total product cost. Orders with more than 15 items per online seller will incur an additional ₹50 per item cost for every item over 15.
            </p>

            <h3>4.3 Payment Methods</h3>
            <p>
              We accept payment via credit/debit cards, PayPal, wire transfer, and other payment methods as specified on our platform.
            </p>

            <h2>5. Prohibited Items</h2>
            <p>
              Ganges Lite cannot ship prohibited or restricted items as outlined in our Prohibited Items list. Customers are responsible for ensuring their shipments comply with all applicable laws and regulations of both India and the destination country.
            </p>

            <p>
              Any packages containing prohibited items will be disposed of according to local regulations, and no refund will be provided.
            </p>

            <h2>6. Shipping and Delivery</h2>
            <h3>6.1 Processing Time</h3>
            <p>
              Package processing and consolidation typically take 2-5 business days. International shipping typically takes 5-8 working days, depending on the destination and carrier.
            </p>

            <h3>6.2 Customs and Duties</h3>
            <p>
              Customers are responsible for all import duties, taxes, and customs fees charged by the destination country. Ganges Lite is not responsible for any delays caused by customs clearance.
            </p>

            <h3>6.3 Lost or Damaged Packages</h3>
            <p>
              While we take utmost care in handling your packages, Ganges Lite is not liable for packages lost or damaged during international transit unless additional insurance has been purchased.
            </p>

            <h2>7. Virtual Address Usage</h2>
            <p>
              Your virtual Indian address is for legitimate shopping purposes only. The address must not be used for:
            </p>
            <ul>
              <li>Illegal activities or fraudulent transactions</li>
              <li>Receiving prohibited items</li>
              <li>Business purposes without prior approval</li>
              <li>Registering for government documents or official purposes</li>
            </ul>

            <h2>8. Returns and Refunds</h2>
            <h3>8.1 Service Fees</h3>
            <p>
              Service fees (personal shopper fees, consolidation fees) are non-refundable once services have been rendered.
            </p>

            <h3>8.2 Shipping Fees</h3>
            <p>
              Shipping fees are non-refundable once the package has been dispatched. If a shipment is cancelled before dispatch, a refund minus processing charges may be issued.
            </p>

            <h3>8.3 Product Returns</h3>
            <p>
              Ganges Lite does not handle product returns to Indian sellers. Any returns must be coordinated directly between you and the seller. We can assist in forwarding returned items if they are shipped to your virtual address, subject to additional fees.
            </p>

            <h2>9. Liability Limitations</h2>
            <p>
              As a proprietorship firm, Ganges Lite provides services to the best of our ability. However:
            </p>
            <ul>
              <li>We are not liable for delays caused by third parties (carriers, customs, sellers)</li>
              <li>We are not responsible for product quality or authenticity from third-party sellers</li>
              <li>Our maximum liability is limited to the declared value of the package or the service fee paid, whichever is lower</li>
              <li>We are not liable for indirect, consequential, or incidental damages</li>
            </ul>

            <h2>10. Intellectual Property</h2>
            <p>
              All content on the Ganges Lite website, including logos, text, graphics, and software, is the property of Ganges Lite and is protected by intellectual property laws.
            </p>

            <h2>11. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at any time for violation of these Terms, fraudulent activity, or misuse of our services. Upon termination, you remain responsible for any outstanding fees.
            </p>

            <h2>12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of these Terms shall be subject to the exclusive jurisdiction of the courts in Jaipur, Rajasthan, India.
            </p>

            <h2>13. Changes to Terms</h2>
            <p>
              Ganges Lite reserves the right to modify these Terms at any time. We will notify users of significant changes via email or website notification. Continued use of our services after changes constitutes acceptance of the modified Terms.
            </p>

            <h2>14. Contact Information</h2>
            <p>
              For any questions regarding these Terms & Conditions, please contact us:
            </p>

            <div className="bg-orange-50 p-6 rounded-lg mt-6">
              <p><strong>Ganges Lite</strong></p>
              <p>Proprietor: Jay Agarwal</p>
              <p>Address: Malviya Nagar, Jaipur, Rajasthan, India</p>
              <p>Email: gangescompany@gmail.com</p>
              <p>Phone: +91 82098 93843</p>
              <p>WhatsApp: <a href="https://wa.me/918209893843" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">+91 82098 93843</a></p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mt-6">
              <p className="text-sm">
                <strong>Note:</strong> Ganges Lite is a proprietorship firm committed to providing reliable international shipping services. We are continuously working to improve our services and expand our capabilities. Thank you for choosing Ganges Lite for your international shipping needs.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}