import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMeterById } from '../../hooks/useMeter'; // assuming this is where your hooks are
import { format } from 'date-fns';
import { Copy, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import Header from '../../layout/navbar/Header';

export default function MeterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState<string | null>(null);

  const { data: response, isPending, isError, error } = useGetMeterById(id as string);

  // Extract actual meter data safely
  const meter = response?.meter;
  const manager = response?.manager

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    toast.success('Copied to clipboard!', { autoClose: 1500 });
    setTimeout(() => setCopied(null), 2000);
  };

  // Loading State
  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-lg font-medium text-gray-600">Loading meter details...</div>
      </div>
    );
  }

  // Error State
  if (isError || !meter) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-xl font-semibold text-red-600 mb-2">Failed to load meter</p>
          <p className="text-gray-600">{(error as any)?.message || 'Meter not found'}</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PPP p');
  };

  const totalRevenue = meter.transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const totalVolume = meter.transactions.reduce((sum, tx) => sum + tx.units, 0);

  return (
    <>
      <Header title="Meter Management" />

      <div className="flex h-screen ">
      {/* <Header title="Meter Management" /> */}

      <div className="w-96 border-r border-gray-200 shadow-xl overflow-y-auto">
        <div className="p-6">
          {/* Device Image */}
         <div className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg border border-gray-200 overflow-hidden">
            <div className="relative w-full h-56"> {/* Fixed height container */}
              <img
                src={require('../../assets/images/products/5.png')}
                alt="Water Meter"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy" // Bonus: improves performance
              />
            </div>
          </div>

          {/* Title + Status Badge */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-md font-semibold text-gray-600 font-oswald uppercase">
              {meter.description || 'Water Meter'}
            </h1>
            <span className="bg-green-500 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              {meter.lock ? 'Locked' : 'Active'}
            </span>
          </div>

          <hr className="border-gray-200 my-6" />

          {/* General Information */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4 uppercase font-oswald">GENERAL INFORMATION</h3>
          <div className="space-y-4 text-sm font-poppins">
            <div className="flex justify-between items-center font-poppins">
              <span className="text-gray-600 font-semibold">Serial Number</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">{meter.serial}</span>
                <button
                  onClick={() => handleCopy(meter.serial, 'serial')}
                  className="w-8 h-8 hover:bg-gray-100 rounded-lg flex items-center justify-center transition"
                >
                  {copied === 'serial' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-500" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Meter Name</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{meter.id.slice(-12)}</span>
                <button
                  onClick={() => handleCopy(meter.id, 'id')}
                  className="w-8 h-8 hover:bg-gray-100 rounded-lg flex items-center justify-center transition"
                >
                  {copied === 'id' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-500" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Type</span>
              <span className="font-medium capitalize">{meter.type}</span>
            </div>

               <div className="flex justify-between">
              <span className="text-gray-600">Phone Number</span>
              <span className="font-medium capitalize">{meter.phone}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Installed On</span>
              <span className="font-medium">{formatDate(meter.installedAt)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${meter.lock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                {meter.lock ? 'Locked' : 'Unlocked'}
              </span>
            </div>
          </div>

          <hr className="border-gray-200 my-6" />

          {/* Performance Summary */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">PERFORMANCE REPORT</h3>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Revenue</span>
              <span className="font-bold text-green-600">TSH {totalRevenue.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Volume Consumed</span>
              <span className="font-medium text-gray-900">{totalVolume.toFixed(1)} m³</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Transactions</span>
              <span className="font-medium">{meter.transactions.length} recorded</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== RIGHT MAIN CONTENT ==================== */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 font-oswald">Meter Details</h2>
            <p className="text-gray-600 mt-1">
              Serial: <span className="font-mono">{meter.serial}</span> • Last active just now
            </p>
          </div>

          {/* Assigned Field Officer */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Assigned Field Officer</h3>
            {manager ? (
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {manager.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{manager.name}</p>
                  <p className="text-sm text-gray-500">Field Officer</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-5 opacity-70">
                <div className="w-20 h-20 bg-gray-200 border-2 border-dashed rounded-full" />
                <div>
                  <p className="text-gray-500 italic">No manager assigned yet</p>
                </div>
              </div>
            )}
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Recent Token Transactions</h3>
              <span className="text-sm font-medium text-gray-600 border border-gray-300 px-3 py-1 rounded">
                Total Revenue: TSH {totalRevenue.toLocaleString()}
              </span>
            </div>

            {meter.transactions.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                No transactions recorded yet
              </div>
            ) : (
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
                      Units (m³)
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount (TSH)
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {meter.transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-mono text-sm">{tx.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {format(new Date(tx.date), 'PPp')}
                      </td>
                      <td className="px-6 py-4 text-sm">{tx.customer || 'Anonymous'}</td>
                      <td className="px-6 py-4 text-sm text-right font-medium">{tx.units.toFixed(1)}</td>
                      <td className="px-6 py-4 text-sm text-right font-semibold text-green-700">
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
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}