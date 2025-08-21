import React from 'react';
import { Link } from 'react-router';
import { 
  Shield, 
  Zap, 
  Users, 
  CreditCard, 
  Smartphone, 
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Globe,
  Lock
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2">
                  <span className="text-blue-200 text-sm font-medium">🚀 Most Trusted Digital Wallet</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Money,{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Simplified
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Send, receive, and manage your money securely with Digital Wallet. 
                The fastest and most reliable digital wallet in Bangladesh.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link
                  to="/register"
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  to="/features"
                  className="border-2 border-blue-400 text-blue-100 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-400/10 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
                >
                  Learn More
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-300">2M+</div>
                  <div className="text-blue-200 text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-300">৳50B+</div>
                  <div className="text-blue-200 text-sm">Transactions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-300">99.9%</div>
                  <div className="text-blue-200 text-sm">Uptime</div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Phone Mockup */}
                <div className="bg-gray-900 rounded-3xl p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 w-80 h-96 flex flex-col">
                    {/* App Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        
                        <img
                          src="/logo.svg"
                          alt="Digital Wallet"
                          className="h-6 w-auto"
                        />
                      </div>
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Balance Card */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 text-white mb-6">
                      <p className="text-blue-100 text-sm">Available Balance</p>
                      <p className="text-2xl font-bold">৳45,280.50</p>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="bg-blue-100 w-8 h-8 rounded-lg flex items-center justify-center mb-2">
                          <ArrowRight className="h-4 w-4 text-blue-600" />
                        </div>
                        <p className="text-xs font-medium text-gray-700">Send Money</p>
                      </div>
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="bg-green-100 w-8 h-8 rounded-lg flex items-center justify-center mb-2">
                          <CreditCard className="h-4 w-4 text-green-600" />
                        </div>
                        <p className="text-xs font-medium text-gray-700">Pay Bills</p>
                      </div>
                    </div>
                    
                    {/* Recent Transactions */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-800">John Doe</p>
                            <p className="text-xs text-gray-500">Received</p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-green-600">+৳2,500</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 animate-bounce">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-800">Secure</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 animate-pulse">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-800">Instant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Digital Wallet?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of digital payments with our cutting-edge features designed for your convenience and security.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Bank-Level Security',
                description: 'Your money and data are protected with military-grade encryption and advanced fraud detection.',
                color: 'blue',
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Send money instantly to anyone, anywhere in Bangladesh. No waiting, no delays.',
                color: 'yellow',
              },
              {
                icon: Smartphone,
                title: 'Mobile First',
                description: 'Designed for your smartphone with an intuitive interface that makes banking simple.',
                color: 'green',
              },
              {
                icon: Users,
                title: 'Wide Network',
                description: 'Connect with millions of users and thousands of agents across the country.',
                color: 'purple',
              },
              {
                icon: CreditCard,
                title: 'Bill Payments',
                description: 'Pay all your utility bills, mobile recharges, and online shopping with ease.',
                color: 'indigo',
              },
              {
                icon: TrendingUp,
                title: 'Smart Analytics',
                description: 'Track your spending patterns and get insights to manage your money better.',
                color: 'emerald',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`bg-${feature.color}-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Digital Wallet Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes with our simple three-step process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Sign Up',
                description: 'Create your account with just your phone number and basic information. Verification takes less than 2 minutes.',
                icon: Smartphone,
              },
              {
                step: '02',
                title: 'Add Money',
                description: 'Load money into your wallet through our extensive agent network or bank transfer.',
                icon: CreditCard,
              },
              {
                step: '03',
                title: 'Start Transacting',
                description: 'Send money, pay bills, shop online, and much more with complete security and convenience.',
                icon: Zap,
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 right-0 transform translate-x-1/2">
                    <ArrowRight className="h-8 w-8 text-blue-300" />
                  </div>
                )}
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold text-lg">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join millions of satisfied users who trust Digital Wallet for their daily transactions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Ahmed',
                role: 'Small Business Owner',
                content: 'Digital Wallet has revolutionized how I handle payments for my business. The instant transfers and low fees have saved me both time and money.',
                rating: 5,
                avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
              },
              {
                name: 'Mahmud Hassan',
                role: 'Freelancer',
                content: 'As a freelancer, I need quick and reliable payments. Digital Wallet delivers every time with their lightning-fast transfers and excellent customer support.',
                rating: 5,
                avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
              },
              {
                name: 'Fatima Rahman',
                role: 'Student',
                content: 'The bill payment feature is a lifesaver! I can pay all my utility bills and mobile recharge without leaving my room. Highly recommended!',
                rating: 5,
                avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Start Your Digital Wallet Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join over 2 million users who trust Digital Wallet for their daily financial needs. 
              Sign up today and get ৳100 bonus credit!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/register"
                className="group bg-white text-blue-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                Create Account Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
              >
                Sign In
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-70">
              <div className="flex items-center justify-center space-x-2">
                <Lock className="h-6 w-6" />
                <span className="text-sm font-medium">SSL Encrypted</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Shield className="h-6 w-6" />
                <span className="text-sm font-medium">Bank Grade Security</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Globe className="h-6 w-6" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-6 w-6" />
                <span className="text-sm font-medium">Verified Platform</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;