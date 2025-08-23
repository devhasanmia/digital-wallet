import React from "react";

const BalanceCardSkeleton: React.FC = () => {
    return (
        <div
            className="relative rounded-2xl p-6 shadow-2xl mb-8 overflow-hidden
                 bg-gradient-to-tr from-gray-900 via-slate-800 to-gray-900
                 border border-gray-700 animate-pulse"
        >
            {/* Metallic Shine Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-40"></div>

            {/* Glow Effects */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-400/10 blur-3xl rounded-full"></div>

            {/* Card Content */}
            <div className="relative flex flex-col justify-between h-full text-white z-10">
                {/* Balance Section */}
                <div>
                    <div className="h-4 w-20 bg-gray-600 rounded mb-3"></div>
                    <div className="h-10 w-40 bg-gray-500 rounded"></div>
                </div>

                {/* Card Footer */}
                <div className="flex justify-between items-end mt-12">
                    <div className="h-6 w-40 bg-gray-700 rounded"></div>
                    <div className="text-right">
                        <div className="h-3 w-16 bg-gray-600 rounded mb-2 ml-auto"></div>
                        <div className="h-5 w-28 bg-gray-500 rounded ml-auto"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BalanceCardSkeleton;
