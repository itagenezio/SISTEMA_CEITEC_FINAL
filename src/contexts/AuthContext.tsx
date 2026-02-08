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

interface AuthState {
    user: User | null;
    role: Role | null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>(() => ({
        user: getFromStorage('current_user', null),
        role: getFromStorage('user_type', null)
    }));

    const login = (newRole: Role, userData: User) => {
        console.log('Auth: Sincronizando sessão...', { role: newRole });
        try {
            saveToStorage('current_user', userData);
            saveToStorage('user_type', newRole);
            setState({ user: userData, role: newRole });
        } catch (e) {
            console.error('Auth: Falha crítica no armazenamento!', e);
        }
    };

    const logout = () => {
        saveToStorage('current_user', null);
        saveToStorage('user_type', null);
        setState({ user: null, role: null });
    };

    return (
        <AuthContext.Provider value={{
            user: state.user,
            role: state.role,
            isAuthenticated: !!state.user,
            login,
            logout
        }}>
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
