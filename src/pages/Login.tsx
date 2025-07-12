
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Drone, ArrowLeft, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      toast({
        title: "Login Successful",
        description: "Welcome back to AgriDrone Seva!",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors mb-4">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Drone className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">AgriDrone Seva</h1>
          </div>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-green-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-800">Login / లాగిన్</CardTitle>
            <p className="text-green-600">Welcome back to your farming dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-green-700 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address / ఈమెయిల్ చిరునామా
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-green-700 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password / పాస్‌వర్డ్
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
              >
                {isLoading ? 'Logging in...' : 'Login / లాగిన్'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-green-600">
                Don't have an account? / ఖాతా లేదా?{' '}
                <Link to="/register" className="text-green-700 font-semibold hover:text-green-800 underline">
                  Register here / ఇక్కడ నమోదు చేసుకోండి
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Demo Credentials:</h3>
              <p className="text-sm text-green-600">Email: farmer@example.com</p>
              <p className="text-sm text-green-600">Password: password123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
