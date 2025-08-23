import React, { useState, useMemo, useEffect } from "react";
import Joyride, { STATUS } from 'react-joyride';
import {
    ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell,
} from "recharts";
import {
    Bell, Send, Settings, ArrowUp, ArrowDown, Filter, Calendar as CalendarIcon, Sun, Moon, DollarSign, Receipt, Download, Upload, CreditCard, FileText
} from "lucide-react";
import Header from "../ui/Header";

// --- Mock Data ---
const allTransactions = [
    { id: 1, name: "Agent Cash-in", type: "Deposit", amount: 5000.0, date: "2025-08-20" },
    { id: 2, name: "Groceries Store", type: "Payment", amount: -75.5, date: "2025-08-19" },
    { id: 3, name: "John Doe", type: "Send Money", amount: -200.0, date: "2025-08-19" },
    { id: 4, name: "Jane Smith", type: "Received", amount: 500.0, date: "2025-08-18" },
    { id: 5, name: "Utility Bill", type: "Payment", amount: -120.0, date: "2025-08-17" },
    { id: 6, name: "Agent Cash-out", type: "Withdraw", amount: -1000.0, date: "2025-08-16" },
    { id: 7, name: "Monthly Salary", type: "Received", amount: 2500.0, date: "2025-08-15" },
];
const weeklyChartData = [
    { name: "Sat", income: 200, expense: 150 }, { name: "Sun", income: 0, expense: 300 },
    { name: "Mon", income: 500, expense: 50 }, { name: "Tue", income: 0, expense: 420 },
    { name: "Wed", income: 100, expense: 80 }, { name: "Thu", income: 2500, expense: 600 },
    { name: "Fri", income: 50, expense: 220 },
];
const expenseData = [
    { name: "Groceries", value: 400 }, { name: "Bills", value: 300 },
    { name: "Shopping", value: 500 }, { name: "Transport", value: 200 },
    { name: "Entertainment", value: 150 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

// --- Helper Function ---
const getTransactionIcon = (type) => {
    const iconMap = {
        "Deposit": <Download size={20} className="text-cyan-600" />,
        "Payment": <Receipt size={20} className="text-orange-600" />,
        "Send Money": <Send size={20} className="text-rose-600" />,
        "Received": <DollarSign size={20} className="text-emerald-600" />,
        "Withdraw": <Upload size={20} className="text-red-600" />,
    };
    const colorMap = {
        "Deposit": "bg-cyan-100 dark:bg-cyan-900/50", "Payment": "bg-orange-100 dark:bg-orange-900/50",
        "Send Money": "bg-rose-100 dark:bg-rose-900/50", "Received": "bg-emerald-100 dark:bg-emerald-900/50",
        "Withdraw": "bg-red-100 dark:bg-red-900/50",
    };
    return (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[type] || 'bg-gray-100 dark:bg-gray-700'}`}>
            {iconMap[type] || <DollarSign size={20} className="text-gray-600" />}
        </div>
    );
};

const BalanceCard = () => (
    <div id="balance-card" className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow-lg flex flex-col justify-center mb-8">
        <h2 className="text-md opacity-80">Available Balance</h2>
        <p className="text-3xl sm:text-4xl font-bold mt-2">$24,562.00</p>
    </div>
);

const QuickActions = () => {
    const actions = [
        { icon: <Send size={24} />, label: "Send Money", color: "text-blue-500" },
        { icon: <Download size={24} />, label: "Cash-in", color: "text-green-500" },
        { icon: <Upload size={24} />, label: "Cash-out", color: "text-red-500" },
        { icon: <FileText size={24} />, label: "Pay Bill", color: "text-orange-500" },
        { icon: <CreditCard size={24} />, label: "Payment", color: "text-purple-500" },
    ];
    return (
        <div id="quick-actions" className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                {actions.map(action => (
                    <button key={action.label} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className={action.color}>{action.icon}</div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const SpendingChart = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-100">Weekly Spending</h3>
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                    <YAxis tick={{ fill: '#6b7280' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(5px)', border: '1px solid #ddd' }} />
                    <Legend />
                    <Bar dataKey="income" fill="#10b981" name="Income" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expense" fill="#ef4444" name="Expense" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

const ExpensePieChart = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-100">Expense Breakdown</h3>
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={expenseData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name">
                        {expenseData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                    </Pie>
                    <Tooltip />
                    <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </div>
);

const TransactionHistory = ({ transactions, filterType, setFilterType, dateRange, setDateRange, currentPage, setCurrentPage, totalPages, filteredLength }) => (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-100">Transaction History</h3>
        <div id="transaction-filters" className="flex flex-col sm:flex-row sm:flex-wrap gap-4 items-center mb-4 p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            {/* Filter Implementation Here */}
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
                <thead className="text-left text-gray-500 dark:text-gray-400">
                    <tr className="border-b dark:border-gray-700"><th className="p-3 font-semibold">Details</th><th className="p-3 font-semibold">Type</th><th className="p-3 font-semibold">Date</th><th className="p-3 font-semibold text-right">Amount</th></tr>
                </thead>
                <tbody>
                    {transactions.map((t) => (
                        <tr key={t.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <td className="p-3 font-medium text-gray-800 dark:text-gray-100 flex items-center gap-3">{getTransactionIcon(t.type)}<span>{t.name}</span></td>
                            <td className="p-3 text-gray-600 dark:text-gray-300">{t.type}</td>
                            <td className="p-3 text-gray-600 dark:text-gray-400">{t.date}</td>
                            <td className={`p-3 text-right font-bold ${t.amount > 0 ? "text-green-600 dark:text-green-400" : "text-gray-800 dark:text-gray-100"}`}>
                                {t.amount > 0 ? `+ $${t.amount.toFixed(2)}` : `- $${Math.abs(t.amount).toFixed(2)}`}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {/* Pagination Implementation Here */}
    </div>
);


// --- Main Dashboard Component ---
export default function Dashboard() {
    const [isDarkMode, setDarkMode] = useState(false);
    const [filterType, setFilterType] = useState("");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    // --- Joyride State and Steps ---
    const [runTour, setRunTour] = useState(false);

    const tourSteps = [
        { target: 'body', content: 'Welcome to nPay! Let us guide you through the key features.', placement: 'center' },
        { target: '#balance-card', content: 'Here you can see your total available balance at a glance.' },
        { target: '#quick-actions', content: 'Use these buttons for your most common tasks like sending money or paying bills.' },
        { target: '#charts-section', content: 'Visualize your income, expenses, and spending habits with these charts.' },
        { target: '#transaction-filters', content: 'Easily find specific transactions by filtering by type or date range.' },
        { target: '#theme-toggle', content: 'Switch between light and dark mode for your comfort.' },
    ];

    // --- Joyride Logic ---
    useEffect(() => {
        const tourHasBeenSeen = localStorage.getItem('nPayTourCompleted');
        if (!tourHasBeenSeen) {
            setRunTour(true);
        }
    }, []);

    const handleJoyrideCallback = (data) => {
        const { status } = data;
        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
        if (finishedStatuses.includes(status)) {
            setRunTour(false);
            localStorage.setItem('nPayTourCompleted', 'true');
        }
    };

    const restartTour = () => {
        // A trick to restart the tour: set run to false, then true in a timeout.
        // This ensures Joyride detects the state change.
        setRunTour(false);
        setTimeout(() => {
            localStorage.removeItem('nPayTourCompleted');
            setRunTour(true);
        }, 300);
    };

    // --- Memoized calculations for transactions ---
    const filteredTransactions = useMemo(() => {
        return allTransactions
            .filter((t) => (filterType ? t.type === filterType : true))
            .filter((t) => dateRange.start ? new Date(t.date) >= new Date(dateRange.start) : true)
            .filter((t) => dateRange.end ? new Date(t.date) <= new Date(dateRange.end) : true);
    }, [filterType, dateRange]);

    const paginatedTransactions = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredTransactions, currentPage]);

    const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <Joyride
                run={runTour}
                steps={tourSteps}
                continuous
                showProgress
                showSkipButton
                callback={handleJoyrideCallback}
                styles={{
                    options: {
                        primaryColor: '#4f46e5',
                        textColor: '#333',
                        arrowColor: '#fff',
                        backgroundColor: '#fff',
                        zIndex: 1000,
                    },
                    tooltip: { borderRadius: '0.5rem' },
                    buttonNext: { borderRadius: '0.375rem' },
                    buttonBack: { borderRadius: '0.375rem' },
                }}
            />

            <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans">
                <div className="max-w-7xl mx-auto p-4 sm:p-8">

                    <Header isDarkMode={isDarkMode} setDarkMode={setDarkMode} onRestartTour={restartTour} />
                    <BalanceCard />
                    <QuickActions />

                    <div id="charts-section" className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-2"><SpendingChart /></div>
                        <div className="lg:col-span-1"><ExpensePieChart /></div>
                    </div>

                    <TransactionHistory
                        transactions={paginatedTransactions}
                        filterType={filterType}
                        setFilterType={setFilterType}
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        filteredLength={filteredTransactions.length}
                    />
                </div>
            </div>
        </div>
    );
}