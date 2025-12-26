import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMeterById } from '../../hooks/useMeter'; // assuming this is where your hooks are
import { format } from 'date-fns';
import { Copy, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import Header from '../../layout/navbar/Header';
import { IoClose, IoEyeSharp, IoSettingsOutline, IoTrashOutline } from 'react-icons/io5';
import Jobs from './Jobs';

export default function ZoneMeterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState<string | null>(null);
  const [isJobsSidebarOpen, setIsJobsSidebarOpen] = useState(false);

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

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-lg font-medium text-gray-600">Loading meter details...</div>
      </div>
    );
  }

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

        <div className="w-96 border-r border-gray-200 shadow-md overflow-y-auto dark:text-whiteText daark:border-gray-700">
          <div className="p-6">
            {/* Device Image */}
            <div className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-md border-2 border-gray-200 overflow-hidden dark:border-gray-700 shadow-sm relative group">
              <div className="relative w-full h-56"> {/* Fixed height container */}
                <img
                  src={meter.image || require("../../assets/images/products/1.png")}
                  alt="Water Meter"
                  className="absolute inset-0 w-full h-full object-center"
                  loading="lazy" // Bonus: improves performance
                />
              </div>
            </div>

            {/* Title + Status Badge */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-md font-semibold text-gray-600 dark:text-whiteText font-oswald uppercase">
                {meter.name || 'Water Meter'}
              </h1>
              <span className="text-green-600 bg-green-50 dark:bg-blackText dark:border dark:border-gray-700 rounded-md  px-3 py-1.5 text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-green-700 rounded-full animate-pulse"></span>
                {meter.lock ? 'Locked' : 'Active'}
              </span>
            </div>

            <hr className="border-gray-200 dark:border-gray-700 my-6" />

            {/* General Information */}
            <h3 className="text-lg font-semibold text-gray-800 mb-8 dark:text-whiteText uppercase font-oswald">GENERAL INFORMATION</h3>
            <div className="space-y-4 text-sm font-poppins">
              <div className="flex justify-between items-center ">
                <span className="text-gray-600 dark:text-whiteText font-semibold">Serial Number</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 dark:text-whiteText">{meter.serial}</span>
                  <button
                    onClick={() => handleCopy(meter.serial, 'serial')}
                    className="w-8 h-8 hover:bg-gray-100 rounded-lg flex items-center justify-center transition"
                  >
                    {copied === 'serial' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-500 " />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-whiteText font-semibold">Description</span>
                <div className="flex items-center gap-2">
                  <span className="font-poppins text-xs px-2 py-1 ">{meter.description.slice(6)}</span>
                  {/* <button
                  onClick={() => handleCopy(meter.id, 'id')}
                  className="w-8 h-8 hover:bg-gray-100 rounded-lg flex items-center justify-center transition"
                >
                  {copied === 'id' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-500" />}
                </button> */}
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-whiteText font-semibold">Type</span>
                <span className="font-medium capitalize">{meter.type}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-whiteText font-semibold">Phone Number</span>
                <span className="font-medium capitalize">{meter.phone || " - "}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-whiteText font-semibold">Installed On</span>
                <span className="font-medium">{formatDate(meter.installedAt)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-whiteText font-semibold">Status</span>
                <span className={`px-3 py-1 rounded-md text-xs dark:bg-blackText dark:border dark:border-gray-700 font-medium ${meter.lock ? 'bg-red-100 text-red-800' : 'bg-green-100  text-green-800'}`}>
                  {meter.lock ? 'Locked' : 'Unlocked'}
                </span>
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700 my-6" />

            {/* Performance Summary */}
            <h3 className="text-lg font-semibold text-blackText mb-8 font-oswald uppercase dark:text-whiteText">PERFORMANCE REPORT</h3>
            <div className="space-y-4 text-sm font-poppins dark:text-whiteText">
              <div className="flex justify-between">
                <span className='text-gray-600 dark:text-whiteText font-semibold'>Total Revenue</span>
                <span className="font-bold text-green-600 text-md">TSH {totalRevenue.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className='text-gray-600 dark:text-whiteText font-semibold'>Volume Consumed</span>
                <span className="font-medium text-gray-900 dark:text-whiteText ">{totalVolume.toFixed(1)} m³</span>
              </div>

              <div className="flex justify-between">
                <span className='text-gray-600 dark:text-whiteText font-semibold'>Transactions</span>
                <span className="font-medium">{meter.transactions.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== RIGHT MAIN CONTENT ==================== */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-auto dark:text-whiteText">

            <div >
              <div className='flex mb-8 justify-between items-center px-4'>
                <div>
                  <h2 className="text-2xl font-bold text-blackText dark:text-whiteText font-oswald">Meter Details</h2>
                  <p className="text-gray-600 text-xs mt-1 font-poppins">
                     Last active just now
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                  onClick={() => setIsJobsSidebarOpen(true)}
                  className="p-3 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
                  aria-label="View jobs / processes"
                >
                  <IoEyeSharp className="w-4 h-4 text-indigo-600" />
                </button>
                  <button className="p-3 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition">
                    <IoSettingsOutline className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                    <IoTrashOutline className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

            {/* Assigned Field Officer */}
            <div className="dark:bg-blackText dark:text-whiteText text-blackText rounded-md shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
              <h3 className="text-lg font-medium font-oswald mb-4">Assigned Sales Manager</h3>
              {manager ? (
                <div className="flex items-center gap-5 font-poppins">
                  <div className="w-20 h-20 bg-gray-300 dark:bg-blackText dark:border dark:border-gray-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {manager.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-blackText dark:text-whiteText">{manager.name}</p>
                    <p className="text-sm text-gray-500">Sakes Officer</p>
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
            <div>
              <div className="py-4 flex justify-between items-center">
                <h3 className="text-md font-medium text-gray-800 dark:text-whiteText font-oswald">Recent Token Transactions</h3>
                <span className="text-sm font-medium text-gray-600 border border-gray-300 px-3 py-1 rounded">
                  Total Revenue: TSH {totalRevenue.toLocaleString()}
                </span>
              </div>

              {meter.transactions.length === 0 ? (
                <div className="p-12 text-center uppercase group text-gray-500 text-lg font-oswald h-full justify-center">
                  No transactions
                </div>
              ) : (
                <table className="w-full rounded-md shadow-sm border border-gray-200 dark:bg-blackText dark:border-gray-700 overflow-hidden">
                  <thead className="bg-gray-50 dark:bg-blackText border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        References
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Meter Numbers
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Methods
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
                      <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-darkTheme transition">
                        <td className="px-6 py-4 font-mono text-sm">{tx.receipt}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {tx.serial}
                        </td>
                        <td className="px-6 py-4 text-sm">{tx.method || 'Anonymous'}</td>
                        <td className="px-6 py-4 text-sm text-right font-medium">{tx.units.toFixed(1)}</td>
                        <td className="px-6 py-4 text-sm text-right font-semibold text-green-700">
                          {tx.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${tx.status === 'success'
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

        {/* ==================== RIGHT SIDEBAR (Jobs / Process List) ==================== */}
        {isJobsSidebarOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
              onClick={() => setIsJobsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <div className="fixed inset-y-0 right-0 w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold font-oswald uppercase dark:text-white">
                  Job Processes
                </h3>
                <button
                  onClick={() => setIsJobsSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                  aria-label="Close sidebar"
                >
                  <IoClose className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="h-full overflow-y-auto">
                {/* Pass the current meter id */}
                <Jobs selectedId={id as string} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}