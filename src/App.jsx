// src/App.jsx
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import LessonsListPage from './pages/LessonsListPage';
import LessonPage from './pages/LessonPage';
import ExercisePage from './pages/ExercisePage';
import FlowchartPage from './pages/FlowchartPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import AllPassPage from './pages/AllPassPage';
import { useProgressStore } from './store/progressStore';
import { useAdminStore } from './store/adminStore';
import { useAuthStore } from './store/authStore';

export default function App() {
  const fetchProgress = useProgressStore(state => state.fetchProgress);
  const fetchExercises = useAdminStore(state => state.fetchExercises);
  const initAuth = useAuthStore(state => state.init);

  useEffect(() => {
    // Init auth first, then fetch progress (needs user session)
    initAuth().then(() => {
      fetchProgress();
      fetchExercises();
    });
  }, [initAuth, fetchProgress, fetchExercises]);

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/allpass" element={<AllPassPage />} />
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
