import { useState } from 'react';
import {
    Package,
    Search,
    Filter,
    AlertCircle,
    Plus
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Locker() {
    const [searchTerm, setSearchTerm] = useState('');

    const packages = [
        // Empty state placeholder - usually would fetch from Supabase
    ];

    const packageStatuses = [
        { label: 'In Locker', count: 0, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Processing', count: 0, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Ready to Ship', count: 0, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Locker</h1>
                    <p className="text-gray-500 font-medium">Inventory of items arrived at our hub.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 font-bold px-6">
                    <Plus className="mr-2 w-4 h-4" /> Ship All Items
                </Button>
            </div>

            {/* Status Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {packageStatuses.map((status, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className={`${status.bg} p-3 rounded-full`}>
                            <Package className={`${status.color} w-6 h-6`} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-bold uppercase tracking-tight">{status.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{status.count}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Container */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden min-h-[400px]">
                {/* Table Header Filter */}
                <div className="p-6 border-b flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search packages..."
                            className="pl-10 bg-white border-gray-200 rounded-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="rounded-xl font-bold text-gray-600">
                            <Filter className="mr-2 w-4 h-4" /> Filter
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-xl font-bold text-gray-600">
                            Sort by: Date
                        </Button>
                    </div>
                </div>

                {/* Content Wrapper */}
                <div className="p-12">
                    {packages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center max-w-sm mx-auto">
                            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                                <Package className="w-12 h-12 text-blue-200" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Locker is Empty</h3>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                When packages you shop for arrive at our Indian hub, they will appear here with photos and weight details.
                            </p>
                            <Button variant="outline" className="font-bold border-2 px-8 py-6 rounded-2xl border-blue-100 text-blue-600 hover:bg-blue-50">
                                How it works?
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Package list would go here */}
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Info */}
            <div className="flex items-center gap-4 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                <AlertCircle className="w-6 h-6 text-blue-600 shrink-0" />
                <p className="text-sm text-blue-700">
                    <strong>Standard Storage:</strong> Packages are stored for <strong>free for up to 30 days</strong>. Post that, a storage fee of ₹50/day applies.
                </p>
            </div>
        </div>
    );
}
