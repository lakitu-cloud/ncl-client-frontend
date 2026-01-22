// src/components/card/SubscriberRankingCard.tsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGetSubs } from '../../../../hooks/useSubscriber';
import { SubscriberPayload } from '../../../../types/subscriberTypes';

const getMedal = (rank: number) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
};

export const SubscriberRankingCard = () => {
  const { data: subscribers = [], isPending } = useGetSubs();

  const ranking = useMemo(() => {
    if (isPending || subscribers.length === 0) return [];

    const map = new Map<string, {
      name: string;
      phone: string;
      revenue: number;
      units: number;
      count: number;
    }>();

    subscribers.forEach((sub: SubscriberPayload) => {
      if (!sub.transactions?.length) return;

      const totalRevenue = sub.transactions.reduce((sum, tx) => sum + tx.amount, 0);
      const totalUnits = sub.transactions.reduce((sum, tx) => sum + tx.units, 0);

      map.set(sub.id, {
        name: sub.name || 'Unknown',
        phone: sub.phone || 'N/A',
        revenue: totalRevenue,
        units: totalUnits,
        count: sub.transactions.length,
      });
    });

    return Array.from(map.entries())
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 20); // Max 20 — safe for scrolling
  }, [subscribers, isPending]);

  return (
    // EXACT SAME GRID SIZE — NEVER CHANGES HEIGHT
    <div className="col-start-5 row-start-1 col-span-2 row-span-2 bg-white/80 dark:bg-blackText backdrop-blur-xl rounded-md shadow-dm border border-white/20 dark:border-gray-700 p-6 flex flex-col overflow-auto">
      {/* Fixed Header */}
      <header className="flex-shrink-0 mb-2">
        <h3 className="text-sm font-semibold font-oswald text-gray-800 dark:text-white">
          Top 5 Subscribers by Revenue
        </h3>
        {/* <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Highest revenue contributors
        </p> */}
      </header>

      {/* Scrollable Content — This is the key */}
      <div className="flex-1 overflow-x-auto space-y-3 -mx-1 px-1">
        {isPending ? (
          // Loading Skeleton — fixed height items
          <>
            <div>Loading...</div>
          </>
        ) : ranking.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            No revenue data available yet
          </p>
        ) : (
          ranking.map((sub, index) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ x: 4 }}
              className={`relative px-4 py-1 rounded-md overflow-auto transition-all flex items-center ${
                index === 0
                  ? 'bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-amber-500/50'
                  : index === 1
                  ? 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border border-gray-500/50'
                  : index === 2
                  ? 'bg-gradient-to-r from-orange-600/20 to-orange-700/20 border border-orange-600/50'
                  : 'bg-gray-50/80 dark:bg-gray-700/50 border border-gray-300/50 dark:border-gray-600/50'
              }`}
            >
              <div className="flex items-center gap-1 flex-1">
                <div className="text-xs font-semibold w-12 text-center">{getMedal(index + 1)}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 dark:text-white text-xs">
                    {sub.name}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {sub.phone} • {sub.count} transactions
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs font-semibold text-green-600 dark:text-green-400">
                  TZS {sub.revenue.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {sub.units.toLocaleString()} units
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Fixed Footer */}
      {!isPending && ranking.length > 0 && (
        <div className="flex-shrink-0 mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          <button className="w-full text-center text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium">
            View full ranking →
          </button>
        </div>
      )}
    </div>
  );
};