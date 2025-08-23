import { CreditCard, Download, FileText, Send, Upload } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./dialog";
import { type ReactNode } from "react";

type ActionKey = "send" | "cashin" | "withdraw" | "paybill" | "payment";

type Action = {
    key: ActionKey;
    icon: ReactNode;
    label: string;
    color: string;
};

const allActions: Action[] = [
    { key: "send", icon: <Send size={24} />, label: "Send Money", color: "text-blue-500" },
    { key: "cashin", icon: <Download size={24} />, label: "Cash-in", color: "text-green-500" },
    { key: "withdraw", icon: <Upload size={24} />, label: "withdraw", color: "text-red-500" },
    { key: "paybill", icon: <FileText size={24} />, label: "Pay Bill", color: "text-orange-500" },
    { key: "payment", icon: <CreditCard size={24} />, label: "Payment", color: "text-purple-500" },
];

type QuickActionsProps = {
    show?: ActionKey[];
    modals?: Partial<Record<ActionKey, ReactNode>>; // এখানে modal content আসবে
};

const QuickActions: React.FC<QuickActionsProps> = ({ show, modals }) => {
    const filteredActions = show
        ? allActions.filter((action) => show.includes(action.key))
        : allActions;

    return (
        <div id="quick-actions" className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                Quick Actions
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                {filteredActions.map((action) => (
                    <Dialog key={action.key}>
                        <DialogTrigger asChild>
                            <button
                                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <div className={action.color}>{action.icon}</div>
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    {action.label}
                                </span>
                            </button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>{action.label}</DialogTitle>
                            </DialogHeader>
                            {/* প্রতিটা action এর জন্য content তুমি বাইরে থেকে পাঠাতে পারবে */}
                            <div className="mt-4">
                                {modals?.[action.key] ?? (
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        No custom content provided for {action.label}.
                                    </p>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
