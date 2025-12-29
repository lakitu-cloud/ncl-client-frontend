// src/components/ManagerPerformanceBar.tsx

'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ManagerChartItem } from '../../types/userType';

interface ManagerPerformanceBarProps {
  data: ManagerChartItem[];
}

const BLUE_SHADES = {
  meters: '#3B82F6',    // blue-500 – bright for meters
  revenue: '#1D4ED8',   // blue-700 – darker for revenue contrast
};

export default function ManagerPerformanceBar({ data }: ManagerPerformanceBarProps) {
  const chartData = data.map((manager) => ({
    name: manager.name.toUpperCase(),
    meters: manager.meters,
    revenue: manager.revenue,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-5 rounded-xl shadow-2xl border border-gray-100">
          <p className="font-oswald font-bold text-xl text-gray-900 uppercase mb-2">{label}</p>
          {payload.map((entry: any) => (
            <p
              key={entry.name}
              className="text-base font-oswald font-medium mt-1"
              style={{ color: entry.color }}
            >
              {entry.name === 'Revenue (TZS)'
                ? `TZS ${entry.value.toLocaleString()}`
                : `${entry.value.toLocaleString()} meters`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={380}> {/* Same height as pie */}
        <BarChart
          data={chartData}
          margin={{ top: 60, right: 40, left: 40, bottom: 40 }}
          barSize={50} 
        >
          {/* <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" opacity={0.6} /> */}

          {/* X Axis – Manager Names */}
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={90}
            tick={{ fontFamily: 'poppins', fontSize: 10, fill: '#4B5563', fontWeight: 500 }}
          />

          {/* Left Y Axis – Meters (whole numbers only) */}
          <YAxis
            yAxisId="meters"
            orientation="left"
            stroke={BLUE_SHADES.meters}
            domain={[0, 'dataMax + 20']} // slight padding above max
            tick={{ fontFamily: 'Oswald', fontSize: 14, fill: '#4B5563' }}
            tickFormatter={(value) => Math.round(value).toLocaleString()}
            label={{
              value: 'Total Meters',
              angle: -90,
              position: 'insideLeft',
              offset: -10,
              style: { fontFamily: 'Oswald', fontWeight: 600, fontSize: 12, fill: BLUE_SHADES.meters },
            }}
          />

          {/* Right Y Axis – Revenue (starts ~100K range) */}
          <YAxis
            yAxisId="revenue"
            orientation="right"
            stroke={BLUE_SHADES.revenue}
            domain={[100000, 'dataMax + 200000']} // starts around 100K, pads above
            tick={{ fontFamily: 'Oswald', fontSize: 14, fill: '#4B5563' }}
            tickFormatter={(value) => `${Math.round(value / 1000)}`}
            label={{
              value: 'Revenue (TZS)',
              angle: 90,
              position: 'insideRight',
              offset: -10,
              style: { fontFamily: 'Oswald', fontWeight: 600, fontSize: 12, fill: BLUE_SHADES.revenue },
            }}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }} />

          <Legend
            verticalAlign="bottom"
            height={20}
            wrapperStyle={{ paddingBottom: '12px' }}
            iconType="rect"
            formatter={(value) => (
              <span className="font-popins font-md text-gray-700 text-sm">{value}</span>
            )}
          />

          {/* Meters Bar – Left Axis */}
          <Bar
            yAxisId="meters"
            dataKey="meters"
            fill={BLUE_SHADES.meters}
            radius={[12, 12, 0, 0]}
            name="Meters"
          />

          {/* Revenue Bar – Right Axis */}
          <Bar
            yAxisId="revenue"
            dataKey="revenue"
            fill={BLUE_SHADES.revenue}
            radius={[12, 12, 0, 0]}
            name="Revenue (TZS)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}