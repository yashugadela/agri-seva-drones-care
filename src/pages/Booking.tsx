
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plane, ArrowLeft, MapPin, Calendar, Leaf, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Booking = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    district: '',
    pincode: '',
    acres: '',
    cropType: '',
    preferredDate: '',
    preferredTime: '',
    additionalNotes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store booking data temporarily (replace with backend call)
      const bookingData = {
        ...formData,
        userId: user?.id,
        userName: user?.name,
        userEmail: user?.email,
        userPhone: user?.phone,
        bookingDate: new Date().toISOString(),
        status: 'pending'
      };
      
      localStorage.setItem('current-booking', JSON.stringify(bookingData));
      
      toast({
        title: "Booking Submitted Successfully!",
        description: "మీ బుకింగ్ విజయవంతంగా పూర్తయింది!",
      });
      
      navigate('/confirmation');
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect to login if user not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <Plane className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-4">Login Required</h2>
            <p className="text-green-600 mb-6">Please login to book our drone services</p>
            <div className="flex gap-4 justify-center">
              <Link to="/login">
                <Button className="bg-green-600 hover:bg-green-700">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="border-green-600 text-green-600">Register</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const districts = [
    'Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 
    'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 
    'West Godavari', 'YSR Kadapa'
  ];

  const cropTypes = [
    'Rice (వరిధాన్యం)', 'Cotton (పత్తి)', 'Sugarcane (చెరకు)', 'Maize (మొక్కజొన్న)',
    'Groundnut (వేరుశనగ)', 'Chilli (మిర్చి)', 'Turmeric (పసుపు)', 'Tobacco (పొగాకు)',
    'Banana (అరటి)', 'Mango (మామిడి)', 'Other (ఇతర)'
  ];

  const timeSlots = [
    'Early Morning (6:00 AM - 8:00 AM)',
    'Morning (8:00 AM - 10:00 AM)',
    'Late Morning (10:00 AM - 12:00 PM)',
    'Evening (4:00 PM - 6:00 PM)',
    'Late Evening (6:00 PM - 8:00 PM)'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors mb-4">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Plane className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">Book Drone Service</h1>
          </div>
          <p className="text-green-600">డ్రోన్ సేవను బుక్ చేయండి</p>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-green-200">
          <CardHeader>
            <CardTitle className="text-2xl text-green-800 flex items-center gap-2">
              <User className="h-6 w-6" />
              Welcome, {user.name}
            </CardTitle>
            <p className="text-green-600">Fill in your land details to book our professional drone spraying service</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Details / స్థాన వివరాలు
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="district" className="text-green-700">
                      District / జిల్లా *
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange('district', value)} required>
                      <SelectTrigger className="border-green-200 focus:border-green-500">
                        <SelectValue placeholder="Select your district" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="text-green-700">
                      Pincode / పిన్‌కోడ్ *
                    </Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      type="text"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="Enter pincode"
                      required
                      className="border-green-200 focus:border-green-500"
                      pattern="[0-9]{6}"
                      maxLength={6}
                    />
                  </div>
                </div>
              </div>

              {/* Farm Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Farm Details / వ్యవసాయ వివరాలు
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="acres" className="text-green-700">
                      Land Area (Acres) / భూమి వైశాల్యం (ఎకరాలు) *
                    </Label>
                    <Input
                      id="acres"
                      name="acres"
                      type="number"
                      value={formData.acres}
                      onChange={handleInputChange}
                      placeholder="Enter land area"
                      required
                      min="0.1"
                      step="0.1"
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cropType" className="text-green-700">
                      Crop Type / పంట రకం
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange('cropType', value)}>
                      <SelectTrigger className="border-green-200 focus:border-green-500">
                        <SelectValue placeholder="Select crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        {cropTypes.map((crop) => (
                          <SelectItem key={crop} value={crop}>
                            {crop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Schedule Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Schedule / షెడ్యూల్
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferredDate" className="text-green-700">
                      Preferred Date / ప్రాధాన్య తేదీ *
                    </Label>
                    <Input
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferredTime" className="text-green-700">
                      Preferred Time / ప్రాధాన్య సమయం *
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange('preferredTime', value)} required>
                      <SelectTrigger className="border-green-200 focus:border-green-500">
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="additionalNotes" className="text-green-700">
                  Additional Notes / అదనపు గమనికలు
                </Label>
                <Textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  placeholder="Any specific requirements or notes..."
                  className="border-green-200 focus:border-green-500"
                  rows={3}
                />
              </div>

              {/* Pricing Info */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Service Pricing / సేవ ధర</h4>
                <p className="text-green-600 text-sm mb-2">• Base Rate: ₹200 per acre</p>
                <p className="text-green-600 text-sm mb-2">• Minimum charge: ₹500 (up to 2.5 acres)</p>
                <p className="text-green-600 text-sm">• Final pricing will be confirmed based on location and requirements</p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
              >
                {isSubmitting ? 'Submitting Booking...' : 'Book Service / సేవను బుక్ చేయండి'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Booking;
