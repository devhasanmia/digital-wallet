import React from "react";
import { Loader2 } from "lucide-react";

type LoadingProps = {
  text?: string;
};

const Loading: React.FC<LoadingProps> = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Spinner */}
      <Loader2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400 animate-spin mb-4" />

      {/* Text */}
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        Digital Wallet
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{text}</p>
    </div>
  );
};

export default Loading;
