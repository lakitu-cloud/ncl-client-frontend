import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ManagerChartItem } from '../../types/userType'; // adjust path

interface ManagerDonutChartProps {
  data: ManagerChartItem[];
}

const COLORS = [
  '#0EA5E9', // sky-500
  '#3B82F6', // blue-500
  '#2563EB', // blue-600
  '#1D4ED8', // blue-700
  '#1E40AF', // blue-800
  '#172554', // blue-900
];

type RechartsPieData = ManagerChartItem & { [key: string]: any };

export default function ManagerDonutChart({ data }: ManagerDonutChartProps) {
  const rechartsData: RechartsPieData[] = data; // safe cast – we only use known keys

  const totalSubscribers = data.reduce((sum, m) => sum + m.subscribers, 0);

  const RADIAN = Math.PI / 180;

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const manager = rechartsData[index];

    return (
      <g>
        <text
          x={x}
          y={y}
          fill="#1F2937"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
          className="font-oswald font-bold text-2xl drop-shadow-sm"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>

        <text
          x={x}
          y={y + 28}
          fill="#4B5563"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
          className="font-oswald font-semibold text-lg uppercase tracking-wider"
        >
          {manager.name}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart margin={{ top: 40, right: 40, left: 40, bottom: 60 }}>
        <Pie
          data={rechartsData}
          cx="50%"
          cy="50%"
          labelLine={{ stroke: '#9CA3AF', strokeWidth: 2 }}
          label={renderCustomLabel}
          outerRadius={140}
          innerRadius={80}
          dataKey="subscribers"
          paddingAngle={3}
        >
          {rechartsData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        {/* Center Total */}
        <text
          x="50%"
          y="48%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-oswald font-bold text-3xl fill-gray-800 dark:text-whiteText"
        >
          {totalSubscribers.toLocaleString()}
        </text>
        <text
          x="50%"
          y="54%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-oswald font-medium text-sm fill-gray-600 uppercase tracking-wider dark:text-whiteText"
        >
          Total Customers
        </text>

        {/* Fixed Tooltip formatter */}
        <Tooltip
          contentStyle={{
            backgroundColor: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.12)',
            padding: '12px 16px',
          }}
          labelStyle={{
            fontFamily: 'Oswald, sans-serif',
            fontWeight: 600,
            color: '#111827',
            textTransform: 'uppercase',
          }}
          formatter={(value: number | undefined) =>
            value ? `${value.toLocaleString()} subscribers` : '0'
          }
        />

{/* 
        <Legend
          verticalAlign="bottom"
          height={20}
          wrapperStyle={{ paddingBottom: '12px' }}
          iconType="rect"
          formatter={(value) => (
            <span className="font-popins font-md text-gray-700 text-sm">{value}</span>
          )}
        /> */}
      </PieChart>
    </ResponsiveContainer>
  );
}