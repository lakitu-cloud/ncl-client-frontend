import React from "react";
import { motion } from "framer-motion";
import Header from "../../../layout/navbar/Header";
import { useDash } from "../../../hooks/useUser";
import { DashboardData } from "../../../types/userType";
import { Loader } from "lucide-react";

import {
  CalendarIcon,
  GridIcon,
  HomeIcon,
  MonthIcon,
  PieIcon,
  RankIcon,
  WaterIcon,
  YearIcon,
} from "../../../components/icons";

import ManagerDonutChart from "../../../components/chart/PieChart";
import ManagerPerformanceBar from "../../../components/chart/HorBarChart";

import {
  pageMotion,
  staggerContainer,
  fadeUp,
} from "../../../components/motion/preset";
import { CountUp } from "../../../components/motion/countUp";

export default function ZoneDash() {
  const { data, isLoading, isError } = useDash();

  if (isLoading) return <Loader />;
  if (isError || !data)
    return (
      <div className="px-6 min-h-screen flex items-center justify-center text-red-600">
        Failed to load dashboard data
      </div>
    );

  const dashboard: DashboardData = data;

  /* --------------------------- KPIs --------------------------- */
  const topKpis = [
    {
      value: dashboard.total.revenue,
      prefix: "TZS ",
      label: "Total Revenue",
      bgColor: "bg-blue-500",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 1024 1024" fill="currentColor"> <path d="M256 640v192h640V384H768v-64h150.976c14.272 0 19.456 1.472 24.64 4.288a29.06 29.06 0 0 1 12.16 12.096c2.752 5.184 4.224 10.368 4.224 24.64v493.952c0 14.272-1.472 19.456-4.288 24.64a29.06 29.06 0 0 1-12.096 12.16c-5.184 2.752-10.368 4.224-24.64 4.224H233.024c-14.272 0-19.456-1.472-24.64-4.288a29.06 29.06 0 0 1-12.16-12.096c-2.688-5.184-4.224-10.368-4.224-24.576V640z" /> <path d="M768 192H128v448h640zm64-22.976v493.952c0 14.272-1.472 19.456-4.288 24.64a29.06 29.06 0 0 1-12.096 12.16c-5.184 2.752-10.368 4.224-24.64 4.224H105.024c-14.272 0-19.456-1.472-24.64-4.288a29.06 29.06 0 0 1-12.16-12.096C65.536 682.432 64 677.248 64 663.04V169.024c0-14.272 1.472-19.456 4.288-24.64a29.06 29.06 0 0 1 12.096-12.16C85.568 129.536 90.752 128 104.96 128h685.952c14.272 0 19.456 1.472 24.64 4.288a29.06 29.06 0 0 1 12.16 12.096c2.752 5.184 4.224 10.368 4.224 24.64z" /> <path d="M448 576a160 160 0 1 1 0-320 160 160 0 0 1 0 320m0-64a96 96 0 1 0 0-192 96 96 0 0 0 0 192" /> </svg>
      ),
      chart: [65, 78, 45, 89, 67, 82, 91],
    },
    {
      value: dashboard.total.meter,
      label: "Total Meters",
      bgColor: "bg-green-500",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 1024 1024" fill="currentColor"> <path d="M704 320v96a32 32 0 0 1-32 32h-32V320H384v128h-32a32 32 0 0 1-32-32v-96H192v576h640V320zm-384-64a192 192 0 1 1 384 0h160a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32zm64 0h256a128 128 0 1 0-256 0" /> <path d="M192 704h640v64H192z" /> </svg>
      ),
      chart: [45, 67, 34, 78, 56, 89, 67],
    },
    {
      value: dashboard.total.manager,
      label: "Sales Managers",
      bgColor: "bg-orange-500",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 1024 1024" fill="currentColor"> <path d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384m0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512m320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0" /> </svg>
      ),
      chart: [78, 65, 89, 67, 45, 78, 56],
    },
    {
      value: dashboard.total.transaction,
      label: "Transactions",
      bgColor: "bg-purple-500",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 1024 1024" fill="currentColor"> 
        <path d="m161.92 580.736 29.888 58.88C171.328 659.776 160 681.728 160 704c0 82.304 155.328 160 352 160s352-77.696 352-160c0-22.272-11.392-44.16-31.808-64.32l30.464-58.432C903.936 615.808 928 657.664 928 704c0 129.728-188.544 224-416 224S96 833.728 96 704c0-46.592 24.32-88.576 65.92-123.264" /> 
        <path d="m161.92 388.736 29.888 58.88C171.328 467.84 160 489.792 160 512c0 82.304 155.328 160 352 160s352-77.696 352-160c0-22.272-11.392-44.16-31.808-64.32l30.464-58.432C903.936 423.808 928 465.664 928 512c0 129.728-188.544 224-416 224S96 641.728 96 512c0-46.592 24.32-88.576 65.92-123.264" /> 
        <path d="M512 544c-227.456 0-416-94.272-416-224S284.544 96 512 96s416 94.272 416 224-188.544 224-416 224m0-64c196.672 0 352-77.696 352-160S708.672 160 512 160s-352 77.696-352 160 155.328 160 352 160" /> </svg>
      ),
      chart: [55, 60, 58, 62, 65, 70, 68],
    },
  ];

  /* --------------------------- Quick Metrics --------------------------- */
  const quickAccess = [
    { label: "Today", value: dashboard.revenue.today, unit: "TZS", icon: <HomeIcon /> },
    { label: "This Week", value: dashboard.revenue.thisWeek, unit: "TZS", icon: <CalendarIcon /> },
    { label: "This Month", value: dashboard.revenue.thisMonth, unit: "TZS", icon: <MonthIcon /> },
    { label: "This Year", value: dashboard.revenue.thisYear, unit: "TZS", icon: <YearIcon /> },
    { label: "Today", value: dashboard.volume.today, unit: "m³", icon: <WaterIcon /> },
    { label: "This Week", value: dashboard.volume.thisWeek, unit: "m³", icon: <CalendarIcon /> },
    { label: "This Month", value: dashboard.volume.thisMonth, unit: "m³", icon: <MonthIcon /> },
    { label: "This Year", value: dashboard.volume.thisYear, unit: "m³", icon: <YearIcon /> },
  ];


  return (
    <motion.div {...pageMotion} className="px-6 min-h-screen space-y-2">
      <Header title="Dashboard" />

      {/* KPIs */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {topKpis.map((kpi, idx) => (
          <motion.article
            key={idx}
            variants={fadeUp}
            className={`${kpi.bgColor} rounded-sm p-4 text-white relative overflow-hidden shadow-sm`}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                {kpi.icon}
              </div>
              <div>
                <div className="text-3xl font-bold">
                  <CountUp value={Number(kpi?.value ?? 0)} prefix={kpi.prefix} />
                </div>
                <div className="text-sm opacity-90 mt-1">{kpi.label}</div>
              </div>
            </div>

            <div className="absolute bottom-5 right-5 flex gap-1 items-end h-9">
              {kpi.chart.map((h, i) => (
                <div
                  key={i}
                  className="bg-white/40 rounded-full"
                  style={{ width: "5px", height: `${(h / 100) * 36}px` }}
                />
              ))}
            </div>
          </motion.article>
        ))}
      </motion.section>

      {/* Quick Access */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="bg-white rounded-sm border border-gray-200 shadow-sm p-8 dark:bg-darkTheme dark:text-whiteText dark:border-gray-400"
      >
        <div className="flex justify-between mb-6 border-b-2 pb-4">
          <h2 className="text-xl font-semibold uppercase font-oswald">
            Quick Access Metrics
          </h2>
          <GridIcon />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {quickAccess.map((item, idx) => (
            <motion.div key={idx} variants={fadeUp} className="flex gap-4">
              <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <span className="text-sm font-medium uppercase text-gray-600 dark:text-gray-400 font-oswald">
                  {item.label}
                </span>
                <div className="text-2xl font-bold">
                  <CountUp value={item.value} suffix={` ${item.unit}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={fadeUp} initial="initial" animate="animate"
          className="bg-white rounded-sm shadow-sm p-6 border border-gray-200 dark:bg-darkTheme dark:border-gray-400">
          <div className="flex justify-between mb-6 border-b-2 pb-4">
            <h2 className="text-xl font-semibold uppercase font-oswald">
              Distribution by Customers
            </h2>
            <PieIcon />
          </div>
          <ManagerDonutChart data={dashboard.chart} />
        </motion.div>

        <motion.div variants={fadeUp} initial="initial" animate="animate"
          className="bg-white rounded-sm shadow-sm p-6 border border-gray-200 dark:bg-darkTheme dark:border-gray-400">
          <div className="flex justify-between mb-6 border-b-2 pb-4">
            <h2 className="text-xl font-semibold uppercase font-oswald">
              Zone Performance (Meter/Revenue)
            </h2>
            <RankIcon />
          </div>
          <ManagerPerformanceBar data={dashboard.chart} />
        </motion.div>
      </section>
    </motion.div>
  );
}
