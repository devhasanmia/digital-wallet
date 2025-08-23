import React from "react";

type Transaction = {
    id: number | string;
    name: string;
    type: string;
    amount: number;
    date: string;
};
type TransactionHistoryProps = {
    transactions: Transaction[];
};

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
    transactions,
}) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-100">
                Transaction History
            </h3>

            {/* Filter Section */}
            <div
                id="transaction-filters"
                className="flex flex-col sm:flex-row sm:flex-wrap gap-4 items-center mb-4 p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
            >
                {/* 🔎 You can implement filters here */}
            </div>

            {/* Table Section */}
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
                        {transactions.map((t) => (
                            <tr
                                key={t.id}
                                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                            >
                                <td className="p-3 font-medium text-gray-800 dark:text-gray-100 flex items-center gap-3">
                                    {/* {getTransactionIcon(t.type)} */}
                                    <span>{t.name}</span>
                                </td>
                                <td className="p-3 text-gray-600 dark:text-gray-300">
                                    {t.type}
                                </td>
                                <td className="p-3 text-gray-600 dark:text-gray-400">
                                    {t.date}
                                </td>
                                <td
                                    className={`p-3 text-right font-bold ${t.amount > 0
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-gray-800 dark:text-gray-100"
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
        </div>
    );
};

export default TransactionHistory;
