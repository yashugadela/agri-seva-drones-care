import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bug, ArrowLeft, Plus, Phone, MapPin, Calendar, Clock, Leaf, Crop } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Booking {
  id: string;
  farmer_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  area_size: number;
  crop_type: string;
  preferred_date: string;
  preferred_time: string;
  special_instructions?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const BookingHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchBookings = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching bookings:', error);
        } else {
          setBookings(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 flex items-center justify-center">
        <Card className="p-8 shadow-lg">
          <div className="text-center">
            <Bug className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
            <p className="text-foreground">Loading your bookings... / మీ బుకింగ్‌లను లోడ్ చేస్తోంది...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home / హోమ్‌కు తిరిగి</span>
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bug className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">My Bookings / నా బుకింగ్‌లు</h1>
          </div>
          <p className="text-muted-foreground">Track your drone service requests / మీ డ్రోన్ సేవా అభ్యర్థనలను ట్రాక్ చేయండి</p>
        </div>

        {bookings.length === 0 ? (
          <Card className="text-center p-12 shadow-lg">
            <CardContent>
              <Bug className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">No Bookings Yet / ఇంకా బుకింగ్‌లు లేవు</h2>
              <p className="text-muted-foreground mb-8">
                You haven't made any drone service bookings yet. Start by booking your first service!
                <br />
                మీరు ఇంకా ఎలాంటి డ్రోన్ సేవ బుకింగ్‌లు చేయలేదు. మీ మొదటి సేవను బుక్ చేయడం ప్రారంభించండి!
              </p>
              <Link to="/booking">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
                  <Plus className="w-5 h-5 mr-2" />
                  Book Your First Service / మీ మొదటి సేవను బుక్ చేయండి
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="hover-lift border-primary/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    {/* Header with Status */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{booking.farmer_name}</h3>
                        <p className="text-sm text-muted-foreground">Request ID: {booking.id.slice(0, 8)}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>

                    {/* Booking Details Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Phone className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Phone / ఫోన్</p>
                            <p className="font-medium text-foreground">{booking.phone}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Location / ప్రాంతం</p>
                            <p className="font-medium text-foreground">{booking.city}, {booking.state}</p>
                            <p className="text-sm text-muted-foreground">{booking.address}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Leaf className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Crop Type / పంట రకం</p>
                            <p className="font-medium text-foreground">{booking.crop_type}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Scheduled Date & Time / తేదీ మరియు సమయం</p>
                            <p className="font-medium text-foreground">{formatDate(booking.preferred_date)}</p>
                            <p className="text-sm text-primary">{booking.preferred_time}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Crop className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Area Size / ప్రాంత పరిమాణం</p>
                            <p className="font-medium text-foreground">{booking.area_size} acres</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Clock className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Request Date / అభ్యర్థన తేదీ</p>
                            <p className="font-medium text-foreground">{formatDate(booking.created_at)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Special Instructions */}
                    {booking.special_instructions && (
                      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Special Instructions / ప్రత్యేక సూచనలు</p>
                        <p className="text-foreground">{booking.special_instructions}</p>
                      </div>
                    )}

                    {/* Footer with estimated cost */}
                    <div className="flex justify-between items-center pt-4 border-t border-muted">
                      <div>
                        <p className="text-sm text-muted-foreground">Estimated Cost / అంచనా ధర</p>
                        <p className="text-lg font-bold text-primary">₹{(booking.area_size * 500).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">PIN: {booking.pincode}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home / హోమ్‌కు తిరిగి
            </Button>
          </Link>
          <Link to="/booking">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Booking / కొత్త బుకింగ్
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;