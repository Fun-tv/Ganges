import { useState } from 'react';
import {
    Calculator,
    MapPin,
    Weight,
    Truck,
    Info,
    ChevronRight,
    TrendingDown,
    Globe,
    Clock
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function ShippingCalculator() {
    const [weight, setWeight] = useState<string>('0.5');
    const [destination, setDestination] = useState<string>('USA');

    const destinations = [
        'USA', 'Canada', 'United Kingdom', 'Australia', 'UAE', 'Singapore', 'Germany', 'France'
    ];

    const calculateRates = () => {
        const w = parseFloat(weight) || 0;
        return {
            economy: {
                price: Math.max(1200, w * 999),
                days: '8-12 Business Days',
                partner: 'Aramex / Speed Post'
            },
            premium: {
                price: Math.max(1800, w * 1499),
                days: '3-5 Business Days',
                partner: 'DHL / FedEx'
            }
        };
    };

    const rates = calculateRates();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Shipping Calculator</h1>
                <p className="text-gray-500 font-medium">Estimate your global shipping costs in seconds.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 space-y-8 sticky top-8">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-blue-600" /> Estimate Tool
                        </h3>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Destination Country</Label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <select
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-700"
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                    >
                                        {destinations.map(d => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Weight (kg)</Label>
                                <div className="relative">
                                    <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        type="number"
                                        step="0.5"
                                        min="0.5"
                                        className="pl-10 bg-gray-50 rounded-xl py-6 font-bold text-lg"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                    />
                                </div>
                                <p className="text-[10px] text-gray-400 font-medium italic">* Volumetric weight applies if higher than actual weight.</p>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-2xl p-4 flex gap-3">
                            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <p className="text-xs text-blue-700 leading-relaxed">
                                Actual costs are calculated when items arrive at hub and are measured.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Economy Card */}
                        <div className="bg-white rounded-3xl border-2 border-transparent hover:border-blue-600 shadow-xl transition-all group relative overflow-hidden">
                            <div className="bg-blue-600 text-white p-6">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">Ganges Economy</span>
                                    <Truck className="w-5 h-5 opacity-60" />
                                </div>
                                <p className="text-4xl font-bold">₹{rates.economy.price.toLocaleString()}</p>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase">Est. Delivery</p>
                                            <p className="text-sm font-bold text-gray-700">{rates.economy.days}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase">Carrier Partner</p>
                                            <p className="text-sm font-bold text-gray-700">{rates.economy.partner}</p>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white font-bold h-12 rounded-xl transition-all border-none shadow-none">
                                    Select Plan
                                </Button>
                            </div>
                        </div>

                        {/* Premium Card */}
                        <div className="bg-white rounded-3xl border-2 border-blue-600 shadow-2xl shadow-blue-100 transition-all group relative overflow-hidden">
                            <div className="absolute top-4 right-4 bg-white/20 text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-full text-white backdrop-blur-sm border border-white/30 z-10">
                                Recommended
                            </div>
                            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">Ganges One (Expedited)</span>
                                    <TrendingDown className="w-5 h-5 opacity-60" />
                                </div>
                                <p className="text-4xl font-bold">₹{rates.premium.price.toLocaleString()}</p>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-blue-600" />
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase">Est. Delivery</p>
                                            <p className="text-sm font-bold text-gray-900">{rates.premium.days}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5 text-blue-600" />
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase">Carrier Partner</p>
                                            <p className="text-sm font-bold text-gray-900">{rates.premium.partner}</p>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-200 border-none">
                                    Select Plan
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
                                <Info className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-amber-900 mb-2">Notice: Custom Duties</h4>
                                <p className="text-sm text-amber-800 leading-relaxed mb-4">
                                    Please note that the above estimates <strong>do not include</strong> customs duties, taxes, or clearance charges that may be applied by the destination country's government.
                                </p>
                                <button className="text-xs font-bold text-amber-900 flex items-center gap-1 hover:underline">
                                    Learn about custom duties <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
