import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import logo from 'figma:asset/35424f6f7581dcd0957679d7cd3c9d5bfc8f9f2a.png';

interface AdminLoginProps {
  onLogin: () => void;
  onBackToHome: () => void;
}

export function AdminLogin({ onLogin, onBackToHome }: AdminLoginProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple authentication - in production, this should be a secure backend call
    if (credentials.username === 'admin' && credentials.password === 'ganges2025') {
      toast.success('Login successful!');
      onLogin();
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] via-[#2a4a6f] to-[#1e3a5f] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img src={logo} alt="Ganges Lite" className="h-20 mx-auto mb-4" />
          <h1 className="text-3xl text-white mb-2">Ganges Lite Admin</h1>
          <p className="text-gray-300">Sign in to access the admin panel</p>
        </div>

        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="flex items-center justify-center text-2xl">
              <Lock className="mr-3" size={28} />
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="username"
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    className="pl-10"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="pl-10"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                <p className="text-gray-700 mb-2"><strong>Demo Credentials:</strong></p>
                <p className="text-gray-600">Username: admin</p>
                <p className="text-gray-600">Password: ganges2025</p>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={onBackToHome}
                className="w-full"
              >
                <ArrowLeft className="mr-2" size={16} />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-white text-sm">
          <p>© 2025 Ganges Lite. All rights reserved.</p>
          <p className="mt-2">Founded by Jay Agarwal | Jaipur, Rajasthan</p>
        </div>
      </motion.div>
    </div>
  );
}
