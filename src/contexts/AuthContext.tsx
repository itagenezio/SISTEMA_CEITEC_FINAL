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

    useEffect(() => {
        saveToStorage('current_user', user);
        saveToStorage('user_type', role);
    }, [user, role]);

    const login = (newRole: Role, userData: User) => {
        console.log('AuthContext: Logging in...', { newRole, userData });
        // Set storage SYNCly first
        saveToStorage('current_user', userData);
        saveToStorage('user_type', newRole);
        // Then update state
        setRole(newRole);
        setUser(userData);
    };

    const logout = () => {
        console.log('AuthContext: Logging out...');
        saveToStorage('current_user', null);
        saveToStorage('user_type', null);
        setRole(null);
        setUser(null);
        // Clear only our keys to be safe
        localStorage.removeItem('inovatec_current_user');
        localStorage.removeItem('inovatec_user_type');
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
