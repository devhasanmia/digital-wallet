import React from "react";

type BalanceCardProps = {
  watermark?: string;
  balance: number | string;
  currency?: string;
  provider?: string;
  accountType?: string;
};

const BalanceCard: React.FC<BalanceCardProps> = ({
  watermark = "User",
  balance,
  currency = "$",
  provider = "Digital Wallet",
  accountType,
}) => {
  console.log(accountType)
  return (
    <div
      className="relative rounded-2xl p-6 shadow-2xl mb-8 overflow-hidden
                 bg-gradient-to-tr from-gray-900 via-slate-800 to-gray-900
                 border border-gray-700"
    >
      {/* Metallic Shine Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-40"></div>

      {/* Glow Effects */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-400/20 blur-3xl rounded-full"></div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <p className="font-bold text-7xl sm:text-8xl text-white opacity-5 sm:-rotate-12 select-none pointer-events-none">
          {watermark}
        </p>
      </div>

      {/* Card Content */}
      <div className="relative flex flex-col justify-between h-full text-white z-10">
        {/* Balance Section */}
        <div>
          <p className="text-lg font-medium opacity-70">Balance</p>
          <p className="text-4xl sm:text-5xl font-bold tracking-tighter mt-1 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            {currency} {balance} BDT
          </p>
        </div>

        {/* Card Footer */}
        <div className="flex justify-between items-end mt-12">
          <p className="font-mono text-xl tracking-wider opacity-80">
            {accountType === "agent" ? "Agent Account" : "Personal Account"}
          </p>
          <div className="text-right">
            <p className="text-xs opacity-70">Powered by</p>
            <p className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              {provider}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
