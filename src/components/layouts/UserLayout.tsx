import React, { useState, useMemo, useEffect, type JSX } from "react";
import Joyride, { STATUS } from 'react-joyride';
import {
  ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell,
} from "recharts";
import {
  Bell, Send, Settings, ArrowUp, ArrowDown, Filter, Calendar as CalendarIcon, Sun, Moon, DollarSign, Receipt, Download, Upload, CreditCard, FileText,
  Wallet,
  Wifi,
  Cpu
} from "lucide-react";
import BalanceCard from "../ui/BalanceCard";
import Header from "../ui/Header";
import { useProfileQuery, useWalletQuery } from "../../redux/features/auth/authApi";
import BalanceCardSkeleton from "../Skeleton/BalanceCardSkeleton";
import HeaderSkeleton from "../Skeleton/HeaderSkeleton";
import TransactionHistory from "../ui/TransactionsTable";
import QuickActions from "../ui/QuickActions";
import SendMoneyForm from "../ui/SendMoney";

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
type TransactionType = "Deposit" | "Payment" | "Send Money" | "Received" | "Withdraw";

const getTransactionIcon = (type: TransactionType | string) => {
  const iconMap: Record<TransactionType, JSX.Element> = {
    "Deposit": <Download size={20} className="text-cyan-600" />,
    "Payment": <Receipt size={20} className="text-orange-600" />,
    "Send Money": <Send size={20} className="text-rose-600" />,
    "Received": <DollarSign size={20} className="text-emerald-600" />,
    "Withdraw": <Upload size={20} className="text-red-600" />,
  };
  const colorMap: Record<TransactionType, string> = {
    "Deposit": "bg-cyan-100 dark:bg-cyan-900/50", "Payment": "bg-orange-100 dark:bg-orange-900/50",
    "Send Money": "bg-rose-100 dark:bg-rose-900/50", "Received": "bg-emerald-100 dark:bg-emerald-900/50",
    "Withdraw": "bg-red-100 dark:bg-red-900/50",
  };
  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[type as TransactionType] || 'bg-gray-100 dark:bg-gray-700'}`}>
      {iconMap[type as TransactionType] || <DollarSign size={20} className="text-gray-600" />}
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
            {expenseData.map((_entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
          </Pie>
          <Tooltip />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);



// --- Main Dashboard Component ---
export default function Dashboard() {
  const [isDarkMode, setDarkMode] = useState(false);

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

  const handleJoyrideCallback = (data: any) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setRunTour(false);
      localStorage.setItem('nPayTourCompleted', 'true');
    }
  };

  const restartTour = () => {
    setRunTour(false);
    setTimeout(() => {
      localStorage.removeItem('nPayTourCompleted');
      setRunTour(true);
    }, 300);
  };

  const { data: profile, isLoading: profileLoading } = useProfileQuery("");
  const username = profile?.data?.name;
  const { data: wallet, isLoading: walletLoading } = useWalletQuery("");
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
          {profileLoading ? (
            <HeaderSkeleton />
          ) : (
            <Header isDarkMode={isDarkMode} setDarkMode={setDarkMode} onRestartTour={restartTour} />
          )}
          {/* Balance Card */}
          {
            walletLoading ? (
              <BalanceCardSkeleton />
            ) : (
              <BalanceCard balance={wallet?.data?.balance} currency="৳" provider="Digital Wallet" watermark={username} />
            )
          }
          {/* Quick Actions */}
          <QuickActions show={["send"]} modals={{
            send: (
              <SendMoneyForm />
            )
          }} />
          <div id="charts-section" className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2"><SpendingChart /></div>
            <div className="lg:col-span-1"><ExpensePieChart /></div>
          </div>

          <TransactionHistory
            transactions={allTransactions}
          />
        </div>
      </div>
    </div>
  );
}