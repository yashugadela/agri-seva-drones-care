
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Bug, ArrowLeft, MapPin, Calendar, Leaf, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import paddyFieldImage from '@/assets/paddy-field.jpg';
import wheatFieldImage from '@/assets/wheat-field.jpg';
import sugarcaneFieldImage from '@/assets/sugarcane-field.jpg';

const Booking = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    farmerName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    areaSize: '',
    cropType: '',
    preferredDate: '',
    preferredTime: '',
    specialInstructions: ''
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
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Save booking to Supabase
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            user_id: user.id,
            farmer_name: formData.farmerName,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            area_size: parseFloat(formData.areaSize),
            crop_type: formData.cropType,
            preferred_date: formData.preferredDate,
            preferred_time: formData.preferredTime,
            special_instructions: formData.specialInstructions,
            status: 'pending'
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      localStorage.setItem('current-booking', JSON.stringify(data[0]));
      
      toast({
        title: "Booking Submitted Successfully!",
        description: "మీ బుకింగ్ విజయవంతంగా పూర్తయింది!",
      });
      
      navigate('/confirmation');
    } catch (error) {
      console.error('Booking error:', error);
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
            <Bug className="h-16 w-16 text-green-600 mx-auto mb-4" />
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
    'Paddy/Rice (వరిధాన్యం)', 'Cotton (పత్తి)', 'Sugarcane (చెరకు)', 'Maize/Corn (మొక్కజొన్న)',
    'Wheat (గోధుమ)', 'Soybean (సోయాబీన్)', 'Groundnut (వేరుశనగ)', 'Chilli (మిర్చి)', 
    'Turmeric (పసుపు)', 'Tobacco (పొగాకు)', 'Banana (అరటి)', 'Mango (మామిడి)', 'Other (ఇతర)'
  ];

  const timeSlots = [
    'Early Morning (6:00 AM - 8:00 AM)',
    'Morning (8:00 AM - 10:00 AM)',
    'Late Morning (10:00 AM - 12:00 PM)',
    'Evening (4:00 PM - 6:00 PM)',
    'Late Evening (6:00 PM - 8:00 PM)'
  ];

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 py-8 px-4"
      style={{
        backgroundImage: `url(${paddyFieldImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors mb-4">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bug className="h-8 w-8 text-green-600" />
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
                     <Label htmlFor="farmerName" className="text-green-700">
                       Farmer Name / రైతు పేరు *
                     </Label>
                     <Input
                       id="farmerName"
                       name="farmerName"
                       type="text"
                       value={formData.farmerName}
                       onChange={handleInputChange}
                       placeholder="Enter farmer name / రైతు పేరు నమోదు చేయండి"
                       required
                       className="border-green-200 focus:border-green-500"
                     />
                   </div>

                   <div className="space-y-2">
                     <Label htmlFor="phone" className="text-green-700">
                       Phone Number / ఫోన్ నంబర్ *
                     </Label>
                     <Input
                       id="phone"
                       name="phone"
                       type="tel"
                       value={formData.phone}
                       onChange={handleInputChange}
                       placeholder="Enter phone number / ఫోన్ నంబర్ నమోదు చేయండి"
                       required
                       className="border-green-200 focus:border-green-500"
                       pattern="[0-9]{10}"
                       maxLength={10}
                     />
                   </div>
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="address" className="text-green-700">
                     Address / చిరునామా *
                   </Label>
                   <Input
                     id="address"
                     name="address"
                     type="text"
                     value={formData.address}
                     onChange={handleInputChange}
                     placeholder="Enter complete address / పూర్తి చిరునామా నమోదు చేయండి"
                     required
                     className="border-green-200 focus:border-green-500"
                   />
                 </div>

                 <div className="grid md:grid-cols-3 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="city" className="text-green-700">
                       City / నగరం *
                     </Label>
                     <Input
                       id="city"
                       name="city"
                       type="text"
                       value={formData.city}
                       onChange={handleInputChange}
                       placeholder="Enter city / నగరం నమోదు చేయండి"
                       required
                       className="border-green-200 focus:border-green-500"
                     />
                   </div>

                   <div className="space-y-2">
                     <Label htmlFor="state" className="text-green-700">
                       State / రాష్ట్రం *
                     </Label>
                     <Select onValueChange={(value) => handleSelectChange('state', value)} required>
                       <SelectTrigger className="border-green-200 focus:border-green-500">
                         <SelectValue placeholder="Select state / రాష్ట్రం ఎంచుకోండి" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                         <SelectItem value="Telangana">Telangana</SelectItem>
                         <SelectItem value="Karnataka">Karnataka</SelectItem>
                         <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
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
                       placeholder="Enter pincode / పిన్‌కోడ్ నమోదు చేయండి"
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
                     <Label htmlFor="areaSize" className="text-green-700">
                       Land Area (Acres) / భూమి వైశాల్యం (ఎకరాలు) *
                     </Label>
                     <Input
                       id="areaSize"
                       name="areaSize"
                       type="number"
                       value={formData.areaSize}
                       onChange={handleInputChange}
                       placeholder="Enter land area / భూమి వైశాల్యం నమోదు చేయండి"
                       required
                       min="0.1"
                       step="0.1"
                       className="border-green-200 focus:border-green-500"
                     />
                   </div>

                   <div className="space-y-2">
                     <Label htmlFor="cropType" className="text-green-700">
                       Crop Type / పంట రకం *
                     </Label>
                     <Select onValueChange={(value) => handleSelectChange('cropType', value)} required>
                       <SelectTrigger className="border-green-200 focus:border-green-500">
                         <SelectValue placeholder="Select crop type / పంట రకం ఎంచుకోండి" />
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

                 {/* Crop Type Images */}
                 <div className="grid grid-cols-3 gap-4 mt-4">
                   <div className="text-center">
                     <img 
                       src={paddyFieldImage} 
                       alt="Paddy Field" 
                       className="w-full h-20 object-cover rounded-lg border-2 border-green-200"
                     />
                     <p className="text-xs text-green-600 mt-1">Paddy/Rice</p>
                   </div>
                   <div className="text-center">
                     <img 
                       src={wheatFieldImage} 
                       alt="Wheat Field" 
                       className="w-full h-20 object-cover rounded-lg border-2 border-green-200"
                     />
                     <p className="text-xs text-green-600 mt-1">Wheat</p>
                   </div>
                   <div className="text-center">
                     <img 
                       src={sugarcaneFieldImage} 
                       alt="Sugarcane Field" 
                       className="w-full h-20 object-cover rounded-lg border-2 border-green-200"
                     />
                     <p className="text-xs text-green-600 mt-1">Sugarcane</p>
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
                         <SelectValue placeholder="Select time slot / సమయ స్లాట్ ఎంచుకోండి" />
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
                <Label htmlFor="specialInstructions" className="text-green-700">
                  Special Instructions / ప్రత్యేక సూచనలు
                </Label>
                <Textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                  placeholder="Any specific requirements or notes / ఏవైనా ప్రత్యేక అవసరాలు లేదా గమనికలు..."
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
