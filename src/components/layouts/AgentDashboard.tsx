import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Bell, User, ArrowUp, ArrowDown, Filter, X as CloseIcon, ChevronLeft, ChevronRight, Menu, DollarSign, ListChecks } from "lucide-react";

// --- Mock Data for Agent ---
const agentTransactions = [
    { id: 'TXN101', userAccount: '01700111222', type: 'Cash-in', amount: 5000.00, date: '2025-08-21', commission: 4.50 },
    { id: 'TXN102', userAccount: '01900222333', type: 'Cash-out', amount: 1000.00, date: '2025-08-21', commission: 9.00 },
    { id: 'TXN103', userAccount: '01800333444', type: 'Cash-in', amount: 2500.00, date: '2025-08-21', commission: 2.25 },
    { id: 'TXN104', userAccount: '01600444555', type: 'Cash-in', amount: 10000.00, date: '2025-08-20', commission: 9.00 },
    { id: 'TXN105', userAccount: '01500555666', type: 'Cash-out', amount: 3000.00, date: '2025-08-20', commission: 27.00 },
    { id: 'TXN106', userAccount: '01300666777', type: 'Cash-in', amount: 800.00, date: '2025-08-19', commission: 0.72 },
    { id: 'TXN107', userAccount: '01700111222', type: 'Cash-out', amount: 2000.00, date: '2025-08-19', commission: 18.00 },
    { id: 'TXN108', userAccount: '01900222333', type: 'Cash-in', amount: 1500.00, date: '2025-08-18', commission: 1.35 },
    { id: 'TXN109', userAccount: '01800333444', type: 'Cash-out', amount: 500.00, date: '2025-08-18', commission: 4.50 },
    { id: 'TXN110', userAccount: '01600444555', type: 'Cash-in', amount: 1200.00, date: '2025-08-17', commission: 1.08 },
];

const commissionHistory = agentTransactions.map(t => ({ id: t.id, date: t.date, transactionAmount: t.amount, type: t.type, commission: t.commission }));

// --- Mock Data for Charts ---
const dailyTransactionData = [
    { day: 'Sat', cashIn: 4000, cashOut: 2400 },
    { day: 'Sun', cashIn: 3000, cashOut: 1398 },
    { day: 'Mon', cashIn: 5000, cashOut: 3800 },
    { day: 'Tue', cashIn: 4780, cashOut: 3908 },
    { day: 'Wed', cashIn: 6890, cashOut: 4800 },
    { day: 'Thu', cashIn: 5390, cashOut: 3800 },
    { day: 'Fri', cashIn: 7000, cashOut: 4300 },
];
const commissionTrendData = [
    { day: 'Sat', commission: 55 },
    { day: 'Sun', commission: 48 },
    { day: 'Mon', commission: 72 },
    { day: 'Tue', commission: 68 },
    { day: 'Wed', commission: 95 },
    { day: 'Thu', commission: 82 },
    { day: 'Fri', commission: 105 },
];

// --- Reusable Components ---
const StatCard = ({ title, amount, icon, colorClass }) => (
    <div className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4">
        <div className={`p-3 rounded-full ${colorClass}`}>{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-xl font-bold text-gray-800">{amount}</p>
        </div>
    </div>
);
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative mx-4">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"><CloseIcon size={24} /></button>
                <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
                {children}
            </div>
        </div>
    );
};

// --- Main Agent Dashboard Component ---
export default function AgentDashboard() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isCashInModalOpen, setCashInModalOpen] = useState(false);
    const [isCashOutModalOpen, setCashOutModalOpen] = useState(false);
    const [mainTab, setMainTab] = useState('transactions');
    const [filterType, setFilterType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    const filteredTransactions = useMemo(() => agentTransactions.filter(t => filterType ? t.type === filterType : true), [filterType]);
    const paginatedTransactions = useMemo(() => { const startIndex = (currentPage - 1) * ITEMS_PER_PAGE; return filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE); }, [filteredTransactions, currentPage]);
    const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <aside className={`w-72 bg-white border-r p-6 flex-col fixed inset-y-0 left-0 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex`}>
                <h1 className="text-3xl font-bold text-indigo-600 mb-8">nPay Agent</h1>
                <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">Core Actions</h2>
                <nav className="space-y-2 mb-8">
                    <button onClick={() => { setCashInModalOpen(true); setSidebarOpen(false); }} className="w-full flex items-center gap-3 p-3 rounded-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"><ArrowDown size={20} /> Add Money (Cash-in)</button>
                    <button onClick={() => { setCashOutModalOpen(true); setSidebarOpen(false); }} className="w-full flex items-center gap-3 p-3 rounded-lg font-medium text-gray-700 hover:bg-red-50 hover:text-red-600"><ArrowUp size={20} /> Withdraw (Cash-out)</button>
                </nav>
                <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">History</h2>
                <nav className="space-y-2">
                    <button onClick={() => { setMainTab('transactions'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium ${mainTab === 'transactions' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}><ListChecks size={20} /> Transaction Log</button>
                    <button onClick={() => { setMainTab('commissions'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium ${mainTab === 'commissions' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}><DollarSign size={20} /> Commission History</button>
                </nav>
                <div className="mt-auto"><a href="#" className="flex items-center gap-3 text-gray-600 hover:text-indigo-600 font-medium p-2"><User size={20}/> Agent Profile</a></div>
            </aside>

            {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>}

            <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center">
                        <button onClick={() => setSidebarOpen(true)} className="md:hidden mr-4 text-gray-600"><Menu size={24} /></button>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Agent Dashboard</h2>
                            <p className="text-sm text-gray-500 hidden sm:block">Welcome, Agent!</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                        <Bell className="text-gray-500 cursor-pointer" />
                        <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">AG</div>
                    </div>
                </header>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                    <div className="lg:col-span-1 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow-lg flex flex-col justify-center">
                        <h2 className="text-md opacity-80">Agent Float Balance</h2>
                        <p className="text-3xl sm:text-4xl font-bold mt-2">$55,230.00</p>
                    </div>
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard title="Today's Total Txns" amount="25" icon={<ListChecks size={20} className="text-blue-600"/>} colorClass="bg-blue-100"/>
                        <StatCard title="Today's Cash-in" amount="$15,500" icon={<ArrowDown size={20} className="text-green-600"/>} colorClass="bg-green-100"/>
                        <StatCard title="Today's Cash-out" amount="$8,200" icon={<ArrowUp size={20} className="text-red-600"/>} colorClass="bg-red-100"/>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
                    <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
                        <h3 className="font-semibold text-gray-800 mb-4">Daily Transactions (Last 7 Days)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={dailyTransactionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                <XAxis dataKey="day" tick={{fontSize: 12}}/>
                                <YAxis tick={{fontSize: 12}}/>
                                <Tooltip cursor={{fill: 'rgba(239, 246, 255, 0.7)'}}/>
                                <Legend iconType="circle" iconSize={10}/>
                                <Bar dataKey="cashIn" fill="#22c55e" name="Cash-in" radius={[4, 4, 0, 0]}/>
                                <Bar dataKey="cashOut" fill="#ef4444" name="Cash-out" radius={[4, 4, 0, 0]}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                        <h3 className="font-semibold text-gray-800 mb-4">Commission Trend (Last 7 Days)</h3>
                         <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={commissionTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="commissionGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                <XAxis dataKey="day" tick={{fontSize: 12}}/>
                                <YAxis tick={{fontSize: 12}}/>
                                <Tooltip/>
                                <Area type="monotone" dataKey="commission" stroke="#6366f1" strokeWidth={2} fill="url(#commissionGradient)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
                    <div className="flex border-b mb-4">
                        <button onClick={() => setMainTab('transactions')} className={`py-2 px-4 font-semibold ${mainTab === 'transactions' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}>Transaction Log</button>
                        <button onClick={() => setMainTab('commissions')} className={`py-2 px-4 font-semibold ${mainTab === 'commissions' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}>Commission History</button>
                    </div>
                    {mainTab === 'transactions' && (
                        <div>
                            <div className="flex flex-wrap gap-4 items-center mb-4 p-2 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Filter size={16} className="text-gray-500"/>
                                    <select value={filterType} onChange={e => {setFilterType(e.target.value); setCurrentPage(1);}} className="text-sm border-gray-300 rounded-md">
                                        <option value="">All Types</option>
                                        <option value="Cash-in">Cash-in</option>
                                        <option value="Cash-out">Cash-out</option>
                                    </select>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm min-w-[700px]">
                                    <thead className="text-left text-gray-500"><tr className="border-b"><th className="p-3">Txn ID</th><th className="p-3">User Account</th><th className="p-3">Type</th><th className="p-3">Date</th><th className="p-3 text-right">Amount</th><th className="p-3 text-right">Commission</th></tr></thead>
                                    <tbody>
                                        {paginatedTransactions.map(t => (
                                            <tr key={t.id} className="border-b hover:bg-gray-50">
                                                <td className="p-3 font-mono text-xs">{t.id}</td>
                                                <td className="p-3 font-medium">{t.userAccount}</td>
                                                <td className="p-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${t.type === 'Cash-in' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{t.type}</span></td>
                                                <td className="p-3 text-gray-600">{t.date}</td>
                                                <td className="p-3 text-right font-semibold text-gray-800">${t.amount.toFixed(2)}</td>
                                                <td className="p-3 text-right font-bold text-green-600">+${t.commission.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
                                <span className="text-sm text-gray-600">Showing {paginatedTransactions.length} of {filteredTransactions.length} results</span>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"><ChevronLeft size={16}/></button>
                                    <span className="text-sm font-medium">Page {currentPage} of {totalPages || 1}</span>
                                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0} className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"><ChevronRight size={16}/></button>
                                </div>
                            </div>
                        </div>
                    )}
                    {mainTab === 'commissions' && (
                         <div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm min-w-[600px]">
                                    <thead className="text-left text-gray-500"><tr className="border-b"><th className="p-3">Txn ID</th><th className="p-3">Date</th><th className="p-3">Type</th><th className="p-3 text-right">Txn Amount</th><th className="p-3 text-right">Commission Earned</th></tr></thead>
                                    <tbody>
                                        {commissionHistory.map(c => (
                                            <tr key={c.id} className="border-b hover:bg-gray-50">
                                                <td className="p-3 font-mono text-xs">{c.id}</td>
                                                <td className="p-3 text-gray-600">{c.date}</td>
                                                <td className="p-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${c.type === 'Cash-in' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{c.type}</span></td>
                                                <td className="p-3 text-right font-semibold text-gray-800">${c.transactionAmount.toFixed(2)}</td>
                                                <td className="p-3 text-right font-bold text-green-600">+${c.commission.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                 </div>
            </main>

            <Modal isOpen={isCashInModalOpen} onClose={() => setCashInModalOpen(false)} title="Add Money to User Wallet (Cash-in)">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">User's Account Number</label>
                        <input type="text" placeholder="Enter user's phone number" className="mt-1 block w-full border-gray-300 rounded-md p-2"/>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Amount to Add</label>
                        <input type="number" placeholder="$0.00" className="mt-1 block w-full border-gray-300 rounded-md p-2"/>
                    </div>
                    <button onClick={() => setCashInModalOpen(false)} className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700">Confirm Cash-in</button>
                </div>
            </Modal>
            <Modal isOpen={isCashOutModalOpen} onClose={() => setCashOutModalOpen(false)} title="Withdraw Money from User Wallet (Cash-out)">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">User's Account Number</label>
                        <input type="text" placeholder="Enter user's phone number" className="mt-1 block w-full border-gray-300 rounded-md p-2"/>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Amount to Withdraw</label>
                        <input type="number" placeholder="$0.00" className="mt-1 block w-full border-gray-300 rounded-md p-2"/>
                    </div>
                    <button onClick={() => setCashOutModalOpen(false)} className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700">Confirm Cash-out</button>
                </div>
            </Modal>
        </div>
    );
}