import React, { useState } from 'react';
import { NavLink as RouterNavLink, Outlet } from 'react-router';
import { Users, UserCheck, ListChecks, Settings, SlidersHorizontal, Menu } from "lucide-react";
import Header from '../../ui/Header';



export default function AdminDashboard() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const NavLink: React.FC<{ to: string; label: string; icon: React.ReactNode; }> = ({ to, label, icon }) => (
        <RouterNavLink
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
                `w-full flex items-center gap-3 p-3 rounded-lg font-medium ${isActive ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`
            }
        >
            {icon}
            {label}
        </RouterNavLink>
    );

    const [isDarkMode, setDarkMode] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            <aside className={`w-72 bg-white border-r p-6 flex-col fixed inset-y-0 left-0 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex`}>
                <h1 className="text-3xl font-bold text-indigo-600 mb-8">
                    Admin Panel
                </h1>
                <nav className="space-y-2">
                    <NavLink to="/admin/dashboard" label="Dashboard" icon={<SlidersHorizontal size={20} />} />
                    <NavLink to="/admin/dashboard/users" label="Manage Users" icon={<Users size={20} />} />
                    <NavLink to="/agents" label="Manage Agents" icon={<UserCheck size={20} />} />
                    <NavLink to="/transactions" label="All Transactions" icon={<ListChecks size={20} />} />
                </nav>
                <div className="mt-auto">
                    <NavLink to="/settings" label="System Settings" icon={<Settings size={20} />} />
                </div>
            </aside>
            {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>}

            <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
                <button onClick={() => setSidebarOpen(true)} className="md:hidden mr-4 text-gray-600"><Menu size={24} /></button>
                <Header isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
                <Outlet />
            </main>
        </div>
    );
}
