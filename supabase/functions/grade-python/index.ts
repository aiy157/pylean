import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.108.2"

// --- Grader Logic Ported from grader.js ---
const normalise = (s) => s.split('\n').map(l => l.trimEnd()).join('\n').replace(/\n+$/, '');
const flatten = (s) => s.replace(/\s+/g, ' ').trim().toLowerCase();
const parseFloats = (s) => s.trim().split(/\s+/).map(Number).filter(n => !isNaN(n));
const floatsMatch = (actual, expected, tol = 0.015) => {
  const af = parseFloats(actual);
  const ef = parseFloats(expected);
  if (af.length === 0 || af.length !== ef.length) return false;
  return af.every((v, i) => Math.abs(v - ef[i]) <= tol);
};

function evaluate(actual, error, tc) {
  if (tc.customCheck && Array.isArray(tc.checkContains)) {
    const missing = tc.checkContains.filter(s => !actual.includes(s));
    return { passed: missing.length === 0 };
  }
  if (tc.expectedOutput === undefined || tc.expectedOutput === null) {
    return { passed: !error };
  }
  const exp = tc.expectedOutput;
  const expNorm = normalise(exp);
  const actNorm = normalise(actual);
  if (actNorm === expNorm) return { passed: true };
  if (flatten(actual) === flatten(exp)) return { passed: true };
  if (floatsMatch(actual, exp)) return { passed: true };
  return { passed: false };
}
// ----------------------------------------

const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    }})
  }

  try {
    const { code, exerciseId } = await req.json()
    if (!code || !exerciseId) throw new Error('Missing code or exerciseId');

    // Init Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch exercise from DB
    const { data: exercise, error: fetchErr } = await supabase
      .from('exercises')
      .select('test_cases')
      .eq('id', exerciseId)
      .single();

    if (fetchErr || !exercise) throw new Error('Exercise not found');

    const testCases = exercise.test_cases;
    let allPassed = true;
    let passCount = 0;
    const results = [];

    // Evaluate each test case using Piston
    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      const stdin = tc.input || '';

      const pistonRes = await fetch(PISTON_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: "python",
          version: "3.10.0",
          files: [{ content: code }],
          stdin: stdin
        })
      });
      const pistonData = await pistonRes.json();
      
      const stdout = pistonData.run?.stdout || '';
      const stderr = pistonData.run?.stderr || '';

      const actual = normalise(stdout);
      const { passed } = evaluate(actual, stderr, tc);
      
      if (!passed) allPassed = false;
      if (passed) passCount++;

      results.push({
        passed,
        actual: passed ? actual : 'Hidden for security',
        error: stderr
      });
    }

    const scorePercent = testCases.length > 0 ? Math.round((passCount / testCases.length) * 100) : 0;

    return new Response(
      JSON.stringify({ results, allPassed, passCount, scorePercent }),
      { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      status: 400
    })
  }
})
