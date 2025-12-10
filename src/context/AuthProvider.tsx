// src/context/AuthProvider.tsx

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    token: string | null;
    user: string | null;
    // accountType: 'sales' | 'zone';
    // onChangeAccountType: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [ user, setUser ] = useState<string | null>("sales")
    
    useEffect(() => {
        const token = Cookies.get('auth');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token: string) => {
        setToken(token);
        const expires = new Date(Date.now() + 1 * 60 * 60 * 1000);
        Cookies.set('auth', token, { expires });
    };

    const logout = () => {
        setToken(null);
        Cookies.remove('auth');
        Cookies.remove('email');
        localStorage.removeItem('meters')
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, login, logout, token, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
