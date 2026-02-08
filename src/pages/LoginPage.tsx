import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Login } from '../app/components/Login';

export function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (userType: 'student' | 'teacher', userData: any) => {
        login(userType, userData);

        // Redirect based on role
        if (userType === 'student') {
            navigate('/student');
        } else {
            navigate('/teacher');
        }
    };

    return <Login onLogin={handleLogin} />;
}
