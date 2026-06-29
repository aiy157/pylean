// src/store/progressStore.js
import { create } from 'zustand';
import { MODULES } from '../data/curriculum';
import { supabase } from '../utils/supabase';

const STORAGE_KEY = 'pylearn_progress';
const DEVICE_ID_KEY = 'pylearn_device_id';

const getDeviceId = () => {
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = 'dev-' + crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
};

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

const saveToStorage = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      xp: state.xp,
      completedLessons: state.completedLessons,
      completedExercises: state.completedExercises,
      exerciseScores: state.exerciseScores,
      unlockedModules: state.unlockedModules,
      badges: state.badges,
    }));
  } catch {}
};

const syncProgressToCloud = async (state) => {
  const deviceId = getDeviceId();
  try {
    const { error } = await supabase
      .from('user_progress')
      .upsert({
        device_id: deviceId,
        xp: state.xp,
        completed_lessons: state.completedLessons,
        completed_exercises: state.completedExercises,
        exercise_scores: state.exerciseScores,
        unlocked_modules: state.unlockedModules,
        badges: state.badges,
        updated_at: new Date().toISOString(),
      });
    if (error) throw error;
  } catch (err) {
    console.warn('Supabase progress sync failed:', err.message);
  }
};

const initialState = {
  xp: 0,
  completedLessons: [],
  completedExercises: [],
  exerciseScores: {},   // { [exerciseId]: scorePercent (0–100) }
  unlockedModules: [1],
  badges: [],
};

const computeUnlockedModules = (xp) => {
  return MODULES
    .filter(m => xp >= m.requiredXP)
    .map(m => m.id);
};

export const useProgressStore = create((set, get) => {
  const saved = loadFromStorage();
  const init = saved ? { ...initialState, ...saved } : initialState;

  return {
    ...init,

    fetchProgress: async () => {
      const deviceId = getDeviceId();
      try {
        const { data, error } = await supabase
          .from('user_progress')
          .select('*')
          .eq('device_id', deviceId)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          const local = get();
          if (data.xp > local.xp || data.completed_lessons.length > local.completedLessons.length) {
            const merged = {
              xp: Math.max(local.xp, data.xp),
              completedLessons: Array.from(new Set([...local.completedLessons, ...data.completed_lessons])),
              completedExercises: Array.from(new Set([...local.completedExercises, ...data.completed_exercises])),
              exerciseScores: { ...data.exercise_scores, ...local.exerciseScores },
              unlockedModules: Array.from(new Set([...local.unlockedModules, ...data.unlocked_modules])),
              badges: Array.from(new Set([...local.badges, ...data.badges])),
            };
            set(merged);
            saveToStorage(merged);
          }
        }
      } catch (err) {
        console.warn('Supabase progress fetch failed:', err.message);
      }
    },

    completeLesson: (lessonId, xpReward) => {
      const state = get();
      if (state.completedLessons.includes(lessonId)) return;

      const newXP = state.xp + xpReward;
      const newCompleted = [...state.completedLessons, lessonId];
      const newUnlocked = computeUnlockedModules(newXP);

      const newBadges = [...state.badges];
      if (newCompleted.length === 1 && !newBadges.includes('first_lesson')) {
        newBadges.push('first_lesson');
      }
      if (newXP >= 100 && !newBadges.includes('xp_100')) {
        newBadges.push('xp_100');
      }
      if (newXP >= 300 && !newBadges.includes('xp_300')) {
        newBadges.push('xp_300');
      }

      const newState = {
        xp: newXP,
        completedLessons: newCompleted,
        unlockedModules: newUnlocked,
        badges: newBadges,
      };
      set(newState);
      saveToStorage({ ...state, ...newState });
      syncProgressToCloud({ ...state, ...newState });
    },

    completeExercise: (exerciseId, xpReward, scorePercent = 100) => {
      const state = get();
      const prevScore = state.exerciseScores[exerciseId] ?? -1;
      const newScore = Math.max(prevScore, scorePercent);

      const newExerciseScores = { ...state.exerciseScores, [exerciseId]: newScore };

      const alreadyPassed = prevScore >= 80;
      const nowPasses = scorePercent >= 80;
      const grantXP = !alreadyPassed && nowPasses;

      const newXP = grantXP ? state.xp + xpReward : state.xp;
      const newCompleted = nowPasses && !state.completedExercises.includes(exerciseId)
        ? [...state.completedExercises, exerciseId]
        : state.completedExercises;
      const newUnlocked = computeUnlockedModules(newXP);

      const newBadges = [...state.badges];
      if (newCompleted.length === 1 && !newBadges.includes('first_exercise')) {
        newBadges.push('first_exercise');
      }
      if (newCompleted.length >= 5 && !newBadges.includes('exercise_5')) {
        newBadges.push('exercise_5');
      }
      if (newCompleted.length >= 10 && !newBadges.includes('exercise_10')) {
        newBadges.push('exercise_10');
      }

      const newState = {
        xp: newXP,
        completedExercises: newCompleted,
        exerciseScores: newExerciseScores,
        unlockedModules: newUnlocked,
        badges: newBadges,
      };
      set(newState);
      saveToStorage({ ...state, ...newState });
      syncProgressToCloud({ ...state, ...newState });

      return { grantXP, nowPasses, newScore };
    },

    isLessonComplete: (lessonId) => get().completedLessons.includes(lessonId),
    isExerciseComplete: (exerciseId) => get().completedExercises.includes(exerciseId),
    isModuleUnlocked: (moduleId) => get().unlockedModules.includes(moduleId),

    getExerciseScore: (exerciseId) => get().exerciseScores[exerciseId] ?? -1,

    isExercisePassed: (exerciseId) => (get().exerciseScores[exerciseId] ?? -1) >= 80,

    getModuleProgress: (moduleId) => {
      const state = get();
      const module = MODULES.find(m => m.id === moduleId);
      if (!module) return 0;
      const totalLessons = module.lessons.length;
      if (totalLessons === 0) return 0;
      const done = module.lessons.filter(l => state.completedLessons.includes(l.id)).length;
      return Math.round((done / totalLessons) * 100);
    },

    resetProgress: () => {
      localStorage.removeItem(STORAGE_KEY);
      set(initialState);
      const deviceId = getDeviceId();
      supabase.from('user_progress').delete().eq('device_id', deviceId).catch(() => {});
    },
  };
});


