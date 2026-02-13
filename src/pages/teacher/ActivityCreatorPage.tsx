import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { ActivityCreator } from '../../app/components/ActivityCreator';

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

export default function ActivityCreatorPage() {
    const { classId, activityId } = useParams();
    const { classes, activities, addActivity, updateActivity } = useData();
    const navigate = useNavigate();

    const selectedClass = classes.find(c => String(c.id) === String(classId));
    const initialActivity = activities.find(a => String(a.id) === String(activityId));

    const handleSave = async (data: any) => {
        if (activityId) {
            return await updateActivity(activityId, data);
        } else {
            return await addActivity(data);
        }
    };

    return (
        <ActivityCreator
            onNavigate={(s, id) => handleTeacherNavigate(navigate, s, id)}
            onSave={handleSave}
            classes={classes}
            selectedClass={selectedClass ? { name: selectedClass.name, id: selectedClass.id } : undefined}
            initialData={initialActivity}
        />
    );
}
