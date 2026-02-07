import { useState } from 'react';
import {
    Copy,
    Check,
    MapPin,
    AlertCircle,
    ClipboardCheck,
    ShieldCheck,
    HelpCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

export function VirtualAddress() {
    const { user } = useAuth();
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const addressDetails = {
        fullName: `GANGES LITE - ${user?.id.substring(0, 8).toUpperCase() || 'GS12345'}`,
        address1: "Ganges Logistics Center, Sector 18",
        address2: "Gurgaon, Near Cyber Hub",
        city: "Gurgaon",
        state: "Haryana",
        pincode: "122015",
        country: "India",
        phone: "+91 8800123456"
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        toast.success('Copied to clipboard!');
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Virtual Address</h1>
                    <p className="text-gray-500 font-medium">Use this address to shop from any Indian website.</p>
                </div>
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-bold border border-green-100">
                    <ShieldCheck className="w-4 h-4" /> Account Verified
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Address Card */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden self-start">
                    <div className="bg-blue-600 p-6 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                            <MapPin className="w-6 h-6" />
                            <span className="font-bold text-lg">Your Hub in India</span>
                        </div>
                        <div className="bg-white/20 text-xs px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm">
                            Unique ID: {user?.id.substring(0, 8).toUpperCase() || 'GS123456'}
                        </div>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { label: 'Full Name', value: addressDetails.fullName, id: 'name' },
                                { label: 'Address Line 1', value: addressDetails.address1, id: 'a1' },
                                { label: 'Address Line 2', value: addressDetails.address2, id: 'a2' },
                                { label: 'City', value: addressDetails.city, id: 'city' },
                                { label: 'State', value: addressDetails.state, id: 'state' },
                                { label: 'Pincode', value: addressDetails.pincode, id: 'pincode' },
                                { label: 'Phone', value: addressDetails.phone, id: 'phone' },
                                { label: 'Country', value: addressDetails.country, id: 'country' },
                            ].map((field) => (
                                <div key={field.id} className="group relative">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{field.label}</p>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                                        <span className="text-sm font-semibold text-gray-800 break-all">{field.value}</span>
                                        <button
                                            onClick={() => copyToClipboard(field.value, field.id)}
                                            className="text-gray-400 hover:text-blue-600 ml-2 shrink-0 transition-colors"
                                        >
                                            {copiedId === field.id ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700 py-6 rounded-2xl text-lg font-bold shadow-lg shadow-blue-200"
                            onClick={() => copyToClipboard(Object.values(addressDetails).join(', '), 'full')}>
                            Copy Full Address
                        </Button>
                    </div>
                </div>

                {/* Instructions & Help */}
                <div className="space-y-6">
                    <div className="bg-blue-600 text-white rounded-3xl p-8 relative overflow-hidden shadow-xl shadow-blue-200">
                        <h3 className="text-xl font-bold mb-4 relative z-10 flex items-center gap-2">
                            <ClipboardCheck className="w-6 h-6" /> How to use?
                        </h3>
                        <ul className="space-y-4 relative z-10">
                            <li className="flex gap-4">
                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0 font-bold text-sm">1</div>
                                <p className="text-sm text-blue-50">Shop at Amazon.in, Myntra, Ajio, or any Indian store.</p>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0 font-bold text-sm">2</div>
                                <p className="text-sm text-blue-50">Enter the address shown on the left exactly as provided.</p>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0 font-bold text-sm">3</div>
                                <p className="text-sm text-blue-50">We will notify you the moment your package arrives at our hub!</p>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 flex gap-4">
                        <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-amber-900 mb-1">Important Note</p>
                            <p className="text-xs text-amber-700 leading-relaxed">
                                Ensure your unique ID is included in the full name field. This helps us identify your packages instantly upon arrival.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { site: 'Amazon.in' },
                            { site: 'Flipkart' },
                            { site: 'Myntra' },
                            { site: 'Ajio' },
                        ].map((store) => (
                            <div key={store.site} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-blue-200 transition-all">
                                <span className="font-bold text-sm text-gray-700">{store.site}</span>
                                <HelpCircle className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
