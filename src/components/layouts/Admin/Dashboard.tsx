import React, { useMemo } from "react";
import {
  Users,
  UserCheck,
  ListChecks,
  DollarSign,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import StatCard from "../../ui/StatCard";
import {
  useGetAllAgentsQuery,
  useGetAllTransactionsQuery,
  useGetAllUserQuery,
} from "../../../redux/features/admin/AdminApi";

const COLORS = ["#6366f1", "#34d399", "#f59e0b", "#ef4444", "#3b82f6"];

// helper → মাস বের করা
const getMonthName = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString("default", { month: "short" }); // যেমন "Jan", "Feb"
};

// helper → মাসভিত্তিক সংখ্যা তৈরি
const aggregateByMonth = (items: any[]) => {
  const map: Record<string, number> = {};
  items.forEach((item) => {
    if (!item?.createdAt) return;
    const month = getMonthName(item.createdAt);
    map[month] = (map[month] || 0) + 1;
  });

  // মাস সাজানো
  return Object.keys(map).map((month) => ({
    month,
    value: map[month],
  }));
};

const Dashboard: React.FC = () => {
  const { data: users } = useGetAllUserQuery("");
  const { data: agents } = useGetAllAgentsQuery("");
  const { data: transactions } = useGetAllTransactionsQuery("");

  // Volume হিসাব
  const totalVolume =
    transactions?.data?.reduce(
      (acc: number, txn: any) => acc + (txn.amount || 0),
      0
    ) || 0;

  // Transaction type অনুযায়ী Pie chart
  const pieData =
    transactions?.data?.reduce((acc: any[], txn: any) => {
      const existing = acc.find((item) => item.name === txn.type);
      if (existing) {
        existing.value += txn.amount || 0;
      } else {
        acc.push({ name: txn.type, value: txn.amount || 0 });
      }
      return acc;
    }, []) || [];

  // Growth data (users + agents একসাথে)
  const growthData = useMemo(() => {
    const userAgg = aggregateByMonth(users?.data || []);
    const agentAgg = aggregateByMonth(agents?.data || []);

    // merge দুইটা dataset
    const allMonths = Array.from(
      new Set([...userAgg.map((u) => u.month), ...agentAgg.map((a) => a.month)])
    );

    return allMonths.map((month) => {
      const u = userAgg.find((i) => i.month === month)?.value || 0;
      const a = agentAgg.find((i) => i.month === month)?.value || 0;
      return { month, users: u, agents: a };
    });
  }, [users, agents]);

  return (
    <div className="space-y-8">
      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={users?.data?.length || 0}
          icon={<Users size={24} />}
          gradientClass="bg-gradient-to-br from-indigo-500 to-indigo-700"
        />
        <StatCard
          title="Total Agents"
          value={agents?.data?.length || 0}
          icon={<UserCheck size={24} />}
          gradientClass="bg-gradient-to-br from-sky-500 to-sky-700"
        />
        <StatCard
          title="Total Transactions"
          value={transactions?.data?.length || 0}
          icon={<ListChecks size={24} />}
          gradientClass="bg-gradient-to-br from-amber-500 to-amber-600"
        />
        <StatCard
          title="Total Volume"
          value={`৳ ${totalVolume}`}
          icon={<DollarSign size={24} />}
          gradientClass="bg-gradient-to-br from-green-500 to-green-700"
        />
      </div>

      {/* --- Charts Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Growth Line Chart */}
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-md">
          <h3 className="font-bold text-lg text-gray-800 mb-4">
            User & Agent Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#6366f1"
                strokeWidth={3}
                name="Users"
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="agents"
                stroke="#34d399"
                strokeWidth={3}
                name="Agents"
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
          <h3 className="font-bold text-lg text-gray-800 mb-4">
            Transaction Volume (By Type)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => `${entry.name}: ৳${entry.value}`}
              >
                {pieData.map((_: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`৳${value}`, "Amount"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
