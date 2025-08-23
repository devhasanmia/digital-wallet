import { Bell, Settings, Sun, Moon, LogOut, User } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { useLogoutMutation, useProfileQuery } from "../../redux/features/auth/authApi";

type HeaderProps = {
  isDarkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onRestartTour?: () => void;
  onLogout?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  setDarkMode,
  onRestartTour,
}) => {
  const { data: profile } = useProfileQuery("");
  const profileImage =
    profile?.data?.picture ||
    "https://res.cloudinary.com/deicntkum/image/upload/v1755900488/man-user-circle-icon_wrrmd6.png";

  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // বাইরে ক্লিক করলে dropdown বন্ধ হবে
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <header className="flex justify-between items-center mb-8 relative">
      <Link to="/" className="flex items-center space-x-2">
        <img src="/logo.svg" alt="PayWallet Logo" className="h-8 w-auto" />
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Dark Mode Toggle */}
        <button
          id="theme-toggle"
          onClick={() => setDarkMode(!isDarkMode)}
          className="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Restart Tour */}
        {onRestartTour && (
          <button
            title="Restart Tour"
            onClick={onRestartTour}
            className="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full"
          >
            <Settings size={20} />
          </button>
        )}

        <Bell className="text-gray-500 dark:text-gray-400 cursor-pointer" />

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 hover:scale-105 transition-transform"
          >
            <img src={profileImage} alt="User Avatar" className="w-10 h-10" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden z-50">
              <Link
                to="/user/dashboard/profile"
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                <User size={16} /> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center cursor-pointer gap-2 px-4 py-2 text-sm hover:bg-red-50 dark:hover:bg-gray-700 text-red-500"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
