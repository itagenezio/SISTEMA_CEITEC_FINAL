import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Login } from '../app/components/Login';

export function LoginPage() {
    const { login, isAuthenticated, role } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(role === 'student' ? '/student' : '/teacher');
        }
    }, [isAuthenticated, role, navigate]);

    const handleLogin = (userType: 'student' | 'teacher', userData: any) => {
        login(userType, userData);

        // Redirect based on role
        if (userType === 'student') {
            navigate('/student');
        } else {
            navigate('/teacher');
        }
    };

    if (isAuthenticated) return null;

    return <Login onLogin={handleLogin} />;
}
