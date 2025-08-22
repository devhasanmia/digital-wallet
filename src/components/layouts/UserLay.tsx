import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Bell,
  User,
  Send,
  PlusCircle,
  Settings,
  HelpCircle,
  ArrowUp,
  ArrowDown,
  Target,
  Filter,
  Calendar,
  X as CloseIcon,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";

// --- Mock Data ---
const allTransactions = [
  {
    id: 1,
    name: "Agent Cash-in",
    type: "Deposit",
    amount: 5000.0,
    date: "2025-08-20",
  },
  {
    id: 2,
    name: "Groceries Store",
    type: "Payment",
    amount: -75.5,
    date: "2025-08-19",
  },
  {
    id: 3,
    name: "John Doe",
    type: "Send Money",
    amount: -200.0,
    date: "2025-08-19",
  },
  {
    id: 4,
    name: "Jane Smith",
    type: "Received",
    amount: 500.0,
    date: "2025-08-18",
  },
  {
    id: 5,
    name: "Utility Bill",
    type: "Payment",
    amount: -120.0,
    date: "2025-08-17",
  },
  {
    id: 6,
    name: "Agent Cash-out",
    type: "Withdraw",
    amount: -1000.0,
    date: "2025-08-16",
  },
  {
    id: 7,
    name: "Monthly Salary",
    type: "Received",
    amount: 2500.0,
    date: "2025-08-15",
  },
  {
    id: 8,
    name: "Online Shopping",
    type: "Payment",
    amount: -350.0,
    date: "2025-08-14",
  },
  {
    id: 9,
    name: "Friend's Cafe",
    type: "Payment",
    amount: -45.0,
    date: "2025-08-12",
  },
  {
    id: 10,
    name: "Agent Cash-in",
    type: "Deposit",
    amount: 2000.0,
    date: "2025-08-11",
  },
  {
    id: 11,
    name: "Mike Ross",
    type: "Send Money",
    amount: -150.0,
    date: "2025-08-10",
  },
  {
    id: 12,
    name: "Withdraw from Agent",
    type: "Withdraw",
    amount: -500.0,
    date: "2025-08-09",
  },
];
const recentPayees = [
  { name: "John Doe", avatar: "JD" },
  { name: "Jane Smith", avatar: "JS" },
  { name: "Mike Ross", avatar: "MR" },
  { name: "Harvey S.", avatar: "HS" },
  { name: "Louis Litt", avatar: "LL" },
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <CloseIcon size={24} />
        </button>
        <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---
export default function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDepositModalOpen, setDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [isSendMoneyModalOpen, setSendMoneyModalOpen] = useState(false);
  // State for filtering and pagination
  const [filterType, setFilterType] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const filteredTransactions = useMemo(() => {
    return allTransactions
      .filter((t) => (filterType ? t.type === filterType : true))
      .filter((t) =>
        dateRange.start ? new Date(t.date) >= new Date(dateRange.start) : true
      )
      .filter((t) =>
        dateRange.end ? new Date(t.date) <= new Date(dateRange.end) : true
      );
  }, [filterType, dateRange]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* --- MFS Sidebar for Mobile and Desktop --- */}
      <aside
        className={`w-72 bg-white border-r p-6 flex-col fixed inset-y-0 left-0 z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex`}
      >
        <h1 className="text-3xl font-bold text-indigo-600 mb-8">nPay</h1>

        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
          Actions
        </h2>
        <nav className="space-y-2 mb-8">
          <button
            onClick={() => {
              setSendMoneyModalOpen(true);
              setSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 p-3 rounded-lg font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Send size={20} /> Send Money
          </button>
          <button
            onClick={() => {
              setDepositModalOpen(true);
              setSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 p-3 rounded-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
          >
            <ArrowDown size={20} /> Deposit / Cash-in
          </button>
          <button
            onClick={() => {
              setWithdrawModalOpen(true);
              setSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 p-3 rounded-lg font-medium text-gray-700 hover:bg-red-50 hover:text-red-600"
          >
            <ArrowUp size={20} /> Withdraw / Cash-out
          </button>
        </nav>

        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
          Quick Pay
        </h2>
        <div className="space-y-3">
          {recentPayees.map((payee) => (
            <a
              href="#"
              key={payee.name}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                {payee.avatar}
              </div>
              <span className="font-medium text-gray-700">{payee.name}</span>
            </a>
          ))}
        </div>

        <div className="mt-auto space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 text-gray-600 hover:text-indigo-600 font-medium p-2"
          >
            <Settings size={20} /> Settings
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-gray-600 hover:text-indigo-600 font-medium p-2"
          >
            <HelpCircle size={20} /> Help & Support
          </a>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            {/* --- Sidebar Toggle Button for Mobile --- */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden mr-4 text-gray-600"
            >
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Overview
              </h2>
              <p className="text-sm text-gray-500 hidden sm:block">
                Welcome back, Admin!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <Bell className="text-gray-500 cursor-pointer" />
            <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* Wallet Balance & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow-lg flex flex-col justify-center">
            <h2 className="text-md opacity-80">Available Balance</h2>
            <p className="text-3xl sm:text-4xl font-bold mt-2">$24,562.00</p>
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Monthly Income"
              amount="$5,500.00"
              icon={<ArrowDown size={20} className="text-green-600" />}
              colorClass="bg-green-100"
            />
            <StatCard
              title="Monthly Expense"
              amount="$4,850.50"
              icon={<ArrowUp size={20} className="text-red-600" />}
              colorClass="bg-red-100"
            />
            <StatCard
              title="Saved This Month"
              amount="$649.50"
              icon={<Target size={20} className="text-amber-600" />}
              colorClass="bg-amber-100"
            />
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
          <h3 className="font-bold text-lg mb-4">Transaction History</h3>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 items-center mb-4 p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Types</option>
                <option value="Deposit">Deposit</option>
                <option value="Withdraw">Withdraw</option>
                <option value="Send Money">Send Money</option>
                <option value="Received">Received</option>
                <option value="Payment">Payment</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => {
                  setDateRange({ ...dateRange, start: e.target.value });
                  setCurrentPage(1);
                }}
                className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <span className="text-gray-500">-</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => {
                  setDateRange({ ...dateRange, end: e.target.value });
                  setCurrentPage(1);
                }}
                className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="text-left text-gray-500">
                <tr className="border-b">
                  <th className="p-3">Details</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((t) => (
                  <tr key={t.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{t.name}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          t.type === "Deposit" || t.type === "Received"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600">{t.date}</td>
                    <td
                      className={`p-3 text-right font-bold ${
                        t.amount > 0 ? "text-green-600" : "text-gray-800"
                      }`}
                    >
                      {t.amount > 0
                        ? `+ $${t.amount.toFixed(2)}`
                        : `- $${Math.abs(t.amount).toFixed(2)}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
            <span className="text-sm text-gray-600">
              Showing {paginatedTransactions.length} of{" "}
              {filteredTransactions.length} results
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- Modals --- */}
      <Modal
        isOpen={isSendMoneyModalOpen}
        onClose={() => setSendMoneyModalOpen(false)}
        title="Send Money"
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Recipient's Phone or Email
            </label>
            <input
              type="text"
              placeholder="Search by phone/email"
              className="mt-1 block w-full border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              placeholder="$0.00"
              className="mt-1 block w-full border-gray-300 rounded-md p-2"
            />
          </div>
          <button
            onClick={() => setSendMoneyModalOpen(false)}
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700"
          >
            Continue
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isDepositModalOpen}
        onClose={() => setDepositModalOpen(false)}
        title="Deposit Money (Agent Cash-in)"
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Agent Number
            </label>
            <input
              type="text"
              placeholder="Enter agent's number"
              className="mt-1 block w-full border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              placeholder="$0.00"
              className="mt-1 block w-full border-gray-300 rounded-md p-2"
            />
          </div>
          <button
            onClick={() => setDepositModalOpen(false)}
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700"
          >
            Confirm Deposit
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isWithdrawModalOpen}
        onClose={() => setWithdrawModalOpen(false)}
        title="Withdraw Money (Cash-out)"
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Agent Number
            </label>
            <input
              type="text"
              placeholder="Enter agent's number"
              className="mt-1 block w-full border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              placeholder="$0.00"
              className="mt-1 block w-full border-gray-300 rounded-md p-2"
            />
          </div>
          <button
            onClick={() => setWithdrawModalOpen(false)}
            className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700"
          >
            Confirm Withdraw
          </button>
        </div>
      </Modal>
    </div>
  );
}
