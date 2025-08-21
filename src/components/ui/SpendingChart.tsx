import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const SpendingChart = ({ chartData }: { chartData: { name: string; spend: number }[] }) => {
  return (
    <div className="rounded-3xl p-4 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur shadow-sm lg:col-span-2">
      <h3 className="font-semibold mb-2">Spending (last 7 days)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#6366F1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Area
              type="monotone"
              dataKey="spend"
              stroke="#6366F1"
              strokeWidth={2.5}
              fill="url(#colorSpend)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingChart;
