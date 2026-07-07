// src/pages/ExercisePage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguageStore } from '../store/languageStore';
import { useProgressStore } from '../store/progressStore';
import { useCurriculumStore } from '../store/curriculumStore';
import { usePyodide } from '../hooks/usePyodide';
import { gradeExerciseSecurely } from '../utils/grader';
import CodeEditor from '../components/editor/CodeEditor';
import OutputPanel from '../components/editor/OutputPanel';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Play, Send, RotateCcw, Lightbulb, CheckCircle, XCircle,
  ChevronLeft, Loader2, Terminal, AlertCircle, LayoutPanelLeft, LayoutPanelTop, Keyboard
} from 'lucide-react';

// ─── Responsive breakpoint hook ──────────────────────────────────────────────
const useIsNarrow = (breakpoint = 900) => {
  const [narrow, setNarrow] = useState(() => window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setNarrow(window.innerWidth < breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return narrow;
};

export default function ExercisePage() {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useLanguageStore();
  const { completeExercise, isExerciseComplete, getExerciseScore, saveCodeToCloud, loadCodeFromCloud } = useProgressStore();
  const { getExerciseById } = useCurriculumStore();
  const { isReady, isLoading: pyLoading, error: pyError, loadProgress, isWasmSupported, runCode } = usePyodide();
  const isNarrow = useIsNarrow();  // true on mobile / iPad portrait
  const [layoutColumn, setLayoutColumn] = useState(false); // manual toggle override

  const exercise = getExerciseById(exerciseId);

  const [code, setCode] = useState(exercise?.starterCode || '');
  const [output, setOutput] = useState('');
  const [runError, setRunError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isGrading, setIsGrading] = useState(false);
  const [gradeResults, setGradeResults] = useState(null);
  const [customInput, setCustomInput] = useState(exercise?.testCases?.[0]?.input || '');
  const [mobileView, setMobileView] = useState('problem'); // 'problem' | 'code'

  // Auto-save logic
  useEffect(() => {
    let active = true;
    if (exercise) {
      loadCodeFromCloud(exercise.id).then(savedCode => {
        if (active) setCode(savedCode || exercise.starterCode || '');
      });
    }
    return () => { active = false; };
  }, [exercise?.id, loadCodeFromCloud]);

  useEffect(() => {
    if (!exercise || !code) return;
    const timer = setTimeout(() => {
      saveCodeToCloud(exercise.id, code);
    }, 2000);
    return () => clearTimeout(timer);
  }, [code, exercise?.id, saveCodeToCloud]);

  useEffect(() => {
    if (exercise) {
      setCustomInput(exercise.testCases?.[0]?.input || '');
    }
  }, [exercise?.id]);

  if (!exercise) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>{lang === 'th' ? 'ไม่พบแบบฝึกหัด' : 'Exercise not found'}</p>
        <Link to="/lessons"><button className="btn-ghost" style={{ marginTop: '1rem' }}>← {lang === 'th' ? 'กลับ' : 'Back'}</button></Link>
      </div>
    );
  }

  const bestScore = getExerciseScore(exercise.id);
  const passed = bestScore >= 80;
  const completed = isExerciseComplete(exercise.id);

  const handleRun = async () => {
    if (!isReady) return;
    setIsRunning(true);
    setOutput('');
    setRunError('');
    setGradeResults(null);

    const result = await runCode(code, customInput);
    
    setOutput(result.output);
    setRunError(result.error);
    setIsRunning(false);
  };

  const handleSubmit = async () => {
    if (!isReady) return;
    setIsGrading(true);
    setGradeResults(null);
    const results = await gradeExerciseSecurely(exercise, code, runCode);
    setGradeResults(results);
    setIsGrading(false);

    // grader now returns scorePercent directly
    const scorePercent = results.scorePercent;
    const { grantXP, nowPasses } = completeExercise(exercise.id, exercise.xpReward, scorePercent);

    if (nowPasses) {
      if (grantXP) {
        toast.success(
          `🎉 ${t.exercise.pass} +${exercise.xpReward} XP`,
          { style: { background: '#1a1a2e', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }, duration: 4000 }
        );
      } else {
        toast.success(
          lang === 'th' ? '✅ ผ่านแล้ว!' : '✅ Already passed!',
          { style: { background: '#1a1a2e', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' } }
        );
      }
    } else {
      toast.error(
        lang === 'th'
          ? `ยังไม่ผ่าน (${scorePercent}%) — ลองใหม่อีกครั้ง`
          : `Not passed yet (${scorePercent}%) — please try again`,
        { style: { background: '#1a1a2e', color: '#fb7185', border: '1px solid rgba(244,63,94,0.3)' }, duration: 4000 }
      );
    }
  };

  const handleReset = () => {
    setCode(exercise.starterCode || '');
    setOutput('');
    setRunError('');
    setGradeResults(null);
  };

  const diffLabels = {
    easy: { th: 'ง่าย', en: 'Easy', color: '#10b981' },
    medium: { th: 'ปานกลาง', en: 'Medium', color: '#f59e0b' },
    hard: { th: 'ยาก', en: 'Hard', color: '#f43f5e' },
  };
  const diff = diffLabels[exercise.difficulty] || diffLabels.easy;
  const useColumnLayout = isNarrow || layoutColumn;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: useColumnLayout ? 'auto' : 'calc(100vh - 60px)', minHeight: useColumnLayout ? 'calc(100vh - 60px)' : 'auto' }}>
      {/* Top Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '0.75rem 1.5rem',
        background: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border-subtle)',
        flexShrink: 0,
      }}>
        <Link to={`/lessons/${exercise.moduleId}`} style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none', fontSize: '0.82rem' }}>
          <ChevronLeft size={14} /> {lang === 'th' ? 'กลับ' : 'Back'}
        </Link>
        <span style={{ color: 'rgba(255,255,255,0.15)' }}>/</span>
        <span style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {exercise.title[lang]}
          <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>{lang === 'th' ? '(โหมดฝึกซ้อม)' : '(Practice)'}</span>
        </span>
        <span style={{
          fontSize: '0.72rem', fontWeight: 700, color: diff.color,
          background: `${diff.color}15`, border: `1px solid ${diff.color}30`,
          borderRadius: '999px', padding: '0.15rem 0.6rem',
        }}>
          ● {diff[lang]}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>+{exercise.xpReward} XP</span>
        {passed && (
          <span className="badge badge-emerald">
            <CheckCircle size={10} /> {lang === 'th' ? `ผ่านแล้ว (${bestScore}%)` : `Passed (${bestScore}%)`}
          </span>
        )}
        {!passed && bestScore >= 0 && (
          <span style={{
            fontSize: '0.72rem', fontWeight: 700, color: '#f59e0b',
            background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: '999px', padding: '0.15rem 0.6rem',
          }}>
            {lang === 'th' ? `คะแนนล่าสุด: ${bestScore}%` : `Best: ${bestScore}%`}
          </span>
        )}
        {/* Layout Toggle (desktop only) */}
        {!isNarrow && (
          <button
            onClick={() => setLayoutColumn(c => !c)}
            className="btn-ghost"
            title={layoutColumn ? 'Switch to side-by-side' : 'Switch to stacked'}
            style={{ padding: '0.35rem 0.5rem', marginLeft: 'auto' }}
          >
            {layoutColumn
              ? <LayoutPanelLeft size={14} />
              : <LayoutPanelTop size={14} />}
          </button>
        )}
      </div>

      {/* Mobile View Toggle */}
      <div className="md:hidden flex bg-[#1a1a2e] border-b border-white/5 w-full flex-shrink-0">
        <button onClick={() => setMobileView('problem')} className={`flex-1 py-2.5 text-sm font-medium transition-colors ${mobileView === 'problem' ? 'text-indigo-400 border-b-2 border-indigo-400 bg-indigo-500/10' : 'text-gray-400 hover:text-gray-300'}`}>
          📖 {lang === 'th' ? 'โจทย์ปัญหา' : 'Problem'}
        </button>
        <button onClick={() => setMobileView('code')} className={`flex-1 py-2.5 text-sm font-medium transition-colors ${mobileView === 'code' ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-500/10' : 'text-gray-400 hover:text-gray-300'}`}>
          💻 {lang === 'th' ? 'เขียนโค้ด' : 'Code Editor'}
        </button>
      </div>

      {/* Main Split Layout */}
      <div style={{
        display: 'flex',
        flexDirection: useColumnLayout && !isNarrow ? 'column' : 'row',
        flex: (useColumnLayout && !isNarrow) ? 'none' : 1,
        overflow: (useColumnLayout && !isNarrow) ? 'visible' : 'hidden',
      }}>
        {/* Problem Description Panel */}
        <div className={`${mobileView === 'problem' ? 'flex' : 'hidden'} md:flex flex-col`} style={{
          width: useColumnLayout && !isNarrow ? '100%' : '40%',
          flexShrink: 0,
          overflow: 'auto',
          borderRight: useColumnLayout && !isNarrow ? 'none' : '1px solid var(--color-border-subtle)',
          borderBottom: useColumnLayout && !isNarrow ? '1px solid var(--color-border-subtle)' : 'none',
          padding: '1.5rem',
          maxHeight: useColumnLayout && !isNarrow ? '45vh' : 'none',
        }}>
          <div style={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: '0.75rem',
            padding: '1.25rem',
            marginBottom: '1rem',
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t.exercise.problem}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)', lineHeight: 1.7 }}>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', color: '#c4cde4' }}>
                {exercise.description[lang]}
              </pre>
            </div>
          </div>

          {/* Hint */}
          <div>
            <button
              onClick={() => setShowHint(!showHint)}
              className="btn-ghost"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', width: '100%', justifyContent: 'center' }}
            >
              <Lightbulb size={14} style={{ color: '#fbbf24' }} />
              {t.exercise.show_hint}
            </button>
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    background: 'rgba(245,158,11,0.08)',
                    border: '1px solid rgba(245,158,11,0.25)',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    fontSize: '0.875rem', color: '#fbbf24',
                    overflow: 'hidden',
                  }}
                >
                  💡 {exercise.hint[lang]}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Grade Results */}
          <AnimatePresence>
            {gradeResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ marginTop: '1.25rem' }}
              >
                {/* Score summary card */}
                <div style={{
                  background: gradeResults.allPassed ? 'rgba(16,185,129,0.08)'
                    : gradeResults.scorePercent >= 80 ? 'rgba(245,158,11,0.08)'
                    : 'rgba(244,63,94,0.08)',
                  border: `1px solid ${gradeResults.allPassed ? 'rgba(16,185,129,0.3)'
                    : gradeResults.scorePercent >= 80 ? 'rgba(245,158,11,0.3)'
                    : 'rgba(244,63,94,0.25)'}`,
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  marginBottom: '0.75rem',
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}>
                  {gradeResults.allPassed
                    ? <CheckCircle size={20} style={{ color: '#10b981', flexShrink: 0 }} />
                    : <XCircle size={20} style={{ color: '#f43f5e', flexShrink: 0 }} />}
                  <div>
                    <div style={{ fontWeight: 700, color: gradeResults.allPassed ? '#34d399' : '#fb7185', fontSize: '0.95rem' }}>
                      {gradeResults.allPassed ? t.exercise.pass : t.exercise.fail}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.15rem' }}>
                      {gradeResults.passCount}/{gradeResults.results.length} {t.exercise.test_cases} {t.exercise.passed}
                    </div>
                    {/* Output-based grading badge */}
                    <div style={{
                      marginTop: '0.4rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                      fontSize: '0.68rem', fontWeight: 600,
                      color: '#7c3aed', background: 'rgba(124,58,237,0.1)',
                      border: '1px solid rgba(124,58,237,0.2)',
                      borderRadius: '999px', padding: '0.1rem 0.5rem',
                    }}>
                      ⚖️ {lang === 'th' ? 'ตรวจจาก Output เท่านั้น — เขียนโค้ดยังไงก็ได้' : 'Output-based grading — any code style accepted'}
                    </div>
                  </div>
                  {/* Score % */}
                  <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    {(() => {
                      const sp  = gradeResults.scorePercent;
                      const col = sp >= 80 ? '#34d399' : sp >= 50 ? '#fbbf24' : '#fb7185';
                      return (
                        <>
                          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: col }}>{sp}%</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                            {sp >= 80 ? (lang === 'th' ? '🔓 ปลดล็อก!' : '🔓 Unlocked!') : (lang === 'th' ? '≥ 80% เพื่อปลดล็อก' : 'Need ≥ 80%')}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Test case details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {gradeResults.results.map((res, i) => (
                    <div key={i} style={{
                      background: 'var(--color-bg-card)',
                      border: `1px solid ${res.passed ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)'}`,
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      fontSize: '0.78rem',
                    }}>
                      {/* Header row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                        {res.passed
                          ? <CheckCircle size={12} style={{ color: '#10b981' }} />
                          : <XCircle size={12} style={{ color: '#f43f5e' }} />}
                        <span style={{ fontWeight: 600, color: res.passed ? '#34d399' : '#fb7185' }}>
                          Test {i + 1}: {res.passed ? t.exercise.passed : t.exercise.failed}
                        </span>
                        {/* Strategy badge */}
                        {res.passed && res.strategy && res.strategy !== 'exact' && (
                          <span style={{
                            marginLeft: 'auto', fontSize: '0.65rem', fontWeight: 600,
                            color: '#a78bfa', background: 'rgba(124,58,237,0.1)',
                            border: '1px solid rgba(124,58,237,0.2)',
                            borderRadius: '999px', padding: '0.05rem 0.4rem',
                          }}>
                            {res.strategy === 'flexible' && (lang === 'th' ? 'ตัวพิมพ์ยืดหยุ่น' : 'flexible')}
                            {res.strategy === 'numeric'  && (lang === 'th' ? 'ตรวจตัวเลข ±0.01' : 'numeric ±0.01')}
                            {res.strategy === 'contains' && (lang === 'th' ? 'ตรวจ keyword' : 'contains')}
                          </span>
                        )}
                      </div>

                      {/* Input */}
                      {res.input && (
                        <div style={{ color: 'var(--color-text-muted)' }}>
                          Input: <code style={{ color: '#a78bfa', fontFamily: "'JetBrains Mono', monospace" }}>{res.input}</code>
                        </div>
                      )}

                      {/* Expected vs Actual on fail */}
                      {!res.passed && res.expected && (
                        <div style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                          {t.exercise.expected}:
                          <code style={{ color: '#10b981', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'pre-wrap', display: 'block', marginTop: '0.15rem', padding: '0.2rem 0.5rem', background: 'rgba(16,185,129,0.06)', borderRadius: '0.3rem' }}>
                            {res.expected}
                          </code>
                        </div>
                      )}
                      {!res.passed && (
                        <div style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                          {lang === 'th' ? 'ได้รับ' : 'Got'}:
                          <code style={{ color: '#fb7185', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'pre-wrap', display: 'block', marginTop: '0.15rem', padding: '0.2rem 0.5rem', background: 'rgba(244,63,94,0.06)', borderRadius: '0.3rem' }}>
                            {res.actual || (res.error ? `[ERROR] ${res.error}` : '(ไม่มี output)')}
                          </code>
                        </div>
                      )}

                      {/* Mismatch hint from grader */}
                      {!res.passed && res.mismatch && (
                        <div style={{
                          marginTop: '0.4rem', padding: '0.3rem 0.6rem',
                          background: 'rgba(245,158,11,0.06)',
                          border: '1px solid rgba(245,158,11,0.15)',
                          borderRadius: '0.3rem',
                          fontSize: '0.73rem', color: '#fbbf24',
                          fontFamily: "'JetBrains Mono', monospace",
                        }}>
                          💡 {res.mismatch}
                        </div>
                      )}

                      {/* Runtime error notice */}
                      {!res.passed && res.error && (
                        <div style={{
                          marginTop: '0.4rem', padding: '0.3rem 0.6rem',
                          background: 'rgba(244,63,94,0.06)',
                          border: '1px solid rgba(244,63,94,0.15)',
                          borderRadius: '0.3rem',
                          fontSize: '0.73rem', color: '#fca5a5',
                        }}>
                          ⚠ {lang === 'th' ? 'โค้ดเกิด error ขณะรัน test case นี้' : 'Code threw an error on this test case'}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel: Editor & Output */}
        <div className={`${mobileView === 'code' ? 'flex' : 'hidden'} md:flex flex-col`} style={{
          flex: 1,
          overflow: 'hidden',
          width: '100%',
        }}>
          {/* Editor header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.5rem 1rem',
            background: 'var(--color-bg-secondary)',
            borderBottom: '1px solid var(--color-border-subtle)',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Terminal size={14} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>solution.py</span>
              {pyLoading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: '#7c3aed', marginLeft: '0.5rem' }}>
                  <Loader2 size={11} className="animate-spin" />
                  {t.common.loading_python}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={handleReset} className="btn-ghost" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <RotateCcw size={12} /> {t.exercise.reset}
              </button>
              <button
                onClick={handleRun}
                disabled={!isReady || isRunning || !isWasmSupported}
                className="btn-ghost"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#10b981', borderColor: 'rgba(16,185,129,0.3)', opacity: (!isReady || isRunning || !isWasmSupported) ? 0.5 : 1 }}
              >
                {isRunning ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} />}
                {t.exercise.run}
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isReady || isGrading || !isWasmSupported}
                className="btn-primary"
                style={{ padding: '0.35rem 0.875rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: (!isReady || isGrading || !isWasmSupported) ? 0.5 : 1 }}
              >
                {isGrading ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
                {t.exercise.submit}
              </button>
            </div>
          </div>

          <div style={{ flex: 1, overflow: 'hidden' }}>
            <CodeEditor value={code} onChange={setCode} height="100%" />
          </div>

          <div style={{ padding: '0.75rem', borderTop: '1px solid var(--color-border-subtle)', flexShrink: 0 }}>
            <OutputPanel
              output={output}
              error={runError}
              isRunning={isRunning || isGrading}
              language={lang}
              pyLoading={pyLoading}
              loadProgress={loadProgress}
              isWasmSupported={isWasmSupported}
              pyError={pyError}
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
