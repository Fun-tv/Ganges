import { useState } from 'react';
import {
    MessageCircle,
    Mail,
    ExternalLink,
    ChevronRight,
    ChevronDown,
    Search,
    BookOpen,
    LifeBuoy
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Support() {
    const [searchTerm, setSearchTerm] = useState('');
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const faqs = [
        {
            q: "How long can I store items in the locker?",
            a: "Items can be stored in your locker for up to 30 days for free. After 30 days, a storage fee of ₹50/day per package applies. We recommend consolidating and shipping within the free window."
        },
        {
            q: "What items are prohibited from international shipping?",
            a: "Prohibited items include liquids, flammable items, gold/silver, medicines (without prescription), and perishable food. Please check our full prohibited items list before shopping."
        },
        {
            q: "How do you calculate volumetric weight?",
            a: "Volumetric weight is calculated using the formula: (Length x Width x Height) / 5000 (for cm). DHL and FedEx charge based on whichever is higher: actual or volumetric weight."
        },
        {
            q: "Can you inspect my items before shipping?",
            a: "Yes! Every item that arrives is inspected for damage. We take 3-5 photos of the package and contents and upload them to your locker for review."
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
                <h1 className="text-4xl font-black text-gray-900">How can we help?</h1>
                <p className="text-gray-500 text-lg font-medium">Search our knowledge base or reach out to our support team.</p>
                <div className="relative mt-8">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                    <Input
                        placeholder="Search for answers..."
                        className="pl-16 py-8 rounded-3xl text-lg shadow-xl shadow-blue-50 border-gray-100"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Support Options */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <LifeBuoy className="w-6 h-6 text-blue-600" /> Contact Us
                    </h3>

                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl group hover:border-blue-200 transition-all cursor-pointer">
                            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-6 h-6 text-blue-600" />
                            </div>
                            <h4 className="font-bold text-gray-900">Live Chat</h4>
                            <p className="text-sm text-gray-500 mb-6">Chat with our logistics experts instantly.</p>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold h-12 rounded-xl">Start Chat</Button>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl group hover:border-blue-200 transition-all cursor-pointer">
                            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Mail className="w-6 h-6 text-green-600" />
                            </div>
                            <h4 className="font-bold text-gray-900">Email Support</h4>
                            <p className="text-sm text-gray-500 mb-6">Send us a ticket for complex queries.</p>
                            <Button variant="outline" className="w-full font-bold h-12 rounded-xl text-gray-600 border-gray-100 hover:bg-gray-50">Create Ticket</Button>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-xl">
                        <h4 className="text-lg font-bold mb-4">Official Channels</h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 cursor-pointer transition-all">
                                <span className="text-sm font-medium">WhatsApp Hub</span>
                                <ExternalLink className="w-4 h-4 opacity-50" />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 cursor-pointer transition-all">
                                <span className="text-sm font-medium">Twitter @GangesWorld</span>
                                <ExternalLink className="w-4 h-4 opacity-50" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQs */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-blue-600" /> Frequently Asked Questions
                    </h3>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                                >
                                    <span className="font-bold text-gray-800">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-blue-600' : ''}`} />
                                </button>
                                <div className={`transition-all duration-300 overflow-hidden ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="p-6 pt-0 text-sm text-gray-500 leading-relaxed border-t border-gray-50">
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-blue-600 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-100">
                        <div className="space-y-2">
                            <h4 className="text-2xl font-bold text-center md:text-left">Still have questions?</h4>
                            <p className="text-blue-100 text-sm opacity-80 text-center md:text-left">Our support team is just a single click away to help you out.</p>
                        </div>
                        <Button className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 h-12 rounded-xl shrink-0">
                            Contact Support <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
