import React from 'react';
import { HiCube } from 'react-icons/hi';
import { useApp } from '../../context/ContextProvider';

const CardSubscriber = () => {
      const data = {
        subscriber: {
            total: 0,
            active: 0,
            postpaid: 0,
            inactive: 0
        }
      }

   
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 font-oswald">
            <div className="bg-white dark:bg-blackText dark:border-2 dark:border-gray-600 shadow-sm rounded-md p-6 flex items-center">
                <div className="bg-indigo-700 dark:bg-white p-4 rounded">
                    <HiCube className="text-white dark:text-black" />
                </div>
                <div className="ml-6 items-center justify-center">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{data?.subscriber.total || 0}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-200">Total Subscribers</p>
                </div>
            </div>

            <div className="bg-white dark:bg-blackText dark:border-2 dark:border-gray-600 shadow-sm rounded-md p-6 flex items-center">
                <div className="bg-indigo-700 dark:bg-white p-4 rounded">
                    <HiCube className="text-white dark:text-black" />
                </div>
                <div className="ml-6">
                    <h3 className="text-2xl font-bold dark:text-gray-200 text-gray-800">{ data?.subscriber.active || 0}</h3>
                    <p className="text-sm dark:text-gray-200 text-gray-600">Prepaid Subscribers</p>
                </div>
            </div>

            <div className="bg-white dark:bg-blackText dark:border-2 dark:border-gray-600 shadow-sm rounded-md p-6 flex items-center">
                <div className="bg-indigo-700 dark:bg-white p-4 rounded">
                    <HiCube className="text-white dark:text-black" />
                </div>
                <div className="ml-6">
                    <h3 className="text-2xl font-bold dark:text-gray-200 text-gray-800">{data?.subscriber.postpaid || 0}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-200">Postpaid Subscribers</p>
                </div>
            </div>

            <div className="bg-white dark:bg-blackText dark:border-2 dark:border-gray-600 shadow-sm rounded-md p-6 flex items-center">
                <div className="bg-indigo-700 dark:bg-white p-4 rounded">
                    <HiCube className="text-white dark:text-black" />
                </div>
                <div className="ml-6">
                    <h3 className="text-2xl font-bold dark:text-gray-200 text-gray-800">{data?.subscriber.inactive || 0}</h3>
                    <p className="text-sm dark:text-gray-200 text-gray-600">Pending Requests</p>
                </div>
            </div>
        </div>
    );
};

export default CardSubscriber;
