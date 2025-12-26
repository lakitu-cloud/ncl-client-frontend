// src/pages/manager/tabs/ReportsTab.tsx
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { IoDownloadOutline } from 'react-icons/io5';
import { useState } from 'react';
import { toast } from 'react-toastify'; // you're using toastify

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1; // 1-12

// Generate last 6 months
const generateMonths = () => {
  const months = [];
  for (let i = 0; i < 6; i++) {
    const date = new Date(currentYear, currentMonth - 1 - i);
    months.push({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      label: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    });
  }
  return months;
};

export const ReportsTab = () => {
  const [downloading, setDownloading] = useState<{ year: number; month: number } | null>(null);

  const months = generateMonths();

  const handleDownload = async (year: number, month: number) => {
    setDownloading({ year, month });
    try {
      const response = await fetch(`/report/monthly/${year}/${month}`);

      if (!response.ok) throw new Error('Failed to generate report');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Monthly-Report-${year}-${month}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success('Report downloaded successfully!');
    } catch (err) {
      toast.error('Failed to download report');
    } finally {
      setDownloading(null);
    }
  };

  return (
    <Card className="p-8">
      <h3 className="text-lg font-bold mb-8 font-oswald uppercase">Monthly Reports</h3>
      <div className="space-y-4 ">
        {months.map(({ year, month, label }) => (
          <div
            key={`${year}-${month}`}
            className="flex items-center dark:text-whiteText justify-between p-5 overflow-auto dark:bg-blackText dark:border-gray-700 rounded-md font-poppins hover:bg-gray-100 transition"
          >
            <div>
              <p className="font-semibold text-md ">Monthly Revenue Report</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className='dark:bg-blue-800 dark:text-whiteText dark:border-gray-700'
              onClick={() => handleDownload(year, month)}
              disabled={downloading?.year === year && downloading?.month === month}
            >
              {downloading?.year === year && downloading?.month === month ? (
                'Generating...'
              ) : (
                <>
                  <IoDownloadOutline className="mr-2" /> Download
                </>
              )}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};