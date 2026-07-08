// src/App.jsx
import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import { useProgressStore } from './store/progressStore';
import { useAdminStore } from './store/adminStore';
import { useAuthStore } from './store/authStore';
import { useCurriculumStore } from './store/curriculumStore';
import UpdatePasswordPage from './pages/UpdatePasswordPage';

// ─── Lazy-loaded pages (improves initial bundle load time) ───────────────────
const Landing        = lazy(() => import('./pages/Landing'));
const Dashboard      = lazy(() => import('./pages/Dashboard'));
const LoginPage      = lazy(() => import('./pages/LoginPage'));
const AllPassPage    = lazy(() => import('./pages/AllPassPage'));
const LessonsListPage= lazy(() => import('./pages/LessonsListPage'));
const LessonPage     = lazy(() => import('./pages/LessonPage'));
const ExercisePage   = lazy(() => import('./pages/ExercisePage'));
const FlowchartPage  = lazy(() => import('./pages/FlowchartPage'));
const AdminPage      = lazy(() => import('./pages/AdminPage'));
const NotFoundPage   = lazy(() => import('./pages/NotFoundPage'));

// ─── Minimal spinner while lazy page loads ───────────────────────────────────
const PageSpinner = () => (
  <div style={{
    minHeight: '60vh', display: 'flex', alignItems: 'center',
    justifyContent: 'center', flexDirection: 'column', gap: '1rem',
  }}>
    <div style={{
      width: 40, height: 40,
      border: '3px solid rgba(124,58,237,0.2)',
      borderTopColor: '#7c3aed',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
    <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>กำลังโหลด…</span>
  </div>
);

export default function App() {
  const fetchProgress = useProgressStore(state => state.fetchProgress);
  const fetchExercises = useAdminStore(state => state.fetchExercises);
  const fetchCurriculum = useCurriculumStore(state => state.fetchCurriculum);
  const isCurriculumLoading = useCurriculumStore(state => state.isLoading);
  const { init: initAuth, user } = useAuthStore();

  // ── Step 1: Init auth on mount ──────────────────────────────────────────
  useEffect(() => {
    initAuth();
    fetchExercises();
    fetchCurriculum();
  }, [initAuth, fetchExercises, fetchCurriculum]);

  // ── Step 2: Fetch progress ONLY after user state is known ────────────────
  // This fixes the race condition: progressStore needs user_id from Auth session
  useEffect(() => {
    fetchProgress();
  }, [user, fetchProgress]);   // re-runs whenever login/logout happens

  if (isCurriculumLoading) {
    return <PageSpinner />;
  }

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
        <Navbar />
        <ErrorBoundary>
          <Suspense fallback={<PageSpinner />}>
            <Routes>
              <Route path="/"                            element={<Landing />} />
              <Route path="/login"                       element={<LoginPage />} />
              <Route path="/dashboard"                   element={<Dashboard />} />
              <Route path="/dashboard/allpass"           element={<AllPassPage />} />
              <Route path="/lessons"                     element={<LessonsListPage />} />
              <Route path="/lessons/:moduleId"           element={<LessonsListPage />} />
              <Route path="/lessons/:moduleId/:lessonId" element={<LessonPage />} />
              <Route path="/exercise/:exerciseId"        element={<ExercisePage />} />
              <Route path="/flowchart"                   element={<FlowchartPage />} />
              <Route path="/admin"                       element={<AdminPage />} />
              <Route path="/update-password"             element={<UpdatePasswordPage />} />
              <Route path="*"                            element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Toaster position="bottom-right" />
      </div>
    </BrowserRouter>
  );
}
