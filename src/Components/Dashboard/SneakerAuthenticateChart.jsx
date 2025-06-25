import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

const data = [
  { name: 'Jan', value: 20, fill: '#f9fafb' },  // white-ish bar
  { name: 'Feb', value: 25, fill: '#00ffff' },  // cyan bar
  { name: 'Mar', value: 18, fill: '#ffb800' },  // orange bar
  { name: 'Apr', value: 22, fill: '#00ffff' },  // cyan bar
  { name: 'May', value: 28, fill: '#ffb800' },  // orange bar
  { name: 'Jun', value: 26, fill: '#00ffff' },  // cyan bar
  { name: 'Jul', value: 25, fill: '#f9fafb' },  // white-ish bar
  { name: 'Aug', value: 20, fill: '#00ffff' },  // cyan bar
  { name: 'Sep', value: 30, fill: '#ffb800' },  // orange bar
  { name: 'Oct', value: 22, fill: '#00ffff' },  // cyan bar
  { name: 'Nov', value: 16, fill: '#ffb800' },  // orange bar
  { name: 'Dec', value: 29, fill: '#00ffff' },  // cyan bar
];


export default function SneakerAuthenticateChart() {
  return (
    <div className="p-4 bg-black border border-green-600 rounded-md">
      <h2 className="mb-4 font-mono text-lg text-white">Sneaker Authenticate</h2>
      <BarChart
        width={600}
        height={215}
        data={data}
        margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
        barCategoryGap="10%"   // gap between categories
      >
        <CartesianGrid strokeDasharray="2 2" stroke="#4B5563" vertical={false} />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          stroke="#9CA3AF"
          tick={{ fontSize: 12 }}
          padding={{ left: 10, right: 10 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          stroke="#9CA3AF"
          tickCount={4}
          domain={[0, 30]}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#222', borderRadius: 4, border: 'none' }}
          itemStyle={{ color: '#fff' }}
        />
        <Bar dataKey="value" barSize={10} isAnimationActive={false}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}
