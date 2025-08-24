import React from "react";
import { DollarSign, Send, Download, Upload } from "lucide-react";
import type { JSX } from "react/jsx-runtime";

export type Transaction = {
  _id: string;
  type:
    | "send_money"
    | "deposit"
    | "withdraw"
    | "cash_in"
    | "cash_out"
    | "add-money";
  amount: number;
  from?: { name: string; phone: string } | null; // optional + nullable
  to?: { name: string; phone: string } | null;   // optional + nullable
  status: string;
  note?: string | null;
  createdAt: string;
};

type TransactionHistoryProps = {
  transactions: Transaction[];
  currentUserName: string;
};

// Icon helper
const getTransactionIcon = (type: string) => {
  const iconMap: Record<string, JSX.Element> = {
    send_money: <Send size={20} className="text-rose-500" />,
    withdraw: <Upload size={20} className="text-red-500" />,
    deposit: <Download size={20} className="text-green-500" />,
    cash_in: <Download size={20} className="text-green-500" />,
    cash_out: <Upload size={20} className="text-red-500" />,
    "add-money": <DollarSign size={20} className="text-blue-500" />,
  };
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
      {iconMap[type] || <DollarSign size={20} />}
    </div>
  );
};

// Determine outgoing/incoming
const isOutgoing = (tx: Transaction, currentUserName: string): boolean => {
  switch (tx.type) {
    case "send_money":
    case "withdraw":
    case "cash_out":
      return tx.from?.name === currentUserName;
    case "deposit":
    case "cash_in":
    case "add-money":
      return false;
    default:
      return false;
  }
};

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  currentUserName,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-100">
        Transaction History
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="text-left text-gray-500 dark:text-gray-400">
            <tr className="border-b dark:border-gray-700">
              <th className="p-3 font-semibold">Details</th>
              <th className="p-3 font-semibold">Type</th>
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => {
              const outgoing = isOutgoing(tx, currentUserName);
              return (
                <tr
                  key={tx._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="p-3 font-medium text-gray-800 dark:text-gray-100 flex items-center gap-3">
                    {getTransactionIcon(tx.type)}
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {tx.note || tx.type.replace("_", " ")}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {tx.from?.name || "Unknown"} → {tx.to?.name || "Unknown"}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-300 capitalize">
                    {tx.type.replace("_", " ")}
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">
                    {new Date(tx.createdAt).toLocaleString()}
                  </td>
                  <td
                    className={`p-3 text-right font-bold ${
                      outgoing
                        ? "text-red-600 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {outgoing
                      ? `- ৳${tx.amount.toFixed(2)}`
                      : `+ ৳${tx.amount.toFixed(2)}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
