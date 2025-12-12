// src/pages/manager/tabs/ReportsTab.tsx
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { IoDownloadOutline } from 'react-icons/io5';

export const ReportsTab = () => {
  const reports = [
    { name: 'Monthly Revenue Report', date: 'Dec 2025', size: '2.1 MB' },
    { name: 'Meter Performance Summary', date: 'Nov 2025', size: '1.8 MB' },
    { name: 'Subscriber Growth Report', date: 'Oct 2025', size: '3.4 MB' },
  ];

  return (
    <Card className="p-8">
      <h3 className="text-2xl font-bold mb-8">Generated Reports</h3>
      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.name}
            className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
          >
            <div>
              <p className="font-semibold text-lg">{report.name}</p>
              <p className="text-sm text-gray-500">{report.date} • {report.size}</p>
            </div>
            <Button variant="outline" size="sm">
              <IoDownloadOutline className="mr-2" /> Download
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};