// components/AccountTypeSelector.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    onSelect: (type: 'sales' | 'zone', remember: boolean) => void;
}

const AccountTypeSelector: React.FC<Props> = ({ onSelect }) => {
    const [remember, setRemember] = useState(true);

    return (
        <div
            // className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12"
            className='w-full items-start align-text-top'
        >
            {/* Selector Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 sm:gap-6 lg:gap-6 mb-4 sm:mb-12">
                {/* Zone Manager */}
                <button type="button" onClick={() => onSelect('zone', remember)} className='flex justify-between align-top gap-8 bg-gradient-to-br from-blue-600 to-blue-700 dark:bg-white dark:text-whiteText hover:text-gray-400 text-white rounded-md p-4 sm:p-2 lg:p-4 shadow-sm hover:shadow-md transform hover:-translate-y-3 transition-all duration-300 overflow-hidden'>
                    <div className='w-96 h-32 sm:w-72 sm:h-28 z-10 dark:text-whiteText'>
                        <svg className="w-full h-full drop-shadow-lg" viewBox="0 0 64 64" fill="currentColor">
                            <path d="M56 8H8c-2.2 0-4 1.8-4 4v40c0 2.2 1.8 4 4 4h48c2.2 0 4-1.8 4-4V12c0-2.2-1.8-4-4-4zM24 48H12V40h12v8zm0-16H12V24h12v8zm24 16H36V40h12v8zm0-16H36V24h12v8z" />
                        </svg>
                    </div>
                    <div className='text-start'>
                        <h1 className="font-bold mb-1 text-md sm:text-sm font-oswald">Zone Manager</h1>
                        <p className='text-xs text-blue-100 sm:text-xs opacity-90'>Access, monitor and contrl your entire prepaid water meter utilities from
                            a single web browser-based interface. Compatible with most browsers accross
                            all platforms requires no installation or additional
                        </p>
                    </div>

                </button>


                <button
                    type='button'
                    onClick={() => onSelect('sales', remember)}
                    className='flex align-start justify-between gap-8 bg-white border-2 p-4 sm:p-2 lg:p-4 border-gray-200 text-gray-700 rounded-md shadow-sm hover:shadow-sm hover:border-gray-300 transform hover:-translate-y-3 transition-all duration-300 overflow-hidden dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'>
                    <div className='w-96 h-32 sm:w-72 sm:h-28 text-start '>
                        <svg className="w-full h-full drop-shadow" viewBox="0 0 64 64" fill="currentColor">
                            <path d="M32 2C15.43 2 2 15.43 2 32s13.43 30 30 30 30-13.43 30-30S48.57 2 32 2zm0 54c-13.25 0-24-10.75-24-24s10.75-24 24-24 24 10.75 24 24-10.75 24-24 24z" />
                            <path d="M42 32a10 10 0 1 0-20 0 10 10 0 0 0 20 0z" />
                        </svg>
                    </div>
                    <div className='text-start'>
                        <h1 className='font-bold mb-1 text-md sm:text-sm font-oswald'>Sales Manager</h1>
                        <p className='text-sm sm:text-xs'>
                            Access, monitor and contrl your entire prepaid water meter utilities from
                            a single web browser-based interface. Compatible with most browsers accross
                            all platforms requires no installation or additional
                        </p>
                    </div>

                </button>
            </div>

            {/* Remember Toggle */}
            <div className="flex align-middle text-center justify-start dark:text-gray-200">
                <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className="w-12 h-7 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600 transition-colors"></div>
                    <span className="ml-3 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-400 font-oswald">
                        Remember my choice
                    </span>
                </label>
            </div>
        </div>

    );
};

export default AccountTypeSelector;