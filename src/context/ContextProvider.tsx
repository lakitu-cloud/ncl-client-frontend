// ContextProvider.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';


interface AppContextProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    showTokenTopUpIU?: string;
    setShowTokenTopUpUI: (value: string) => void;
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


    return (
        <AppContext.Provider
            value={{
                activeTab,
                setActiveTab,
                showTokenTopUpIU,
                setShowTokenTopUpUI,
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