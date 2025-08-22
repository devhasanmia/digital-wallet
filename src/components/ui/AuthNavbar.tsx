import React from "react";
import { Link } from "react-router";
import { Settings, Bell } from "lucide-react";

interface AuthNavbarProps {
  onRestartTour: () => void;
}

const AuthNavbar: React.FC<AuthNavbarProps> = ({ onRestartTour }) => {
  return (
    <header className="flex justify-between items-center mb-8 px-4 py-3 shadow-md bg-white rounded-lg">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img
          src="/logo.svg"
          alt="Digital Wallet Logo"
          className="h-8 w-auto"
        />
        <span className="font-bold text-lg text-gray-700">
          Digital Wallet
        </span>
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Restart Tour */}
        <button
          title="Restart Tour"
          onClick={onRestartTour}
          className="text-gray-600 hover:bg-gray-200 p-2 rounded-full transition"
        >
          <Settings size={20} />
        </button>

        {/* Notifications */}
        <Bell className="text-gray-600 cursor-pointer" />

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
          A
        </div>
      </div>
    </header>
  );
};

export default AuthNavbar;
