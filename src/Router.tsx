import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { PrivateRoute } from './components/PrivateRoute';
import { MainLayout } from './layouts/MainLayout';

// Lazy Imports
const LoginPage = lazy(() => import('./pages/LoginPage'));
const StudentDashboardPage = lazy(() => import('./pages/StudentDashboardPage'));
const TeacherDashboardPage = lazy(() => import('./pages/TeacherDashboardPage'));

const ActivitiesPage = lazy(() => import('./pages/student/ActivitiesPage'));
const PortfolioPage = lazy(() => import('./pages/student/PortfolioPage'));
const ProgressPage = lazy(() => import('./pages/student/ProgressPage'));
const SubmitActivityPage = lazy(() => import('./pages/student/SubmitActivityPage'));

const ClassManagementPage = lazy(() => import('./pages/teacher/ClassManagementPage'));
const GradingPage = lazy(() => import('./pages/teacher/GradingPage'));
const SubmissionsListPage = lazy(() => import('./pages/teacher/SubmissionsListPage'));
const ReportsPage = lazy(() => import('./pages/teacher/ReportsPage'));
const CalendarPage = lazy(() => import('./pages/teacher/CalendarPage'));
const ActivityCreatorPage = lazy(() => import('./pages/teacher/ActivityCreatorPage'));
const MissionManagementPage = lazy(() => import('./pages/teacher/MissionManagementPage'));

export function AppRouter() {
  return (
    <Suspense fallback={<div>Carregando sistema...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>

          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboardPage />} />
          <Route path="/student/activities" element={<ActivitiesPage />} />
          <Route path="/student/activities/:activityId/submit" element={<SubmitActivityPage />} />
          <Route path="/student/portfolio" element={<PortfolioPage />} />
          <Route path="/student/progress" element={<ProgressPage />} />
          <Route path="/student/learning-paths" element={<Navigate to="/student" replace />} />

          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherDashboardPage />} />
          <Route path="/teacher/classes" element={<ClassManagementPage />} />
          <Route path="/teacher/classes/:classId" element={<ClassManagementPage />} />
          <Route path="/teacher/missions" element={<MissionManagementPage />} />
          <Route path="/teacher/activity-creator" element={<ActivityCreatorPage />} />
          <Route path="/teacher/activity-creator/:classId" element={<ActivityCreatorPage />} />
          <Route path="/teacher/activity-creator/edit/:activityId" element={<ActivityCreatorPage />} />
          <Route path="/teacher/grading/:submissionId" element={<GradingPage />} />
          <Route path="/teacher/submissions" element={<SubmissionsListPage />} />
          <Route path="/teacher/reports" element={<ReportsPage />} />
          <Route path="/teacher/calendar" element={<CalendarPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}
