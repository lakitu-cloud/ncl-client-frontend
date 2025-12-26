import Header from "../../../layout/navbar/Header";
import Transaction from "./components/Transaction";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { useDash } from "../../../hooks/useManager";

const tap = require("../../../assets/images/logo.gif");

export const SalesDash = () => {
  const { data } = useDash();

  return (
    <div className="max-h-screen">
      <Header title="Dashboard" />
      <section className="mt-6 font-poppins">
        <div className="max-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 not-prose">
          {/* Top card */}
          <div className="col-span-2 rounded-lg text-white bg-blue-800 p-4">
            <header className="flex align-middle  gap-x-8 mb-4 ">
              <div className="">
                <svg
                  width="72px"
                  height="72px"
                  className="hidden sm:block"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.25 8.5C21.25 7.09554 21.25 6.39331 20.9129 5.88886C20.767 5.67048 20.5795 5.48298 20.3611 5.33706C19.9199 5.04224 19.3274 5.00529 18.246 5.00066C18.2501 5.29206 18.25 5.59655 18.25 5.91051L18.25 6V7.25H19.25C19.6642 7.25 20 7.58579 20 8C20 8.41421 19.6642 8.75 19.25 8.75H18.25V10.25H19.25C19.6642 10.25 20 10.5858 20 11C20 11.4142 19.6642 11.75 19.25 11.75H18.25V13.25H19.25C19.6642 13.25 20 13.5858 20 14C20 14.4142 19.6642 14.75 19.25 14.75H18.25V21.25H16.75V6C16.75 4.11438 16.75 3.17157 16.1642 2.58579C15.5784 2 14.6356 2 12.75 2H10.75C8.86438 2 7.92157 2 7.33579 2.58579C6.75 3.17157 6.75 4.11438 6.75 6V21.25H5.25V14.75H4.25C3.83579 14.75 3.5 14.4142 3.5 14C3.5 13.5858 3.83579 13.25 4.25 13.25H5.25V11.75H4.25C3.83579 11.75 3.5 11.4142 3.5 11C3.5 10.5858 3.83579 10.25 4.25 10.25H5.25V8.75H4.25C3.83579 8.75 3.5 8.41421 3.5 8C3.5 7.58579 3.83579 7.25 4.25 7.25H5.25V6L5.24999 5.9105C5.24996 5.59655 5.24992 5.29206 5.25403 5.00066C4.17262 5.00529 3.58008 5.04224 3.13886 5.33706C2.92048 5.48298 2.73298 5.67048 2.58706 5.88886C2.25 6.39331 2.25 7.09554 2.25 8.5V21.25H1.75C1.33579 21.25 1 21.5858 1 22C1 22.4142 1.33579 22.75 1.75 22.75H21.75C22.1642 22.75 22.5 22.4142 22.5 22C22.5 21.5858 22.1642 21.25 21.75 21.25H21.25V8.5ZM9 11.75C9 11.3358 9.33579 11 9.75 11H13.75C14.1642 11 14.5 11.3358 14.5 11.75C14.5 12.1642 14.1642 12.5 13.75 12.5H9.75C9.33579 12.5 9 12.1642 9 11.75ZM9 14.75C9 14.3358 9.33579 14 9.75 14H13.75C14.1642 14 14.5 14.3358 14.5 14.75C14.5 15.1642 14.1642 15.5 13.75 15.5H9.75C9.33579 15.5 9 15.1642 9 14.75ZM11.75 18.25C12.1642 18.25 12.5 18.5858 12.5 19V21.25H11V19C11 18.5858 11.3358 18.25 11.75 18.25ZM9 6.25C9 5.83579 9.33579 5.5 9.75 5.5H13.75C14.1642 5.5 14.5 5.83579 14.5 6.25C14.5 6.66421 14.1642 7 13.75 7H9.75C9.33579 7 9 6.66421 9 6.25ZM9 9.25C9 8.83579 9.33579 8.5 9.75 8.5H13.75C14.1642 8.5 14.5 8.83579 14.5 9.25C14.5 9.66421 14.1642 10 13.75 10H9.75C9.33579 10 9 9.66421 9 9.25Z"
                    fill="#fff"
                  />
                </svg>
              </div>
              <div className="mb-4">
                <h1 className="text-2xl font-oswald mb-2">
                  EQUIPMENT QUALITY STATISTICS
                </h1>
                <p className="text-sm overflow-hidden">
                  Statistics on the performance and quality of equipment used
                </p>
              </div>
            </header>
            <div className="border-[1px]"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-2 justify-between gap-x-8 mt-12">
              <div className="w-full sm:w-auto flex flex-col text-center mb-8 sm:mb-0">
                <p className="font-oswald text-semibold text-3xl mb-4">
                  {data?.subscriber.total ? data.subscriber.total : 0}
                </p>
                <p className="flex flex-col">
                  <span>Customers</span>
                  <span>Count</span>
                </p>
              </div>
              <div className="w-full sm:w-auto flex flex-col text-center mb-8 sm:mb-0">
                <p className="font-oswald text-semibold text-3xl mb-4">
                  {data?.meter.total || 0}
                </p>
                <p className="flex flex-col">
                  <span>Meter</span>
                  <span>Count</span>
                </p>
              </div>
              <div className="w-full sm:w-auto flex flex-col text-center mb-8 sm:mb-0">
                <p className="font-oswald text-semibold text-3xl mb-4">
                  {data?.transaction.total_count || 0}
                </p>
                <p className="flex flex-col">
                  <span>Transactions</span>
                  <span>Count</span>
                </p>
              </div>
              <div className="w-full sm:w-auto flex flex-col text-center">
                <p className="font-oswald text-semibold text-3xl mb-4">
                  {data?.wakala.total || 0}
                </p>
                <p className="flex flex-col">
                  <span>Wakala</span>
                  <span>Count</span>
                </p>
              </div>
            </div>
          </div>
          {/* Second card */}
          <div className="col-span-1 rounded-lg text-white bg-green-700 p-4">
            <header className="flex flex-col sm:flex-row items-center  gap-x-8 mb-4">
              <div>
                <svg
                  width="80px"
                  className="hidden sm:block"
                  height="80px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g data-name="Product Icons">
                    <g>
                      <path
                        className="cls-1"
                        d="M12.54,12.43V8h0a1.14,1.14,0,1,0-1,0v4.42H7.27V9.6a1.14,1.14,0,0,0-.53-2.15A1.14,1.14,0,0,0,6.22,9.6v2.83H6a3.82,3.82,0,1,1,1.4-7.38A5.22,5.22,0,0,1,16.84,5a4,4,0,0,1,1.23-.2h0a3.83,3.83,0,0,1,0,7.66h-.25V9.6a1.14,1.14,0,1,0-1.06,0v2.83Z"
                        fill="#fff"
                      />

                      <path
                        className="cls-2"
                        d="M7.27,15.39a2,2,0,0,1,1.54,2,2.07,2.07,0,1,1-2.59-2V12.43h1Zm-.53,3a1,1,0,1,0,0-2,1,1,0,0,0,0,2Zm11.08-3a2.07,2.07,0,1,1-1.06,0V12.44h1.06Zm-.53,3a1,1,0,0,0,.39-1.94,1,1,0,1,0-.39,1.94Zm-4.75-.43h0a2.06,2.06,0,1,1-1,0v-5.5h1.06Zm-.54,3a1,1,0,1,0-.93-.62A1,1,0,0,0,12,20.94Z"
                        fill="#fff"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <div className="mb-4">
                <h1 className="text-2xl font-oswald mb-2 mx-auto">
                  ACTIVE RESOURCE
                </h1>
                <p className="text-sm">Summary of active resource</p>
              </div>
            </header>
            <div className="border-[1px]"></div>
            <div className="flex flex-wrap justify-between gap-x-8 mt-12">
              <div className="w-full sm:w-auto flex flex-col text-center mb-8 sm:mb-0">
                <p className="font-oswald text-semibold text-3xl mb-4">
                  {data?.subscriber.active || 0}
                </p>
                <p className="flex flex-col">
                  <span>Customers</span>
                  <span>Count</span>
                </p>
              </div>
              <div className="w-full sm:w-auto flex flex-col text-center">
                <p className="font-oswald text-semibold text-3xl mb-4">
                  {data?.meter.inactive || 0}
                </p>
                <p className="flex flex-col">
                  <span>Meter</span>
                  <span>Count</span>
                </p>
              </div>
            </div>
          </div>

          {/* Third card */}
          <div className="col-span-1 rounded-lg text-white bg-orange-400 p-4">
            <header className="flex flex-col sm:flex-row items-center  gap-x-8 mb-4">
              <div>
                <svg
                  width="80px"
                  height="80px"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="hidden sm:block"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.43627 5.14686C2 5.64345 2 6.49488 2 8.19773V17.591C2 18.797 2 19.4 2.3146 19.854C2.62919 20.3079 3.17921 20.4986 4.27924 20.88L5.57343 21.3286C6.27436 21.5717 6.81371 21.7586 7.26633 21.879C7.5616 21.9576 7.83333 21.7258 7.83333 21.4203V6.2701C7.83333 6.02118 7.64964 5.81111 7.40837 5.74991C7.01914 5.65118 6.55127 5.48897 5.91002 5.26666C4.35676 4.72817 3.58014 4.45893 2.98922 4.73235C2.77941 4.82942 2.59116 4.97054 2.43627 5.14686Z"
                    fill="#fff"
                  />
                  <path
                    d="M12.6204 3.48096L11.0844 4.54596C10.5287 4.93124 10.1215 5.2136 9.77375 5.41491C9.60895 5.51032 9.5 5.68291 9.5 5.87334V20.9203C9.5 21.2909 9.88398 21.5222 10.1962 21.3225C10.5312 21.1082 10.9149 20.8422 11.3796 20.5199L12.9156 19.4549C13.4712 19.0697 13.8785 18.7873 14.2262 18.586C14.3911 18.4906 14.5 18.318 14.5 18.1276V3.08063C14.5 2.71004 14.116 2.47866 13.8038 2.67836C13.4688 2.89271 13.0851 3.15874 12.6204 3.48096Z"
                    fill="none"
                  />
                  <path
                    d="M19.7208 3.12093L18.4266 2.67226C17.7256 2.42923 17.1863 2.24228 16.7337 2.12187C16.4384 2.04333 16.1667 2.2751 16.1667 2.58064V17.7308C16.1667 17.9797 16.3504 18.1898 16.5916 18.251C16.9809 18.3497 17.4488 18.5119 18.09 18.7342C19.6432 19.2727 20.4199 19.542 21.0108 19.2686C21.2206 19.1715 21.4088 19.0304 21.5637 18.854C22 18.3575 22 17.506 22 15.8032V6.40988C22 5.2039 22 4.60091 21.6854 4.14695C21.3708 3.69298 20.8208 3.5023 19.7208 3.12093Z"
                    fill="#fff"
                  />
                </svg>
              </div>
              <div className="mb-4">
                <h1 className="text-2xl font-oswald mb-2">DISTRIBUTION</h1>
                <p className="text-sm">View distribution of resources.</p>
              </div>
            </header>
            <div className="border-[1px]"></div>
            <div className="flex flex-wrap justify-between gap-x-8 mt-12">
              <div className="w-full sm:w-auto flex flex-col text-center mb-8 sm:mb-0">
                <p className="font-oswald text-semibold text-3xl mb-4">
                  {data?.wakala.total || 0}
                </p>
                <p className="flex flex-col">
                  <span>Point of Sale</span>
                  <span>Count</span>
                </p>
              </div>
              <div className="w-full sm:w-auto flex flex-col text-center">
                <p className="font-oswald text-semibold text-3xl mb-4">
                  {data?.meter.total || 0}
                </p>
                <p className="flex flex-col">
                  <span>Meter</span>
                  <span>Count</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 mt-6">
          <div className="relative col-start-1 row-start-1 col-span-1 row-span-1 border border-gray-200 rounded-lg p-6 overflow-hidden transition-all ">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: `url(${tap})` }}
            ></div>

            {/* Content Overlay */}
            <div className="relative z-9 flex flex-col justify-between h-full">
              {/* Title */}
              <p className="text-gray-700 text-sm font-medium font-oswald">
                Daily Volume
              </p>

              <p className="text-4xl font-bold text-gray-900 font-oswald">
                {new Intl.NumberFormat("en-US", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 0,
                }).format((data?.liters?.today ?? 0) * 0.001)}{" "}
                m³
              </p>
              {/* Growth Indicator */}
              <div className="flex items-center gap-1 text-sm font-medium">
                {(() => {
                  const todayLiters = data?.liters?.today ?? 0;
                  const yesterdayLiters = data?.liters?.yesterday ?? 0;

                  // Handle division by zero and initial state
                  let growthPercentage = 0;
                  if (yesterdayLiters > 0) {
                    growthPercentage =
                      ((todayLiters - yesterdayLiters) / yesterdayLiters) * 100;
                  } else if (todayLiters > 0) {
                    // Handle case where previous value was zero
                    growthPercentage = 100;
                  }

                  const isPositive = growthPercentage >= 0;
                  const isNegative = growthPercentage < 0;

                  return (
                    <>
                      {isPositive && (
                        <FiArrowUp className="w-5 h-5 text-green-500" />
                      )}
                      {isNegative && (
                        <FiArrowDown className="w-5 h-5 text-red-500" />
                      )}
                      <span
                        className={
                          isPositive
                            ? "text-green-500"
                            : isNegative
                            ? "text-red-500"
                            : "text-gray-500"
                        }
                      >
                        {yesterdayLiters === 0 && todayLiters === 0
                          ? "0%"
                          : `${Math.abs(growthPercentage).toFixed(0)}%`}
                        <span className="text-gray-400 text-xs font-normal ml-1">
                          from Yesterday
                        </span>
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Card 1: Weekly Volume */}
          <div className="relative col-start-2 row-start-1 col-span-1 row-span-1 border dark:bg-darkTheme border-gray-200 rounded-lg overflow-hidden p-6 transition-all">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: `url(${tap})` }}
            ></div>

            <div className="relative z-9 flex flex-col justify-between h-full">
              <p className="text-gray-700 text-sm font-medium font-oswald">
                Weekly Volume
              </p>
              <p className="text-4xl font-bold text-gray-900 font-oswald">
                {new Intl.NumberFormat("en-US", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 0,
                }).format((data?.liters?.thisWeek ?? 0) * 0.001)}{" "}
                m³
              </p>
              <div className="flex items-center text-sm font-medium">
                {(() => {
                  const current = data?.liters?.thisWeek ?? 0;
                  const previous = data?.liters?.lastWeek ?? 0;
                  let growth = 0;

                  if (previous > 0) {
                    growth = ((current - previous) / previous) * 100;
                  } else if (current > 0) {
                    growth = 100;
                  }

                  const isPositive = growth >= 0;
                  const isNegative = growth < 0;

                  return (
                    <>
                      {isPositive && (
                        <FiArrowUp className="w-5 h-5 text-green-500" />
                      )}
                      {isNegative && (
                        <FiArrowDown className="w-5 h-5 text-red-500" />
                      )}
                      <span
                        className={
                          isPositive
                            ? "text-green-500"
                            : isNegative
                            ? "text-red-500"
                            : "text-gray-500"
                        }
                      >
                        {previous === 0 && current === 0
                          ? "0%"
                          : `${Math.abs(growth).toFixed(0)}%`}
                        <span className="text-gray-400 text-xs font-normal ml-1">
                          from last week
                        </span>
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Card 2: Monthly Volume */}
          <div className="relative col-start-3 row-start-1 col-span-1 row-span-1 border border-gray-200 rounded-lg p-6 overflow-hidden transition-all">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: `url(${tap})` }}
            ></div>

            <div className="relative z-9 flex flex-col justify-between h-full">
              <p className="text-gray-700 text-sm font-medium font-oswald">
                Monthly Volume
              </p>
              <p className="text-4xl font-bold text-gray-900 font-oswald">
                {new Intl.NumberFormat("en-US", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 0,
                }).format((data?.liters?.thisMonth ?? 0) * 0.001)}{" "}
                m³
              </p>
              <div className="flex items-center text-sm font-medium">
                {(() => {
                  const current = data?.liters?.thisMonth ?? 0;
                  const previous = data?.liters?.lastMonth ?? 0;
                  let growth = 0;

                  if (previous > 0) {
                    growth = ((current - previous) / previous) * 100;
                  } else if (current > 0) {
                    growth = 100;
                  }

                  const isPositive = growth >= 0;
                  const isNegative = growth < 0;

                  return (
                    <>
                      {isPositive && (
                        <FiArrowUp className="w-5 h-5 text-green-500" />
                      )}
                      {isNegative && (
                        <FiArrowDown className="w-5 h-5 text-red-500" />
                      )}
                      <span
                        className={
                          isPositive
                            ? "text-green-500"
                            : isNegative
                            ? "text-red-500"
                            : "text-gray-500"
                        }
                      >
                        {previous === 0 && current === 0
                          ? "0%"
                          : `${Math.abs(growth).toFixed(0)}%`}
                        <span className="text-gray-400 text-xs font-normal ml-1">
                          from last month
                        </span>
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Card 3: Annual Volume */}
          <div className="relative col-start-4 row-start-1 col-span-1 row-span-1 border border-gray-200 rounded-lg p-6 overflow-hidden transition-all">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: `url(${tap})` }}
            ></div>

            <div className="relative z-9 flex flex-col justify-between h-full">
              <p className="text-gray-700 dark:text-gray-200 text-sm font-medium font-oswald">
                Annual Volume
              </p>
              <p className="text-4xl font-bold dark:text-whiteText text-gray-900 font-oswald">
                {new Intl.NumberFormat("en-US", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 0,
                }).format((data?.liters?.thisYear ?? 0) * 0.001)}{" "}
                m³
              </p>
              <div className="flex items-center text-sm font-medium">
                {(() => {
                  const current = data?.liters?.thisYear ?? 0;
                  const previous = data?.liters?.lastYear ?? 0;
                  let growth = 0;

                  if (previous > 0) {
                    growth = ((current - previous) / previous) * 100;
                  } else if (current > 0) {
                    growth = 100;
                  }

                  const isPositive = growth >= 0;
                  const isNegative = growth < 0;

                  return (
                    <>
                      {isPositive && (
                        <FiArrowUp className="w-5 h-5 text-green-500" />
                      )}
                      {isNegative && (
                        <FiArrowDown className="w-5 h-5 text-red-500" />
                      )}
                      <span
                        className={
                          isPositive
                            ? "text-green-500"
                            : isNegative
                            ? "text-red-500"
                            : "text-gray-500"
                        }
                      >
                        {previous === 0 && current === 0
                          ? "0%"
                          : `${Math.abs(growth).toFixed(0)}%`}
                        <span className="text-gray-400 dark:text-gray-200 text-xs font-normal ml-1">
                          from last year
                        </span>
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
          {/* Card 4: Amount Today */}
          <div className="relative col-start-1 row-start-2 col-span-1 row-span-1  border border-gray-200 rounded-lg p-6 overflow-hidden transition-all">
            <div className="relative z-9 flex flex-col justify-between h-full">
              <p className="text-gray-700 dark:text-gray-200 text-sm font-medium font-oswald">
                Amount Today
              </p>
              <p className="text-4xl font-bold text-gray-900 dark:text-whiteText  font-oswald">
                TZS{" "}
                {new Intl.NumberFormat("en-TZ").format(
                  data?.revenue?.today ?? 0
                )}
              </p>
              <div className="flex items-center text-sm font-medium">
                {(() => {
                  const current = data?.revenue?.today ?? 0;
                  const previous = data?.revenue?.yesterday ?? 0;
                  let growth = 0;

                  if (previous > 0) {
                    growth = ((current - previous) / previous) * 100;
                  } else if (current > 0) {
                    growth = 100;
                  }

                  const isPositive = growth >= 0;
                  const isNegative = growth < 0;

                  return (
                    <>
                      {isPositive && (
                        <FiArrowUp className="w-5 h-5 text-green-500" />
                      )}
                      {isNegative && (
                        <FiArrowDown className="w-5 h-5 text-red-500" />
                      )}
                      <span
                        className={
                          isPositive
                            ? "text-green-500"
                            : isNegative
                            ? "text-red-500"
                            : "text-gray-500"
                        }
                      >
                        {previous === 0 && current === 0
                          ? "0%"
                          : `${Math.abs(growth).toFixed(0)}%`}
                        <span className="text-gray-400 dark:text-gray-200 text-xs font-normal ml-1">
                          Yesterday
                        </span>
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Card 5: Amount Weekly */}
          <div className="relative col-start-2 row-start-2 col-span-1 row-span-1 border border-gray-200 rounded-lg p-6 overflow-hidden transition-all">
            <div className="relative z-9 flex flex-col justify-between h-full">
              <p className="text-gray-700 dark:text-gray-200 text-sm font-medium font-oswald">
                Amount Weekly
              </p>
              <p className="text-4xl font-bold text-gray-900 dark:text-whiteText font-oswald">
                TZS{" "}
                {new Intl.NumberFormat("en-TZ").format(
                  data?.revenue?.thisWeek ?? 0
                )}
              </p>
              <div className="flex items-center text-sm font-medium">
                {(() => {
                  const current = data?.revenue?.thisWeek ?? 0;
                  const previous = data?.revenue?.lastWeek ?? 0;
                  let growth = 0;

                  if (previous > 0) {
                    growth = ((current - previous) / previous) * 100;
                  } else if (current > 0) {
                    growth = 100;
                  }

                  const isPositive = growth >= 0;
                  const isNegative = growth < 0;

                  return (
                    <>
                      {isPositive && (
                        <FiArrowUp className="w-5 h-5 text-green-500" />
                      )}
                      {isNegative && (
                        <FiArrowDown className="w-5 h-5 text-red-500" />
                      )}
                      <span
                        className={
                          isPositive
                            ? "text-green-500"
                            : isNegative
                            ? "text-red-500"
                            : "text-gray-500"
                        }
                      >
                        {previous === 0 && current === 0
                          ? "0%"
                          : `${Math.abs(growth).toFixed(0)}%`}
                        <span className="text-gray-400 dark:text-gray-200 text-xs font-normal ml-1">
                          vs last week
                        </span>
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Card 6: Amount Monthly */}
          <div className="relative col-start-3 row-start-2 col-span-1 row-span-1 border border-gray-200 rounded-lg p-6 transition-all overflow-hidden">
            <div className="relative z-9 flex flex-col justify-between h-full">
              <p className="text-gray-700 text-sm dark:text-gray-20 font-medium font-oswald">
                Amount Monthly
              </p>
              <p className="text-4xl font-bold dark:text-whiteText text-gray-900 font-oswald">
                TZS{" "}
                {new Intl.NumberFormat("en-TZ").format(
                  data?.revenue?.thisMonth ?? 0
                )}
              </p>
              <div className="flex items-center text-sm font-medium">
                {(() => {
                  const current = data?.revenue?.thisMonth ?? 0;
                  const previous = data?.revenue?.lastMonth ?? 0;
                  let growth = 0;

                  if (previous > 0) {
                    growth = ((current - previous) / previous) * 100;
                  } else if (current > 0) {
                    growth = 100;
                  }

                  const isPositive = growth >= 0;
                  const isNegative = growth < 0;

                  return (
                    <>
                      {isPositive && (
                        <FiArrowUp className="w-5 h-5 text-green-500" />
                      )}
                      {isNegative && (
                        <FiArrowDown className="w-5 h-5 text-red-500" />
                      )}
                      <span
                        className={
                          isPositive
                            ? "text-green-500"
                            : isNegative
                            ? "text-red-500"
                            : "text-gray-500"
                        }
                      >
                        {previous === 0 && current === 0
                          ? "0%"
                          : `${Math.abs(growth).toFixed(0)}%`}
                        <span className="text-gray-400 dark:text-gray-200 text-xs font-normal ml-1">
                          vs last month
                        </span>
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Card 6: Total Water Consumed */}
          <div className="relative col-start-4 row-start-2 col-span-1 row-span-1 border border-gray-200 rounded-lg p-6 overflow-hidden transition-all">
            {/* <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${tap})` }}></div> */}

            <div className="relative z-9 flex flex-col justify-between h-full">
              <p className="text-gray-700 text-sm dark:text-gray-200 font-medium font-oswald">
                Amount Anually
              </p>
              <p className="text-4xl font-bold dark:text-whiteText text-gray-900 font-oswald">
                TZS{" "}
                {new Intl.NumberFormat("en-TZ").format(
                  data?.revenue?.thisYear ?? 0
                )}
              </p>
              <div className="flex items-center text-sm font-medium">
                {(() => {
                  const current = data?.revenue?.thisYear ?? 0;
                  const previous = data?.revenue?.thisYear ?? 0;
                  let growth = 0;

                  if (previous > 0) {
                    growth = ((current - previous) / previous) * 100;
                  } else if (current > 0) {
                    growth = 100;
                  }

                  const isPositive = growth >= 0;
                  const isNegative = growth < 0;

                  return (
                    <>
                      {isPositive && (
                        <FiArrowUp className="w-5 h-5 text-green-500" />
                      )}
                      {isNegative && (
                        <FiArrowDown className="w-5 h-5 text-red-500" />
                      )}
                      <span
                        className={
                          isPositive
                            ? "text-green-500"
                            : isNegative
                            ? "text-red-500"
                            : "text-gray-500"
                        }
                      >
                        {previous === 0 && current === 0
                          ? "0%"
                          : `${Math.abs(growth).toFixed(0)}%`}
                        <span className="text-gray-400 dark:text-gray-200 text-xs font-normal ml-1">
                          vs last Year
                        </span>
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          <Transaction />
        </div>

        {/* Bottom Section */}
         <div className="mt-6 p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-bold">
                TZS {data?.transaction.total_revenue || 0}
                {/* <span className="text-green-600 ml-2 ">+23,982</span> */}
              </h2>
              <p className="text-xs sm:text-sm">You total revenue</p>
            </div>
            <div className="w-full sm:w-auto">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="lastDaysdropdown"
                data-dropdown-placement="bottom"
                type="button"
                className="w-full sm:w-auto px-3 py-2 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-9 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Last week
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="lastDaysdropdown"
                className="z-9 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Yesterday
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Today
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Last 7 days
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Last 30 days
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Last 90 days
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

