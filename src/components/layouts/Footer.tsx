import React from 'react';
import { Link } from 'react-router';
import {Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center space-x-2">
                            <img
                                src="/logo-white.svg"
                                alt="Digital Wallet"
                                className="h-6 w-auto"
                            />
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            The most secure and convenient digital wallet solution for your everyday financial needs.
                            Send, receive, and manage your money with confidence.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'About Us', path: '/about' },
                                { name: 'Features', path: '/features' },
                                { name: 'Contact', path: '/contact' },
                                { name: 'FAQ', path: '/faq' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Services</h3>
                        <ul className="space-y-2">
                            {[
                                'Money Transfer',
                                'Bill Payments',
                                'Mobile Recharge',
                                'Online Shopping',
                                'Investment Plans',
                            ].map((service) => (
                                <li key={service}>
                                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <MapPin className="h-4 w-4 text-blue-400" />
                                <span className="text-sm text-gray-400">
                                    123 Financial District, Dhaka, Bangladesh
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-4 w-4 text-blue-400" />
                                <span className="text-sm text-gray-400">+880 1234 567 890</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-4 w-4 text-blue-400" />
                                <span className="text-sm text-gray-400">support@Digital Wallet.com</span>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="mt-6">
                            <h4 className="text-white text-sm font-medium mb-2">Newsletter</h4>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 px-3 py-2 bg-gray-800 text-white text-sm rounded-l-lg border border-gray-700 focus:outline-none focus:border-blue-500"
                                />
                                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-r-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-400">
                            © {new Date().getFullYear()} Digital Wallet. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">
                                Terms of Service
                            </a>
                            <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;