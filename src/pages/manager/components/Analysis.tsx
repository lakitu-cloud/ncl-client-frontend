// src/pages/manager/tabs/AnalysisTab.tsx
import { Card } from '../components/Card';
import { IoTrendingUp, IoCash, IoPeople } from 'react-icons/io5';

export const AnalysisTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="p-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <IoTrendingUp className="text-indigo-600" /> Revenue Trend
        </h3>
        <div className="h-80 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center">
          <p className="text-gray-500">Line Chart (Recharts / Chart.js)</p>
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <IoCash className="w-12 h-12 mb-4 opacity-80" />
          <p className="text-green-100">Best Performing Month</p>
          <p className="text-4xl font-bold mt-2">November 2025</p>
          <p className="text-2xl mt-2">8.2M TZS</p>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
          <IoPeople className="w-12 h-12 mb-4 opacity-80" />
          <p className="text-purple-100">Top Subscriber</p>
          <p className="text-3xl font-bold mt-2">Amina Juma</p>
          <p className="text-xl mt-1">2.4M TZS spent</p>
        </Card>
      </div>
    </div>
  );
};