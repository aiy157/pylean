// src/store/__tests__/progressStore.test.js
// Unit tests for progressStore — XP logic, completion gates, badge awards
// Run with: npm test

import { jest } from '@jest/globals';

// ── Mocks must be declared BEFORE module imports ──────────────────────────────
jest.unstable_mockModule('../../utils/supabase', () => ({
  supabase: {
    auth: {
      getUser: jest.fn().mockResolvedValue({ data: { user: null } }),
    },
    from: jest.fn(() => ({
      upsert: jest.fn().mockResolvedValue({ error: null }),
      delete: jest.fn(() => ({
        eq: jest.fn().mockResolvedValue({ error: null }),
      })),
    })),
  },
}));

jest.unstable_mockModule('../curriculumStore', () => ({
  useCurriculumStore: {
    getState: () => ({
      modules: [
        { id: 1, requiredXP: 0   },
        { id: 2, requiredXP: 100 },
        { id: 3, requiredXP: 200 },
        { id: 4, requiredXP: 300 },
      ],
    }),
  },
}));

// ── Import AFTER mocks ────────────────────────────────────────────────────────
const { useProgressStore } = await import('../progressStore.js');

// ── Helper to reset store state before each test ──────────────────────────────
const resetStore = () => {
  useProgressStore.setState({
    xp: 0,
    completedLessons: [],
    completedExercises: [],
    exerciseScores: {},
    unlockedModules: [1],
    badges: [],
    isAdminUnlockMode: false,
  });
};

// ─────────────────────────────────────────────────────────────────────────────

describe('completeLesson', () => {
  beforeEach(resetStore);

  it('adds XP when a lesson is completed', () => {
    useProgressStore.getState().completeLesson('l-1-1', 20);
    expect(useProgressStore.getState().xp).toBe(20);
  });

  it('adds lesson to completedLessons array', () => {
    useProgressStore.getState().completeLesson('l-1-1', 20);
    expect(useProgressStore.getState().completedLessons).toContain('l-1-1');
  });

  it('does NOT grant XP if lesson already completed (no double-dipping)', () => {
    useProgressStore.getState().completeLesson('l-1-1', 20);
    useProgressStore.getState().completeLesson('l-1-1', 20); // duplicate
    expect(useProgressStore.getState().xp).toBe(20);
  });

  it('awards first_lesson badge on first completion', () => {
    useProgressStore.getState().completeLesson('l-1-1', 10);
    expect(useProgressStore.getState().badges).toContain('first_lesson');
  });

  it('awards xp_100 badge when XP reaches 100', () => {
    useProgressStore.getState().completeLesson('l-1-1', 100);
    expect(useProgressStore.getState().badges).toContain('xp_100');
  });

  it('awards xp_300 badge when XP reaches 300', () => {
    useProgressStore.getState().completeLesson('l-1-1', 300);
    expect(useProgressStore.getState().badges).toContain('xp_300');
  });

  it('unlocks module 2 when XP reaches 100', () => {
    useProgressStore.getState().completeLesson('l-1-1', 100);
    expect(useProgressStore.getState().unlockedModules).toContain(2);
  });

  it('does NOT unlock module 2 with XP < 100', () => {
    useProgressStore.getState().completeLesson('l-1-1', 50);
    expect(useProgressStore.getState().unlockedModules).not.toContain(2);
  });
});

describe('completeExercise', () => {
  beforeEach(resetStore);

  it('grants XP when passing for the first time (score ≥ 80)', () => {
    const { grantXP, nowPasses } = useProgressStore.getState().completeExercise('ex-1-1', 30, 100);
    expect(nowPasses).toBe(true);
    expect(grantXP).toBe(30);
    expect(useProgressStore.getState().xp).toBe(30);
  });

  it('does NOT grant XP on second pass of same exercise', () => {
    useProgressStore.getState().completeExercise('ex-1-1', 30, 100);
    const { grantXP } = useProgressStore.getState().completeExercise('ex-1-1', 30, 100);
    expect(grantXP).toBe(0);
    expect(useProgressStore.getState().xp).toBe(30);
  });

  it('does NOT grant XP when score < 80', () => {
    const { grantXP, nowPasses } = useProgressStore.getState().completeExercise('ex-1-1', 30, 70);
    expect(nowPasses).toBe(false);
    expect(grantXP).toBe(0);
  });

  it('records highest score across attempts', () => {
    useProgressStore.getState().completeExercise('ex-1-1', 30, 60);
    useProgressStore.getState().completeExercise('ex-1-1', 30, 85);
    useProgressStore.getState().completeExercise('ex-1-1', 30, 70);
    expect(useProgressStore.getState().exerciseScores['ex-1-1']).toBe(85);
  });

  it('isExercisePassed returns false for score < 80', () => {
    useProgressStore.getState().completeExercise('ex-1-1', 30, 70);
    expect(useProgressStore.getState().isExercisePassed('ex-1-1')).toBe(false);
  });

  it('isExercisePassed returns true for score ≥ 80', () => {
    useProgressStore.getState().completeExercise('ex-1-1', 30, 80);
    expect(useProgressStore.getState().isExercisePassed('ex-1-1')).toBe(true);
  });
});

describe('isModuleUnlocked', () => {
  beforeEach(resetStore);

  it('module 1 is always unlocked (requiredXP = 0)', () => {
    expect(useProgressStore.getState().isModuleUnlocked(1)).toBe(true);
  });

  it('module 2 is locked when XP < 100', () => {
    useProgressStore.setState({ xp: 50, unlockedModules: [1] });
    expect(useProgressStore.getState().isModuleUnlocked(2)).toBe(false);
  });

  it('admin unlock mode bypasses all module locks', () => {
    useProgressStore.setState({ xp: 0, unlockedModules: [1], isAdminUnlockMode: true });
    expect(useProgressStore.getState().isModuleUnlocked(2)).toBe(true);
    expect(useProgressStore.getState().isModuleUnlocked(4)).toBe(true);
  });
});

describe('isLessonComplete', () => {
  beforeEach(resetStore);

  it('returns false for uncompleted lesson', () => {
    expect(useProgressStore.getState().isLessonComplete('l-1-1')).toBe(false);
  });

  it('returns true after lesson is completed', () => {
    useProgressStore.getState().completeLesson('l-1-1', 10);
    expect(useProgressStore.getState().isLessonComplete('l-1-1')).toBe(true);
  });

  it('admin unlock mode makes all lessons appear complete', () => {
    useProgressStore.setState({ isAdminUnlockMode: true });
    expect(useProgressStore.getState().isLessonComplete('any-lesson')).toBe(true);
  });
});
