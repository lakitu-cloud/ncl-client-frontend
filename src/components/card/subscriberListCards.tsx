import { HiCube, HiClock, HiCurrencyDollar, HiChartBar } from 'react-icons/hi';

interface SubscriberStatsCardProps {
  stats: {
    total: number;
    token: number;
    active: number;
    inactive: number;
  };
  isLoading?: boolean;
}

export const SubscriberListCards: React.FC<SubscriberStatsCardProps> = ({ stats, isLoading = false }) => {
  const cards = [
    { name: 'Total Subscribers', value: stats.total, icon: HiCube },
    { name: 'Inactive Subscribers', value: stats.inactive, icon: HiClock },
    { name: 'Token Subscribers', value: stats.token, icon: HiChartBar },
    { name: 'Card Subscribers', value: stats.active, icon: HiCurrencyDollar },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-md p-6 animate-pulse">
            <div className="bg-gray-200 w-16 h-16 rounded-md mb-4" />
            <div className="h-8 bg-gray-200 rounded w-24 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-32" />
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
            className="bg-white shadow-sm dark:bg-blackText dark:border-gray-700 border rounded-md p-6 flex items-center hover:shadow-xl transition-shadow"
          >
            <div className="bg-blue-600 dark:bg-white p-4 rounded-md">
              <Icon className="w-8 h-8 text-white dark:text-blue-600" />
            </div>
            <div className="ml-6">
              <h3 className="text-3xl font-bold text-gray-800 dark:text-whiteText">{card.value}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{card.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

