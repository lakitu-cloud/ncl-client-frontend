'use client';

import React from 'react';
import Chart from 'react-apexcharts';
import {
  PieOptions,
  PieSeries,
  BarOptions,
  BarSeries,
  PieLabelConnectors,
} from '../../../components/chart';
import { PieIcon, RankIcon } from '../../../components/icons';
import Header from '../../../layout/navbar/Header';

/* -------------------------------------------------------------------------- */
/*                               Trend Arrows                                 */
/* -------------------------------------------------------------------------- */
const TrendingUp = () => (
  <svg className="w-3 h-3 text-green-100" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0" />
  </svg>
);

const TrendingDown = () => (
  <svg className="w-3 h-3 text-red-100 rotate-180" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*                                 KPI Data (Top 4)                           */
/* -------------------------------------------------------------------------- */
interface KPIData {
  value: string;
  label: string;
  trend: string;
  trendUp: boolean;
  chart: number[];
  bgColor: string;
  icon: React.ReactNode;
}

const topKpis: KPIData[] = [
  {
    value: '1,256,789',
    label: 'Total Revenue',
    trend: '+15.2%',
    trendUp: true,
    chart: [65, 78, 45, 89, 67, 82, 91],
    bgColor: 'bg-blue-500',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 1024 1024" fill="currentColor">
        <path d="M256 640v192h640V384H768v-64h150.976c14.272 0 19.456 1.472 24.64 4.288a29.06 29.06 0 0 1 12.16 12.096c2.752 5.184 4.224 10.368 4.224 24.64v493.952c0 14.272-1.472 19.456-4.288 24.64a29.06 29.06 0 0 1-12.096 12.16c-5.184 2.752-10.368 4.224-24.64 4.224H233.024c-14.272 0-19.456-1.472-24.64-4.288a29.06 29.06 0 0 1-12.16-12.096c-2.688-5.184-4.224-10.368-4.224-24.576V640z" />
        <path d="M768 192H128v448h640zm64-22.976v493.952c0 14.272-1.472 19.456-4.288 24.64a29.06 29.06 0 0 1-12.096 12.16c-5.184 2.752-10.368 4.224-24.64 4.224H105.024c-14.272 0-19.456-1.472-24.64-4.288a29.06 29.06 0 0 1-12.16-12.096C65.536 682.432 64 677.248 64 663.04V169.024c0-14.272 1.472-19.456 4.288-24.64a29.06 29.06 0 0 1 12.096-12.16C85.568 129.536 90.752 128 104.96 128h685.952c14.272 0 19.456 1.472 24.64 4.288a29.06 29.06 0 0 1 12.16 12.096c2.752 5.184 4.224 10.368 4.224 24.64z" />
        <path d="M448 576a160 160 0 1 1 0-320 160 160 0 0 1 0 320m0-64a96 96 0 1 0 0-192 96 96 0 0 0 0 192" />
      </svg>
    ),
  },
  {
    value: '3,456',
    label: 'Total Orders',
    trend: '+8.7%',
    trendUp: true,
    chart: [45, 67, 34, 78, 56, 89, 67],
    bgColor: 'bg-green-500',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 1024 1024" fill="currentColor">
        <path d="M704 320v96a32 32 0 0 1-32 32h-32V320H384v128h-32a32 32 0 0 1-32-32v-96H192v576h640V320zm-384-64a192 192 0 1 1 384 0h160a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32zm64 0h256a128 128 0 1 0-256 0" />
        <path d="M192 704h640v64H192z" />
      </svg>
    ),
  },
  {
    value: '2,847',
    label: 'Active Users',
    trend: '-2.1%',
    trendUp: false,
    chart: [78, 65, 89, 67, 45, 78, 56],
    bgColor: 'bg-orange-500',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 1024 1024" fill="currentColor">
        <path d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384m0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512m320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0" />
      </svg>
    ),
  },
  {
    value: '512',
    label: 'Transactions',
    trend: '+6.3%',
    trendUp: true,
    chart: [55, 60, 58, 62, 65, 70, 68],
    bgColor: 'bg-purple-500',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 1024 1024" fill="currentColor">
        <path d="m161.92 580.736 29.888 58.88C171.328 659.776 160 681.728 160 704c0 82.304 155.328 160 352 160s352-77.696 352-160c0-22.272-11.392-44.16-31.808-64.32l30.464-58.432C903.936 615.808 928 657.664 928 704c0 129.728-188.544 224-416 224S96 833.728 96 704c0-46.592 24.32-88.576 65.92-123.264" />
        <path d="m161.92 388.736 29.888 58.88C171.328 467.84 160 489.792 160 512c0 82.304 155.328 160 352 160s352-77.696 352-160c0-22.272-11.392-44.16-31.808-64.32l30.464-58.432C903.936 423.808 928 465.664 928 512c0 129.728-188.544 224-416 224S96 641.728 96 512c0-46.592 24.32-88.576 65.92-123.264" />
        <path d="M512 544c-227.456 0-416-94.272-416-224S284.544 96 512 96s416 94.272 416 224-188.544 224-416 224m0-64c196.672 0 352-77.696 352-160S708.672 160 512 160s-352 77.696-352 160 155.328 160 352 160" />
      </svg>
    ),
  },
];

/* -------------------------------------------------------------------------- */
/*                         Revenue & Volume Cards (8 Cards)                   */
/* -------------------------------------------------------------------------- */

/* Icons matching the image */
const HomeIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const MonthIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 7V3v4zm8 0V3v4zM5 9h14M5 9a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2H5z" />
  </svg>
);

const YearIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const WaterIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z" />
    <path d="M3 18s3-6 9-6 9 6 9 6" />
  </svg>
);

const GridIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

interface MetricCard {
  label: string;
  value: string;
  unit?: string;
  series: number[];
  icon: React.ReactNode;
}

const quickAccessItems: MetricCard[] = [
  // Revenue
  { label: 'Today', value: '452,300', unit: 'TZS', series: [4000, 3800, 3600, 3400, 3200], icon: <HomeIcon /> },
  { label: 'This Week', value: '3,215,800', unit: 'TZS', series: [3500, 3700, 3600, 3800, 3900], icon: <CalendarIcon /> },
  { label: 'This Month', value: '12,567,890', unit: 'TZS', series: [3000, 3200, 3100, 3300, 3400], icon: <MonthIcon /> },
  { label: 'This Year', value: '148,920,450', unit: 'TZS', series: [2800, 3000, 2900, 3100, 3200], icon: <YearIcon /> },

  // Volume
  { label: 'Today', value: '842', unit: 'm³', series: [800, 780, 760, 740, 720], icon: <WaterIcon /> },
  { label: 'This Week', value: '5,920', unit: 'm³', series: [750, 770, 760, 780, 790], icon: <CalendarIcon /> },
  { label: 'This Month', value: '23,450', unit: 'm³', series: [700, 720, 710, 730, 740], icon: <MonthIcon /> },
  { label: 'This Year', value: '285,670', unit: 'm³', series: [680, 700, 690, 710, 720], icon: <YearIcon /> },
];

/* Mini Area Chart Options */
const miniAreaOptions = {
  chart: { type: 'area', sparkline: { enabled: true }, height: 60 },
  stroke: { curve: 'smooth', width: 2 },
  fill: { opacity: 0.3, type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } },
  colors: ['#3B82F6'],
  tooltip: { enabled: false },
};

/* -------------------------------------------------------------------------- */
/*                               Main Component                               */
/* -------------------------------------------------------------------------- */
export default function SalesDash() {
  return (
    <div className="px-6 min-h-screen space-y-4">
      {/* ====================== HEADER ====================== */}
      <Header title="Dashboard" />

      {/* ====================== TOP 4 KPI CARDS (UNCHANGED) ====================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {topKpis.map((kpi, idx) => (
          <article
            key={idx}
            className={`${kpi.bgColor} rounded-sm p-4 text-white relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                {kpi.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-3xl font-bold truncate">{kpi.value}</div>
                <div className="text-sm opacity-90 mt-1">{kpi.label}</div>
                <div className={`flex items-center text-sm font-medium mt-2 ${kpi.trendUp ? 'text-green-100' : 'text-red-100'}`}>
                  {kpi.trendUp ? (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 1024 1024">
                      <path d="m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 rotate-180" fill="currentColor" viewBox="0 0 1024 1024">
                      <path d="m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0" />
                    </svg>
                  )}
                  <span className="ml-1">{kpi.trend}</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-5 right-5 flex gap-1 items-end h-9">
              {kpi.chart.map((height, i) => (
                <div
                  key={i}
                  className="bg-white/40 rounded-full transition-all"
                  style={{ width: '5px', height: `${(height / 100) * 36}px` }}
                />
              ))}
            </div>
          </article>
        ))}
      </section>

      {/* ====================== 8 WHITE CARDS (PIXEL-PERFECT IMAGE MATCH) ====================== */}
     <section className="w-full max-w-full">
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-8">
          {/* Title + Icon */}
          <div className="flex justify-between items-center mb-4 border-b-2 font-oswald">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 uppercase">Quick Access Metrics</h2>
            <GridIcon />
          </div>

        {/* 2 Rows × 4 Mini Cards – Clean Vertical Layout */}
    <div className="grid grid-cols-4 gap-8">
      {quickAccessItems.map((item, idx) => (
        <div key={idx} className="flex items-center gap-[4px]">
          {/* Icon in Light Blue Circle */}
          <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
            {item.icon}
          </div>

          {/* Value + Label + Unit (Centered, Vertical) */}
          <div className="text-start space-x-1 align-top ">
            <div className="text-md font-oswald mb-[1px] uppercase">
              {item.label}
            </div>
            <div className="text-md font-bold font-oswald">
              TZS {item.value} 
            </div>
            
          </div>
        </div>
      ))}
          </div>
        </div>
      </section>

      {/* ====================== BOTTOM 2 CHARTS (w-1/2 each) ====================== */}
      <section className="w-full max-w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-sm shadow-sm p-6 border border-gray-250">
        

          {/* Title + Icon */}
          <div className="flex justify-between items-center mb-4 border-b-2 font-oswald">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 uppercase">Managers Distribution</h2>
            <PieIcon />
          </div>
          <div className="relative">
            <Chart options={PieOptions} series={PieSeries} type="donut" height={300} />
            {/* <PieLabelConnectors /> */}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-sm shadow-sm p-6 border border-gray-250">
           <div className="flex justify-between items-center mb-4 border-b-2 font-oswald">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 uppercase">Performance</h2>
            <RankIcon />
          </div>
          <Chart options={BarOptions} series={BarSeries} type="bar" height={300} />
        </div>
      </section>
    </div>
  );
}