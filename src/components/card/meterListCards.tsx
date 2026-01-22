// src/components/card/meterListCards.tsx
import { useMemo } from 'react';
import { HiCube, HiClock, HiCurrencyDollar, HiChartBar } from 'react-icons/hi';
import { Meter } from '../../types/meterTypes';

interface MeterListCardsProps {
  meters: Meter[];
  isLoading: boolean;
}

export const  MeterListCards: React.FC<MeterListCardsProps> = ({ meters, isLoading }) => {
  const stats = useMemo(() => {
    if (isLoading || meters.length === 0) {
      return { total: 0, token: 0, card: 0, inactive: 0 };
    }

    let token = 0;
    let card = 0;
    let inactive = 0;

    meters.forEach((meter) => {
      const type = meter.type?.toLowerCase();
      const status = meter.status?.toLowerCase();
      const check = meter.managerId === null

      if (type === 'token') token++;
      if (type === 'card') card++;
      if (check) inactive++;
    });

    return {
      total: meters.length,
      token,
      card,
      inactive,
    };
  }, [meters, isLoading]);

  const cards = [
    { name: 'Total Meters', value: stats.total, icon: HiCube },
    { name: 'Inactive Meters', value: stats.inactive, icon: HiClock },
    { name: 'Token Meters', value: stats.token, icon: HiChartBar },
    { name: 'Card Meters', value: stats.card, icon: HiCurrencyDollar },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-blackText rounded-xl p-6 animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 w-16 h-16 rounded-xl mb-4" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 font-oswald">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            className="bg-white dark:bg-blackText shadow-sm rounded-md p-6 flex items-center hover:shadow-sm transition-shadow"
          >
            <div className="bg-blue-600 dark:bg-white p-4 rounded-md">
              <Icon className="w-8 h-8 text-white dark:text-blue-600" />
            </div>
            <div className="ml-6">
              <h3 className="text-3xl font-bold text-gray-800 dark:text-whiteText">
                {card.value}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {card.name}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};