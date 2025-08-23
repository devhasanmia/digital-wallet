import React from "react";

const HeaderSkeleton: React.FC = () => {
  return (
    <header className="flex justify-between items-center mb-8 animate-pulse">
      {/* Logo Placeholder */}
      <div className="h-8 w-28 bg-gray-300 dark:bg-gray-700 rounded"></div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Theme Toggle */}
        <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

        {/* Settings */}
        <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

        {/* Bell Icon */}
        <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

        {/* Profile Image */}
        <div className="h-10 w-10 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
      </div>
    </header>
  );
};

export default HeaderSkeleton;
