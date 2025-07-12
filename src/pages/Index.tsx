
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Drone, Leaf, Clock, Shield, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-green-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Drone className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">AgriDrone Seva</h1>
          </div>
          <nav className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-green-700">Welcome, {user.name}</span>
                <Link to="/booking">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Book Service
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login">
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    Login / లాగిన్
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Register / నమోదు
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-green-800 mb-4 leading-tight">
              మీ పంటకు తాజా పరిష్కారం!
            </h2>
            <h3 className="text-3xl font-semibold text-green-700 mb-6">
              A Smart Solution for Modern Farming
            </h3>
            <p className="text-xl text-green-600 mb-8 leading-relaxed">
              Advanced drone technology for precise pesticide and fertilizer spraying. 
              Save time, reduce costs, and boost your crop yields with our professional agricultural drone services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/drone-details">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                  Learn More / మరింత తెలుసుకోండి
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              {!user && (
                <Link to="/register">
                  <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg">
                    Get Started / ప్రారంభించండి
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-green-800 text-center mb-12">
            Why Choose AgriDrone Seva? / ఎందుకు AgriDrone Seva?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-green-800 mb-3">Time Saving</h4>
                <p className="text-green-600">Complete spraying in fraction of traditional time</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-green-800 mb-3">Uniform Coverage</h4>
                <p className="text-green-600">Precise and even distribution across all crops</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-green-800 mb-3">Safe & Secure</h4>
                <p className="text-green-600">No direct chemical exposure for farmers</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-green-800 mb-3">Expert Service</h4>
                <p className="text-green-600">Professional operators with local expertise</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Farming? / మీ వ్యవసాయాన్ని మార్చడానికి సిద్ధంగా ఉన్నారా?
          </h3>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of farmers who have already improved their crop yields with our drone services
          </p>
          {user ? (
            <Link to="/booking">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 text-lg font-semibold">
                Book Now / ఇప్పుడే బుక్ చేయండి
              </Button>
            </Link>
          ) : (
            <Link to="/register">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 text-lg font-semibold">
                Register Today / ఈరోజే నమోదు చేసుకోండి
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Drone className="h-6 w-6" />
            <span className="text-xl font-semibold">AgriDrone Seva</span>
          </div>
          <p className="text-green-200 mb-2">Smart Spraying for Smarter Farmers</p>
          <p className="text-green-300 text-sm">© 2024 AgriDrone Seva. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
