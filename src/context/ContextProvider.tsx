// ContextProvider.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { baseUrl } from '../config/urls';
import { Data } from '../types/context.types';

interface DashboardContextType {
    data: Data | null;
    isLoading: boolean;
    error: unknown;
}

interface AppContextProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    showTokenTopUpIU?: string;
    setShowTokenTopUpUI: (value: string) => void;
    meters: string[];
    setMeters: React.Dispatch<React.SetStateAction<string[]>>;
    dashboard: DashboardContextType;
    isButtonPress: boolean;
    setIsButtonPress: React.Dispatch<React.SetStateAction<boolean>>;
    accountType: 'sales' | 'zone' | null;
    setAccountType: React.Dispatch<React.SetStateAction<'sales' | 'zone' | null>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeTab, setActiveTab] = useState('Managers');
    const [showTokenTopUpIU, setShowTokenTopUpUI] = useState('Token');
    const [isButtonPress, setIsButtonPress] = useState(false);

    const [accountType, setAccountType] = useState<'sales' | 'zone' | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('preferredAccountType') as 'sales' | 'zone' | null;
        if (saved) {
            setAccountType(saved);
        }
    }, []);

    const storedMeters = JSON.parse(localStorage.getItem('meters') || '[]');
    const [meters, setMeters] = useState<string[]>(storedMeters);

    useEffect(() => {
        localStorage.setItem('meters', JSON.stringify(meters));
    }, [meters]);

    const { data = null, isLoading, error } = useQuery<Data>({
        queryKey: ['dashboardData'],
        // queryFn: fetchDashboardData,
        refetchOnWindowFocus: true,
    });

    const dashboard: DashboardContextType = { data, isLoading, error };

    return (
        <AppContext.Provider
            value={{
                activeTab,
                setActiveTab,
                showTokenTopUpIU,
                setShowTokenTopUpUI,
                meters,
                setMeters,
                dashboard,
                isButtonPress,
                setIsButtonPress,
                accountType,
                setAccountType,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within a ContextProvider');
    }
    return context;
};