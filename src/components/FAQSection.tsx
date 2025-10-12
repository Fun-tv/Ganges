import { motion } from 'motion/react';
import { HelpCircle, MessageCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';

const faqs = [
  {
    question: 'How Ganges Lite Works?',
    answer: `When you sign up on our platform, you will get a unique Locker number and Indian virtual address.

• You can purchase from any online store and provide the virtual address as your delivery address.
• Once your package is received in our facility, we will notify you.
• Later you can create a ship request by providing the destination address.
• We pack all your items and share the shipping cost.
• Upon receiving payment we will dispatch it through a trusted carrier DHL, FedEx, UPS or Aramex. It will take around 5-8* working days for delivery.

Shipping cost is based on the weight of the package.

Imp Note: The charges are not inclusive of the IMPORT DUTY/GST/VAT at the receiving country. The same will vary from country to country and based on the product.`
  },
  {
    question: "I'm facing difficulty in signing up",
    answer: `If you are having difficulty registering with Ganges Lite, please follow these steps:

1. Clear the cookies on your Web browser.
2. Make sure your Web browser is up to date. Out-of-date browsers may have functionality issues.

If you continue to experience problems, please contact us on WhatsApp.`
  },
  {
    question: 'How do I use my Indian virtual address?',
    answer: `Enter your Ganges Lite address as your "Shipping Address" when you shop from ANY Indian online store:

Name: [Your Name]
Address (line 1): # XXXXX-XXX (Enter your Unique Personal Locker number here), Ganges, Horizon Tower
Address (line 2): Malviya Nagar, Near World Trade Park
City: Jaipur
Landmark (Optional): Near World Trade Park
State/Province: Rajasthan
Country: India
Pin Code: 302017
Phone Number: +91-8209893843

Or, if the seller asks you for the address in a single box, you can write it like this:

# XXXXX-XXX (enter your Unique Personal Locker number here), Ganges, Horizon Tower, Malviya Nagar, Near World Trade Park, Jaipur, Rajasthan - 302017, Phone number: +91-8209893843

Please ensure all your packages are shipped to this address with your unique Locker number. Any packages shipped with an incomplete or inaccurate address will be delayed.`
  },
  {
    question: 'How do I add additional addresses to my account?',
    answer: `1. Sign in to your Ganges Lite account
2. Click Address Book on the left hand side of the Dashboard
3. Click +Add new Shipping Address
4. Click Submit to save the name/address to your account.`
  },
  {
    question: 'Will Ganges Lite accept COD orders?',
    answer: 'Sorry, we are not accepting COD orders.'
  },
  {
    question: 'Will Ganges Lite open all the packages received?',
    answer: 'Yes, due to security reasons we open all the packages received in our facility.'
  },
  {
    question: 'Can I send personal packages from home?',
    answer: 'Yes, you can send personal packages. Make sure package items are eligible for international shipping.'
  },
  {
    question: 'Does Ganges Lite provide pickup service?',
    answer: 'Sorry we do not have pickup service.'
  },
  {
    question: 'Does Ganges Lite accept packages coming from other countries?',
    answer: 'Yes, but all customs clearance and duty/taxes need to be taken care of by the sender. Ganges Lite will not be able to provide any documents for clearance.'
  },
  {
    question: 'What are the package receiving timings?',
    answer: 'Our facility will accept packages from 9 AM to 8 PM IST.'
  },
  {
    question: 'What happens if the package does not have proper locker number/name?',
    answer: 'If any package is received and it has no name/no locker number/no valid locker number/name and locker number mismatch/package information not visible, then these are kept aside as unclaimed packages. Customer has to reach out to our support team with valid details/proof of package to get this updated into their locker.\n\nUnclaimed packages over 90 days are processed for abandonment.'
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-full mb-6">
            <HelpCircle size={24} />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">
            Find answers to common questions about our services
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-white border-2 border-gray-200 rounded-xl px-6 hover:border-blue-400 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 whitespace-pre-line">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-2xl"
        >
          <HelpCircle className="mx-auto mb-4" size={48} />
          <h3 className="text-2xl mb-4">Still Have Questions?</h3>
          <p className="mb-6 text-blue-100">
            Our support team is here to help you 24/7
          </p>
          <Button 
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={() => window.open('https://wa.me/918209893843', '_blank')}
          >
            <MessageCircle className="mr-2" size={20} />
            WhatsApp Us
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-500 mt-8"
        >
          Please note, this FAQ is subject to changes. Please check back from time to time for the latest information.
        </motion.p>
      </div>
    </section>
  );
}
