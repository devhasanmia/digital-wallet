import { Link } from "react-router";
import { Lock } from "lucide-react";

const AccessDenied = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md">
        <div className="flex justify-center mb-4">
          <Lock className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page.
        </p>
        <Link
          to="/"
          className="px-6 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;
