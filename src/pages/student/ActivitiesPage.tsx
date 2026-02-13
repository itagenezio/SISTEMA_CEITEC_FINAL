import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Activities } from '../../app/components/Activities';

const handleStudentNavigate = (navigate: any, screen: string, id: string | undefined = undefined) => {
    const routeMap: Record<string, string> = {
        'student-dashboard': '/student',
        'activities': '/student/activities',
        'portfolio': '/student/portfolio',
        'progress': '/student/progress',
        'learning-paths': '/student/learning-paths',
        'submit-activity': id ? `/student/activities/${id}/submit` : '/student/activities',
        'logout': '/login'
    };
    const target = routeMap[screen];
    if (target) navigate(target);
};

export default function ActivitiesPage() {
    const { activities, submissions } = useData();
    const { user } = useAuth();
    const navigate = useNavigate();
    const mySubs = submissions.filter(s => s.studentId === user?.id);

    return <Activities onNavigate={(s, id) => handleStudentNavigate(navigate, s, id)} activities={activities} submissions={mySubs} />;
}
