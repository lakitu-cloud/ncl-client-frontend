'use client';

import React, { useState } from 'react';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  customer: string;
  units: number;
  status: 'success' | 'pending' | 'failed';
}

const mockTransactions: Transaction[] = [
  { id: 'TRX001', date: '2025-11-24 14:32', amount: 4500, customer: 'John Doe', units: 45.2, status: 'success' },
  { id: 'TRX002', date: '2025-11-23 09:15', amount: 3200, customer: 'Mary Kamau', units: 32.1, status: 'success' },
  { id: 'TRX003', date: '2025-11-22 18:47', amount: 5800, customer: 'Peter Ochieng', units: 58.0, status: 'pending' },
  { id: 'TRX004', date: '2025-11-21 11:20', amount: 2100, customer: 'Grace Wanjiku', units: 21.0, status: 'success' },
];

export default function MeterDetailPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ==================== LEFT SIDEBAR - METER CARD ==================== */}
      <div className="w-96 bg-white border-r border-gray-200 shadow-xl overflow-y-auto">
        <div className="p-6">
          {/* Device Image */}
          <div className="mb-6 rounded-lg border border-gray-200 overflow-hidden">
            <img
              src={require('../../assets/images/products/5.png')} // Replace with your real image
              alt="PWM"
              className="w-full h-56 object-fit"
            />
          </div>

          {/* Title + Online Badge */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-gray-900 font-oswald">MITA YA MAJI MSIKITINI</h1>
            <span className="bg-green-500 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Active
            </span>
          </div>

          <hr className="border-gray-200 my-6" />

          {/* General Information */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">GENERAL INFORMATION</h3>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center font-poppins">
              <span className="text-gray-700 ">Serial</span>
              <div className="flex items-center gap-2">
                <span className=" font-bold">5800025439</span>
                <button
                  onClick={() => handleCopy('12345678901234', 'serial')}
                  className="w-8 h-8 hover:bg-gray-100 rounded flex items-center justify-center"
                >
                  {copied === 'serial' ? '✓' : '📋'}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center font-poppins">
              <span className="text-gray-700">Manufacture</span>
              <div className="flex items-center gap-2">
                <span className="font-bold">NYIRENDAS</span>
                <button
                  onClick={() => handleCopy('00:1E:42:AB:CD:EF', 'mac')}
                  className="w-8 h-8 hover:bg-gray-100 rounded flex items-center justify-center"
                >
                  {copied === 'mac' ? '✓' : '📋'}
                </button>
              </div>
            </div>

            <div className="flex justify-between font-poppins">
              <span className="text-gray-700 ">Size</span>
              <span className="font-bold text-start text-gray-700">DN20 </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-700">Firmware</span>
              <span className="font-medium">HYDROXY_07.06.3</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-700">Management service</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                Active
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-700">Parameter monitoring</span>
              <span className="text-green-600 font-medium">2 / 7</span>
            </div>
          </div>

          <hr className="border-gray-200 my-6" />

          {/* Network Information */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">PERFORMANCE REPORT</h3>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 ">Revenue collected</span>
              <div className="flex items-center gap-3">
                
                <span className="font-medium text-green-600">TSH 3,490,00</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-700 ">VOLUME CONSUMED</span>
                 <div className="flex items-center gap-3">
                
                <span className="font-medium text-gray-600"> 4,490 m3 </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500">Service Time</span>
              <span className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                Mobile (4G)
              </span>
            </div>

            
          </div>
        </div>
      </div>

      {/* ==================== RIGHT MAIN CONTENT ==================== */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 font-oswald ">Meter Details</h2>
            <p className="text-gray-600 mt-1">ZA_WESPAK_L1 • Last updated just now</p>
          </div>

          {/* Sales Manager Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Assigned Sales Manager</h3>
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                AK
              </div>
              <div>
                <h4 className="text-xl font-semibold">Allan Kiprop</h4>
                <p className="text-gray-600">Senior Sales Executive • Westlands Region</p>
                <div className="flex gap-4 text-sm text-gray-500 mt-2">
                  <span>allan.kiprop@company.co.ke</span>
                  <span>•</span>
                  <span>+254 712 345 678</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Recent Token Transactions</h3>
              <span className="text-sm font-medium text-gray-600 border border-gray-300 px-3 py-1 rounded">
                Total Revenue: KES 15,600
              </span>
            </div>

            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Units (kWh)
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount (KES)
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-mono text-sm">{tx.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{tx.date}</td>
                    <td className="px-6 py-4 text-sm">{tx.customer}</td>
                    <td className="px-6 py-4 text-sm text-right font-medium">{tx.units}</td>
                    <td className="px-6 py-4 text-sm text-right font-semibold">
                      {tx.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          tx.status === 'success'
                            ? 'bg-green-100 text-green-800'
                            : tx.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}