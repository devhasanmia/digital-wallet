import React, { useMemo, useState } from "react";
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
  Bell,
  Home,
  TicketPercent,
  User,
  Fingerprint,
  LockKeyhole,
  ChevronRight,
  Check,
  X,
  Search,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SpendingChart from "../ui/SpendingChart";

// ---------- Types ----------

type Tab = "home" | "transactions" | "send" | "offers" | "profile";

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
const chartData = [
  { name: "Mon", spend: 120 },
  { name: "Tue", spend: 180 },
  { name: "Wed", spend: 75 },
  { name: "Thu", spend: 200 },
  { name: "Fri", spend: 150 },
  { name: "Sat", spend: 90 },
  { name: "Sun", spend: 220 },
];
// ---------- Mock Data ----------

const mockTransactions: Tx[] = [
  {
    id: "TXN-0001",
    type: "send",
    counterpart: "Rahim Uddin",
    amount: 750,
    date: "2025-08-17T10:24:00",
    status: "success",
    direction: "out",
  },
  {
    id: "TXN-0002",
    type: "cashin",
    counterpart: "Linked Bank",
    amount: 5000,
    date: "2025-08-17T12:40:00",
    status: "success",
    direction: "in",
  },
  {
    id: "TXN-0003",
    type: "paybill",
    counterpart: "DESCO",
    amount: 1800,
    date: "2025-08-18T08:05:00",
    status: "success",
    direction: "out",
  },
  {
    id: "TXN-0004",
    type: "mobileTopup",
    counterpart: "Grameenphone",
    amount: 200,
    date: "2025-08-18T21:19:00",
    status: "success",
    direction: "out",
  },
  {
    id: "TXN-0005",
    type: "cashout",
    counterpart: "Agent #9451",
    amount: 3000,
    date: "2025-08-19T13:55:00",
    status: "pending",
    direction: "out",
  },
  {
    id: "TXN-0006",
    type: "send",
    counterpart: "Farzana Akter",
    amount: 1200,
    date: "2025-08-20T09:12:00",
    status: "success",
    direction: "out",
  },
  {
    id: "TXN-0007",
    type: "cashin",
    counterpart: "Linked Bank",
    amount: 4000,
    date: "2025-08-20T16:42:00",
    status: "success",
    direction: "in",
  },
];



const contacts = [
  { id: "c1", name: "Rahim Uddin", phone: "+880170000001" },
  { id: "c2", name: "Farzana Akter", phone: "+880170000002" },
  { id: "c3", name: "Sajid Hasan", phone: "+880170000003" },
  { id: "c4", name: "Nusrat Jahan", phone: "+880170000004" },
];

// ---------- Utils ----------

const bdt = (n: number) =>
  n.toLocaleString("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  });

function classNames(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(" ");
}

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

function groupByDate(tx: Tx[]) {
  const groups: Record<string, Tx[]> = {};
  tx.forEach((t) => {
    const d = new Date(t.date);
    const key = d.toDateString();
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
  });
  return Object.entries(groups)
    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
    .map(([date, list]) => ({ date, list }));
}

// ---------- Root App ----------

export default function MFSApp() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("home");
  const [transactions, setTransactions] = useState<Tx[]>(mockTransactions);
const chartData = [
  { name: "Mon", spend: 1200 },
  { name: "Tue", spend: 800 },
  { name: "Wed", spend: 2000 },
  { name: "Thu", spend: 650 },
  { name: "Fri", spend: 900 },
  { name: "Sat", spend: 2200 },
  { name: "Sun", spend: 700 },
];
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Top App Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white grid place-items-center font-bold shadow-md">MF</div>
            <span className="font-semibold tracking-tight">MFS</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
              <QrCode className="h-4 w-4" /> My QR
            </button>
            <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md">
              <ShieldCheck className="h-4 w-4" /> Secure
            </button>
            <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 pb-28">
        {!authed ? (
          <LoginScreen onLogin={() => setAuthed(true)} />
        ) : tab === "home" ? (
          <DashboardScreen transactions={transactions} />
        ) : tab === "transactions" ? (
          <TransactionsScreen transactions={transactions} />
        ) : tab === "send" ? (
          <SendMoneyFlow onAddTx={(t) => setTransactions((prev) => [t, ...prev])} />
        ) : tab === "offers" ? (
          <OffersScreen />
        ) : (
          <ProfileScreen />
        )}
      </main>

      {/* Bottom Nav */}
      {authed && <BottomNav tab={tab} onChange={setTab} />}
    </div>
  );
}



function DashboardScreen({ transactions }: { transactions: Tx[] }) {
  const totalIn = useMemo(
    () =>
      transactions
        .filter((t) => t.direction === "in" && t.status === "success")
        .reduce((a, b) => a + b.amount, 0),
    [transactions]
  );
  const totalOut = useMemo(
    () =>
      transactions
        .filter((t) => t.direction === "out" && t.status === "success")
        .reduce((a, b) => a + b.amount, 0),
    [transactions]
  );
  const balance = 12540 + totalIn - totalOut;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome back, Hasan 👋</h2>
          <p className="text-sm text-slate-500">Manage your money, faster than ever.</p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button className="px-4 py-2 rounded-2xl border bg-white dark:bg-slate-900 flex items-center gap-2 shadow-sm">
            <QrCode className="h-4 w-4" /> My QR
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center gap-2 shadow-md"
          >
            <ShieldCheck className="h-4 w-4" /> Quick Actions
          </motion.button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoCard title="Total Balance" icon={<Wallet />} value={bdt(balance)} highlight />
        {/* <InfoCard title="Money In" icon={<ArrowDownLeft />} value={bdt(totalIn)} /> */}
        {/* <InfoCard title="Money Out" icon={<ArrowUpRight />} value={bdt(totalOut)} /> */}
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* <div className="rounded-3xl p-4 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur shadow-sm lg:col-span-2">
          <h3 className="font-semibold mb-2">Spending (last 7 days)</h3>
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
        </div> */}
        <SpendingChart chartData={chartData}/>

        <div className="rounded-3xl p-4 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur shadow-sm">
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
            <ActionButton icon={<SendHorizontal className="h-4 w-4" />} label="Send Money" />
            <ActionButton icon={<Landmark className="h-4 w-4" />} label="Cash Out" />
            <ActionButton icon={<Wallet className="h-4 w-4" />} label="Add Money" />
            <ActionButton icon={<Receipt className="h-4 w-4" />} label="Pay Bill" />
            <ActionButton icon={<Smartphone className="h-4 w-4" />} label="Topup" />
            <ActionButton icon={<History className="h-4 w-4" />} label="History" />
          </div>
        </div>
      </div>

      {/* Recent Transactions (compact) */}
      <div className="rounded-3xl p-4 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <History className="h-5 w-5" /> Recent Transactions
          </h3>
          <a className="text-sm text-indigo-600 hover:underline inline-flex items-center gap-1" href="#">
            View all <ChevronRight className="h-4 w-4" />
          </a>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {transactions.slice(0, 5).map((t) => (
            <TxRow key={t.id} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TransactionsScreen({ transactions }: { transactions: Tx[] }) {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "in" | "out">("all");

  const filtered = useMemo(() => {
    const byTab = transactions.filter((t) => (tab === "all" ? true : t.direction === tab));
    if (!search) return byTab;
    const q = search.toLowerCase();
    return byTab.filter(
      (t) => t.id.toLowerCase().includes(q) || t.counterpart.toLowerCase().includes(q) || t.type.toLowerCase().includes(q)
    );
  }, [transactions, tab, search]);

  const groups = useMemo(() => groupByDate(filtered), [filtered]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Transaction History</h2>
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, id, type..."
            className="pl-9 pr-3 py-2 rounded-2xl border dark:bg-slate-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Chip active={tab === "all"} onClick={() => setTab("all")}>All</Chip>
        <Chip active={tab === "in"} onClick={() => setTab("in")}>Money In</Chip>
        <Chip active={tab === "out"} onClick={() => setTab("out")}>Money Out</Chip>
      </div>

      <div className="rounded-3xl p-4 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur shadow-sm">
        {groups.map(({ date, list }) => (
          <div key={date} className="mb-4">
            <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">{date}</div>
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {list.map((t) => (
                <TxRow key={t.id} t={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SendMoneyFlow({ onAddTx }: { onAddTx: (t: Tx) => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selected, setSelected] = useState<{ id: string; name: string; phone: string } | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState<string>("");

  function submit() {
    const amt = Number(amount || 0);
    const tx: Tx = {
      id: `TXN-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      type: "send",
      counterpart: selected?.name || "Unknown",
      amount: amt,
      date: new Date().toISOString(),
      status: "success",
      direction: "out",
    };
    onAddTx(tx);
    setStep(3);
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <StepDot label="Contact" active={step >= 1} done={step > 1} />
        <div className="h-0.5 w-12 bg-slate-200 dark:bg-slate-700" />
        <StepDot label="Amount" active={step >= 2} done={step > 2} />
        <div className="h-0.5 w-12 bg-slate-200 dark:bg-slate-700" />
        <StepDot label="Confirm" active={step >= 3} done={false} />
      </div>

      {step === 1 && (
        <div className="rounded-3xl p-4 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur shadow-sm">
          <h3 className="font-semibold mb-3">Select Contact</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {contacts.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelected(c);
                  setStep(2);
                }}
                className={classNames(
                  "p-4 rounded-2xl border text-left hover:border-indigo-400 hover:shadow",
                  selected?.id === c.id && "border-indigo-500 shadow-md"
                )}
              >
                <div className="font-medium">{c.name}</div>
                <div className="text-sm text-slate-500">{c.phone}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="rounded-3xl p-4 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur shadow-sm">
          <h3 className="font-semibold mb-3">Enter Amount</h3>
          <div className="grid gap-3">
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-300">To</label>
              <div className="mt-1 px-4 py-3 rounded-2xl border bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                <span className="font-medium">{selected?.name}</span>
                <span className="text-sm text-slate-500">{selected?.phone}</span>
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-300">Amount (BDT)</label>
              <input
                inputMode="numeric"
                className="mt-1 w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:bg-slate-900"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
              />
            </div>
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-300">Note (optional)</label>
              <input
                className="mt-1 w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:bg-slate-900"
                placeholder="What's this for?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-end gap-2 mt-2">
              <button className="px-4 py-2 rounded-2xl border" onClick={() => setStep(1)}>
                Back
              </button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-2xl text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md disabled:opacity-50"
                disabled={!selected || !amount}
                onClick={() => setStep(3)}
              >
                Review
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="rounded-3xl p-4 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur shadow-sm">
          <h3 className="font-semibold mb-3">Confirm & Send</h3>
          <div className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">To</span>
              <span className="font-medium">{selected?.name}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-slate-600">Amount</span>
              <span className="font-semibold">{bdt(Number(amount || 0))}</span>
            </div>
            {note && (
              <div className="flex items-center justify-between mt-2">
                <span className="text-slate-600">Note</span>
                <span className="text-slate-700">{note}</span>
              </div>
            )}
            <div className="flex items-center justify-between mt-2">
              <span className="text-slate-600">Fee</span>
              <span className="text-slate-700">BDT 0</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 mt-4">
            <button className="px-4 py-2 rounded-2xl border" onClick={() => setStep(2)}>
              Back
            </button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 rounded-2xl text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md disabled:opacity-50"
              disabled={!selected || !amount}
              onClick={submit}
            >
              Send
            </motion.button>
          </div>

          {/* Success State */}
          <div className="mt-6 text-center">
            <div className="h-16 w-16 rounded-full mx-auto grid place-items-center bg-green-100 text-green-600">
              <Check className="h-8 w-8" />
            </div>
            <h4 className="mt-3 text-lg font-semibold">Transfer Successful</h4>
            <p className="text-slate-500 text-sm">Your money has been sent instantly.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function OffersScreen() {
  const items = [
    {
      id: "o1",
      title: "5% Cashback on DESCO bills",
      desc: "Pay electricity bills via MFS and enjoy instant cashback.",
    },
    {
      id: "o2",
      title: "Free Mobile Topup Fee",
      desc: "No extra charges on all topups this week.",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((o) => (
        <motion.div
          key={o.id}
          whileHover={{ y: -2 }}
          className="rounded-3xl p-5 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white grid place-items-center shadow">
              <TicketPercent className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold">{o.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{o.desc}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="max-w-xl">
      <div className="rounded-3xl p-5 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white grid place-items-center font-semibold">
            H
          </div>
          <div>
            <div className="font-semibold">MD. HASAN MIA</div>
            <div className="text-sm text-slate-500">+8801XXXXXXXXX</div>
          </div>
        </div>
        <div className="mt-4 grid gap-2">
          <Row label="Security" value="2FA enabled" />
          <Row label="Limits" value="BDT 50,000/day" />
          <Row label="App Version" value="1.0.0" />
        </div>
      </div>
    </div>
  );
}

// ---------- Components ----------

function InfoCard({
  title,
  icon,
  value,
  highlight = false,
}: {
  title: string;
  icon: React.ReactNode;
  value: string;
  highlight?: boolean;
}) {
  return (
    <motion.div whileHover={{ y: -2 }}>
      <div
        className={classNames(
          "rounded-3xl p-4 border backdrop-blur shadow-sm",
          highlight
            ? "bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border-indigo-200/50"
            : "bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800"
        )}
      >
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
    <motion.button
      whileTap={{ scale: 0.96 }}
      className="h-28 rounded-2xl border bg-white/90 dark:bg-slate-900/90 flex flex-col items-center justify-center gap-2 shadow-sm"
    >
      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
  );
}

function TxRow({ t }: { t: Tx }) {
  return (
    <div className="flex items-center justify-between py-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 rounded-xl px-2">
      <div className="flex items-center gap-3">
        <div
          className={classNames(
            "h-9 w-9 rounded-xl grid place-items-center",
            t.direction === "in" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          )}
        >
          {t.direction === "in" ? (
            <ArrowDownLeft className="h-4 w-4" />
          ) : (
            <ArrowUpRight className="h-4 w-4" />
          )}
        </div>
        <div>
          <div className="font-medium">{t.counterpart}</div>
          <div className="text-xs text-slate-500">{t.id}</div>
        </div>
      </div>
      <div className="flex-1 px-4 capitalize flex items-center gap-2 text-slate-600 dark:text-slate-300">
        {txIcon(t.type)} {t.type}
      </div>
      <div className="w-28 font-medium">{bdt(t.amount)}</div>
      <div className="w-40 text-xs text-slate-500">{new Date(t.date).toLocaleString()}</div>
      <div className="w-24">
        {t.status === "success" && (
          <StatusChip color="green" icon={<CheckCircle2 className="h-4 w-4" />} label="Success" />
        )}
        {t.status === "pending" && <StatusChip color="yellow" label="Pending" />}
        {t.status === "failed" && (
          <StatusChip color="red" icon={<XCircle className="h-4 w-4" />} label="Failed" />
        )}
      </div>
    </div>
  );
}

function StatusChip({
  color,
  label,
  icon,
}: {
  color: "green" | "red" | "yellow";
  label: string;
  icon?: React.ReactNode;
}) {
  const map = {
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-700",
  } as const;
  return (
    <span className={classNames("px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1", map[color])}>
      {icon}
      {label}
    </span>
  );
}

function Chip({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "px-4 py-2 rounded-2xl text-sm border",
        active
          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow"
          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
      )}
    >
      {children}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0 border-slate-200 dark:border-slate-800">
      <span className="text-slate-600 dark:text-slate-300">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function StepDot({ label, active, done }: { label: string; active?: boolean; done?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={
          done
            ? "h-6 w-6 rounded-full bg-green-500 text-white grid place-items-center"
            : active
            ? "h-6 w-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white grid place-items-center"
            : "h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700"
        }
      >
        {done ? <Check className="h-4 w-4" /> : <span className="text-[10px]">•</span>}
      </div>
      <span className="text-xs text-slate-600 dark:text-slate-300">{label}</span>
    </div>
  );
}

function BottomNav({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  const item = (key: Tab, label: string, Icon: React.ComponentType<any>) => {
    const active = tab === key;
    return (
      <button
        key={key}
        onClick={() => onChange(key)}
        className={classNames(
          "flex-1 py-2 rounded-2xl inline-flex flex-col items-center gap-1",
          active ? "text-indigo-600" : "text-slate-500"
        )}
        aria-current={active ? "page" : undefined}
      >
        <Icon className="h-5 w-5" />
        <span className="text-xs">{label}</span>
      </button>
    );
  };

  return (
    <nav className="fixed bottom-4 left-0 right-0 max-w-3xl mx-auto px-3">
      <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl px-2 py-2 flex items-center gap-1 backdrop-blur-xl">
        {item("home", "Home", Home)}
        {item("transactions", "History", History)}
        <div className="-mt-8">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange("send")}
            className="h-14 w-14 rounded-2xl grid place-items-center text-white bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-xl border-4 border-white dark:border-slate-900"
            aria-label="Send Money"
          >
            <SendHorizontal className="h-6 w-6" />
          </motion.button>
        </div>
        {item("offers", "Offers", TicketPercent)}
        {item("profile", "Profile", User)}
      </div>
    </nav>
  );
}
