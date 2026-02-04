import { useState } from 'react';
import { Login } from './components/Login';
import { StudentDashboard } from './components/StudentDashboard';
import { LearningPaths } from './components/LearningPaths';
import { Activities } from './components/Activities';
import { SubmitActivity } from './components/SubmitActivity';
import { Portfolio } from './components/Portfolio';
import { Progress } from './components/Progress';
import { TeacherDashboard } from './components/TeacherDashboard';
import { ClassManagement } from './components/ClassManagement';
import { Grading } from './components/Grading';

type Screen = 
  | 'login'
  | 'student-dashboard'
  | 'learning-paths'
  | 'activities'
  | 'submit-activity'
  | 'portfolio'
  | 'progress'
  | 'teacher-dashboard'
  | 'class-management'
  | 'grading';

type UserType = 'student' | 'teacher' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userType, setUserType] = useState<UserType>(null);

  const handleLogin = (type: 'student' | 'teacher') => {
    setUserType(type);
    setCurrentScreen(type === 'student' ? 'student-dashboard' : 'teacher-dashboard');
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      
      case 'student-dashboard':
        return <StudentDashboard onNavigate={handleNavigate} />;
      
      case 'learning-paths':
        return <LearningPaths onNavigate={handleNavigate} />;
      
      case 'activities':
        return <Activities onNavigate={handleNavigate} />;
      
      case 'submit-activity':
        return <SubmitActivity onNavigate={handleNavigate} />;
      
      case 'portfolio':
        return <Portfolio onNavigate={handleNavigate} />;
      
      case 'progress':
        return <Progress onNavigate={handleNavigate} />;
      
      case 'teacher-dashboard':
        return <TeacherDashboard onNavigate={handleNavigate} />;
      
      case 'class-management':
        return <ClassManagement onNavigate={handleNavigate} />;
      
      case 'grading':
        return <Grading onNavigate={handleNavigate} />;
      
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="size-full">
      {renderScreen()}
    </div>
  );
}
