import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Bell, User, Users, UserCheck, ListChecks, DollarSign, Settings, SlidersHorizontal, Search, X as CloseIcon, ChevronLeft, ChevronRight, Menu, MoreVertical } from "lucide-react";

// --- Type Definitions for TypeScript ---
type UserStatus = 'Active' | 'Blocked';
type AgentStatus = 'Approved' | 'Suspended' | 'Pending';
type TransactionStatus = 'Completed' | 'Failed';

interface User {
    id: number;
    name: string;
    email: string;
    joinDate: string;
    status: UserStatus;
}

interface Agent {
    id: number;
    name: string;
    phone: string;
    joinDate: string;
    status: AgentStatus;
}

interface Transaction {
    id: string;
    type: string;
    amount: number;
    date: string;
    status: TransactionStatus;
}

// --- Mock Data ---
const initialUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: '2025-08-01', status: 'Active' }, { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinDate: '2025-07-25', status: 'Active' }, { id: 3, name: 'Mike Ross', email: 'mike@example.com', joinDate: '2025-06-10', status: 'Blocked' }, { id: 4, name: 'Harvey Specter', email: 'harvey@example.com', joinDate: '2025-08-11', status: 'Active' }, { id: 5, name: 'Louis Litt', email: 'louis@example.com', joinDate: '2025-08-15', status: 'Active' }, { id: 6, name: 'Donna Paulsen', email: 'donna@example.com', joinDate: '2025-08-18', status: 'Active' },
];
const initialAgents: Agent[] = [
    { id: 1, name: 'Agent One', phone: '01711000111', joinDate: '2025-08-15', status: 'Approved' }, { id: 2, name: 'Agent Two', phone: '01922000222', joinDate: '2025-08-12', status: 'Suspended' }, { id: 3, name: 'New Agent Request', phone: '01833000333', joinDate: '2025-08-20', status: 'Pending' }, { id: 4, name: 'Agent Four', phone: '01544000444', joinDate: '2025-07-30', status: 'Approved' }, { id: 5, name: 'Another Pending', phone: '01355000555', joinDate: '2025-08-21', status: 'Pending' },
];
const allTransactions: Transaction[] = [
    { id: 'TXN101', type: 'Cash-in', amount: 5000, date: '2025-08-21', status: 'Completed' }, { id: 'TXN102', type: 'Cash-out', amount: 1000, date: '2025-08-21', status: 'Completed' }, { id: 'TXN103', type: 'Payment', amount: 150, date: '2025-08-20', status: 'Completed' }, { id: 'TXN104', type: 'Send Money', amount: 500, date: '2025-08-19', status: 'Failed' }, { id: 'TXN105', type: 'Received', amount: 250, date: '2025-08-19', status: 'Completed' }, { id: 'TXN106', type: 'Cash-in', amount: 2000, date: '2025-08-18', status: 'Completed' },
];
const growthData = [ { month: 'Mar', users: 120, agents: 15 }, { month: 'Apr', users: 180, agents: 22 }, { month: 'May', users: 250, agents: 30 }, { month: 'Jun', users: 310, agents: 38 }, { month: 'Jul', users: 450, agents: 50 }, { month: 'Aug', users: 520, agents: 65 }, ];
const volumeData = [ { month: 'Mar', volume: 150000 }, { month: 'Apr', volume: 220000 }, { month: 'May', volume: 300000 }, { month: 'Jun', volume: 410000 }, { month: 'Jul', volume: 550000 }, { month: 'Aug', volume: 620000 }, ];

// --- Reusable Components ---
const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; colorClass: string; }> = ({ title, value, icon, colorClass }) => ( <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-5"> <div className={`p-4 rounded-full ${colorClass}`}>{icon}</div> <div> <p className="text-sm text-gray-500 font-medium">{title}</p> <p className="text-2xl font-bold text-gray-800">{value}</p> </div> </div> );
const StatusBadge: React.FC<{ status: string }> = ({ status }) => { const styles: { [key: string]: string } = { Active: 'bg-green-100 text-green-700', Approved: 'bg-green-100 text-green-700', Blocked: 'bg-red-100 text-red-700', Suspended: 'bg-red-100 text-red-700', Pending: 'bg-yellow-100 text-yellow-700', Completed: 'bg-blue-100 text-blue-700', Failed: 'bg-gray-100 text-gray-700', }; const style = styles[status] || 'bg-gray-100 text-gray-700'; return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${style}`}>{status}</span>; };
const Pagination: React.FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void; }> = ({ currentPage, totalPages, onPageChange }) => ( <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2"> <span className="text-sm text-gray-600">Page {currentPage} of {totalPages || 1}</span> <div className="flex items-center gap-2"> <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"><ChevronLeft size={16}/></button> <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"><ChevronRight size={16}/></button> </div> </div> );

// --- Main Admin Dashboard Component ---
export default function AdminDashboard() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [activeView, setActiveView] = useState('dashboard');
    const renderView = () => { switch (activeView) { case 'dashboard': return <DashboardView />; case 'users': return <ManageUsersView />; case 'agents': return <ManageAgentsView />; case 'transactions': return <AllTransactionsView />; case 'settings': return <SettingsView />; default: return <DashboardView />; } };
    const NavLink: React.FC<{ view: string; label: string; icon: React.ReactNode; }> = ({ view, label, icon }) => ( <button onClick={() => { setActiveView(view); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium ${activeView === view ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}>{icon} {label}</button> );
    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            <aside className={`w-72 bg-white border-r p-6 flex-col fixed inset-y-0 left-0 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex`}>
                <h1 className="text-3xl font-bold text-indigo-600 mb-8">nPay Admin</h1>
                <nav className="space-y-2"> <NavLink view="dashboard" label="Dashboard" icon={<SlidersHorizontal size={20} />} /> <NavLink view="users" label="Manage Users" icon={<Users size={20} />} /> <NavLink view="agents" label="Manage Agents" icon={<UserCheck size={20} />} /> <NavLink view="transactions" label="All Transactions" icon={<ListChecks size={20} />} /> </nav>
                <div className="mt-auto"><NavLink view="settings" label="System Settings" icon={<Settings size={20} />} /></div>
            </aside>
            {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
            <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center"> <button onClick={() => setSidebarOpen(true)} className="md:hidden mr-4 text-gray-600"><Menu size={24} /></button> <h2 className="text-xl sm:text-2xl font-bold text-gray-800 capitalize">{activeView.replace('-', ' ')}</h2> </div>
                    <div className="flex items-center gap-4 sm:gap-6"> <Bell className="text-gray-500 cursor-pointer" /> <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">AD</div> </div>
                </header>
                {renderView()}
            </main>
        </div>
    );
}

// --- View Components ---
const DashboardView = () => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Users" value="520" icon={<Users size={24} className="text-indigo-600"/>} colorClass="bg-indigo-100"/>
            <StatCard title="Total Agents" value="65" icon={<UserCheck size={24} className="text-sky-600"/>} colorClass="bg-sky-100"/>
            <StatCard title="Total Transactions" value="1.2 M" icon={<ListChecks size={24} className="text-amber-600"/>} colorClass="bg-amber-100"/>
            <StatCard title="Total Volume" value="$2.25 M" icon={<DollarSign size={24} className="text-green-600"/>} colorClass="bg-green-100"/>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* <div className="bg-white p-6 rounded-xl shadow-md"> <h3 className="font-semibold text-gray-800 mb-4">User & Agent Growth</h3> <ResponsiveContainer width="100%" height={300}> <LineChart data={growthData}> <CartesianGrid strokeDasharray="3 3" /> <XAxis dataKey="month" tick={{fontSize: 12}} /> <YAxis tick={{fontSize: 12}} /> <Tooltip /> <Legend /> <Line type="monotone" dataKey="users" stroke="#8884d8" name="Users" strokeWidth={2} /> <Line type="monotone" dataKey="agents" stroke="#82ca9d" name="Agents" strokeWidth={2} /> </LineChart> </ResponsiveContainer> </div>
            <div className="bg-white p-6 rounded-xl shadow-md"> <h3 className="font-semibold text-gray-800 mb-4">Transaction Volume (by Month)</h3> <ResponsiveContainer width="100%" height={300}> <BarChart data={volumeData}> <CartesianGrid strokeDasharray="3 3" vertical={false}/> <XAxis dataKey="month" tick={{fontSize: 12}}/> <YAxis tickFormatter={(value) => `$${value/1000}k`} tick={{fontSize: 12}}/> <Tooltip /> <Legend /> <Bar dataKey="volume" fill="#6366f1" name="Volume" radius={[4, 4, 0, 0]}/> </BarChart> </ResponsiveContainer> </div> */}
        </div>
    </div>
);

const ManageUsersView = () => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<UserStatus | 'All'>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    const handleToggleStatus = (id: number) => { setUsers(users.map(user => user.id === id ? { ...user, status: user.status === 'Active' ? 'Blocked' : 'Active' } : user)); };

    const filteredUsers = useMemo(() => users.filter(user => (statusFilter === 'All' || user.status === statusFilter) && (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()))), [users, searchTerm, statusFilter]);
    const paginatedUsers = useMemo(() => filteredUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE), [filteredUsers, currentPage]);
    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                <div className="relative"> <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/> <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} className="border rounded-lg pl-10 pr-4 py-2 w-full md:w-64"/> </div>
                <select value={statusFilter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as UserStatus | 'All')} className="border rounded-lg py-2 px-3"> <option value="All">All</option> <option value="Active">Active</option> <option value="Blocked">Blocked</option> </select>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-left text-gray-500"><tr className="border-b"><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Join Date</th><th className="p-3">Status</th><th className="p-3 text-right">Action</th></tr></thead>
                    <tbody>{paginatedUsers.map(user => ( <tr key={user.id} className="border-b hover:bg-gray-50"> <td className="p-3 font-medium">{user.name}</td> <td className="p-3">{user.email}</td> <td className="p-3">{user.joinDate}</td> <td className="p-3"><StatusBadge status={user.status} /></td> <td className="p-3 text-right"><button onClick={() => handleToggleStatus(user.id)} className={`px-3 py-1 text-xs font-semibold rounded-md ${user.status === 'Active' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'}`}>{user.status === 'Active' ? 'Block' : 'Unblock'}</button></td> </tr> ))}</tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
};

const ManageAgentsView = () => {
    const [agents, setAgents] = useState<Agent[]>(initialAgents);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<AgentStatus | 'All'>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;
    const handleStatusChange = (id: number, newStatus: AgentStatus) => { setAgents(agents.map(agent => agent.id === id ? { ...agent, status: newStatus } : agent)); };
    const filteredAgents = useMemo(() => agents.filter(agent => (statusFilter === 'All' || agent.status === statusFilter) && (agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || agent.phone.includes(searchTerm))), [agents, searchTerm, statusFilter]);
    const paginatedAgents = useMemo(() => filteredAgents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE), [filteredAgents, currentPage]);
    const totalPages = Math.ceil(filteredAgents.length / ITEMS_PER_PAGE);
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                <div className="relative"> <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/> <input type="text" placeholder="Search by name or phone..." value={searchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} className="border rounded-lg pl-10 pr-4 py-2 w-full md:w-64"/> </div>
                <select value={statusFilter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as AgentStatus | 'All')} className="border rounded-lg py-2 px-3"> <option value="All">All</option> <option value="Approved">Approved</option> <option value="Suspended">Suspended</option> <option value="Pending">Pending</option> </select>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-left text-gray-500"><tr className="border-b"><th className="p-3">Name</th><th className="p-3">Phone</th><th className="p-3">Join Date</th><th className="p-3">Status</th><th className="p-3 text-right">Action</th></tr></thead>
                    <tbody>{paginatedAgents.map(agent => ( <tr key={agent.id} className="border-b hover:bg-gray-50"> <td className="p-3 font-medium">{agent.name}</td> <td className="p-3">{agent.phone}</td> <td className="p-3">{agent.joinDate}</td> <td className="p-3"><StatusBadge status={agent.status} /></td> <td className="p-3 text-right">{agent.status === 'Pending' && (<button onClick={() => handleStatusChange(agent.id, 'Approved')} className="bg-green-500 text-white px-3 py-1 text-xs font-semibold rounded-md hover:bg-green-600">Approve</button>)} {agent.status === 'Approved' && (<button onClick={() => handleStatusChange(agent.id, 'Suspended')} className="bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-md hover:bg-red-600">Suspend</button>)} {agent.status === 'Suspended' && (<button onClick={() => handleStatusChange(agent.id, 'Approved')} className="bg-blue-500 text-white px-3 py-1 text-xs font-semibold rounded-md hover:bg-blue-600">Reactivate</button>)}</td> </tr> ))}</tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
};

const AllTransactionsView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ type: 'All', status: 'All', startDate: '', endDate: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => { setFilters({ ...filters, [e.target.name]: e.target.value }); };
    const filteredTxns = useMemo(() => allTransactions.filter(txn => (filters.type === 'All' || txn.type === filters.type) && (filters.status === 'All' || txn.status === filters.status) && (filters.startDate === '' || new Date(txn.date) >= new Date(filters.startDate)) && (filters.endDate === '' || new Date(txn.date) <= new Date(filters.endDate)) && (txn.id.toLowerCase().includes(searchTerm.toLowerCase())) ), [filters, searchTerm]);
    const paginatedTxns = useMemo(() => filteredTxns.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE), [filteredTxns, currentPage]);
    const totalPages = Math.ceil(filteredTxns.length / ITEMS_PER_PAGE);
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <input type="text" placeholder="Search by Txn ID..." value={searchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} className="border rounded-lg py-2 px-3"/>
                <select name="type" value={filters.type} onChange={handleFilterChange} className="border rounded-lg py-2 px-3"><option value="All">All Types</option><option>Cash-in</option><option>Cash-out</option><option>Send Money</option><option>Payment</option><option>Received</option></select>
                <select name="status" value={filters.status} onChange={handleFilterChange} className="border rounded-lg py-2 px-3"><option value="All">All Status</option><option>Completed</option><option>Failed</option></select>
                <div className="flex items-center gap-2"> <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="border rounded-lg py-2 px-3 w-full"/> <span className="text-gray-500">-</span> <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="border rounded-lg py-2 px-3 w-full"/> </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-left text-gray-500"><tr className="border-b"><th className="p-3">Txn ID</th><th className="p-3">Type</th><th className="p-3">Date</th><th className="p-3 text-right">Amount</th><th className="p-3 text-right">Status</th></tr></thead>
                    <tbody>{paginatedTxns.map(txn => ( <tr key={txn.id} className="border-b hover:bg-gray-50"> <td className="p-3 font-mono text-xs">{txn.id}</td> <td className="p-3">{txn.type}</td> <td className="p-3">{txn.date}</td> <td className="p-3 text-right font-semibold">${txn.amount.toFixed(2)}</td> <td className="p-3 text-right"><StatusBadge status={txn.status} /></td> </tr> ))}</tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
};

const SettingsView = () => (
     <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
        <h3 className="font-bold text-lg mb-6">System Fees & Limits</h3>
        <div className="space-y-6">
            <div> <label className="text-sm font-medium text-gray-700">Cash-in Fee (%)</label> <input type="number" defaultValue="0.9" className="mt-1 block w-full border-gray-300 rounded-md p-2"/> </div>
            <div> <label className="text-sm font-medium text-gray-700">Cash-out Fee (%)</label> <input type="number" defaultValue="1.85" className="mt-1 block w-full border-gray-300 rounded-md p-2"/> </div>
            <div> <label className="text-sm font-medium text-gray-700">Send Money Fee (Flat)</label> <input type="number" defaultValue="5.00" className="mt-1 block w-full border-gray-300 rounded-md p-2"/> </div>
            <div> <label className="text-sm font-medium text-gray-700">Daily Withdrawal Limit ($)</label> <input type="number" defaultValue="25000" className="mt-1 block w-full border-gray-300 rounded-md p-2"/> </div>
            <div className="text-right"> <button className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700">Save Changes</button> </div>
        </div>
    </div>
);