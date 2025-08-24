import React, { type ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";


interface StatCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    gradientClass?: string; // optional
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, gradientClass = "bg-indigo-500" }) => {

    return (
        <div className="p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
            {/* Icon + Title */}
            <div className="flex justify-between items-center mb-3">
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
                </div>
                <div className={`p-3 rounded-xl ${gradientClass} text-white shadow`}>
                    {icon}
                </div>
            </div>

           
        </div>
    );
};

export default StatCard;
