import { motion } from 'motion/react';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface PrivacyPolicyProps {
  onBack?: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
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
            <div className="bg-blue-100 p-4 rounded-full">
              <Shield className="text-blue-600" size={48} />
            </div>
            <div>
              <h1 className="text-4xl">Privacy Policy</h1>
              <p className="text-gray-600">Last Updated: October 7, 2025</p>
            </div>
          </div>
        </motion.div>

        <Card>
          <CardContent className="p-8 prose max-w-none">
            <p className="text-lg mb-6">
              This privacy policy ("Privacy Policy") is designed to help you, the user ("User") understand how we collect, store, and use your personal and non-Personal Information, classified as mandatory or voluntary, which you decide to share with us when you access Ganges Lite Website and the associated networks, to help you make effective and informed decisions, and the choices you have regarding sharing of such information with us. Personal information includes information that alone or when in combination with other information may be used to readily identify, contact, or locate you ("Personal Information").
            </p>

            <p>
              You fully agree to use the Platform, or third-party Platforms that link to the Platform and any associated Platform(s), in the manner in which it is intended for use. If you do not agree to this Policy, we advise you to stop using our services.
            </p>

            <p>
              Accessing, transacting, or otherwise using the Platform indicates your agreement to all terms of use and subscriptions of the Platform. If you have any questions regarding the usage of the Platform, please proceed to read this document.
            </p>

            <p>
              We store, process, and collect your information where it is necessary and relevant to our dealings with you. The information that you share with us will be stored with us for as long as we are either required to by law or is relevant for the purpose for which it was collected. We will not share your information with any third party without your consent, unless we become legally compelled.
            </p>

            <h2>1. Collection of Information</h2>
            <p>
              We, our officers, employees and agents (if appointed) are required to collect certain information (which may include sensitive personal information) from you to assist us in our relationship with you.
            </p>
            
            <p>
              You understand that during the course of using the Platform you may be providing Ganges Lite and its affiliates, agents, vendors or partners, such information about yourself that may constitute as "sensitive personal information" as defined by the Information Technology Act, 2000 and the Information Technology Act (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information), Rules, 2011, and you hereby provide your consent for use of such sensitive personal information in such manner as has been provided in this Privacy Policy.
            </p>

            <h3>User-Provided Information:</h3>
            <p>
              You will provide us your Personal Information including first name, last name, email, phone number and any other information you provide, when you register for a User Account. If you correspond with us by email, we may retain the content of your email messages, your email address and our responses.
            </p>

            <h3>Information received from third parties:</h3>
            <p>
              In addition to the information that you provide us directly, we may receive information about you from others (If you Sign up with your Google or Facebook account, Ganges Lite will obtain information from these account).
            </p>

            <h3>Non-personal identification information:</h3>
            <p>
              We may collect non-personal identification information about the Users whenever they interact with us. Non-personal information may include the browser name, the type of computer and technical information about the Users and means of connection, such as the operating system and the internet service providers utilized and other similar information.
            </p>

            <h2>2. Use of Collected Information</h2>
            <p>We use the Personal Information you submit to operate, maintain, and provide to you the features and functionality of the Platform. We may collect and use User's Personal Information for the following purposes:</p>

            <ul>
              <li><strong>Improve customer service:</strong> Information you provide helps us respond to your customer service requests and support needs more efficiently.</li>
              <li><strong>Personalize User experience:</strong> We may use information in the aggregate to understand how a User uses the Services and resources provided on the Platform.</li>
              <li><strong>Manage User account:</strong> We use your information to manage your registration of Services.</li>
              <li><strong>Communications:</strong> We may use the email address to respond to your inquiries, questions, and/or other requests.</li>
            </ul>

            <h2>3. Sharing of Collected Information</h2>
            <p>
              We may use third party service providers to help us operate our business and the Platform or administer activities on our behalf, such as sending out newsletters or surveys. We may share your information with these third parties for those limited purposes provided that you have given us your permission.
            </p>

            <p>
              We may pass your Personal Information including your name and address on to a third party in order to deliver the services you have requested for.
            </p>

            <h2>4. Browser Usage and Cookies</h2>
            <p>
              We may place 'cookies' on your personal computer/laptop regularly. 'Cookies' are small identifiers sent from a web server and stored on your computer's hard drive. The Platform uses cookies to keep track of your session, shopping cart, advertising, deliver content specific to your interests and to help you save your login information for easy access to the Platform.
            </p>

            <h2>5. Security Precautions</h2>
            <p>
              We safeguard your privacy using known security standards and procedures and comply with applicable data protection laws. We combine industry-approved physical, electronic, and procedural safeguards to ensure that your information is well protected through its life cycle in our infrastructure.
            </p>

            <h2>6. Opt-out</h2>
            <p>
              Users may opt-out of receiving communications from us on behalf of our partners. To opt-out of receiving any communications, please click on unsubscribe link in the news mail, or change notifications preferences in your User Account.
            </p>

            <h2>7. Minors' Information</h2>
            <p>
              Ganges Lite is not marketed towards persons under the age of eighteen (18). If we discover that it has inadvertently collected Personal Information about individuals under the age eighteen (18), we will promptly delete such information.
            </p>

            <h2>8. Changes in Privacy Statement</h2>
            <p>
              We reserve the right to update or modify this Privacy Policy at any time and provide the updates on pages we deem fit. You are encouraged to view this Privacy Policy regularly so as to keep yourself updated with those changes and updates.
            </p>

            <h2>9. Consent</h2>
            <p>
              By submitting data to us or to our agent, you consent to our use of your data in the manner set out in this Privacy Policy and agree to have your personal data transferred and processed across national boundaries. Please note that we do not sell your Personal Information in any manner, except as stated in this Privacy Policy.
            </p>

            <h2>10. Queries and Grievance Officer</h2>
            <p>Should you have questions about this Privacy Policy or Ganges Lite's information collection, use and disclosure practices, you may contact the Grievance Officer appointed by Ganges Lite.</p>

            <div className="bg-blue-50 p-6 rounded-lg mt-6">
              <p><strong>Name:</strong> Jay Agarwal</p>
              <p><strong>Company:</strong> Ganges Lite (Proprietorship Firm)</p>
              <p><strong>Address:</strong> Malviya Nagar, Jaipur, Rajasthan, India</p>
              <p><strong>Phone:</strong> +91 82098 93843</p>
              <p><strong>Email:</strong> gangescompany@gmail.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}