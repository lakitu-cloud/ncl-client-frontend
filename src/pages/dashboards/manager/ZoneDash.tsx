import React from "react";

const TrendingUp = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0" />
  </svg>
);

const TrendingDown = () => (
  <svg className="w-3 h-3 rotate-180" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0" />
  </svg>
);

interface KPIData {
  value: string;
  label: string;
  trend: string;
  trendUp: boolean;
  chart: number[];
  bgColor: string;
  icon: React.ReactNode;
}

const SalesDash = () => {
  const kpis: KPIData[] = [
    {
      value: "1,256,789",
      label: "总收入",
      trend: "+15.2%",
      trendUp: true,
      chart: [65, 78, 45, 89, 67, 82, 91],
      bgColor: "bg-blue-500",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M256 640v192h640V384H768v-64h150.976c14.272 0 19.456 1.472 24.64 4.288a29.06 29.06 0 0 1 12.16 12.096c2.752 5.184 4.224 10.368 4.224 24.64v493.952c0 14.272-1.472 19.456-4.288 24.64a29.06 29.06 0 0 1-12.096 12.16c-5.184 2.752-10.368 4.224-24.64 4.224H233.024c-14.272 0-19.456-1.472-24.64-4.288a29.06 29.06 0 0 1-12.16-12.096c-2.688-5.184-4.224-10.368-4.224-24.576V640z" />
          <path d="M768 192H128v448h640zm64-22.976v493.952c0 14.272-1.472 19.456-4.288 24.64a29.06 29.06 0 0 1-12.096 12.16c-5.184 2.752-10.368 4.224-24.64 4.224H105.024c-14.272 0-19.456-1.472-24.64-4.288a29.06 29.06 0 0 1-12.16-12.096C65.536 682.432 64 677.248 64 663.04V169.024c0-14.272 1.472-19.456 4.288-24.64a29.06 29.06 0 0 1 12.096-12.16C85.568 129.536 90.752 128 104.96 128h685.952c14.272 0 19.456 1.472 24.64 4.288a29.06 29.06 0 0 1 12.16 12.096c2.752 5.184 4.224 10.368 4.224 24.64z" />
          <path d="M448 576a160 160 0 1 1 0-320 160 160 0 0 1 0 320m0-64a96 96 0 1 0 0-192 96 96 0 0 0 0 192" />
        </svg>
      ),
    },
    {
      value: "3,456",
      label: "总订单",
      trend: "+8.7%",
      trendUp: true,
      chart: [45, 67, 34, 78, 56, 89, 67],
      bgColor: "bg-green-500",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M704 320v96a32 32 0 0 1-32 32h-32V320H384v128h-32a32 32 0 0 1-32-32v-96H192v576h640V320zm-384-64a192 192 0 1 1 384 0h160a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32zm64 0h256a128 128 0 1 0-256 0" />
          <path d="M192 704h640v64H192z" />
        </svg>
      ),
    },
    {
      value: "2,847",
      label: "活跃用户",
      trend: "-2.1%",
      trendUp: false,
      chart: [78, 65, 89, 67, 45, 78, 56],
      bgColor: "bg-orange-500",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384m0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512m320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0" />
        </svg>
      ),
    },
    {
      value: "512",
      label: "成交量",
      trend: "+6.3%",
      trendUp: true,
      chart: [55, 60, 58, 62, 65, 70, 68],
      bgColor: "bg-purple-500",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 1024 1024" fill="currentColor">
          <path d="m161.92 580.736 29.888 58.88C171.328 659.776 160 681.728 160 704c0 82.304 155.328 160 352 160s352-77.696 352-160c0-22.272-11.392-44.16-31.808-64.32l30.464-58.432C903.936 615.808 928 657.664 928 704c0 129.728-188.544 224-416 224S96 833.728 96 704c0-46.592 24.32-88.576 65.92-123.264" />
          <path d="m161.92 388.736 29.888 58.88C171.328 467.84 160 489.792 160 512c0 82.304 155.328 160 352 160s352-77.696 352-160c0-22.272-11.392-44.16-31.808-64.32l30.464-58.432C903.936 423.808 928 465.664 928 512c0 129.728-188.544 224-416 224S96 641.728 96 512c0-46.592 24.32-88.576 65.92-123.264" />
          <path d="M512 544c-227.456 0-416-94.272-416-224S284.544 96 512 96s416 94.272 416 224-188.544 224-416 224m0-64c196.672 0 352-77.696 352-160S708.672 160 512 160s-352 77.696-352 160 155.328 160 352 160" />
        </svg>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className={`${kpi.bgColor} rounded-2xl p-6 text-white relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300`}
          >
            {/* Semi-transparent icon overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="flex items-center justify-center h-full">
                {kpi.icon}
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Value + Label */}
              <div className="mb-3">
                <div className="text-3xl font-bold">{kpi.value}</div>
                <div className="text-sm opacity-90 mt-1">{kpi.label}</div>
              </div>

              {/* Trend */}
              <div
                className={`flex items-center text-sm font-medium ${
                  kpi.trendUp ? "text-green-100" : "text-red-100"
                }`}
              >
                {kpi.trendUp ? <TrendingUp /> : <TrendingDown />}
                <span className="ml-1">{kpi.trend}</span>
              </div>
            </div>

            {/* Mini Chart - Bottom Right */}
            <div className="absolute bottom-4 right-4 flex gap-1 items-end h-10">
              {kpi.chart.map((height, i) => (
                <div
                  key={i}
                  className="bg-white opacity-40 rounded-full transition-all"
                  style={{
                    width: "6px",
                    height: `${(height / 100) * 40}px`,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesDash;