import { HiCube, HiClock, HiCurrencyDollar, HiChartBar } from 'react-icons/hi';
import { useApp } from '../../context/ContextProvider';

const CardMeter = () => {
    const data = {
        transaction: {
            total_units: 0,
            total_revenue: 0
        },
        meter: {
            total: 0,
            inactive: 0,
            active: 0,

        }
    }

    // Define card details and icon mapping
    const cardDetails = [
        {
            name: 'Total Managers',
            value: data?.meter.total || 0,
            icon: HiCube,
        },
        {
            name: 'Inactive Manager',
            value: data?.meter.inactive || 0,
            icon: HiClock,
        },
        {
            name: 'Total Customers',
            value: `${data?.transaction.total_units || 0}`,
            icon: HiChartBar,
        },
        {
            name: 'Collected Revenue',
            value: `TZS ${data?.transaction.total_revenue || 0}`,
            icon: HiCurrencyDollar,
        },
    ];

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 font-oswald">
            {cardDetails.map((card, index) => {
                const Icon = card.icon;
                return (
                    <div key={index} className="bg-white dark:bg-blackText shadow rounded-lg p-6 flex items-center">
                        <div className="bg-blueTheme p-4 rounded dark:bg-white">
                            <Icon className="text-white dark:text-blackText" />
                        </div>
                        <div className="ml-6 text-nowrap">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-whiteText">{card.value}</h3>
                            <p className="text-sm text-gray-600 dark:text-whiteText">{card.name}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CardMeter;
