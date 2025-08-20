import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // using lucide-react for icons (lighter alternative)

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="navbar fixed w-full z-50 shadow-md bg-white">
        <div className="container mx-auto px-5 py-5">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              
              <span className="text-xl font-bold text-indigo-600">Digital Wallet</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-indigo-600 font-medium">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                Features
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                Pricing
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                Contact
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                FAQ
              </a>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="px-4 py-2 text-indigo-600 font-medium">
                Login
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white py-4 px-4 absolute w-full shadow-md">
            <a href="#" className="block py-2 text-indigo-600 font-medium">
              Home
            </a>
            <a href="#" className="block py-2 text-gray-600">
              Features
            </a>
            <a href="#" className="block py-2 text-gray-600">
              Pricing
            </a>
            <a href="#" className="block py-2 text-gray-600">
              About
            </a>
            <a href="#" className="block py-2 text-gray-600">
              Contact
            </a>
            <a href="#" className="block py-2 text-gray-600">
              FAQ
            </a>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full py-2 text-indigo-600 font-medium mb-2">
                Login
              </button>
              <button className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>

      <div className="pt-20">Home</div>
    </>
  );
};

export default Home;
