import React, { use } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Users,
  Calendar,
  Gamepad2,
  Zap,
  Star,
  ArrowRight,
  Dice6,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: 'Smart Scheduling',
      description:
        'Coordinate with friends and find the perfect time for everyone to play.',
    },
    {
      icon: <Gamepad2 className="h-8 w-8" />,
      title: 'Game Library',
      description:
        'Build your collection and discover new games tailored to your group.',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Easy Invites',
      description:
        'Send invitations and manage RSVPs with real-time notifications.',
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Live Updates',
      description:
        'Stay connected with real-time chat and instant event updates.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Board Game Enthusiast',
      content:
        'This app transformed our chaotic group chats into organized, fun game nights!',
      rating: 5,
    },
    {
      name: 'Mike Rodriguez',
      role: 'RPG Dungeon Master',
      content:
        'Perfect for managing my D&D campaigns and keeping everyone in the loop.',
      rating: 5,
    },
    {
      name: 'Emma Thompson',
      role: 'Casual Gamer',
      content:
        'Finally, a way to plan game nights without the endless back-and-forth texts.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Dice6 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">GameNight</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Reviews
              </a>
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Login
              </Button>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </Button>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Reviews
                </a>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 w-full"
                >
                  Sign In
                </Button>
                <Button onClick={() => navigate('/login')} className="bg-purple-600 hover:bg-purple-700 text-white w-full">
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        {/* Textured Background */}
        <div className="absolute inset-0 opacity-15">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Plan Epic Game Nights
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Bring your friends together for unforgettable gaming experiences.
              From board games to RPGs, organize and play with ease.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg w-full sm:w-auto"
              >
                Start Planning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              {/* <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg w-full sm:w-auto"
              >
                Watch Demo
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Perfect Game Nights
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make planning and hosting game
              nights effortless and fun.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {React.cloneElement(feature.icon, {
                      className: 'h-8 w-8 text-purple-600',
                    })}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">
                10K+
              </div>
              <div className="text-gray-600">Game Nights Planned</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">
                50K+
              </div>
              <div className="text-gray-600">Happy Gamers</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">
                500+
              </div>
              <div className="text-gray-600">Games in Library</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">
                99%
              </div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Loved by Game Night Hosts Everywhere
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to Roll the Dice?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Join thousands of gamers who've made their game nights legendary
              with GameNight.
            </p>
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 text-lg"
            >
              Start Your First Game Night
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <Dice6 className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  GameNight
                </span>
              </div>
              <p className="text-gray-600">
                Making game nights legendary, one roll at a time.
              </p>
            </div>

            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Event Planning</li>
                <li>Game Library</li>
                <li>Invitations</li>
                <li>Real-time Chat</li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Bug Reports</li>
                <li>Feature Requests</li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
            <p>
              &copy; 2025 GameNight. All rights reserved. Built for gamers, by
              gamers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
