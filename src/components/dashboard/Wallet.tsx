import { useEffect, useState } from 'react';
import {
    Wallet as WalletIcon,
    History,
    CreditCard,
    Plus,
    TrendingDown,
    ShieldCheck,
    AlertCircle,
    ArrowUpRight,
    ArrowDownLeft
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import apiService from '@/services/api.service';
import { useAuth } from '@/contexts/AuthContext';

export function Wallet() {
    const { user, refreshSession } = useAuth();
    const [addAmount, setAddAmount] = useState('1000');
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        loadWalletData();
    }, [user]);

    const loadWalletData = async () => {
        try {
            setLoading(true);
            const [balanceData, history] = await Promise.all([
                apiService.wallet.getBalance(),
                apiService.wallet.getTransactions().catch(() => [])
            ]);

            setBalance(balanceData.balance);
            setTransactions(history || []);
        } catch (error) {
            console.error('Failed to load wallet data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddFunds = async () => {
        try {
            // Placeholder: In a real app, this would trigger Razorpay/Stripe
            alert(`Redirecting to payment gateway for ₹${addAmount}...`);
        } catch (error) {
            console.error('Payment failed:', error);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">My Wallet</h1>
                <p className="text-gray-500 font-medium">Manage your funds and transaction history securely.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Wallet Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 text-white shadow-2xl shadow-blue-200 relative overflow-hidden border-4 border-white">
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8 opacity-80">
                                <WalletIcon className="w-10 h-10" />
                                <span className="text-xs font-bold tracking-widest uppercase">Ganges Digital Wallet</span>
                            </div>
                            <p className="text-xs font-medium opacity-70 mb-1">Available Balance</p>
                            <h2 className="text-5xl font-extrabold mb-8 tracking-tighter">
                                {loading ? '...' : `₹${balance.toFixed(2)}`}
                            </h2>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-green-400" />
                                <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">PCI-DSS Compliant Storage</span>
                            </div>
                        </div>

                        {/* Background elements */}
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <TrendingDown className="w-48 h-48 transform translate-x-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-8 space-y-6">
                        <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-blue-600" /> Add Funds
                        </h4>
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                {['500', '1000', '5000'].map(amt => (
                                    <button
                                        key={amt}
                                        onClick={() => setAddAmount(amt)}
                                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${addAmount === amt ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-blue-50'
                                            }`}
                                    >
                                        ₹{amt}
                                    </button>
                                ))}
                            </div>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">₹</span>
                                <Input
                                    type="number"
                                    className="pl-8 py-6 rounded-xl font-bold text-lg"
                                    value={addAmount}
                                    onChange={(e) => setAddAmount(e.target.value)}
                                />
                            </div>
                            <Button
                                onClick={handleAddFunds}
                                className="w-full bg-blue-600 hover:bg-blue-700 h-14 rounded-2xl font-bold shadow-lg shadow-blue-100"
                            >
                                Proceed to Payment
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="lg:col-span-2">
                    <div className="bg-white border border-gray-100 shadow-xl rounded-3xl overflow-hidden h-full min-h-[500px] flex flex-col">
                        <div className="p-8 border-b flex items-center justify-between bg-gray-50/50">
                            <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <History className="w-5 h-5 text-blue-600" /> Transaction History
                            </h4>
                            <Button variant="ghost" size="sm" className="text-blue-600 font-bold">Filter</Button>
                        </div>

                        {loading ? (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        ) : transactions.length > 0 ? (
                            <div className="flex-1 overflow-y-auto">
                                <div className="divide-y divide-gray-100">
                                    {transactions.map((tx) => (
                                        <div key={tx.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                                    }`}>
                                                    {tx.type === 'credit' ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{tx.description}</p>
                                                    <p className="text-xs text-gray-500">{new Date(tx.created_at).toLocaleDateString()} • {new Date(tx.created_at).toLocaleTimeString()}</p>
                                                </div>
                                            </div>
                                            <div className={`text-right ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                                                <p className="font-bold text-lg">
                                                    {tx.type === 'credit' ? '+' : '-'}₹{Math.abs(tx.amount).toFixed(2)}
                                                </p>
                                                <p className="text-xs text-gray-400 capitalize">{tx.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-400">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                    <CreditCard className="w-10 h-10 opacity-20" />
                                </div>
                                <p className="text-lg font-bold text-gray-900 mb-2">No Transactions Yet</p>
                                <p className="max-w-xs text-sm leading-relaxed">
                                    Once you start shipping or adding funds, your digital receipts will appear here.
                                </p>
                            </div>
                        )}

                        <div className="p-6 bg-blue-50/50 border-t flex gap-4">
                            <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
                            <p className="text-xs text-blue-700">
                                We support Razorpay, Stripe, and PayPal for top-ups. Funds are credited instantly!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
