// src/components/meters/SalesMeterDetail.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Copy, Check, Edit2, X, Save, Upload } from 'lucide-react';
import { toast } from 'react-toastify';
import Header from '../../layout/navbar/Header';
import { useGetMeterById,  } from '../../hooks/useMeter'; // we'll create update hook
import { Meter } from '../../types/meterTypes';
import Assign from './Assign';
import { IoCreateOutline, IoSettingsOutline, IoTrashOutline } from 'react-icons/io5';

export default function SalesMeterDetail() {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMeter, setEditedMeter] = useState<Partial<Meter>>({});

  const { data: response, isPending, isError, error } = useGetMeterById(id!);
  // const updateMutation = useUpdateMeter();

  const meter = response?.meter;
  const manager = response?.manager;

  // Merge current meter with edited values
  const displayMeter = { ...meter, ...editedMeter } as Meter;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    toast.success('Copied!', { autoClose: 1500 });
    setTimeout(() => setCopied(null), 2000);
  };

  const handleEdit = () => {
    setEditedMeter({
      name: meter?.name || '',
      description: meter?.description || '',
      type: meter?.type || 'token',
      phone: meter?.phone || '',
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedMeter({});
    setIsEditing(false);
  };

  const handleSave = () => {
    // updateMutation.mutate(
    //   { id: id!, updates: editedMeter },
    //   {
    //     onSuccess: () => {
    //       toast.success('Meter updated successfully!');
    //       setIsEditing(false);
    //     },
    //     onError: () => {
    //       toast.error('Failed to update meter');
    //     },
    //   }
    // );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedMeter(prev => ({ ...prev, image: reader.result as string }));
        toast.info('Image ready to save');
      };
      reader.readAsDataURL(file);
    }
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

  const formatDate = (dateString: string) => format(new Date(dateString), 'PPP p');

  const totalRevenue = meter.transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const totalVolume = meter.transactions.reduce((sum, tx) => sum + tx.units, 0);

  return (
    <>
      <Header title="Meter Management" />

      <div className="flex h-screen">
        {/* LEFT SIDEBAR */}
        <div className="w-96 border-r border-gray-200 dark:border-gray-700 shadow-md dark:text-whiteText overflow-y-auto">
          <div className="p-6">
            {/* Meter Image */}
            <div className="mb-6 rounded-md overflow-hidden border-2 border-gray-200 dark:border-gray-700  shadow-md relative group">
              <img
                src={displayMeter.image || require('../../assets/images/products/5.png')}
                alt="Meter"
                className="w-full h-64 object-center"
                loading="lazy"
              />
              {isEditing && (
                <label className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="text-white text-center">
                    <Upload className="w-10 h-10 mx-auto mb-2" />
                    <p className="text-sm font-medium">Change Image</p>
                  </div>
                </label>
              )}
            </div>

            {/* Title + Actions */}
            <div className="flex justify-between items-start mb-6">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedMeter.name || ''}
                    onChange={(e) => setEditedMeter(prev => ({ ...prev, name: e.target.value }))}
                    className="text-xl font-bold font-oswald uppercase text-gray-800 border-b-2 border-blue-500 focus:outline-none"
                    placeholder="Meter description"
                  />
                ) : (
                  <h1 className="text-xl font-bold text-gray-800 dark:text-whiteText font-oswald uppercase">
                    {displayMeter.name || 'untitled'}
                  </h1>
                )}
              </div>

              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      // disabled={updateMutation.isPending}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            <hr className="border-gray-300 my-6" />

            {/* General Info - Editable Fields */}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-whiteText mb-4 uppercase font-oswald">GENERAL INFORMATION</h3>
            <div className="space-y-5 text-sm font-poppins">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-whiteText font-medium">Serial Number</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{meter.serial}</span>
                  <button onClick={() => handleCopy(meter.serial, 'serial')}>
                    {copied === 'serial' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-500" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-whiteText font-medium">Descriptions</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedMeter.description?.slice(-10) || ''}
                    onChange={(e) => setEditedMeter(prev => ({ ...prev, description: e.target.value }))}
                    className="px-3 py-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. Main House Meter"
                  />
                ) : (
                  <span className="font-medium">{displayMeter.description || 'Not set'}</span>
                )}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-whiteText font-medium">Type</span>
                {isEditing ? (
                  <select
                    value={editedMeter.type || ''}
                    onChange={(e) => setEditedMeter(prev => ({ ...prev, type: e.target.value }))}
                    className="px-3 py-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none capitalize"
                  >
                    <option value="token">Token</option>
                    <option value="card">Card</option>
                    <option value="direct">Direct</option>
                  </select>
                ) : (
                  <span className="font-medium capitalize">{displayMeter.type}</span>
                )}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-whiteText font-medium">SIM Number</span>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedMeter.phone || ''}
                    onChange={(e) => setEditedMeter(prev => ({ ...prev, phone: e.target.value }))}
                    className="px-3 py-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. +255..."
                  />
                ) : (
                  <span className="font-medium">{displayMeter.phone || 'No SIM'}</span>
                )}
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-whiteText font-medium">Installed On</span>
                <span className="font-medium">{formatDate(meter.installedAt)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-whiteText font-medium">Status</span>
                <span className={` text-sm font-bold ${meter.lock ? ' text-red-700' : 'text-green-700 dark:text-green-500'}`}>
                  {meter.lock ? 'Locked' : 'Active'}
                </span>
              </div>
            </div>

            <hr className="border-gray-300 my-6" />

            {/* Performance Summary */}
            <h3 className="text-lg font-semibold dark:text-whiteText text-gray-800 mb-4 uppercase font-oswald">PERFORMANCE REPORT</h3>
            <div className="space-y-4 text-gray-600 font-poppins dark:text-whiteText">
              <div className="flex justify-between">
                <span>Total Revenue</span>
                <span className="font-bold text-green-600 text-md">TSH {totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Volume Sold</span>
                <span className="font-medium">{totalVolume.toFixed(1)} m³</span>
              </div>
              <div className="flex justify-between">
                <span>Transactions</span>
                <span className="font-medium">{meter.transactions.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-auto dark:text-whiteText">
            <div className='mb-8 flex justify-between items-center px-4'>

              <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-whiteText font-oswald">Meter Overview</h2>
              <p className="text-gray-600 dark:text-whiteText mt-2 text-sm  ">
                Serial: <span className="font-poppins font-bold">{meter.serial}</span> • Managed by Sales Team
              </p>
              
            </div>

            <div className="flex items-center gap-3">
                <button className="p-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                  <IoCreateOutline className="w-4 h-4 text-indigo-600" />
                </button>
                <button className="p-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                  <IoSettingsOutline className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition">
                  <IoTrashOutline className="w-4 h-4" />
                </button>
              </div>

            </div>
            

            {/* Assigned Manager */}
            <Assign 
              meterId={id!}
              subscriberId={meter.subscriberId}
              onAssignmentChange={() => {
                // Optional: refetch meter to update UI instantly
                // Or rely on React Query cache invalidation from hooks
              }}
            />

            {/* Transactions Table */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="text-xl font-bold text-gray-800">Token Sales History</h3>
                <span className="text-lg font-bold text-green-700">
                  Total Revenue: TSH {totalRevenue.toLocaleString()}
                </span>
              </div>

              {meter.transactions.length === 0 ? (
                <div className="p-16 text-center text-gray-500">
                  <p className="text-lg">No token purchases recorded yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-8 py-4 text-sm font-bold text-gray-600 uppercase">Reference</th>
                        <th className="text-left px-8 py-4 text-sm font-bold text-gray-600 uppercase">Meter Number</th>
                        <th className="text-left px-8 py-4 text-sm font-bold text-gray-600 uppercase">Method</th>
                        <th className="text-right px-8 py-4 text-sm font-bold text-gray-600 uppercase">Units</th>
                        <th className="text-right px-8 py-4 text-sm font-bold text-gray-600 uppercase">Amount</th>
                        <th className="text-center px-8 py-4 text-sm font-bold text-gray-600 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {meter.transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-blue-50 transition">
                          <td className="px-8 py-5 font-mono text-sm">{tx.reference}</td>
                          <td className="px-8 py-5 text-sm text-gray-700">{tx.serial}</td>
                          <td className="px-8 py-5 text-sm">{tx.method}</td>
                          <td className="px-8 py-5 text-sm text-right font-semibold">{tx.units.toFixed(1)}</td>
                          <td className="px-8 py-5 text-sm text-right font-bold text-green-700">
                            TSH {tx.amount.toLocaleString()}
                          </td>
                          <td className="px-8 py-5 text-center">
                            <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold ${
                              tx.status === 'success' ? 'bg-green-100 text-green-800' :
                              tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {tx.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}