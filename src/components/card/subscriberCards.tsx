import React from 'react';
import { HiCube } from 'react-icons/hi';
import { useApp } from '../../context/ContextProvider';

const CardSubscriber = () => {
      const { dashboard } = useApp();
        const { data } = dashboard;

   
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 font-oswald">
            <div className="bg-white shadow rounded-lg p-6 flex  items-center">
                <div className="bg-indigo-700 p-4 rounded">
                    <HiCube className="text-white" />
                </div>
                <div className="ml-6 items-center justify-center">
                    <h3 className="text-2xl font-bold text-gray-800">{data?.subscriber.total || 0}</h3>
                    <p className="text-sm text-gray-600">Total Subscribers</p>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6 flex items-center">
                <div className="bg-indigo-700 p-4 rounded">
                    <HiCube className="text-white" />
                </div>
                <div className="ml-6">
                    <h3 className="text-2xl font-bold text-gray-800">{ data?.subscriber.active || 0}</h3>
                    <p className="text-sm text-gray-600">Prepaid Subscribers</p>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6 flex items-center">
                <div className="bg-indigo-700 p-4 rounded">
                    <HiCube className="text-white" />
                </div>
                <div className="ml-6">
                    <h3 className="text-2xl font-bold text-gray-800">{data?.subscriber.postpaid || 0}</h3>
                    <p className="text-sm text-gray-600">Postpaid Subscribers</p>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6 flex items-center">
                <div className="bg-indigo-700 p-4 rounded">
                    <HiCube className="text-white" />
                </div>
                <div className="ml-6">
                    <h3 className="text-2xl font-bold text-gray-800">{data?.subscriber.inactive || 0}</h3>
                    <p className="text-sm text-gray-600">Pending Requests</p>
                </div>
            </div>
        </div>
    );
};

export default CardSubscriber;
