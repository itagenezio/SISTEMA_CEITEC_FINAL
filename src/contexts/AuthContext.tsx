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
        setRole(newRole);
        setUser(userData);
    };

    const logout = () => {
        setRole(null);
        setUser(null);
        localStorage.clear(); // Careful with clearing everything if other apps use localhost? No, usually fine.
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
