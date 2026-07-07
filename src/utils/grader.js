// src/utils/grader.js
// ─────────────────────────────────────────────────────────────────────────────
// OUTPUT-BASED GRADER
// Philosophy: Code can be written in unlimited ways — what matters is whether
// the program produces the CORRECT OUTPUT for every test case.
//
// Comparison strategy (applied in order of strictness):
//   1. normalise  — trim trailing whitespace, collapse blank lines → exact match
//   2. flexible   — case-insensitive, ignore extra internal whitespace
//   3. contains   — output must contain all required tokens (customCheck mode)
//   4. numeric    — for float answers allow ±0.01 tolerance
//   5. runtime-ok — no expectedOutput defined → just "no crash"
// ─────────────────────────────────────────────────────────────────────────────
import { pyLog } from './errorAnalyzer';
import { supabase } from './supabase';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Normalise: trim each line, remove trailing empty lines, keep newlines intact */
const normalise = (s) =>
  s.split('\n')
    .map(l => l.trimEnd())          // remove trailing spaces per line
    .join('\n')
    .replace(/\n+$/, '');           // strip trailing newlines

/** Collapse ALL whitespace runs to a single space, lower-case */
const flatten = (s) =>
  s.replace(/\s+/g, ' ').trim().toLowerCase();

/** Try to parse every whitespace-separated token as a float */
const parseFloats = (s) =>
  s.trim().split(/\s+/).map(Number).filter(n => !isNaN(n));

/** All float tokens match within tolerance */
const floatsMatch = (actual, expected, tol = 0.015) => {
  const af = parseFloats(actual);
  const ef = parseFloats(expected);
  if (af.length === 0 || af.length !== ef.length) return false;
  return af.every((v, i) => Math.abs(v - ef[i]) <= tol);
};

// ─── Core test-case evaluator ─────────────────────────────────────────────────
/**
 * @param {string} actual   - trimmed stdout from student code
 * @param {string} error    - stderr / exception message
 * @param {object} tc       - test case descriptor
 * @returns {{ passed: boolean, strategy: string, mismatch?: string }}
 */
function evaluate(actual, error, tc) {
  // ── contains mode (customCheck) ──────────────────────────────────────────
  if (tc.customCheck && Array.isArray(tc.checkContains)) {
    const missing = tc.checkContains.filter(s => !actual.includes(s));
    return {
      passed: missing.length === 0,
      strategy: 'contains',
      mismatch: missing.length ? `Missing: ${missing.map(m => `"${m}"`).join(', ')}` : undefined,
    };
  }

  // ── no expectedOutput → just "no runtime error" ───────────────────────────
  if (tc.expectedOutput === undefined || tc.expectedOutput === null) {
    return { passed: !error, strategy: 'no-error' };
  }

  const exp    = tc.expectedOutput;
  const expNorm = normalise(exp);
  const actNorm = normalise(actual);

  // 1. Exact normalised match (primary)
  if (actNorm === expNorm) {
    return { passed: true, strategy: 'exact' };
  }

  // 2. Case-insensitive + collapsed whitespace
  if (flatten(actual) === flatten(exp)) {
    return { passed: true, strategy: 'flexible' };
  }

  // 3. Float tolerance (handles rounding differences like 22.857 vs 22.86)
  if (floatsMatch(actual, exp)) {
    return { passed: true, strategy: 'numeric' };
  }

  // ── All strategies failed ─────────────────────────────────────────────────
  // Build a diff-like mismatch hint
  const expLines = expNorm.split('\n');
  const actLines = actNorm.split('\n');
  const firstDiff = expLines.findIndex((l, i) => l !== actLines[i]);

  const mismatch = firstDiff >= 0
    ? `Line ${firstDiff + 1}: expected "${expLines[firstDiff]}", got "${actLines[firstDiff] ?? '(missing)'}"`
    : `Length differs: expected ${expLines.length} line(s), got ${actLines.length}`;

  return { passed: false, strategy: 'exact', mismatch };
}

// ─── Main grader ──────────────────────────────────────────────────────────────
/**
 * Runs all test cases for an exercise and returns a structured result.
 *
 * @param {object}   exercise - exercise descriptor with testCases array
 * @param {string}   code     - student's source code (used only for logging)
 * @param {Function} runCode  - async (code, stdin) => { output, error }
 * @returns {Promise<{
 *   results: Array,
 *   allPassed: boolean,
 *   passCount: number,
 *   scorePercent: number,
 * }>}
 */
export const gradeExercise = async (exercise, code, runCode) => {
  const results   = [];
  let   allPassed = true;

  for (let i = 0; i < exercise.testCases.length; i++) {
    const tc    = exercise.testCases[i];
    const stdin = tc.input ?? '';

    // Run the student code with this test case's stdin
    const { output, error } = await runCode(code, stdin);

    // Trim output ONCE here — grading always compares trimmed strings
    const actual = normalise(output);

    const { passed, strategy, mismatch } = evaluate(actual, error, tc);
    if (!passed) allPassed = false;

    // ── Structured English console log (developer view) ────────────────────
    pyLog.graderRun(
      i,
      tc.input,
      tc.expectedOutput ?? tc.checkContains?.join(' | '),
      error ? `[ERROR] ${error}` : actual || '(empty output)',
      passed
    );
    if (!passed && mismatch) {
      console.info(`  [PyLearn | Grader]   Mismatch: ${mismatch}`);
      console.info(`  [PyLearn | Grader]   Strategy tried: ${strategy}`);
    }

    results.push({
      input:    tc.input,
      expected: tc.expectedOutput ?? tc.checkContains?.join(', ') ?? '(any output)',
      actual,
      passed,
      error:    error || '',
      mismatch: passed ? undefined : mismatch,
      strategy,
      details:  tc.description || '',
    });
  }

  const passCount    = results.filter(r => r.passed).length;
  const scorePercent = results.length > 0
    ? Math.round((passCount / results.length) * 100)
    : 0;

  pyLog.graderSummary(passCount, results.length, scorePercent);

  return { results, allPassed, passCount, scorePercent };
};

/**
 * Attempts to grade securely on the server via Supabase Edge Function.
 * Falls back to client-side grading if the server is unavailable or fails.
 */
export const gradeExerciseSecurely = async (exercise, code, runCode) => {
  try {
    const { data, error } = await supabase.functions.invoke('grade-python', {
      body: { code, exerciseId: exercise.id }
    });
    
    if (error || !data) throw error || new Error('No data returned from edge function');
    
    return data;
  } catch (err) {
    console.warn('[PyLearn | Grader] Server-side grading failed, falling back to local grading.', err.message);
    return await gradeExercise(exercise, code, runCode);
  }
};
