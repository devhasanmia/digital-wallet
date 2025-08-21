import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  SendHorizontal,
  Wallet,
  Landmark,
  Receipt,
  Smartphone,
  History,
  ArrowUpRight,
  ArrowDownLeft,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Search,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// ---------- Mock Types & Data ----------

type TxType = "send" | "cashin" | "cashout" | "paybill" | "mobileTopup";

type Tx = {
  id: string;
  type: TxType;
  counterpart: string;
  amount: number; // in BDT
  date: string; // ISO
  status: "success" | "failed" | "pending";
  direction: "in" | "out";
};

const txIcon = (type: TxType) => {
  switch (type) {
    case "send":
      return <SendHorizontal className="h-4 w-4" />;
    case "cashin":
      return <Wallet className="h-4 w-4" />;
    case "cashout":
      return <Landmark className="h-4 w-4" />;
    case "paybill":
      return <Receipt className="h-4 w-4" />;
    case "mobileTopup":
      return <Smartphone className="h-4 w-4" />;
    default:
      return <History className="h-4 w-4" />;
  }
};

const mockTransactions: Tx[] = [
  { id: "TXN-0001", type: "send", counterpart: "Rahim Uddin", amount: 750, date: "2025-08-17T10:24:00", status: "success", direction: "out" },
  { id: "TXN-0002", type: "cashin", counterpart: "Linked Bank", amount: 5000, date: "2025-08-17T12:40:00", status: "success", direction: "in" },
  { id: "TXN-0003", type: "paybill", counterpart: "DESCO", amount: 1800, date: "2025-08-18T08:05:00", status: "success", direction: "out" },
  { id: "TXN-0004", type: "mobileTopup", counterpart: "Grameenphone", amount: 200, date: "2025-08-18T21:19:00", status: "success", direction: "out" },
  { id: "TXN-0005", type: "cashout", counterpart: "Agent #9451", amount: 3000, date: "2025-08-19T13:55:00", status: "pending", direction: "out" },
  { id: "TXN-0006", type: "send", counterpart: "Farzana Akter", amount: 1200, date: "2025-08-20T09:12:00", status: "success", direction: "out" },
  { id: "TXN-0007", type: "cashin", counterpart: "Linked Bank", amount: 4000, date: "2025-08-20T16:42:00", status: "success", direction: "in" },
];

const chartData = [
  { name: "Mon", spend: 1200 },
  { name: "Tue", spend: 800 },
  { name: "Wed", spend: 2000 },
  { name: "Thu", spend: 650 },
  { name: "Fri", spend: 900 },
  { name: "Sat", spend: 2200 },
  { name: "Sun", spend: 700 },
];

// Utility
const bdt = (n: number) => n.toLocaleString("en-BD", { style: "currency", currency: "BDT", maximumFractionDigits: 0 });

export default function MFSDashboard() {
  const [transactions, setTransactions] = useState<Tx[]>(mockTransactions);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "in" | "out">("all");

  const totalIn = useMemo(() => transactions.filter(t => t.direction === "in" && t.status === "success").reduce((a, b) => a + b.amount, 0), [transactions]);
  const totalOut = useMemo(() => transactions.filter(t => t.direction === "out" && t.status === "success").reduce((a, b) => a + b.amount, 0), [transactions]);
  const balance = 12540 + totalIn - totalOut;

  const filtered = useMemo(() => {
    const byTab = transactions.filter(t => tab === "all" ? true : t.direction === tab);
    if (!search) return byTab;
    const q = search.toLowerCase();
    return byTab.filter(t =>
      t.id.toLowerCase().includes(q) ||
      t.counterpart.toLowerCase().includes(q) ||
      t.type.toLowerCase().includes(q)
    );
  }, [transactions, tab, search]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome back, Hasan 👋</h1>
          <p className="text-sm text-gray-500">Manage your money, faster than ever.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-2xl border bg-white dark:bg-gray-800 flex items-center gap-2">
            <QrCode className="h-4 w-4" /> My QR
          </button>
          <button className="px-4 py-2 rounded-2xl bg-blue-600 text-white flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> Quick Actions
          </button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InfoCard title="Total Balance" icon={<Wallet />} value={bdt(balance)} />
        <InfoCard title="Money In" icon={<ArrowDownLeft />} value={bdt(totalIn)} />
        <InfoCard title="Money Out" icon={<ArrowUpRight />} value={bdt(totalOut)} />
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 lg:col-span-2">
          <h2 className="font-semibold mb-2">Spending (last 7 days)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="spend" strokeWidth={2} dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
          <h2 className="font-semibold mb-2">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <ActionButton icon={<SendHorizontal className="h-4 w-4" />} label="Send Money" />
            <ActionButton icon={<Landmark className="h-4 w-4" />} label="Cash Out" />
            <ActionButton icon={<Wallet className="h-4 w-4" />} label="Add Money" />
            <ActionButton icon={<Receipt className="h-4 w-4" />} label="Pay Bill" />
            <ActionButton icon={<Smartphone className="h-4 w-4" />} label="Topup" />
            <ActionButton icon={<History className="h-4 w-4" />} label="History" />
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold flex items-center gap-2"><History className="h-5 w-5" /> Recent Transactions</h2>
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-3 py-2 rounded-xl border dark:bg-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button onClick={() => setTab("all")} className={`px-4 py-2 rounded-xl ${tab === "all" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}>All</button>
          <button onClick={() => setTab("in")} className={`px-4 py-2 rounded-xl ${tab === "in" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}>Money In</button>
          <button onClick={() => setTab("out")} className={`px-4 py-2 rounded-xl ${tab === "out" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}>Money Out</button>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filtered.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${t.direction === "in" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {t.direction === "in" ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                </div>
                <div>
                  <div className="font-medium">{t.counterpart}</div>
                  <div className="text-xs text-gray-500">{t.id}</div>
                </div>
              </div>
              <div className="flex-1 px-4 capitalize flex items-center gap-2">{txIcon(t.type)} {t.type}</div>
              <div className="w-28 font-medium">{bdt(t.amount)}</div>
              <div className="w-40 text-xs text-gray-500">{new Date(t.date).toLocaleString()}</div>
              <div className="w-24">
                {t.status === "success" && <span className="text-green-600 flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Success</span>}
                {t.status === "pending" && <span className="text-yellow-600">Pending</span>}
                {t.status === "failed" && <span className="text-red-600 flex items-center gap-1"><XCircle className="h-4 w-4" /> Failed</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, icon, value }: { title: string; icon: React.ReactNode; value: string }) {
  return (
    <motion.div whileHover={{ y: -2 }}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">{title}</span>
          {icon}
        </div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </motion.div>
  );
}

function ActionButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="h-24 rounded-2xl border bg-white dark:bg-gray-700 flex flex-col items-center justify-center gap-2">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
