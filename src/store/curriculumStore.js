import { create } from 'zustand';
import { supabase } from '../utils/supabase';

export const useCurriculumStore = create((set, get) => ({
  modules: [],
  lessons: [],
  exercises: [],
  isLoading: true,
  error: null,

  fetchCurriculum: async () => {
    set({ isLoading: true, error: null });
    try {
      // Fetch modules
      const { data: modulesData, error: modErr } = await supabase
        .from('modules')
        .select('*')
        .order('id', { ascending: true });
      if (modErr) throw modErr;

      // Fetch lessons
      const { data: lessonsData, error: lesErr } = await supabase
        .from('lessons')
        .select('*')
        .order('order', { ascending: true });
      if (lesErr) throw lesErr;

      // Fetch all exercises (both default and custom)
      const { data: exercisesData, error: exErr } = await supabase
        .from('exercises')
        .select('*')
        .order('order', { ascending: true });
      if (exErr) throw exErr;

      // Map to frontend structure
      const mappedModules = modulesData.map(m => ({
        id: m.id,
        title: m.title,
        description: m.description,
        requiredXP: m.required_xp,
        lessons: lessonsData.filter(l => l.module_id === m.id).map(l => ({
          id: l.id,
          title: l.title,
          content: l.content,
          xpReward: l.xp_reward,
          moduleId: m.id,
        }))
      }));

      const mappedExercises = exercisesData.map(ex => ({
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
        isCustom: ex.is_custom,
      }));

      set({
        modules: mappedModules,
        lessons: lessonsData, // flat list if needed
        exercises: mappedExercises,
        isLoading: false
      });
    } catch (err) {
      console.error('Failed to load curriculum:', err);
      set({ error: err.message, isLoading: false });
    }
  },

  getModuleById: (id) => get().modules.find(m => m.id === id),
  getLessonById: (moduleId, lessonId) => {
    const mod = get().modules.find(m => m.id === moduleId);
    return mod?.lessons.find(l => l.id === lessonId);
  },
  getExercisesForModule: (moduleId) => get().exercises.filter(ex => ex.moduleId === moduleId),
  getExerciseById: (exerciseId) => get().exercises.find(ex => ex.id === exerciseId)
}));
