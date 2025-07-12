
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Plane, Calendar, MapPin, Phone, Mail, Home } from 'lucide-react';

interface BookingData {
  district: string;
  pincode: string;
  acres: string;
  cropType: string;
  preferredDate: string;
  preferredTime: string;
  additionalNotes: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  bookingDate: string;
  status: string;
}

const Confirmation = () => {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  useEffect(() => {
    const storedBooking = localStorage.getItem('current-booking');
    if (storedBooking) {
      setBookingData(JSON.parse(storedBooking));
    }
  }, []);

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <Plane className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-4">No Booking Found</h2>
            <p className="text-green-600 mb-6">Please complete the booking process first</p>
            <Link to="/booking">
              <Button className="bg-green-600 hover:bg-green-700">Go to Booking</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const estimatedCost = Math.max(500, parseFloat(bookingData.acres) * 200);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Booking Confirmed!
          </h1>
          <h2 className="text-2xl text-green-600 mb-4">
            మీ బుకింగ్ విజయవంతంగా పూర్తయింది!
          </h2>
          <p className="text-green-700">
            Thank you for choosing AgriDrone Seva. We'll contact you soon to confirm the details.
          </p>
        </div>

        {/* Booking Details */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-green-200 mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-green-800 flex items-center gap-2">
              <Plane className="h-6 w-6" />
              Booking Details / బుకింగ్ వివరాలు
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Customer Information */}
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Customer Information / వినియోగదారు సమాచారం
              </h3>
              <div className="bg-green-50 p-4 rounded-lg space-y-2">
                <p><span className="font-medium">Name:</span> {bookingData.userName}</p>
                <p><span className="font-medium">Email:</span> {bookingData.userEmail}</p>
                <p><span className="font-medium">Phone:</span> {bookingData.userPhone}</p>
              </div>
            </div>

            {/* Location Details */}
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Details / స్థాన వివరాలు
              </h3>
              <div className="bg-green-50 p-4 rounded-lg space-y-2">
                <p><span className="font-medium">District:</span> {bookingData.district}</p>
                <p><span className="font-medium">Pincode:</span> {bookingData.pincode}</p>
                <p><span className="font-medium">Land Area:</span> {bookingData.acres} acres</p>
                {bookingData.cropType && (
                  <p><span className="font-medium">Crop Type:</span> {bookingData.cropType}</p>
                )}
              </div>
            </div>

            {/* Schedule Details */}
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule / షెడ్యూల్
              </h3>
              <div className="bg-green-50 p-4 rounded-lg space-y-2">
                <p><span className="font-medium">Preferred Date:</span> {new Date(bookingData.preferredDate).toLocaleDateString('en-IN')}</p>
                <p><span className="font-medium">Preferred Time:</span> {bookingData.preferredTime}</p>
              </div>
            </div>

            {/* Additional Notes */}
            {bookingData.additionalNotes && (
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-3">
                  Additional Notes / అదనపు గమనికలు
                </h3>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p>{bookingData.additionalNotes}</p>
                </div>
              </div>
            )}

            {/* Estimated Cost */}
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-3">
                Estimated Cost / అంచనా వ్యయం
              </h3>
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg border border-green-200">
                <p className="text-2xl font-bold text-green-800">₹{estimatedCost.toLocaleString('en-IN')}</p>
                <p className="text-green-600 text-sm mt-1">
                  Based on {bookingData.acres} acres @ ₹200 per acre (minimum ₹500)
                </p>
                <p className="text-green-600 text-sm">
                  Final pricing will be confirmed by our team
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-green-200 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-green-800">
              What Happens Next? / తదుపరి దశలు
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-semibold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">Confirmation Call</h4>
                  <p className="text-green-600 text-sm">Our team will call you within 2-4 hours to confirm the booking details and schedule.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-semibold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">Site Assessment</h4>
                  <p className="text-green-600 text-sm">If needed, we'll conduct a brief site assessment to optimize the spraying plan.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex-shrink-0 flex items-center justify-center">
                  <span className="text-green-600 font-semibold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">Professional Service</h4>
                  <p className="text-green-600 text-sm">Our certified operators will arrive on the scheduled date with professional equipment.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white mb-6">
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Need Help? / సహాయం కావాలా?</h3>
            <p className="mb-4">Contact us for any questions about your booking</p>
            <div className="space-y-2">
              <p className="font-semibold">📞 +91 9876543210</p>
              <p className="font-semibold">📧 info@agridroneseva.com</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 flex items-center gap-2">
              <Home className="h-5 w-5" />
              Back to Home / హోమ్‌కు తిరిగి
            </Button>
          </Link>
          <Link to="/booking">
            <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3">
              Book Another Service / మరో సేవను బుక్ చేయండి
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
