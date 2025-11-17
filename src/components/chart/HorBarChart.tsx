import { ApexOptions } from "apexcharts";

export const BarSeries = [{ name: 'Spending', data: [87, 76, 68, 54, 23, 20] }];


// === HORIZONTAL BAR CHART ===
export const BarOptions: ApexOptions = {
  chart: { type: 'bar', height: 300, toolbar: { show: false } },
  plotOptions: {
    bar: {
      borderRadius: 8,
      horizontal: true,
      barHeight: '60%',
      distributed: true,
      dataLabels: { position: 'center' },
    },
  },
  colors: ['#3B82F6'],
  dataLabels: {
    enabled: true,
    textAnchor: 'middle',
    style: { colors: ['#FFFFFF'], fontSize: '13px', fontWeight: 600 },
    offsetX: 0,
    formatter: (val) => `$${val}K`,
  },
  xaxis: {
    categories: ['NGERENGERE', 'MVOMERO', 'KILOMBERO', 'KILOSA', 'MALINYI', "GAIRO"],
    labels: { show: false },
  },
  yaxis: {
    labels: {
      style: { colors: '#374151', fontSize: '13px', fontWeight: 500 },
      align: 'left',
      offsetX: -15,
    },
  },
  grid: { show: false },
  tooltip: { enabled: false },
  states: { hover: { filter: { type: 'none' } } },
};