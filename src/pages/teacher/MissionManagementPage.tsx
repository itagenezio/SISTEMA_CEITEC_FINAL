import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { MissionManagement } from '../../app/components/MissionManagement';

const handleTeacherNavigate = (navigate: any, screen: string, id: string | undefined = undefined) => {
    const routeMap: Record<string, string> = {
        'teacher-dashboard': '/teacher',
        'class-management': id ? `/teacher/classes/${id}` : '/teacher/classes',
        'mission-management': '/teacher/missions',
        'activity-creator': id ? `/teacher/activity-creator/${id}` : '/teacher/activity-creator',
        'activity-edit': id ? `/teacher/activity-creator/edit/${id}` : '/teacher/activity-creator',
        'grading': id ? `/teacher/grading/${id}` : '/teacher/grading',
        'submissions-list': '/teacher/submissions',
        'reports': '/teacher/reports',
        'calendar': '/teacher/calendar',
        'logout': '/login'
    };
    if (screen === 'ocr-scanner' || screen === 'scanner_ocr') {
        window.open('/scanner_ocr/index.html', '_blank');
        return;
    }
    const target = routeMap[screen];
    if (target) navigate(target);
};

export default function MissionManagementPage() {
    const { classes, activities, deleteActivity, updateActivity } = useData();
    const navigate = useNavigate();

    return (
        <MissionManagement
            onNavigate={(s, id) => handleTeacherNavigate(navigate, s, id)}
            classes={classes}
            activities={activities}
            onDeleteActivity={deleteActivity}
            onUpdateActivity={updateActivity}
        />
    );
}
