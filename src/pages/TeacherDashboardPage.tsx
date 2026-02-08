import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { TeacherDashboard } from '../app/components/TeacherDashboard';
import { Class, EnrolledStudent } from '../types';

export function TeacherDashboardPage() {
    const { classes, enrolledStudents, activities, addActivity } = useData();
    const navigate = useNavigate();

    const handleNavigate = (screen: string, id?: string) => {
        const routeMap: Record<string, string> = {
            'teacher-dashboard': '/teacher',
            'class-management': id ? `/teacher/classes/${id}` : '/teacher/classes',
            'grading': id ? `/teacher/grading/${id}` : '/teacher/grading',
            'submissions-list': '/teacher/submissions',
            'reports': '/teacher/reports',
            'calendar': '/teacher/calendar',
            'logout': '/logout'
        };

        if (screen === 'logout') {
            navigate('/login');
            return;
        }

        const target = routeMap[screen];
        if (target) {
            navigate(target);
        }
    };

    const classesWithCounts = classes.map((c: Class) => ({
        ...c,
        studentsCount: enrolledStudents.filter((s: EnrolledStudent) => String(s.classId) === String(c.id)).length
    }));

    return (
        <TeacherDashboard
            onNavigate={handleNavigate}
            classes={classesWithCounts}
            activities={activities}
            onAddActivity={addActivity}
        />
    );
}
