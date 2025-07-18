import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Calendar, MapPin, Plane, Bug } from 'lucide-react';
import droneMainImage from '@/assets/drone-main.png';

interface Booking {
  id: string;
  farmer_name: string;
  phone: string;
  area_size: number;
  crop_type: string;
  preferred_date: string;
  preferred_time: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  special_instructions?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

const BookingHistory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Simulate loading bookings from Supabase
    // In real implementation, this would be: supabase.from('bookings').select('*').eq('user_id', user.id)
    const mockBookings: Booking[] = [
      {
        id: '1',
        farmer_name: 'राम प्रसाद शर्मा',
        phone: '+91 9876543210',
        area_size: 5.5,
        crop_type: 'Paddy/Rice',
        preferred_date: '2024-01-15',
        preferred_time: '08:00',
        address: 'Village Rampur, Near Primary School',
        city: 'Rampur',
        state: 'Uttar Pradesh',
        pincode: '244901',
        status: 'confirmed',
        created_at: '2024-01-10T10:30:00Z',
        special_instructions: 'Please avoid spraying near the well area'
      },
      {
        id: '2',
        farmer_name: 'सुनीता देवी',
        phone: '+91 8765432109',
        area_size: 3.2,
        crop_type: 'Wheat',
        preferred_date: '2024-01-20',
        preferred_time: '06:30',
        address: 'Khet No. 45, Sector B',
        city: 'Moradabad',
        state: 'Uttar Pradesh',
        pincode: '244001',
        status: 'pending',
        created_at: '2024-01-12T14:20:00Z'
      }
    ];

    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, [user, navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('hi-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center">
        <div className="text-center">
          <Bug className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-green-700">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100"
      style={{
        backgroundImage: `url(${droneMainImage})`,
        backgroundSize: '200px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom right',
        backgroundAttachment: 'fixed',
        opacity: 0.95
      }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-green-800">Booking History</h1>
              <p className="text-green-600">Your drone service bookings</p>
            </div>
          </div>
          
          <Button 
            onClick={() => navigate('/booking')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Bug className="w-4 h-4 mr-2" />
            New Booking
          </Button>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Bug className="w-16 h-16 text-green-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Bookings Yet</h3>
              <p className="text-gray-500 mb-6">You haven't made any drone service bookings yet.</p>
              <Button 
                onClick={() => navigate('/booking')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Make Your First Booking
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-green-800">
                      Booking #{booking.id.slice(0, 8)}
                    </CardTitle>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Farmer Details */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-700 flex items-center gap-2">
                        <Bug className="w-4 h-4" />
                        Farmer Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Name:</span> {booking.farmer_name}</p>
                        <p><span className="font-medium">Phone:</span> {booking.phone}</p>
                        <p><span className="font-medium">Crop:</span> {booking.crop_type}</p>
                        <p><span className="font-medium">Area:</span> {booking.area_size} acres</p>
                      </div>
                    </div>

                    {/* Schedule & Location */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Schedule & Location
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Date:</span> {formatDate(booking.preferred_date)}</p>
                        <p><span className="font-medium">Time:</span> {booking.preferred_time}</p>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 text-green-600" />
                          <div>
                            <p>{booking.address}</p>
                            <p>{booking.city}, {booking.state} - {booking.pincode}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Special Instructions */}
                  {booking.special_instructions && (
                    <div className="pt-4 border-t border-green-100">
                      <h4 className="font-semibold text-green-700 mb-2">Special Instructions</h4>
                      <p className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                        {booking.special_instructions}
                      </p>
                    </div>
                  )}

                  {/* Booking Date */}
                  <div className="pt-2 border-t border-green-100">
                    <p className="text-xs text-gray-500">
                      Booked on: {formatDate(booking.created_at)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;