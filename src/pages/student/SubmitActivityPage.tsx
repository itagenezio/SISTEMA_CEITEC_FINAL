import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { SubmitActivity } from '../../app/components/SubmitActivity';

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

export default function SubmitActivityPage() {
    const { activityId } = useParams();
    const { activities, addSubmission } = useData();
    const navigate = useNavigate();

    return (
        <SubmitActivity
            onNavigate={(s) => handleStudentNavigate(navigate, s)}
            onSubmit={addSubmission}
            activityId={activityId || ''}
            activities={activities}
        />
    );
}
