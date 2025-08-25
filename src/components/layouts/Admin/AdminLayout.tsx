import { useState } from "react";
import { NavLink as RouterNavLink, Outlet } from "react-router";
import { Users, UserCheck, ListChecks, SlidersHorizontal, Menu } from "lucide-react";
import Header from "../../ui/Header";

export default function AdminDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside
        className={`w-72 bg-white border-r p-6 flex-col fixed inset-y-0 left-0 z-40 transform 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out 
          md:relative md:translate-x-0 md:flex`}
      >
        <h1 className="text-3xl font-bold text-indigo-600 mb-8">Admin Panel</h1>

        <nav className="space-y-2">
          <RouterNavLink
            to="/admin/dashboard"
            onClick={() => setSidebarOpen(false)}
            className="w-full flex items-center gap-3 p-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100"
          >
            <SlidersHorizontal size={20} />
            Dashboard
          </RouterNavLink>

          <RouterNavLink
            to="/admin/dashboard/users"
            onClick={() => setSidebarOpen(false)}
            className="w-full flex items-center gap-3 p-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100"
          >
            <Users size={20} />
            Manage Users
          </RouterNavLink>

          <RouterNavLink
            to="/admin/dashboard/agents"
            onClick={() => setSidebarOpen(false)}
            className="w-full flex items-center gap-3 p-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100"
          >
            <UserCheck size={20} />
            Manage Agents
          </RouterNavLink>

          <RouterNavLink
            to="/admin/dashboard/transactions"
            onClick={() => setSidebarOpen(false)}
            className="w-full flex items-center gap-3 p-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100"
          >
            <ListChecks size={20} />
            All Transactions
          </RouterNavLink>
        </nav>

        
      </aside>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden mb-4 text-gray-600"
        >
          <Menu size={24} />
        </button>

        <Header isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
        <Outlet />
      </main>
    </div>
  );
}
