import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Grading } from '../../app/components/Grading';

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

export default function GradingPage() {
    const { submissionId } = useParams();
    const { submissions, enrolledStudents, activities, gradeSubmission } = useData();
    const navigate = useNavigate();

    const sub = submissions.find(s => String(s.id) === String(submissionId));
    const st = enrolledStudents.find(s => String(s.id) === String(sub?.studentId || sub?.student_id));
    const act = activities.find(a => String(a.id) === String(sub?.activityId || sub?.activity_id));

    return (
        <Grading
            onNavigate={(s) => handleTeacherNavigate(navigate, s)}
            submission={sub}
            student={st}
            activity={act}
            onGrade={gradeSubmission}
        />
    );
}
