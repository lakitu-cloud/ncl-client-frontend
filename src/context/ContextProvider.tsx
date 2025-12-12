import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { baseUrl } from '../config/urls';
import { Data } from '../types/context.types';

interface AppContextProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    showTokenTopUpIU?: string;
    isButtonPress: boolean;
    setIsButtonPress: React.Dispatch<React.SetStateAction<boolean>>;
    setShowTokenTopUpUI: (value: string) => void;
    meters: string[];
    setMeters: React.Dispatch<React.SetStateAction<string[]>>;
    dashboard: DashboardContextType;
}

interface DashboardContextType {
    data: Data | null;
    isLoading: boolean;
    error: unknown;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

// const fetchDashboardData = async (): Promise<Data> => {
//     const response = await fetch(`${baseUrl}/user/dashboard`, {
//         method: 'GET',
//         credentials: 'include',
//     });
//     if (!response.ok) {
//         throw new Error('Failed to fetch data');
//     }
//     const result = await response.json();
//     console.log(result)
//     return result.data;
// };

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeTab, setActiveTab] = useState('Managers');
    const [showTokenTopUpIU, setShowTokenTopUpUI] = useState('Token');
    const [isButtonPress, setIsButtonPress] = useState(false);

     const storedMeters = JSON.parse(localStorage.getItem('meters') || '[]');
     const [meters, setMeters] = useState<string[]>(storedMeters);
 
     useEffect(() => {
         localStorage.setItem('meters', JSON.stringify(meters));
     }, [meters]);

    const { data = null, isLoading, error } = useQuery<Data>({
        queryKey: ['dashboardData'],
        // queryFn: fetchDashboardData,
        refetchOnWindowFocus: true, // Refetch data when the page regains focus
    });

    const dashboard: DashboardContextType = {
        data,
        isLoading,
        error,
    };

    return (
        <AppContext.Provider
            value={{
                activeTab,
                setActiveTab,
                showTokenTopUpIU,
                setShowTokenTopUpUI,
                isButtonPress,
                setIsButtonPress,
                meters,
                setMeters,
                dashboard,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within a ContextProvider');
    }
    return context;
};
