import React, { useState, useMemo } from "react";
import {
    CheckCircle2,
    XCircle,
    Clock,
    Send,
    RefreshCw,
    ArrowUpRight,
    Search,
} from "lucide-react";
import { useGetAllTransactionsQuery } from "../../../redux/features/admin/AdminApi";

export type TransactionStatus = "success" | "failed" | "pending" | string;
export type TransactionType = "send_money" | "cashout" | "paybill" | string;

export interface Party {
    name?: string;
    phone?: string;
}

export interface Transaction {
    _id: string;
    type: TransactionType;
    amount: number;
    from?: Party;
    to?: Party;
    status: TransactionStatus;
    note?: string;
    createdAt: string;
}

const formatBDT = (amount: number): string =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);

const formatDateTime = (iso: string): string => {
    try {
        const d = new Date(iso);
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }).format(d);
    } catch {
        return iso;
    }
};

const StatusBadge: React.FC<{ status: TransactionStatus }> = ({ status }) => {
    const map: Record<
        string,
        { icon: React.ReactNode; text: string; cls: string }
    > = {
        success: {
            icon: <CheckCircle2 className="size-4" />,
            text: "Success",
            cls: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
        },
        failed: {
            icon: <XCircle className="size-4" />,
            text: "Failed",
            cls: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
        },
        pending: {
            icon: <Clock className="size-4" />,
            text: "Pending",
            cls: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
        },
    };

    const m =
        map[status] || {
            icon: <Clock className="size-4" />,
            text: status,
            cls: "bg-slate-50 text-slate-700 ring-1 ring-slate-200",
        };

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${m.cls}`}
        >
            {m.icon}
            {m.text}
        </span>
    );
};

const TypePill: React.FC<{ type: TransactionType }> = ({ type }) => {
    const map: Record<
        string,
        { icon: React.ReactNode; text: string; cls: string }
    > = {
        send_money: {
            icon: <Send className="size-4" />,
            text: "Send Money",
            cls: "bg-indigo-50 text-indigo-700 ring-indigo-200",
        },
        cashout: {
            icon: <ArrowUpRight className="size-4" />,
            text: "Cash Out",
            cls: "bg-cyan-50 text-cyan-700 ring-cyan-200",
        },
        paybill: {
            icon: <RefreshCw className="size-4" />,
            text: "Pay Bill",
            cls: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200",
        },
    };

    const m =
        map[type] || {
            icon: <RefreshCw className="size-4" />,
            text: type,
            cls: "bg-slate-50 text-slate-700 ring-slate-200",
        };

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ${m.cls}`}
        >
            {m.icon}
            {m.text}
        </span>
    );
};

// ---------------- Empty State ----------------
const EmptyState: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center py-16">
        <div className="size-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <RefreshCw className="size-7 opacity-70" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">
            No transactions found
        </h3>
        <p className="text-slate-500 mt-1">Try changing search or filter options.</p>
    </div>
);

const Row: React.FC<{ tx: Transaction }> = ({ tx }) => (
    <tr className="hover:bg-slate-50 transition-colors">
        <td className="px-4 py-3 whitespace-nowrap">
            <TypePill type={tx.type} />
        </td>
        <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">
            {formatBDT(tx.amount)}
        </td>
        <td className="px-4 py-3">
            <div className="leading-tight">
                <div className="font-medium text-slate-900">{tx.from?.name || "—"}</div>
                <div className="text-xs text-slate-500">{tx.from?.phone}</div>
            </div>
        </td>
        <td className="px-4 py-3">
            <div className="leading-tight">
                <div className="font-medium text-slate-900">{tx.to?.name || "—"}</div>
                <div className="text-xs text-slate-500">{tx.to?.phone}</div>
            </div>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
            <StatusBadge status={tx.status} />
        </td>
        <td className="px-4 py-3 max-w-[28ch] truncate" title={tx.note}>
            {tx.note}
        </td>
        <td className="px-4 py-3 whitespace-nowrap" title={tx.createdAt}>
            {formatDateTime(tx.createdAt)}
        </td>
    </tr>
);

const Card: React.FC<{ tx: Transaction }> = ({ tx }) => (
    <div className="rounded-2xl border border-slate-200 p-4 bg-white shadow-sm">
        <div className="flex items-center justify-between">
            <TypePill type={tx.type} />
            <StatusBadge status={tx.status} />
        </div>
        <div className="mt-3 text-2xl font-bold">{formatBDT(tx.amount)}</div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
                <div className="text-slate-500">From</div>
                <div className="font-medium text-slate-900">{tx.from?.name}</div>
                <div className="text-xs text-slate-500">{tx.from?.phone}</div>
            </div>
            <div>
                <div className="text-slate-500">To</div>
                <div className="font-medium text-slate-900">{tx.to?.name}</div>
                <div className="text-xs text-slate-500">{tx.to?.phone}</div>
            </div>
        </div>
        <div className="mt-3 text-sm text-slate-700" title={tx.note}>
            {tx.note}
        </div>
        <div className="mt-2 text-xs text-slate-500">
            {formatDateTime(tx.createdAt)}
        </div>
    </div>
);

const AllTransaction: React.FC = () => {
    const { data, isLoading } = useGetAllTransactionsQuery("");
    const transactions: Transaction[] = data?.data || [];

    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState<TransactionType | "all">("all");
    const [filterStatus, setFilterStatus] = useState<TransactionStatus | "all">(
        "all"
    );

    // Filtering + Searching
    const filteredTx = useMemo(() => {
        return transactions.filter((tx) => {
            const matchesSearch =
                tx.from?.name?.toLowerCase().includes(search.toLowerCase()) ||
                tx.to?.name?.toLowerCase().includes(search.toLowerCase()) ||
                tx.from?.phone?.includes(search) ||
                tx.to?.phone?.includes(search) ||
                tx.note?.toLowerCase().includes(search.toLowerCase());

            const matchesType = filterType === "all" || tx.type === filterType;
            const matchesStatus = filterStatus === "all" || tx.status === filterStatus;

            return matchesSearch && matchesType && matchesStatus;
        });
    }, [transactions, search, filterType, filterStatus]);

    return (
        <div className="p-4 md:p-6">
            {/* Header with search + filters */}
            <div className="mb-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                    All Transactions
                </h2>
                <div className="flex flex-col md:flex-row gap-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 size-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search name, phone, note..."
                            className="pl-8 pr-3 py-2 border border-slate-300 rounded-lg text-sm w-64 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    {/* Type Filter */}
                    <select
                        className="border border-slate-300 rounded-lg text-sm px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                        value={filterType}
                        onChange={(e) =>
                            setFilterType(e.target.value as TransactionType | "all")
                        }
                    >
                        <option value="all">All Types</option>
                        <option value="send_money">Send Money</option>
                        <option value="cashout">Cash Out</option>
                        <option value="paybill">Pay Bill</option>
                    </select>
                    {/* Status Filter */}
                    <select
                        className="border border-slate-300 rounded-lg text-sm px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                        value={filterStatus}
                        onChange={(e) =>
                            setFilterStatus(e.target.value as TransactionStatus | "all")
                        }
                    >
                        <option value="all">All Status</option>
                        <option value="success">Success</option>
                        <option value="failed">Failed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
            </div>

            {/* Loader */}
            {isLoading && (
                <div className="text-center text-slate-500 py-10">Loading...</div>
            )}

            {/* Mobile cards */}
            <div className="grid gap-3 md:hidden">
                {filteredTx.length === 0 && !isLoading && <EmptyState />}
                {filteredTx.map((tx) => (
                    <Card key={tx._id} tx={tx} />
                ))}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold">Type</th>
                                <th className="px-4 py-3 text-left font-semibold">Amount</th>
                                <th className="px-4 py-3 text-left font-semibold">From</th>
                                <th className="px-4 py-3 text-left font-semibold">To</th>
                                <th className="px-4 py-3 text-left font-semibold">Status</th>
                                <th className="px-4 py-3 text-left font-semibold">Note</th>
                                <th className="px-4 py-3 text-left font-semibold">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredTx.length === 0 && !isLoading ? (
                                <tr>
                                    <td colSpan={7}>
                                        <EmptyState />
                                    </td>
                                </tr>
                            ) : (
                                filteredTx.map((tx) => <Row key={tx._id} tx={tx} />)
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllTransaction;
