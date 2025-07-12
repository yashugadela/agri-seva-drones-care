
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Drone, ArrowLeft, User, Mail, Phone, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const { register, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      await register(formData.name, formData.email, formData.phone, formData.password);
      toast({
        title: "Registration Successful",
        description: "Welcome to AgriDrone Seva! You can now book our services.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please check your information and try again.",
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
            <CardTitle className="text-2xl text-green-800">Register / నమోదు</CardTitle>
            <p className="text-green-600">Join thousands of smart farmers</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-green-700 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name / పూర్తి పేరు
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-green-700 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address / ఈమెయిల్ చిరునామా
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-green-700 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number / ఫోన్ నంబర్
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
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
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  required
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-green-700 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Confirm Password / పాస్‌వర్డ్ నిర్ధారించండి
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
              >
                {isLoading ? 'Creating Account...' : 'Register / నమోదు చేసుకోండి'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-green-600">
                Already have an account? / ఇప్పటికే ఖాతా ఉందా?{' '}
                <Link to="/login" className="text-green-700 font-semibold hover:text-green-800 underline">
                  Login here / ఇక్కడ లాగిన్ చేయండి
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
