// src/pages/manager/components/Analysis.tsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';

// Elegant dummy data (realistic growth)
const dummyChartData = {
  daily: [
    { date: '2025-12-20', revenue: 450000 },
    { date: '2025-12-21', revenue: 520000 },
    { date: '2025-12-22', revenue: 480000 },
    { date: '2025-12-23', revenue: 610000 },
    { date: '2025-12-24', revenue: 720000 },
    { date: '2025-12-25', revenue: 850000 },
    { date: '2025-12-26', revenue: 790000 },
    { date: '2025-12-27', revenue: 880000 },
    { date: '2025-12-28', revenue: 920000 },
  ],
  weekly: [
    { date: 'Week 48', revenue: 3200000 },
    { date: 'Week 49', revenue: 3800000 },
    { date: 'Week 50', revenue: 4100000 },
    { date: 'Week 51', revenue: 5200000 },
    { date: 'Week 52', revenue: 6100000 },
  ],
  monthly: [
    { date: 'Aug 2025', revenue: 12000000 },
    { date: 'Sep 2025', revenue: 14000000 },
    { date: 'Oct 2025', revenue: 16000000 },
    { date: 'Nov 2025', revenue: 19000000 },
    { date: 'Dec 2025', revenue: 24000000 },
  ],
  yearly: [
    { date: '2021', revenue: 80000000 },
    { date: '2022', revenue: 105000000 },
    { date: '2023', revenue: 138000000 },
    { date: '2024', revenue: 172000000 },
    { date: '2025', revenue: 220000000 },
  ],
};

interface AnalysisTabProps {
  chart?: typeof dummyChartData;
  isLoading?: boolean;
}

const ChartCard: React.FC<{ title: string; color: string; children: React.ReactNode }> = ({
  title,
  color,
  children,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    whileHover={{ y: -4 }}
    className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-all duration-300"
  >
    <h3 className="text-xl font-bold font-oswald text-gray-800 dark:text-white mb-8 flex items-center gap-3">
      <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: color }} />
      {title}
    </h3>
    <div className="h-80 w-full">{children}</div>
  </motion.div>
);

const ElegantTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload[0]) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg p-5 rounded-2xl shadow-2xl border border-white/30 dark:border-gray-700/50"
      >
        <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</p>
        <p className="text-2xl font-bold" style={{ color: payload[0].color }}>
          TZS {payload[0].value.toLocaleString()}
        </p>
      </motion.div>
    );
  }
  return null;
};

export const AnalysisTab: React.FC<AnalysisTabProps> = ({
  chart = dummyChartData,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 animate-pulse"
          >
            <div className="h-8 bg-gray-200/50 dark:bg-gray-700/50 rounded-xl w-64 mb-8" />
            <div className="h-80 bg-gray-100/50 dark:bg-gray-700/30 rounded-2xl" />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily */}
        <ChartCard title="Daily Revenue Trend" color="#3b82f6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chart.daily} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
              {/* <CartesianGrid strokeDasharray="6 6" stroke="#f0f0f0" strokeOpacity={0.5} /> */}
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickFormatter={(date) => new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickFormatter={(v) => `TZS ${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<ElegantTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 2 }} />
              <Line
                type="natural"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={4}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 10, stroke: '#3b82f6', strokeWidth: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Weekly */}
        <ChartCard title="Weekly Revenue Trend" color="#10b981">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chart.weekly}>
              {/* <CartesianGrid strokeDasharray="6 6" stroke="#f0f0f0" strokeOpacity={0.5} /> */}
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickFormatter={(v) => `TZS ${(v / 1000000).toFixed(1)}M`}
              />
              <Tooltip content={<ElegantTooltip />} cursor={{ stroke: '#10b981', strokeWidth: 2 }} />
              <Line
                type="natural"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={4}
                dot={{ fill: '#10b981', r: 6 }}
                activeDot={{ r: 10 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Monthly */}
        <ChartCard title="Monthly Revenue Trend" color="#f59e0b">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chart.monthly}>
              {/* <CartesianGrid strokeDasharray="6 6" stroke="#f0f0f0" strokeOpacity={0.5} /> */}
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickFormatter={(v) => `TZS ${(v / 1000000).toFixed(0)}M`}
              />
              <Tooltip content={<ElegantTooltip />} cursor={{ stroke: '#f59e0b', strokeWidth: 2 }} />
              <Line
                type="natural"
                dataKey="revenue"
                stroke="#f59e0b"
                strokeWidth={4}
                dot={{ fill: '#f59e0b', r: 6 }}
                activeDot={{ r: 10 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Yearly */}
        <ChartCard title="Yearly Revenue Growth" color="#ef4444">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chart.yearly}>
              {/* <CartesianGrid strokeDasharray="6 6" stroke="#f0f0f0" strokeOpacity={0.5} /> */}
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickFormatter={(v) => `TZS ${(v / 100000000).toFixed(0)}00M`}
              />
              <Tooltip content={<ElegantTooltip />} cursor={{ stroke: '#ef4444', strokeWidth: 2 }} />
              <Line
                type="natural"
                dataKey="revenue"
                stroke="#ef4444"
                strokeWidth={4}
                dot={{ fill: '#ef4444', r: 6 }}
                activeDot={{ r: 10 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};