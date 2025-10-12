import { AlertCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface DatabaseErrorScreenProps {
  onRetry?: () => void;
  onBack?: () => void;
}

export function DatabaseErrorScreen({ onRetry, onBack }: DatabaseErrorScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full border-4 border-red-500">
        <CardContent className="p-8">
          {/* Alert Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-500 rounded-full p-6">
              <AlertCircle className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl text-center mb-4 text-red-700">
            🚨 Database Setup Required!
          </h1>

          {/* Error Message */}
          <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-center">
              <strong>Error:</strong> Database tables don't exist yet!
            </p>
            <p className="text-red-700 text-sm text-center mt-2">
              The app is trying to save data, but there's nowhere to save it.
            </p>
          </div>

          {/* What to Do */}
          <div className="bg-white border-2 border-orange-300 rounded-lg p-6 mb-6">
            <h2 className="text-xl mb-4 text-center">✅ Fix This Now (5 Minutes):</h2>
            
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                <div className="flex-1">
                  <p className="font-semibold">Open Supabase Dashboard</p>
                  <p className="text-sm text-gray-600">Go to: https://supabase.com/dashboard</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                <div className="flex-1">
                  <p className="font-semibold">Go to SQL Editor</p>
                  <p className="text-sm text-gray-600">Left sidebar → SQL Editor → New query</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                <div className="flex-1">
                  <p className="font-semibold">Copy SQL Migration File</p>
                  <p className="text-sm text-gray-600">
                    Open: <code className="bg-gray-100 px-2 py-1 rounded">/supabase/migrations/001_initial_schema.sql</code>
                  </p>
                  <p className="text-sm text-gray-600">Copy ALL 450+ lines</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
                <div className="flex-1">
                  <p className="font-semibold">Paste & Run</p>
                  <p className="text-sm text-gray-600">Paste in SQL Editor → Click RUN button</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">✓</div>
                <div className="flex-1">
                  <p className="font-semibold">Refresh This Page</p>
                  <p className="text-sm text-gray-600">Tables created → Everything works! ✅</p>
                </div>
              </div>
            </div>
          </div>

          {/* Documentation */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6">
            <h3 className="text-lg mb-2 text-center">📖 Detailed Step-by-Step Guide:</h3>
            <p className="text-center text-sm mb-3">
              Read <strong>DO_THIS_NOW.md</strong> in your project folder for complete instructions with visual descriptions.
            </p>
            <div className="flex gap-2 justify-center flex-wrap text-xs">
              <span className="bg-blue-200 px-2 py-1 rounded">SETUP_STEP_BY_STEP.md</span>
              <span className="bg-blue-200 px-2 py-1 rounded">DATABASE_SETUP_NOW.md</span>
              <span className="bg-blue-200 px-2 py-1 rounded">FIX_DATABASE_ERROR.md</span>
            </div>
          </div>

          {/* What Gets Created */}
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-6">
            <h3 className="text-lg mb-2 text-center">🎯 What the SQL Creates:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>user_profiles</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>packages</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>transactions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>coupons</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>referrals</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>+ 4 more tables</span>
              </div>
            </div>
            <p className="text-sm text-center mt-3 text-gray-600">
              Plus: 5 coupon codes, security policies, and performance indexes
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={onRetry}
              className="flex-1 bg-green-600 hover:bg-green-700 text-lg py-6"
            >
              I've Run the SQL - Refresh Now ✅
            </Button>
            <Button 
              onClick={onBack}
              variant="outline"
              className="flex-1 text-lg py-6"
            >
              Back to Home
            </Button>
          </div>

          {/* Important Note */}
          <div className="mt-6 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
            <p className="text-center text-sm text-yellow-800">
              <strong>⚠️ IMPORTANT:</strong> This is NOT a code bug. You MUST run the SQL migration in Supabase. 
              There is no other way to fix this error. The database tables MUST be created.
            </p>
            <p className="text-center text-sm text-yellow-700 mt-2">
              <strong>This is a ONE-TIME setup.</strong> Once done, it works forever!
            </p>
          </div>

          {/* Supabase Link */}
          <div className="mt-4 text-center">
            <a 
              href="https://supabase.com/dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 underline"
            >
              Open Supabase Dashboard
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
