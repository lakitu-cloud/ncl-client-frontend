import { ApexOptions } from "apexcharts";

export const PieSeries = [30, 25, 20, 15, 10];

// === CURVED LABEL CONNECTORS (SVG) ===
export const PieLabelConnectors = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 300">
    {/* Video Ads */}
    <path d="M 150,40 Q 100,70 80,80" fill="none" stroke="#9CA3AF" strokeWidth="1" />
    <text x="70" y="80" fontSize="11" fill="#4B5563">MOROGORO</text>

    {/* Affiliate */}
    <path d="M 80,100 Q 50,120 40,140" fill="none" stroke="#9CA3AF" strokeWidth="1" />
    <text x="25" y="145" fontSize="11" fill="#4B5563">Affiliate</text>

    {/* Email Marketing */}
    <path d="M 80,200 Q 50,220 40,240" fill="none" stroke="#9CA3AF" strokeWidth="1" />
    <text x="25" y="245" fontSize="11" fill="#4B5563">Email Marketing</text>

    {/* Search Engine */}
    <path d="M 220,200 Q 250,220 260,240" fill="none" stroke="#9CA3AF" strokeWidth="1" />
    <text x="220" y="245" fontSize="11" fill="#4B5563">Search Engine</text>

    {/* Direct */}
    <path d="M 220,80 Q 250,100 260,120" fill="none" stroke="#9CA3AF" strokeWidth="1" />
    <text x="220" y="125" fontSize="11" fill="#4B5563">Direct</text>
  </svg>
);

// === PIE CHART ===
export const PieOptions: ApexOptions = {
  chart: { type: 'donut', height: 300 },
  labels: ['MOROGORO', 'MVOMERO', 'ULANGA', 'MVOMERO', 'MALINYI', "GAIRO", "KILOMBERO", "KILOSA"],
  colors: ['#3B82F6', '#F59E0B', '#10B981', '#06B6D4', '#EF4444'],
  legend: { show: false },
  dataLabels: { enabled: false },
  
  plotOptions: {
    pie: {
      donut: {
        size: '68%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Total',
            fontSize: '14px',
            color: '#6B7280',
            formatter: () => '100%',
          },
        },
      },
    },
  },
  tooltip: { y: { formatter: (v) => `${v}%` } },
};