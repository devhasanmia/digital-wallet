import React, { useState, useEffect } from "react";
import Joyride, { STATUS } from "react-joyride";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import BalanceCard from "../ui/BalanceCard";
import Header from "../ui/Header";
import { useGetMytransactionsQuery, useProfileQuery, useWalletQuery } from "../../redux/features/auth/authApi";
import BalanceCardSkeleton from "../Skeleton/BalanceCardSkeleton";
import HeaderSkeleton from "../Skeleton/HeaderSkeleton";
import TransactionHistory from "../ui/TransactionsTable";
import QuickActions from "../ui/QuickActions";
import SendMoneyForm from "../ui/SendMoney";
import WithdrawForm from "../ui/WithdrawForm";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

export default function Dashboard() {
  const [isDarkMode, setDarkMode] = useState(false);
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("nPayTourCompleted")) setRunTour(true);
  }, []);

  const handleJoyrideCallback = (data: any) => {
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
      setRunTour(false);
      localStorage.setItem("nPayTourCompleted", "true");
    }
  };

  const restartTour = () => {
    setRunTour(false);
    setTimeout(() => {
      localStorage.removeItem("nPayTourCompleted");
      setRunTour(true);
    }, 300);
  };

  const { data: profile, isLoading: profileLoading } = useProfileQuery("");
  const username = profile?.data?.name || "";
  const { data: wallet, isLoading: walletLoading } = useWalletQuery("");
  const { data: transactions } = useGetMytransactionsQuery("");

  // --- Weekly Chart Data ---
  const weeklyChartData = React.useMemo(() => {
    if (!transactions?.data) return [];
    const data: Record<string, { income: number; expense: number }> = {};

    transactions.data.forEach((tx: any) => {
      const date = new Date(tx.createdAt).toLocaleDateString("en-US", { weekday: "short" });
      if (!data[date]) data[date] = { income: 0, expense: 0 };

      // Define outgoing types
      const outgoingTypes = ["send_money", "withdraw", "cash_out"];
      const incomingTypes = ["cash_in", "add-money"];

      if (outgoingTypes.includes(tx.type)) {
        data[date].expense += tx.amount;
      } else if (incomingTypes.includes(tx.type)) {
        data[date].income += tx.amount;
      }
    });

    return Object.entries(data).map(([day, val]) => ({ name: day, ...val }));
  }, [transactions]);

  // --- Expense Pie Data ---
  const expenseData = React.useMemo(() => {
    if (!transactions?.data) return [];

    const categories: Record<string, number> = {};

    const outgoingTypes = ["send_money", "withdraw", "cash_out"];

    transactions.data.forEach((tx: any) => {
      if (outgoingTypes.includes(tx.type)) {
        const category = tx.type.replace("_", " ");
        categories[category] = (categories[category] || 0) + tx.amount;
      }
    });

    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [transactions]);


  return (
    <div className={isDarkMode ? "dark" : ""}>
      <Joyride
        run={runTour}
        steps={[
          { target: "body", content: "Welcome to nPay!", placement: "center" },
          { target: "#balance-card", content: "Your balance overview" },
          { target: "#quick-actions", content: "Quick actions" },
          { target: "#charts-section", content: "Income & Expenses charts" },
          { target: "#transaction-filters", content: "Transaction filters" },
        ]}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{ options: { primaryColor: "#4f46e5", zIndex: 1000 } }}
      />

      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
          {/* Header */}
          {profileLoading ? (
            <HeaderSkeleton />
          ) : (
            <Header isDarkMode={isDarkMode} setDarkMode={setDarkMode} onRestartTour={restartTour} />
          )}

          {/* Balance Card */}
          {walletLoading ? (
            <BalanceCardSkeleton />
          ) : (
            <BalanceCard balance={wallet?.data?.balance} currency="৳" provider="Digital Wallet" watermark={username} />
          )}

          {/* Quick Actions */}
          <QuickActions show={["send", "withdraw"]} modals={{ send: <SendMoneyForm />, withdraw: <WithdrawForm /> }} />

          {/* Charts */}
          <div id="charts-section" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Weekly Spending Bar */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-72">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 text-sm sm:text-base">Weekly Spending</h3>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={weeklyChartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                  <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "0.75rem" }} />
                  <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={10} />
                  <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={10} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Expense Pie Chart */}
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 h-72">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 text-sm sm:text-base">Expense Breakdown</h3>
              <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    dataKey="value"
                    nameKey="name"
                    outerRadius={70}
                    innerRadius={40}
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {expenseData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `৳${value.toFixed(2)}`}
                    contentStyle={{ backgroundColor: "rgba(255,255,255,0.9)", border: "1px solid #ddd", color: "#000" }}
                  />
                  <Legend
                    iconSize={10}
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ fontSize: "0.75rem", color: "#6b7280" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>


          {/* Transaction History */}
          <TransactionHistory transactions={transactions?.data || []} currentUserName={username} />
        </div>
      </div>
    </div>
  );
}
