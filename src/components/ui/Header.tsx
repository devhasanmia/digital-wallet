import { Bell, Settings, Sun, Moon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { useProfileQuery } from "../../redux/features/auth/authApi";

type HeaderProps = {
  isDarkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onRestartTour?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  setDarkMode,
  onRestartTour,
}) => {
  const { data: profile } = useProfileQuery("");
  const profileImage = profile?.data?.picture || "https://res.cloudinary.com/deicntkum/image/upload/v1755900488/man-user-circle-icon_wrrmd6.png"
  return (
    <header className="flex justify-between items-center mb-8">
      <Link to="/" className="flex items-center space-x-2">
        <img
          src="/logo.svg"
          alt="PayWallet Logo"
          className="h-8 w-auto"
        />
      </Link>
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          id="theme-toggle"
          onClick={() => setDarkMode(!isDarkMode)}
          className="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

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
        <div className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold">
          <img src={profileImage} alt="" className="w-10 h-10 rounded-full" />
        </div>
      </div>
    </header>
  );
};

export default Header;
