import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Progress } from '../../app/components/Progress';

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

export default function ProgressPage() {
    const { activities, submissions } = useData();
    const { user } = useAuth();
    const navigate = useNavigate();
    const mySubs = submissions.filter(s => s.studentId === user?.id);

    return <Progress onNavigate={(s) => handleStudentNavigate(navigate, s)} submissions={mySubs} activities={activities} currentUser={user} />;
}
