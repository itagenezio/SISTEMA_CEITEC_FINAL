import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Portfolio } from '../../app/components/Portfolio';

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

export default function PortfolioPage() {
    const { activities, submissions, deleteSubmission } = useData();
    const { user } = useAuth();
    const navigate = useNavigate();
    const mySubs = submissions.filter(s => String(s.studentId || s.student_id) === String(user?.id));

    return <Portfolio onNavigate={(s) => handleStudentNavigate(navigate, s)} submissions={mySubs} activities={activities} onDeleteSubmission={deleteSubmission} />;
}
