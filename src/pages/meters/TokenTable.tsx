// src/components/tables/TokenTable.tsx
import React from 'react';
import { format } from 'date-fns'; // ← make sure you have date-fns installed
import { useTokenMeter } from '../../hooks/useToken';
import { Loader2 } from 'lucide-react'; // optional loading icon
import { toast } from 'react-toastify';
import { TopUpPayload } from '../../types/rechargeTypes';

interface Props {
  meterId: string;
}

const TokenTable: React.FC<Props> = ({ meterId }) => {
  const {
    data: token = [],
    isLoading,
    isError,
    error,
  } = useTokenMeter(meterId);

  // Optional: show toast on error (good UX)
  React.useEffect(() => {
    if (isError && error) {
      toast.error(`Failed to load tamper tokens: ${error.message}`);
    }
  }, [isError, error]);

  if (isLoading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p>Loading clear tamper tokens...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-12 text-center text-red-600 dark:text-red-400">
        <p className="text-lg font-medium">Failed to load tokens</p>
        <p className="text-sm mt-2">{error?.message || 'Please try again later'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-whiteText font-oswald">
          Clear Tamper Tokens
        </h3>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700 px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-800">
          {token.length} record{token.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Empty State */}
      {token.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
            No clear tamper tokens found
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Tokens of type "clear" will appear here when generated
          </p>
        </div>
      ) : (
        /* Clear Tokens Table */
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Token
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created At
                </th>
                
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {token.map((token: TopUpPayload) => (
                <tr
                  key={token.serial}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-700 dark:text-gray-300">
                    {token.reference}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm font-semibold text-gray-900 dark:text-white">
                    {token.token}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        token.status === 'active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                          : token.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                      }`}
                    >
                      {token.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {format(new Date(token.createdAt), 'dd MMM yyyy, HH:mm')}
                  </td>
         
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TokenTable;