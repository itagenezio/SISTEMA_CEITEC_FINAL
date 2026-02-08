import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role } from '../types';
import { getFromStorage, saveToStorage } from '../app/utils/storage';

interface AuthContextType {
    user: User | null;
    role: Role | null;
    isAuthenticated: boolean;
    login: (role: Role, userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => getFromStorage('current_user', null));
    const [role, setRole] = useState<Role | null>(() => getFromStorage('user_type', null));

    const login = (newRole: Role, userData: User) => {
        console.log('Auth: Entering login protocol...', { role: newRole });
        try {
            // Force save to disk first
            localStorage.setItem('inovatec_current_user', JSON.stringify(userData));
            localStorage.setItem('inovatec_user_type', JSON.stringify(newRole));

            setRole(newRole);
            setUser(userData);
        } catch (e) {
            console.error('Auth: Critical storage failure!', e);
        }
    };

    const logout = () => {
        localStorage.removeItem('inovatec_current_user');
        localStorage.removeItem('inovatec_user_type');
        setRole(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, role, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
