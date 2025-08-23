import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type ChartCardProps = {
  title: string;
  type: "bar" | "pie";
  data: any[];
  dataKey: string;
  nameKey?: string; // pie chart জন্য
  colors?: string[];
  height?: number | string;
};

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  type,
  data,
  dataKey,
  nameKey,
  colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"],
  height = 280,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700" style={{ height }}>
      <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 text-sm sm:text-base">{title}</h3>
      <ResponsiveContainer width="100%" height="85%">
        {type === "bar" ? (
          <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
            <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "0.75rem" }} />
            <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={10} />
            <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={10} />
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              dataKey={dataKey}
              nameKey={nameKey}
              outerRadius={70}
              innerRadius={40}
              label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `৳${value.toFixed(2)}`}
              contentStyle={{ backgroundColor: "rgba(255,255,255,0.9)", border: "1px solid #ddd", color: "#000" }}
            />
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ fontSize: "0.75rem", color: "#6b7280" }}
            />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCard;
