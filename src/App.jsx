// src/App.jsx
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import LessonsListPage from './pages/LessonsListPage';
import LessonPage from './pages/LessonPage';
import ExercisePage from './pages/ExercisePage';
import FlowchartPage from './pages/FlowchartPage';
import AdminPage from './pages/AdminPage';
import { useProgressStore } from './store/progressStore';
import { useAdminStore } from './store/adminStore';

const AdminUnlock = () => {
  const unlockAllModulesAdmin = useProgressStore(state => state.unlockAllModulesAdmin);
  useEffect(() => {
    unlockAllModulesAdmin();
  }, [unlockAllModulesAdmin]);
  return <Navigate to="/dashboard" replace />;
};

export default function App() {
  const fetchProgress = useProgressStore(state => state.fetchProgress);
  const fetchExercises = useAdminStore(state => state.fetchExercises);

  useEffect(() => {
    fetchProgress();
    fetchExercises();
  }, [fetchProgress, fetchExercises]);

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/allpass" element={<AdminUnlock />} />
          <Route path="/lessons" element={<LessonsListPage />} />
          <Route path="/lessons/:moduleId" element={<LessonsListPage />} />
          <Route path="/lessons/:moduleId/:lessonId" element={<LessonPage />} />
          <Route path="/exercise/:exerciseId" element={<ExercisePage />} />
          <Route path="/flowchart" element={<FlowchartPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Toaster position="bottom-right" />
      </div>
    </BrowserRouter>
  );
}

