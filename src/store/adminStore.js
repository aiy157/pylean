import { create } from 'zustand';
import { DEFAULT_EXERCISES } from '../data/exercises';
import { supabase } from '../utils/supabase';

const ADMIN_EXERCISES_KEY = 'pylearn_admin_exercises';
const ADMIN_SESSION_KEY = 'pylearn_admin_session';
const ADMIN_PASSWORD = 'admin1234';

const loadAdminExercises = () => {
  try {
    const raw = localStorage.getItem(ADMIN_EXERCISES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

export const useAdminStore = create((set, get) => ({
  isLoggedIn: sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true',
  customExercises: loadAdminExercises(),
  isSyncing: false,

  login: (password) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      set({ isLoggedIn: true });
      return true;
    }
    return false;
  },

  logout: () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    set({ isLoggedIn: false });
  },

  getAllExercises: () => {
    const state = get();
    return [...DEFAULT_EXERCISES, ...state.customExercises];
  },

  fetchExercises: async () => {
    set({ isSyncing: true });
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('is_custom', true)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data) {
        const mapped = data.map(ex => ({
          id: ex.id,
          moduleId: ex.module_id,
          difficulty: ex.difficulty,
          order: ex.order,
          title: ex.title,
          description: ex.description,
          starterCode: ex.starter_code,
          hint: ex.hint,
          testCases: ex.test_cases,
          xpReward: ex.xp_reward,
          createdAt: ex.created_at,
          isCustom: ex.is_custom,
        }));
        set({ customExercises: mapped });
        localStorage.setItem(ADMIN_EXERCISES_KEY, JSON.stringify(mapped));
      }
    } catch (err) {
      console.warn('Supabase fetch failed, using local storage:', err.message);
    } finally {
      set({ isSyncing: false });
    }
  },

  addExercise: async (exercise) => {
    const newEx = {
      ...exercise,
      id: `admin-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isCustom: true,
    };

    const updated = [...get().customExercises, newEx];
    localStorage.setItem(ADMIN_EXERCISES_KEY, JSON.stringify(updated));
    set({ customExercises: updated });

    try {
      const { error } = await supabase
        .from('exercises')
        .insert([{
          id: newEx.id,
          module_id: newEx.moduleId,
          difficulty: newEx.difficulty,
          "order": newEx.order,
          title: newEx.title,
          description: newEx.description,
          starter_code: newEx.starterCode,
          hint: newEx.hint,
          test_cases: newEx.testCases,
          xp_reward: newEx.xpReward,
          is_custom: true
        }]);
      if (error) throw error;
    } catch (err) {
      console.warn('Supabase sync failed:', err.message);
    }

    return newEx;
  },

  updateExercise: async (id, updates) => {
    const updated = get().customExercises.map(ex =>
      ex.id === id ? { ...ex, ...updates } : ex
    );
    localStorage.setItem(ADMIN_EXERCISES_KEY, JSON.stringify(updated));
    set({ customExercises: updated });

    try {
      const dbUpdates = {};
      if (updates.moduleId !== undefined) dbUpdates.module_id = updates.moduleId;
      if (updates.difficulty !== undefined) dbUpdates.difficulty = updates.difficulty;
      if (updates.order !== undefined) dbUpdates.order = updates.order;
      if (updates.title !== undefined) dbUpdates.title = updates.title;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.starterCode !== undefined) dbUpdates.starter_code = updates.starterCode;
      if (updates.hint !== undefined) dbUpdates.hint = updates.hint;
      if (updates.testCases !== undefined) dbUpdates.test_cases = updates.testCases;
      if (updates.xpReward !== undefined) dbUpdates.xp_reward = updates.xpReward;

      const { error } = await supabase
        .from('exercises')
        .update(dbUpdates)
        .eq('id', id);
      if (error) throw error;
    } catch (err) {
      console.warn('Supabase update failed:', err.message);
    }
  },

  deleteExercise: async (id) => {
    const updated = get().customExercises.filter(ex => ex.id !== id);
    localStorage.setItem(ADMIN_EXERCISES_KEY, JSON.stringify(updated));
    set({ customExercises: updated });

    try {
      const { error } = await supabase
        .from('exercises')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } catch (err) {
      console.warn('Supabase delete failed:', err.message);
    }
  },
}));

