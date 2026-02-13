import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { ClassManagement } from '../../app/components/ClassManagement';

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

export default function ClassManagementPage() {
    const { classId } = useParams();
    const { classes, enrolledStudents, addClass, addActivity, addStudent, deleteClass, deleteStudent } = useData();
    const navigate = useNavigate();

    const selectedClass = classes.find(c => String(c.id) === String(classId)) || classes[0];

    const classStudents = enrolledStudents.filter(s =>
        String(s.classId) === String(selectedClass?.id) ||
        String((s as any).class_id) === String(selectedClass?.id)
    );

    return (
        <ClassManagement
            onNavigate={(s, id) => handleTeacherNavigate(navigate, s, id)}
            onAddClass={addClass}
            onAddActivity={addActivity}
            selectedClass={selectedClass}
            classes={classes}
            students={classStudents}
            onAddStudent={addStudent}
            onDeleteClass={deleteClass}
            onDeleteStudent={deleteStudent}
        />
    );
}
