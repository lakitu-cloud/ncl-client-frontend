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


// Mock Data
const subscriber = {
  id: 'SUB-2025-0891',
  name: 'Eng. Josephine Achieng',
  phone: '+254 722 981 447',
  email: 'josephine.achieng@gmail.com',
  idNumber: '28451234',
  accountNumber: 'ACC-001947',
  registrationDate: '2023-08-14',
  status: 'active' as const,
  location: {
    address: 'Wespak Estate, House L1, Lavington',
    coordinates: '-1.2834, 36.7735',
    county: 'Nairobi',
    ward: 'Kileleshwa',
  },
  salesManager: {
    name: 'Allan Kiprop',
    phone: '+254 712 345 678',
    email: 'allan.kiprop@powerco.ke',
    avatar: null,
  },
  profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
};

const meters = [
  { id: 'ZA_WESPAK_L1', serial: 'RUT901-448921', status: 'online', lastSeen: '2 mins ago', unitsBalance: 87.3, revenue: 284000 },
  { id: 'ZA_WESPAK_L2', serial: 'RUT901-448923', status: 'offline', lastSeen: '3 days ago', unitsBalance: 12.1, revenue: 98700 },
];

const recentTransactions = [
  { id: 'TRX8912', date: '2025-11-24 09:18', meter: 'ZA_WESPAK_L1', units: 120.0, amount: 12000, token: '4819 3920 1748 1029 3847', status: 'success' },
  { id: 'TRX8905', date: '2025-11-22 14:55', meter: 'ZA_WESPAK_L1', units: 50.0, amount: 5000, token: '7291 4482 9930 1124 5561', status: 'success' },
  { id: 'TRX8881', date: '2025-11-20 11:03', meter: 'ZA_WESPAK_L2', units: 30.0, amount: 3000, token: '3012 8877 5544 9900 2213', status: 'pending' },
];


export default function SubscriberDetailPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

    const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token.replace(/ /g, ''));
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };


  return (
    <div className="flex h-screen bg-gray-50">
      {/* ==================== LEFT SIDEBAR - METER CARD ==================== */}
      <div className="w-96 bg-white border-r border-gray-200 shadow-xl overflow-y-auto">
        <div className="p-6">
           <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">


        <div className="h-40 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="align-center gap-x-12 flex px-4 py-2 ">
                <img
                  src={subscriber.profileImage}
                  alt={subscriber.name}
                  className="w-32 h-32 rounded-full border-2 border-white shadow-md object-cover absolute "
                />

                <div className='space-y-2 text-right mr-[-80px]'>
                     <h1 className="text-xl font-bold font-oswald">{subscriber.name}</h1>
                <p className="text-indigo-100 text-lg mt-1 font-oswald">Ngelengele Service Station</p>
                
                    <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
                    {subscriber.id}
                  </span>
                </div>
            
              </div>
     
            </div>
            
          </div>
        </div>
      </div>



          <hr className="border-gray-200 my-6" />

          {/* General Information */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4 uppercase font-oswald">MANAGER INFORMATION</h3>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center font-poppins">
              <span className="text-gray-700 ">Phone Number</span>
              <div className="flex items-center gap-2">
                <span className=" font-bold">+255 755 4818 57</span>
                <button
                  onClick={() => handleCopy('12345678901234', 'serial')}
                  className="w-8 h-8 hover:bg-gray-100 rounded flex items-center justify-center"
                >
                  {copied === 'serial' ? '✓' : '📋'}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center font-poppins">
              <span className="text-gray-700">Email Address</span>
              <div className="flex items-center gap-2">
                <span className="font-bold">emamsdjs@gmail.com</span>
                <button
                  onClick={() => handleCopy('00:1E:42:AB:CD:EF', 'mac')}
                  className="w-8 h-8 hover:bg-gray-100 rounded flex items-center justify-center"
                >
                  {copied === 'mac' ? '✓' : '📋'}
                </button>
              </div>
            </div>

            <div className="flex justify-between font-poppins">
              <span className="text-gray-700 ">Employee Id</span>
              <span className="font-bold text-start text-gray-700">DN20 </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-700">Register On</span>
              <span className="font-medium">HYDROXY_07.06.3</span>
            </div>

          </div>

          <hr className="border-gray-200 my-6" />

          {/* Report Information */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4 font-oswald uppercase">QUATERLY REPORT SUMMARY</h3>
          <div className="space-y-4 text-sm font-poppins">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 ">Revenue Generated</span>
              <div className="flex items-center gap-3">
                
                <span className="font-medium text-green-600">TSH 3,490,00</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-700 ">Volume Consumed</span>
                 <div className="flex items-center gap-3">
                
                <span className="font-medium text-gray-600"> 4,490 m3 </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500">Report Time</span>
              <span className="bg-blue-600 text-gray px-3 py-1.5 rounded-full text-xs font-medium">
                Feburary 29, 2025
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