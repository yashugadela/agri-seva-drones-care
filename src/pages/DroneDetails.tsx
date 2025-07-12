
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plane, 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Shield, 
  Target,
  Leaf,
  Zap,
  Users
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import droneMainImage from '@/assets/drone-main.png';

const DroneDetails = () => {
  const { user } = useAuth();

  const benefits = [
    {
      icon: Clock,
      title: "Time Efficiency",
      titleTelugu: "సమయం ఆదా",
      description: "Complete 10 acres in just 30 minutes vs 6-8 hours manually",
      descriptionTelugu: "10 ఎకరాలను కేవలం 30 నిమిషాల్లో పూర్తి చేయండి"
    },
    {
      icon: Target,
      title: "Precision Spraying",
      titleTelugu: "ఖచ్చితమైన స్ప్రేయింగ్",
      description: "GPS-guided accurate application with minimal waste",
      descriptionTelugu: "GPS మార్గదర్శకత్వంతో ఖచ్చితమైన అప్లికేషన్"
    },
    {
      icon: DollarSign,
      title: "Cost Effective",
      titleTelugu: "తక్కువ ఖర్చు",
      description: "Reduce chemical usage by 30% and labor costs significantly",
      descriptionTelugu: "రసాయనాల వాడకాన్ని 30% తగ్గించండి"
    },
    {
      icon: Shield,
      title: "Safe Operation",
      titleTelugu: "సురక్షిత ఆపరేషన్",
      description: "No direct exposure to harmful chemicals for farmers",
      descriptionTelugu: "రైతులకు హానికరమైన రసాయనాలకు ప్రత్యక్ష గుళ్లు లేవు"
    },
    {
      icon: Leaf,
      title: "Better Coverage",
      titleTelugu: "మంచి కవరేజ్",
      description: "Reaches difficult terrains and provides uniform distribution",
      descriptionTelugu: "కష్టమైన ప్రాంతాలకు చేరుకుని సమానంగా పంపిణీ చేస్తుంది"
    },
    {
      icon: Zap,
      title: "Weather Adaptive",
      titleTelugu: "వాతావరణ అనుకూలత",
      description: "Operates in various weather conditions with real-time adjustments",
      descriptionTelugu: "వివిధ వాతావరణ పరిస్థితుల్లో పనిచేస్తుంది"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-green-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <Plane className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">AgriDrone Seva</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Meet Our Agricultural Drone
          </h1>
          <h2 className="text-2xl text-green-600 mb-6">
            మా వ్యవసాయ డ్రోన్‌ను పరిచయం చేసుకోండి
          </h2>
          <p className="text-lg text-green-700 max-w-2xl mx-auto leading-relaxed">
            State-of-the-art agricultural drone designed specifically for Indian farming conditions. 
            Equipped with advanced GPS navigation, precision spraying system, and weather-resistant technology.
          </p>
        </section>

        {/* Drone Images Gallery */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center">
                <img 
                  src={droneMainImage}
                  alt="Agricultural Drone"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-green-800">Our Agricultural Drone</h3>
                <p className="text-sm text-green-600">Advanced spraying technology</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-emerald-200 to-emerald-400 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop"
                  alt="Farm field"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-green-800">Perfect Coverage</h3>
                <p className="text-sm text-green-600">Uniform spraying across crops</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-lime-200 to-lime-400 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop"
                  alt="Crop field"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-green-800">Healthy Crops</h3>
                <p className="text-sm text-green-600">Results after drone treatment</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Video Section */}
        <section className="mb-12">
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-800 mb-2">
                Watch Our Drone in Action
              </CardTitle>
              <p className="text-green-600">మా డ్రోన్ పనిని చూడండి</p>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-green-200 to-emerald-300 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                    <div className="w-0 h-0 border-l-[12px] border-l-green-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                  </div>
                  <p className="text-green-700 font-medium">Video Coming Soon</p>
                  <p className="text-green-600 text-sm">Professional demonstration video</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Benefits Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-green-800 text-center mb-8">
            Benefits of Drone Spraying / డ్రోన్ స్ప్రేయింగ్ ప్రయోజనాలు
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <benefit.icon className="h-12 w-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">{benefit.title}</h3>
                  <h4 className="text-lg font-medium text-green-700 mb-3">{benefit.titleTelugu}</h4>
                  <p className="text-green-600 mb-2">{benefit.description}</p>
                  <p className="text-green-500 text-sm">{benefit.descriptionTelugu}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Specifications */}
        <section className="mb-12">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-green-800 text-center">
                Technical Specifications / సాంకేతిక వివరాలు
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Drone Specifications</h3>
                  <ul className="space-y-2 text-green-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Flight Time: 15-20 minutes per charge</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Tank Capacity: 10-16 liters</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Coverage: 1 acre in 3-5 minutes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Operating Height: 1.5-3 meters</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Service Features</h3>
                  <ul className="space-y-2 text-green-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Professional operator included</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Weather condition assessment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Pre and post-service consultation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Emergency support available</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Experience the Future of Farming?
              </h2>
              <p className="text-xl mb-6 text-green-100">
                వ్యవసాయ భవిష్యత్తును అనుభవించడానికి సిద్ధంగా ఉన్నారా?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  <Link to="/booking">
                    <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 text-lg">
                      Book Service Now / ఇప్పుడే సేవ బుక్ చేయండి
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 text-lg">
                        Register Now / ఇప్పుడే నమోదు
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
                        Login / లాగిన్
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default DroneDetails;
