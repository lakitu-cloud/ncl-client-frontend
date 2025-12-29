  // src/pages/manager/[id].tsx
  import React, { useState } from 'react';
  import { useDeleteManager, useManagerById } from '../../hooks/useManager';
  import {
    IoPeopleOutline,
    IoTrashOutline,
    IoSettingsOutline,
    IoCreateOutline,
    IoAnalyticsOutline,
    IoDocumentTextOutline,
    IoPersonOutline,
  } from 'react-icons/io5';
  import { format } from 'date-fns';
  import { Link, useParams } from 'react-router-dom';
  import Header from '../../layout/navbar/Header';
  import { MetersTable } from './components/MeterTable';
  import { SubscribersTable } from './components/SubscriberTable';
  import { ReportsTab } from './components/Report';
  import { AnalysisTab } from './components/Analysis';
  import { SettingsTab } from './components/Settings';
  import { Manager } from '../../types/managerType';
  import DeleteModal from '../../components/modal/deleteModel';
  import { UpdateSalesManager } from '../../components/modal/updateManager';

  type Tab = 'meters' | 'subscribers' | 'reports' | 'analysis' | 'settings';

  export const ManagerDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: manager, isLoading, error } = useManagerById(id!);
    const [activeTab, setActiveTab] = useState<Tab>('meters');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [managerToDelete, setManagerToDelete] = useState<{ id: string; name: string } | null>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [managerToEdit, setManagerToEdit] = useState<Manager | null>(null);

    const openUpdateModal = (manager: Manager) => {
      setManagerToEdit(manager);
      setIsUpdateModalOpen(true);
    };

    const deleteManager = useDeleteManager();

    const openDeleteModal = (id: string, name: string) => {
      setManagerToDelete({ id, name });
      setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
      setIsDeleteModalOpen(false);
      setManagerToDelete(null);
    };

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        </div>
      );
    }

    if (error || !manager) {
      return (
        <div className="text-center py-32">
          <p className="text-2xl text-red-600 mb-4">Manager not found</p>
          <Link to="/managers" className="text-indigo-600 hover:underline">
            Back to Managers List
          </Link>
        </div>
      );
    }

    // const totalRevenue = manager.meters.reduce((sum, m) => sum + (m.revenueGenerated || 0), 0);
    // const totalUnits = manager.transactions.reduce((sum, m) => sum + (m.units || 0), 0);
    const activeMeters = manager.meters.filter((m) => m.status === 'active').length;
    const totalSubscribers = manager.subscribers.length

    const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
      { id: 'meters', label: 'Meters', icon: <IoPeopleOutline className="w-5 h-5" /> },
      { id: 'subscribers', label: 'Subscribers', icon: <IoPersonOutline className="w-5 h-5" /> },
      { id: 'reports', label: 'Reports', icon: <IoDocumentTextOutline className="w-5 h-5" /> },
      { id: 'analysis', label: 'Analysis', icon: <IoAnalyticsOutline className="w-5 h-5" /> },
      { id: 'settings', label: 'Settings', icon: <IoSettingsOutline className="w-5 h-5" /> },
    ];

    return (
      <>
        <Header title="Manager Manangement" />

        <div className="flex h-screen">
          {/* LEFT SIDEBAR - Fixed, Full Height, Scrollable */}
          <aside className="w-80 border-r border-gray-400 dark:border-gray-700 flex flex-col overflow-y-auto">
            {/* Profile Section */}
            <div className="p-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="w-32 h-32 uppercase font-oswald bg-gradient-to-br from-blueTheme to-blue-800 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-xl">
                    {manager.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </div>
                  {/* <div className="absolute bottom-0 right-0 w-12 h-12 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                    <IoCheckmarkCircle className="w-8 h-8 text-white" />
                  </div> */}
                </div>

                <h2 className="text-2xl uppercase font-oswald font-bold text-blackText dark:text-whiteText">{manager.name}</h2>
                <p className="text-blueTheme dark:text-blue-600 uppercase font-poppins font-bold mt-1">Sales Manager</p>

              </div>
            </div>

            {/* Basic Information */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg uppercase font-semibold text-gray-800 dark:text-whiteText mb-6 flex items-center gap-2 font-oswald">
                General Information
              </h3>

              <dl className="space-y-4 text-sm text-blackText dark:text-whiteText font-poppins">
                <div className="flex item-center justify-between">
                  <dt className=" font-medium">Phone</dt>
                  <dd className="font-medium mt-1">{manager.phone}</dd>
                </div>

                <div className="flex item-center justify-between">
                  <dt className="font-medium">Service Area</dt>
                  <dd className="font-medium mt-1">
                    {manager.ward}, {manager.district}
                  </dd>
                </div>
                <div className="flex item-center justify-between">
                  <div className='font-medium'>Region</div>
                  <div>{manager.region}</div>
                </div>

                <div className="flex item-center justify-between">
                  <dt className="font-medium">Registered</dt>
                  <dd className="font-medium mt-1">
                    {manager.createdAt ? format(new Date(manager.createdAt), 'dd MMM yyyy') : '—'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Financial & Performance */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg uppercase font-semibold text-gray-800 dark:text-whiteText mb-6 flex items-center gap-2 font-oswald">
                Financial Summary
              </h3>

              <dl className="space-y-4 text-sm text-blackText dark:text-whiteText font-poppins">
                <div className="flex item-center justify-between">
                  <dt className="font-medium">Total Revenue</dt>
                  <dd className="font-medium mt-1">{manager.phone}</dd>
                </div>

                <div className="flex item-center justify-between">
                  <dt className="font-medium">Revenue Today</dt>
                  <dd className="font-medium mt-1">
                    50500 TZS
                  </dd>
                </div>
                <div className="flex item-center justify-between">
                  <div className='font-medium'>Price per Unit</div>
                  <div>{manager.ppu}</div>
                </div>
              </dl>
            </div>

            {/* Performance anaylsis */}
            <div className="p-4">
              <h3 className="text-lg uppercase font-semibold text-gray-800 dark:text-whiteText mb-6 flex items-center gap-2 font-oswald">
                Zone Performance
              </h3>

              <dl className="space-y-4 text-sm text-blackText dark:text-whiteText font-poppins">
                <div className="flex item-center justify-between">
                  <dt className="font-medium">Total Customers</dt>
                  <dd className="font-medium mt-1">{`${totalSubscribers || 0}`}</dd>
                </div>

                <div className="flex item-center justify-between">
                  <dt className="font-medium">Total Meters</dt>
                  <dd className="font-medium mt-1">
                    {activeMeters}
                  </dd>
                </div>
                <div className="flex item-center justify-between">
                  <div className='font-medium'>Volume Consumed</div>
                  <div>5034 m3</div>
                </div>
              </dl>
            </div>

          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-full px-12 py-8">
              {/* Page Header with Actions */}
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-oswald font-bold text-blackText dark:text-whiteText uppercase">Manager Details</h1>

                <div className="flex items-center gap-3">
                  <button
                  onClick={() => openUpdateModal(manager)}
                  className="p-3 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition">
                    <IoCreateOutline className="w-4 h-4 text-blue-600" />
                </button>
     
                 <button
                  onClick={() => openDeleteModal(manager.id, manager.name)}
                  className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                    <IoTrashOutline className="w-4 h-4" />
                </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-4 border-b dark:border-gray-700">
                <nav className="flex flex-wrap -mb-px text-sm font-medium text-center font-poppins">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-block p-4 border-b-2 rounded-t-base text-gray-800 dark:text-whiteText ${activeTab === tab.id
                          ? 'text-blueTheme border-blue-600'
                          : 'text-gray-500 border-transparent dark:border-gray-700 hover:text-gray-400'
                        }`}
                    >
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="mt-8 ">
                {activeTab === 'meters' && <MetersTable meters={manager?.meters || []} />}

                {activeTab === 'subscribers' && <SubscribersTable subscribers={manager?.subscribers} />}
                {activeTab === 'reports' && <ReportsTab />}
                {activeTab === 'analysis' && <AnalysisTab />}
                {activeTab === 'settings' && <SettingsTab />}
              </div>
              {isDeleteModalOpen && managerToDelete && (
                <DeleteModal
                  managerId={managerToDelete.id}
                  managerName={managerToDelete.name}
                  onClose={closeDeleteModal}
                />
              )}
              {isUpdateModalOpen && (
                <UpdateSalesManager
                  isOpen={isUpdateModalOpen}
                  onClose={() => setIsUpdateModalOpen(false)}
                  manager={managerToEdit}
                />
              )}
            </div>

          </main>
        </div>
      </>
    );
  };