// src/utils/__tests__/grader.test.js
// Unit tests for grader.js — tests the pure evaluation logic
// Run with: npm test

import { jest } from '@jest/globals';

// ── Mock dependencies that grader.js imports ──────────────────────────────────
jest.unstable_mockModule('../errorAnalyzer', () => ({
  pyLog: {
    graderRun: jest.fn(),
    graderSummary: jest.fn(),
    codeError: jest.fn(),
    engineError: jest.fn(),
  },
}));

jest.unstable_mockModule('../supabase', () => ({
  supabase: {
    functions: {
      invoke: jest.fn().mockResolvedValue({ data: null, error: new Error('mock') }),
    },
  },
}));

// Import AFTER mocks are registered (dynamic import in Jest ESM)
const { gradeExercise } = await import('../grader.js');

// ── Helper: create a mock runCode function ────────────────────────────────────
const makeRunCode = (outputMap) =>
  jest.fn(async (_code, stdin) => {
    const key = (stdin ?? '').trim();
    return outputMap[key] ?? { output: '', error: '' };
  });

// ── Test Fixtures ─────────────────────────────────────────────────────────────
const ex_hello = {
  id: 'ex-test-1',
  testCases: [{ input: '', expectedOutput: 'Hello, World!' }],
};

const ex_sum = {
  id: 'ex-test-2',
  testCases: [
    { input: '3\n5',   expectedOutput: '8'  },
    { input: '10\n20', expectedOutput: '30' },
  ],
};

const ex_float = {
  id: 'ex-test-3',
  testCases: [{ input: '22\n7', expectedOutput: '3.14' }],
};

const ex_contains = {
  id: 'ex-test-4',
  testCases: [{ input: '', customCheck: true, checkContains: ['Python', 'สวัสดี'] }],
};

const ex_nocrash = {
  id: 'ex-test-5',
  testCases: [{ input: '' }], // no expectedOutput = just "no error"
};

// ─────────────────────────────────────────────────────────────────────────────

describe('gradeExercise — exact match', () => {
  it('passes when output matches exactly', async () => {
    const run = makeRunCode({ '': { output: 'Hello, World!', error: '' } });
    const r = await gradeExercise(ex_hello, '', run);
    expect(r.allPassed).toBe(true);
    expect(r.scorePercent).toBe(100);
  });

  it('fails when output does not match', async () => {
    const run = makeRunCode({ '': { output: 'Goodbye!', error: '' } });
    const r = await gradeExercise(ex_hello, '', run);
    expect(r.allPassed).toBe(false);
    expect(r.scorePercent).toBe(0);
  });

  it('passes with trailing newline (normalised)', async () => {
    const run = makeRunCode({ '': { output: 'Hello, World!\n', error: '' } });
    const r = await gradeExercise(ex_hello, '', run);
    expect(r.results[0].passed).toBe(true);
  });

  it('includes mismatch hint when failing', async () => {
    const run = makeRunCode({ '': { output: 'Wrong', error: '' } });
    const r = await gradeExercise(ex_hello, '', run);
    expect(r.results[0].mismatch).toBeDefined();
  });
});

describe('gradeExercise — multiple test cases', () => {
  it('scores partial credit (1/2 pass = 50%)', async () => {
    const run = makeRunCode({
      '3\n5':   { output: '8',  error: '' },
      '10\n20': { output: '99', error: '' },
    });
    const r = await gradeExercise(ex_sum, '', run);
    expect(r.passCount).toBe(1);
    expect(r.scorePercent).toBe(50);
    expect(r.allPassed).toBe(false);
  });

  it('scores 100% when all test cases pass', async () => {
    const run = makeRunCode({
      '3\n5':   { output: '8',  error: '' },
      '10\n20': { output: '30', error: '' },
    });
    const r = await gradeExercise(ex_sum, '', run);
    expect(r.scorePercent).toBe(100);
    expect(r.allPassed).toBe(true);
  });
});

describe('gradeExercise — float tolerance', () => {
  it('passes when float is within ±0.015 tolerance', async () => {
    const run = makeRunCode({ '22\n7': { output: '3.142857', error: '' } });
    const r = await gradeExercise(ex_float, '', run);
    expect(r.results[0].passed).toBe(true);
    expect(r.results[0].strategy).toBe('numeric');
  });

  it('fails when float is far off', async () => {
    const run = makeRunCode({ '22\n7': { output: '4.0', error: '' } });
    const r = await gradeExercise(ex_float, '', run);
    expect(r.results[0].passed).toBe(false);
  });
});

describe('gradeExercise — contains mode', () => {
  it('passes when output contains all required tokens', async () => {
    const run = makeRunCode({ '': { output: 'ยินดีต้อนรับ Python สวัสดี คุณ', error: '' } });
    const r = await gradeExercise(ex_contains, '', run);
    expect(r.results[0].passed).toBe(true);
    expect(r.results[0].strategy).toBe('contains');
  });

  it('fails and reports missing tokens', async () => {
    const run = makeRunCode({ '': { output: 'Hello only', error: '' } });
    const r = await gradeExercise(ex_contains, '', run);
    expect(r.results[0].passed).toBe(false);
    expect(r.results[0].mismatch).toContain('Missing');
  });
});

describe('gradeExercise — no-error mode', () => {
  it('passes when code runs without error', async () => {
    const run = makeRunCode({ '': { output: 'anything', error: '' } });
    const r = await gradeExercise(ex_nocrash, '', run);
    expect(r.results[0].passed).toBe(true);
    expect(r.results[0].strategy).toBe('no-error');
  });

  it('fails when code throws a runtime error', async () => {
    const run = makeRunCode({ '': { output: '', error: 'NameError: x not defined' } });
    const r = await gradeExercise(ex_nocrash, '', run);
    expect(r.results[0].passed).toBe(false);
  });
});

describe('gradeExercise — flexible match', () => {
  it('passes with different casing (case-insensitive)', async () => {
    const run = makeRunCode({ '': { output: 'HELLO, WORLD!', error: '' } });
    const r = await gradeExercise(ex_hello, '', run);
    expect(r.results[0].passed).toBe(true);
    expect(r.results[0].strategy).toBe('flexible');
  });
});
