
import React from 'react';
import Chart from 'react-apexcharts';
import {
  CalendarIcon,
  GridIcon,
  HomeIcon,
  MonthIcon,
  PieIcon,
  RankIcon,
  WaterIcon,
  YearIcon,
} from '../../../components/icons';
import Header from '../../../layout/navbar/Header';
import { useDash } from '../../../hooks/useUser';
import { DashboardData } from '../../../types/userType'; // Use the type we created
import { Loader } from 'lucide-react';
import ManagerDonutChart from '../../../components/chart/PieChart';
import ManagerPerformanceBar from '../../../components/chart/HorBarChart';

export default function ZoneDash() {
  const { data: dashboardData, isLoading, isError } = useDash();

  // Early loading & error states – prevents accessing undefined
  if (isLoading) {
    return (
      <Loader />
    );
  }

  if (isError || !dashboardData) {
    return (
      <div className="px-6 min-h-screen flex items-center justify-center text-red-600">
        <div className="text-xl">Failed to load dashboard data</div>
      </div>
    );
  }

  const data: DashboardData = dashboardData; // Now safely typed

  /* --------------------------- Top 4 KPIs --------------------------- */
  const topKpis = [
    {
      value: data.total.revenue.toLocaleString(),
      label: 'Total Revenue',
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
      value: data.total.meter.toLocaleString(),
      label: 'Total Meters',
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
      value: data.total.manager.toLocaleString(),
      label: 'Active Managers',
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
      value: data.total.transaction.toLocaleString(),
      label: 'Transactions',
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

  /* --------------------------- Quick Access Cards --------------------------- */
  const quickAccessItems = [
    { label: 'Today', value: data.revenue.today.toLocaleString(), unit: 'TZS', icon: <HomeIcon /> },
    { label: 'This Week', value: data.revenue.thisWeek.toLocaleString(), unit: 'TZS', icon: <CalendarIcon /> },
    { label: 'This Month', value: data.revenue.thisMonth.toLocaleString(), unit: 'TZS', icon: <MonthIcon /> },
    { label: 'This Year', value: data.revenue.thisYear.toLocaleString(), unit: 'TZS', icon: <YearIcon /> },
    { label: 'Today', value: data.volume.today.toLocaleString(), unit: 'm³', icon: <WaterIcon /> },
    { label: 'This Week', value: data.volume.thisWeek.toLocaleString(), unit: 'm³', icon: <CalendarIcon /> },
    { label: 'This Month', value: data.volume.thisMonth.toLocaleString(), unit: 'm³', icon: <MonthIcon /> },
    { label: 'This Year', value: data.volume.thisYear.toLocaleString(), unit: 'm³', icon: <YearIcon /> },
  ];
 

  return (
    <div className="px-6 min-h-screen space-y-8 py-6">
      <Header title="Dashboard" />

      {/* Top 4 KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {topKpis.map((kpi, idx) => (
          <article
            key={idx}
            className={`${kpi.bgColor} rounded-sm p-4 text-white relative overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                {kpi.icon}
              </div>
              <div className="flex-1">
                <div className="text-3xl font-bold">TZS {kpi.value}</div>
                <div className="text-sm opacity-90 mt-1">{kpi.label}</div>
              </div>
            </div>
            <div className="absolute bottom-5 right-5 flex gap-1 items-end h-9">
              {kpi.chart.map((height, i) => (
                <div
                  key={i}
                  className="bg-white/40 rounded-full"
                  style={{ width: '5px', height: `${(height / 100) * 36}px` }}
                />
              ))}
            </div>
          </article>
        ))}
      </section>

      {/* Quick Access Metrics */}
      <section className="bg-white rounded-sm border border-gray-200 shadow-sm p-8 dark:bg-darkTheme dark:text-whiteText dark:border-gray-400">
        <div className="flex items-center justify-between mb-6 border-b-2 pb-4">
          <h2 className="text-xl font-semibold uppercase font-oswald">Quick Access Metrics</h2>
          <GridIcon />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {quickAccessItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium uppercase text-gray-600 dark:text-gray-400 font-oswald">
                  {item.label}
                </span>
                <span className="mt-0.5 text-2xl font-bold text-gray-900 dark:text-white font-oswald">
                  {item.value} {item.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-sm shadow-sm p-6 border border-gray-200 dark:bg-darkTheme dark:border-gray-400">
          <div className="flex justify-between items-center mb-6 border-b-2 pb-4">
            <h2 className="text-xl font-semibold uppercase font-oswald">Managers Distribution by Customers</h2>
            <PieIcon />
          </div>
          <ManagerDonutChart data={data.chart} />
        </div>

        <div className="bg-white rounded-sm shadow-sm p-6 border border-gray-200 dark:bg-darkTheme dark:border-gray-400">
          <div className="flex justify-between items-center mb-6 border-b-2 pb-4">
            <h2 className="text-xl font-semibold uppercase font-oswald">Manager Performance</h2>
            <RankIcon />
          </div>
<ManagerPerformanceBar data={data.chart} />
        </div>
      </section>
    </div>
  );
}