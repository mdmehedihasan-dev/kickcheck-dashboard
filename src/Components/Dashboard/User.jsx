import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "May", user: 1 },
  { name: "Jun", user: 7 },
  { name: "Jul", user: 4 },
  { name: "Aug", user: 9 },
  { name: "Sep", user: 6 },
  { name: "Oct", user: 13 },
  { name: "Nov", user: 8 },
  { name: "Dec", user: 20 },
];

const User = () => {
  return (
    <div className="p-4 bg-black border border-green-600 rounded-lg ">
      <h3 className="mb-4 font-semibold text-white">User</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
          <CartesianGrid
            stroke="#7ec100"
            strokeDasharray="3 3"
            vertical={false}
            opacity={0.3}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: "#7ec100", fontWeight: "600" }}
            axisLine={false}
            tickLine={false}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            domain={[0, 20]}
            tickCount={6}
            tick={{ fill: "#7ec100" }}
            axisLine={false}
            tickLine={false}
            ticks={[0, 4, 8, 12, 16, 20]}
            width={40}
          />
          <Line
            type="monotone"
            dataKey="user"
            stroke="#7ec100"
            strokeWidth={2}
            dot={false}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#222", borderRadius: "5px" }}
            itemStyle={{ color: "#7ec100" }}
            cursor={{ stroke: "#7ec100", strokeWidth: 1 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default User;
