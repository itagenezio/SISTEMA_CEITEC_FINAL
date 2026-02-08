import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Login } from '../app/components/Login';

export function LoginPage() {
    const { login, isAuthenticated, role } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Only redirect if fully authenticated and role is present
        if (isAuthenticated && role) {
            const dest = role === 'student' ? '/student' : '/teacher';
            console.log('Auto-redirecting to:', dest);
            navigate(dest, { replace: true });
        }
    }, [isAuthenticated, role, navigate]);

    const handleLogin = (userType: 'student' | 'teacher', userData: any) => {
        console.log('Handling login for:', userType);
        login(userType, userData);
    };

    // Show loading or nothing if already authenticated to prevent flicker
    if (isAuthenticated && role) return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
    );

    return <Login onLogin={handleLogin} />;
}
