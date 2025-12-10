'use client';

import React, { useState } from 'react';

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

export default function SalesManagerDetailPage() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token.replace(/ /g, ''));
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={subscriber.profileImage}
                  alt={subscriber.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
                />
                <div className="absolute bottom-2 right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <span className="text-white text-xl">✔</span>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold">{subscriber.name}</h1>
                <p className="text-indigo-100 text-lg mt-1">Premium Residential Subscriber</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium">
                    {subscriber.id}
                  </span>
                  <span className="bg-green-500 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    Active Account
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-indigo-100">Total Units Purchased</p>
              <p className="text-5xl font-bold">1,847.6 kWh</p>
              <p className="text-indigo-200 mt-1">KES 382,700 Lifetime Revenue</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Subscriber Info */}
          <div className="space-y-6">
            {/* Personal Details */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-3">
                <span className="text-indigo-600">Personal Details</span>
              </h3>
              <div className="space-y-4 text-sm">
                {[
                  { label: 'Phone Number', value: subscriber.phone },
                  { label: 'Email Address', value: subscriber.email },
                  { label: 'National ID', value: subscriber.idNumber },
                  { label: 'Account Number', value: subscriber.accountNumber },
                  { label: 'Registered On', value: subscriber.registrationDate },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-5">
                <h3 className="text-xl font-bold">Service Location</h3>
              </div>
              <div className="p-6">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 mb-4" />
                <div className="space-y-3 text-sm">
                  <p className="font-semibold text-gray-800">{subscriber.location.address}</p>
                  <p className="text-gray-600">
                    {subscriber.location.ward} • {subscriber.location.county} County
                  </p>
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="text-xs">GPS:</span>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{subscriber.location.coordinates}</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Sales Manager */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Assigned Sales Manager</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {subscriber.salesManager.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{subscriber.salesManager.name}</p>
                  <p className="text-sm text-gray-600">{subscriber.salesManager.phone}</p>
                  <p className="text-xs text-gray-500 mt-1">{subscriber.salesManager.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Meters & Transactions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Meters Grid */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Connected Meters ({meters.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {meters.map((meter) => (
                  <div key={meter.id} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow">
                    <div className={`p-5 ${meter.status === 'online' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-gradient-to-r from-gray-500 to-gray-700'} text-white`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xl font-bold">{meter.id}</h4>
                          <p className="text-sm opacity-90">Serial: {meter.serial}</p>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${meter.status === 'online' ? 'bg-white/20' : 'bg-white/10'}`}>
                            <span className={`w-2 h-2 rounded-full ${meter.status === 'online' ? 'bg-white animate-pulse' : 'bg-gray-300'}`}></span>
                            {meter.status === 'online' ? 'Online' : 'Offline'}
                          </div>
                          <p className="text-xs mt-1 opacity-80">Last seen {meter.lastSeen}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Current Balance</span>
                        <span className="text-3xl font-bold text-gray-900">{meter.unitsBalance} kWh</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Total Revenue</span>
                        <span className="font-semibold">KES {meter.revenue.toLocaleString()}</span>
                      </div>
                      <div className="pt-4 border-t border-gray-100">
                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition">
                          View Meter Details →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-6">
                <h2 className="text-2xl font-bold">Recent Token Purchases</h2>
                <p className="opacity-90">Last 30 days activity</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Token</th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Meter</th>
                      <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Units</th>
                      <th className="text-right px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
                      <th className="text-center px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-indigo-50/30 transition">
                        <td className="px-6 py-5 font-mono text-sm">
                          <div className="flex items-center gap-2">
                            <span>{tx.token}</span>
                            <button
                              onClick={() => copyToken(tx.token)}
                              className="text-indigo-600 hover:text-indigo-800"
                            >
                              {copiedToken === tx.token ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm text-gray-700">{tx.date}</td>
                        <td className="px-6 py-5">
                          <span className="font-medium text-indigo-700">{tx.meter}</span>
                        </td>
                        <td className="px-6 py-5 text-right font-semibold">{tx.units} kWh</td>
                        <td className="px-6 py-5 text-right font-bold text-gray-900">KES {tx.amount.toLocaleString()}</td>
                        <td className="px-6 py-5 text-center">
                          <span className={`inline-flex px-4 py-2 rounded-full text-xs font-bold ${tx.status === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {tx.status.toUpperCase()}
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
      </div>
    </div>
  );
}