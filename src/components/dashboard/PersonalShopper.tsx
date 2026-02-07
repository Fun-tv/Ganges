import { useState } from 'react';
import {
    ShoppingBag,
    Link as LinkIcon,
    Info,
    Plus,
    Trash2,
    Send,
    AlertCircle,
    Clock
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';

export function PersonalShopper() {
    const [items, setItems] = useState([{ id: '1', url: '', name: '', qty: 1 }]);

    const addItem = () => {
        setItems([...items, { id: Date.now().toString(), url: '', name: '', qty: 1 }]);
    };

    const removeItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const updateItem = (id: string, field: string, value: any) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Request submitted successfully!', {
            description: 'Our personal shopper team will get back to you with a quote within 24 hours.'
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Personal Shopper</h1>
                    <p className="text-gray-500 font-medium">Can't buy it yourself? We'll shop for you at NO extra commission!</p>
                </div>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold border border-blue-100 flex items-center gap-2">
                    <Info className="w-4 h-4" /> Zero Commission Service
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                        <div className="p-8 space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <LinkIcon className="w-5 h-5 text-blue-600" /> Item Details
                                </h3>
                                <p className="text-gray-500 text-sm">Add the links of the products you want us to buy from Indian websites.</p>
                            </div>

                            <div className="space-y-6">
                                {items.map((item) => (
                                    <div key={item.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 relative group">
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                            <div className="md:col-span-12 lg:col-span-5 space-y-2">
                                                <Label className="text-xs font-bold uppercase text-gray-400">Product URL</Label>
                                                <Input
                                                    placeholder="Paste link from Amazon, Myntra, etc."
                                                    className="bg-white rounded-xl"
                                                    value={item.url}
                                                    onChange={(e) => updateItem(item.id, 'url', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="md:col-span-8 lg:col-span-5 space-y-2">
                                                <Label className="text-xs font-bold uppercase text-gray-400">Product Name / Color / Size</Label>
                                                <Input
                                                    placeholder="e.g. Nike Shoes, Blue, Size 9"
                                                    className="bg-white rounded-xl"
                                                    value={item.name}
                                                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="md:col-span-4 lg:col-span-2 space-y-2">
                                                <Label className="text-xs font-bold uppercase text-gray-400">Qty</Label>
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    className="bg-white rounded-xl"
                                                    value={item.qty}
                                                    onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value))}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {items.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.id)}
                                                className="absolute -top-2 -right-2 bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-50 transition-colors border border-red-50 opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full py-6 rounded-2xl border-dashed border-2 border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-all font-bold"
                                onClick={addItem}
                            >
                                <Plus className="mr-2 w-4 h-4" /> Add Another Item
                            </Button>

                            <div className="space-y-4 pt-4">
                                <Label className="text-gray-700 font-bold">Special Instructions (Optional)</Label>
                                <textarea
                                    className="w-full p-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px] transition-all"
                                    placeholder="Need gift wrapping? Specific delivery date? Tell us here..."
                                />
                            </div>
                        </div>

                        <div className="p-8 bg-gray-50 border-t flex items-center justify-between gap-4">
                            <div className="flex gap-2">
                                <AlertCircle className="w-5 h-5 text-gray-400 shrink-0" />
                                <p className="text-xs text-gray-500">You will receive a quote including product cost + national shipping (if any) + our small service fee.</p>
                            </div>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 font-bold px-8 h-12 rounded-xl shadow-lg shadow-blue-200">
                                <Send className="mr-2 w-4 h-4" /> Submit Request
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="space-y-6">
                    <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100">
                        <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5" /> Why Personal Shopper?
                        </h4>
                        <ul className="space-y-6">
                            {[
                                { title: 'Card Declined?', desc: 'Many Indian sites don\'t accept international cards. We use ours!' },
                                { title: 'OTP Issues?', desc: 'Avoid the hassle of needing an Indian phone number for checkout.' },
                                { title: 'Quality Check', desc: 'We inspect items upon arrival and send you photos.' },
                            ].map((benefit, i) => (
                                <li key={i} className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 font-bold text-sm">{i + 1}</div>
                                    <div>
                                        <p className="font-bold text-sm mb-1">{benefit.title}</p>
                                        <p className="text-xs text-indigo-100 leading-relaxed opacity-80">{benefit.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">Past Requests</h4>
                        <div className="flex flex-col items-center justify-center py-8 text-center text-gray-400">
                            <Clock className="w-12 h-12 mb-4 opacity-20" />
                            <p className="text-sm font-medium">No previous requests found.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
