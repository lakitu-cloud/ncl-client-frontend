import { ApexOptions } from "apexcharts";

export const AreaSeries = [{
  name: 'Visits',
  data: [2800, 3200, 2500, 4000, 3800, 4200, 3000, 3500, 3900, 4100, 4300, 4500],
}];

// === AREA CHART ===
export const AreaOptions: ApexOptions = {
  chart: { type: 'area', height: 300, toolbar: { show: false }, sparkline: { enabled: false } },
  colors: ['#3B82F6'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.6,
      opacityTo: 0.05,
      stops: [0, 90, 100],
    },
  },
  stroke: { curve: 'smooth', width: 3 },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels: { style: { colors: '#9CA3AF', fontSize: '12px' } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    min: 0,
    max: 5000,
    tickAmount: 5,
    labels: {
      style: { colors: '#9CA3AF', fontSize: '12px' },
      formatter: (v) => `${(v / 1000).toFixed(0)}k`,
    },
  },
  grid: { borderColor: '#E5E7EB', strokeDashArray: 5, xaxis: { lines: { show: true } }, yaxis: { lines: { show: true } } },
  tooltip: {
    theme: 'light',
    style: { fontSize: '13px' },
    marker: { show: true },
    x: { show: true },
    y: { formatter: (v) => `${v.toLocaleString()} visits` },
  },
  dataLabels: { enabled: false },
};