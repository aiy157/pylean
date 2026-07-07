// src/pages/LessonPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguageStore } from '../store/languageStore';
import { useProgressStore } from '../store/progressStore';
import { useAdminStore } from '../store/adminStore';
import { useCurriculumStore } from '../store/curriculumStore';
import { usePyodide } from '../hooks/usePyodide';
import { gradeExercise } from '../utils/grader';
import CodeEditor from '../components/editor/CodeEditor';
import OutputPanel from '../components/editor/OutputPanel';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import toast from 'react-hot-toast';
import {
  ChevronLeft, ChevronRight, Play, CheckCircle,
  BookOpen, Code2, Loader2, GitBranch, Terminal, Hash,
  Lock, AlertTriangle, ExternalLink, Send, Lightbulb, AlertCircle, XCircle
} from 'lucide-react';

const TAB_THEORY = 'theory';
const TAB_EXAMPLE = 'example';
const TAB_COMMANDS = 'commands';
const TAB_EXERCISE = 'exercise';

export default function LessonPage() {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLanguageStore();
  const { completeLesson, isLessonComplete, isModuleUnlocked, isExercisePassed, getExerciseScore, completeExercise, saveCodeToCloud, loadCodeFromCloud } = useProgressStore();
  const { isLoading: pyLoading, isReady, error: pyError, loadProgress, isWasmSupported, runCode } = usePyodide();
  const { modules, exercises } = useCurriculumStore();

  const mod = modules.find(m => m.id === parseInt(moduleId));
  const lessonIdx = mod?.lessons.findIndex(l => l.id === lessonId) ?? -1;
  const lesson = mod?.lessons[lessonIdx];

  const [activeTab, setActiveTab] = useState(TAB_THEORY);
  const [code, setCode] = useState('# ลองพิมพ์โค้ด Python ที่นี่\nprint("สวัสดีชาวโลก!")');
  const [output, setOutput] = useState('');
  const [runError, setRunError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isGrading, setIsGrading] = useState(false);
  const [gradeResults, setGradeResults] = useState(null);
  const [customInput, setCustomInput] = useState('');
  const [showHint, setShowHint] = useState(false);

  if (!mod || !lesson) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        {lang === 'th' ? 'ไม่พบบทเรียน' : 'Lesson not found'}
      </div>
    );
  }

  if (!isModuleUnlocked(mod.id)) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔒</div>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          {lang === 'th' ? `ต้องการ ${mod.requiredXP} XP เพื่อเข้าถึงโมดูลนี้` : `Requires ${mod.requiredXP} XP to access`}
        </p>
        <Link to="/dashboard"><button className="btn-primary" style={{ marginTop: '1rem' }}>Dashboard</button></Link>
      </div>
    );
  }

  const prevLesson = lessonIdx > 0 ? mod.lessons[lessonIdx - 1] : null;
  const nextLesson = lessonIdx < mod.lessons.length - 1 ? mod.lessons[lessonIdx + 1] : null;
  const completed = isLessonComplete(lesson.id);

  // ── Gate: map lesson ID to exercise ID ──
  const lessonToExerciseMap = {
    '1-5': 'ex-1-1'
  };
  const linkedExerciseId = lessonToExerciseMap[lesson.id];
  const linkedExercise = linkedExerciseId ? exercises.find(ex => ex.id === linkedExerciseId) : null;
  const exercisePassed = linkedExercise ? isExercisePassed(linkedExercise.id) : true;
  const exerciseBestScore = linkedExercise ? getExerciseScore(linkedExercise.id) : -1;
  // Block going to next lesson if there's a linked exercise that hasn't been passed
  const isNextBlocked = !!nextLesson && !!linkedExercise && !exercisePassed;

  useEffect(() => {
    let active = true;
    if (linkedExercise && activeTab === TAB_EXERCISE) {
      loadCodeFromCloud(linkedExercise.id).then(savedCode => {
        if (active) setCode(savedCode || linkedExercise.starterCode || '');
      });
      setCustomInput(linkedExercise.testCases?.[0]?.input || '');
      setOutput('');
      setRunError('');
      setGradeResults(null);
      setShowHint(false);
    } else if (activeTab === TAB_EXAMPLE) {
      setCode('# ลองพิมพ์โค้ด Python ที่นี่\nprint("สวัสดีชาวโลก!")');
      setOutput('');
      setRunError('');
    }
    return () => { active = false; };
  }, [linkedExercise?.id, activeTab, loadCodeFromCloud]);

  // Debounce auto-save for exercise tab
  useEffect(() => {
    if (activeTab === TAB_EXERCISE && linkedExercise && code) {
      const timer = setTimeout(() => {
        saveCodeToCloud(linkedExercise.id, code);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [code, linkedExercise?.id, activeTab, saveCodeToCloud]);

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
    if (!isReady || !linkedExercise) return;
    setIsGrading(true);
    setGradeResults(null);
    const results = await gradeExercise(linkedExercise, code, runCode);
    setGradeResults(results);
    setIsGrading(false);

    const scorePercent = results.scorePercent;
    const { grantXP, nowPasses } = completeExercise(linkedExercise.id, linkedExercise.xpReward, scorePercent);

    if (nowPasses) {
      if (grantXP) {
        toast.success(`🎉 ผ่านแล้ว! ได้รับ +${linkedExercise.xpReward} XP`, { style: { background: '#1a1a2e', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }, duration: 4000 });
      } else {
        toast.success('✅ ผ่านแล้ว!', { style: { background: '#1a1a2e', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' } });
      }
    } else {
      toast.error(`ยังไม่ผ่าน (${scorePercent}%) — ต้องได้ ≥ 80% ถึงจะปลดล็อกบทถัดไป`, { style: { background: '#1a1a2e', color: '#fb7185', border: '1px solid rgba(244,63,94,0.3)' }, duration: 4000 });
    }
  };

  const handleComplete = () => {
    if (isNextBlocked) return;   // guard
    if (!completed) {
      completeLesson(lesson.id, lesson.xpReward);
      toast.success(`✅ +${lesson.xpReward} XP ${lang === 'th' ? 'ได้รับแล้ว!' : 'earned!'}`, {
        style: { background: '#1a1a2e', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' },
      });
    }
    if (nextLesson) {
      navigate(`/lessons/${moduleId}/${nextLesson.id}`);
    } else {
      navigate(`/lessons/${moduleId}`);
    }
  };

  const tabs = [
    { id: TAB_THEORY, icon: BookOpen, label: t.lesson.theory },
    { id: TAB_EXAMPLE, icon: Code2, label: t.lesson.example },
    ...(lesson.commands?.length ? [{ id: TAB_COMMANDS, icon: Hash, label: t.lesson.command_ref }] : []),
    ...(linkedExercise ? [{ id: TAB_EXERCISE, icon: GitBranch, label: lang === 'th' ? 'แบบฝึกหัด' : 'Exercise' }] : []),
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)' }}>
      {/* Top Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '0.75rem 1.5rem',
        background: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border-subtle)',
        flexShrink: 0,
      }}>
        <Link to={`/lessons/${moduleId}`} style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none', fontSize: '0.82rem' }}>
          <ChevronLeft size={14} /> {mod.title[lang]}
        </Link>
        <span style={{ color: 'var(--color-border-subtle)' }}>/</span>
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{lesson.title[lang]}</span>
        {completed && (
          <span className="badge badge-emerald" style={{ marginLeft: '0.5rem' }}>
            <CheckCircle size={10} /> {lang === 'th' ? 'เสร็จแล้ว' : 'Done'}
          </span>
        )}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {prevLesson && (
            <Link to={`/lessons/${moduleId}/${prevLesson.id}`}>
              <button className="btn-ghost" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <ChevronLeft size={13} /> {t.lesson.prev}
              </button>
            </Link>
          )}
          {isNextBlocked ? (
            <button onClick={() => setActiveTab(TAB_EXERCISE)} className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#fbbf24', color: '#000' }}>
              <AlertTriangle size={13} /> {lang === 'th' ? 'ทำแบบฝึกหัดก่อน' : 'Do Exercise First'}
            </button>
          ) : (
            <button onClick={handleComplete} className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {nextLesson ? (<>{t.lesson.next} <ChevronRight size={13} /></>) : (<>{t.lesson.complete} <CheckCircle size={13} /></>)}
            </button>
          )}
        </div>
      </div>

      {/* ── Exercise Passed Badge ── */}
      {linkedExercise && exercisePassed && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.45rem 1.5rem',
          background: 'rgba(16,185,129,0.06)',
          borderBottom: '1px solid rgba(16,185,129,0.15)',
          flexShrink: 0,
        }}>
          <CheckCircle size={14} style={{ color: '#10b981' }} />
          <span style={{ fontSize: '0.78rem', color: '#34d399' }}>
            {lang === 'th'
              ? `✓ ผ่านโจทย์ "${linkedExercise.title.th}" ด้วยคะแนน ${exerciseBestScore}% — ปลดล็อกสำเร็จ!`
              : `✓ Passed "${linkedExercise.title.en}" with ${exerciseBestScore}% — Next lesson unlocked!`}
          </span>
        </div>
      )}

      {/* Main Split Layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left: Theory Panel */}
        <div style={{
          width: '45%',
          flexShrink: 0,
          overflow: 'auto',
          borderRight: '1px solid var(--color-border-subtle)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--color-border-subtle)',
            background: 'var(--color-bg-secondary)',
            flexShrink: 0,
          }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', border: 'none', background: 'none' }}
              >
                <tab.icon size={13} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ padding: '1.5rem', flex: 1, overflow: 'auto' }}>
            <AnimatePresence mode="wait">
              {activeTab === TAB_THEORY && (
                <motion.div key="theory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="lesson-content">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              customStyle={{ borderRadius: '0.625rem', fontSize: '0.82rem', margin: '0.875rem 0', border: '1px solid rgba(255,255,255,0.08)' }}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code {...props}>{children}</code>
                          );
                        },
                      }}
                    >
                      {lesson.content[lang]}
                    </ReactMarkdown>
                  </div>
                </motion.div>

              )}

              {activeTab === TAB_EXAMPLE && (
                <motion.div key="example" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', fontSize: '0.875rem' }}>
                    {lang === 'th' ? 'ลองรันโค้ดตัวอย่างด้านขวา แล้วแก้ไขดูผลที่แตกต่าง' : 'Try running the example code on the right, then modify it to see different results.'}
                  </p>
                  <div className="lesson-code">
                    <pre style={{ color: '#10b981', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.83rem', lineHeight: 1.6 }}>
                      {lang === 'th' ? '# แก้ไขโค้ดทางขวาและกด Run ▶' : '# Edit the code on the right and press Run ▶'}
                    </pre>
                  </div>
                </motion.div>
              )}

              {activeTab === TAB_COMMANDS && (
                <motion.div key="commands" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {lesson.commands?.map((cmd, i) => (
                      <div key={i} style={{
                        background: 'var(--color-bg-elevated)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: '0.75rem',
                        padding: '1rem 1.25rem',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem', color: '#7c3aed', fontWeight: 700 }}>{cmd.name}</span>
                        </div>
                        <div style={{ background: '#0d1117', borderRadius: '0.4rem', padding: '0.6rem 0.875rem', marginBottom: '0.5rem' }}>
                          <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#a78bfa', margin: 0 }}>{cmd.syntax}</pre>
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>{cmd.description[lang]}</p>
                        <div style={{ background: '#0d1117', borderRadius: '0.4rem', padding: '0.6rem 0.875rem' }}>
                          <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: '#10b981', margin: 0 }}>{cmd.example}</pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === TAB_EXERCISE && linkedExercise && (
                <motion.div key="exercise" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
                    {linkedExercise.title[lang]}
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                    +{linkedExercise.xpReward} XP
                  </p>
                  
                  <div className="exercise-content" style={{ marginBottom: '1.5rem', lineHeight: 1.6, fontSize: '0.9rem' }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {linkedExercise.description[lang]}
                    </ReactMarkdown>
                  </div>
                  
                  {linkedExercise.hint && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <button onClick={() => setShowHint(h => !h)} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', padding: '0.4rem 0.75rem', color: '#f59e0b', background: 'rgba(245,158,11,0.1)' }}>
                        <Lightbulb size={14} /> {lang === 'th' ? 'คำใบ้ (Hint)' : 'Hint'}
                      </button>
                      <AnimatePresence>
                        {showHint && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                            <div style={{ padding: '0.875rem', marginTop: '0.5rem', background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-primary)' }}>
                              <ReactMarkdown>{linkedExercise.hint[lang]}</ReactMarkdown>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {gradeResults && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{
                      padding: '1rem', marginTop: '1rem', borderRadius: '0.5rem',
                      background: gradeResults.allPassed ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)',
                      border: `1px solid ${gradeResults.allPassed ? 'rgba(16,185,129,0.3)' : 'rgba(244,63,94,0.3)'}`
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        {gradeResults.allPassed ? <CheckCircle size={16} color="#10b981" /> : <XCircle size={16} color="#f43f5e" />}
                        <span style={{ fontWeight: 600, color: gradeResults.allPassed ? '#34d399' : '#fb7185' }}>
                          {lang === 'th' ? 'ผลตรวจ:' : 'Results:'} {gradeResults.scorePercent}%
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {gradeResults.results.map((t, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                            {t.passed ? <CheckCircle size={12} color="#10b981" /> : <XCircle size={12} color="#f43f5e" />}
                            <span>Test {i + 1}: {t.passed ? (lang === 'th' ? 'ผ่าน' : 'Passed') : (lang === 'th' ? 'ไม่ผ่าน' : 'Failed')}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Code Editor Panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
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
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>main.py</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {pyLoading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#7c3aed' }}>
                  <Loader2 size={12} className="animate-spin" />
                  {loadProgress || t.common.loading_python}
                </div>
              )}
              {!isWasmSupported && (
                <div style={{ fontSize: '0.72rem', color: '#f43f5e' }}>⚠ ไม่รองรับ WebAssembly</div>
              )}
              <button
                onClick={handleRun}
                disabled={!isReady || isRunning || isGrading || !isWasmSupported}
                className="btn-emerald"
                style={{ padding: '0.35rem 0.875rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: (!isReady || isRunning || isGrading || !isWasmSupported) ? 0.5 : 1 }}
              >
                {isRunning ? <Loader2 size={13} className="animate-spin" /> : <Play size={13} />}
                {t.exercise.run}
              </button>
              {activeTab === TAB_EXERCISE && linkedExercise && (
                <button
                  onClick={handleSubmit}
                  disabled={!isReady || isRunning || isGrading || !isWasmSupported}
                  className="btn-primary"
                  style={{ padding: '0.35rem 0.875rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: (!isReady || isRunning || isGrading || !isWasmSupported) ? 0.5 : 1 }}
                >
                  {isGrading ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
                  {lang === 'th' ? 'ส่งคำตอบ' : 'Submit'}
                </button>
              )}
            </div>
          </div>

          <div style={{ flex: 1, overflow: 'hidden' }}>
            <CodeEditor value={code} onChange={setCode} height="100%" />
          </div>

          <div style={{ padding: '0.75rem', borderTop: '1px solid var(--color-border-subtle)', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {activeTab === TAB_EXERCISE && linkedExercise && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', minWidth: '80px' }}>Custom Input:</span>
                <input
                  type="text"
                  value={customInput}
                  onChange={e => setCustomInput(e.target.value)}
                  placeholder="Enter inputs separated by space..."
                  style={{ flex: 1, padding: '0.3rem 0.5rem', fontSize: '0.8rem', background: '#0d1117', border: '1px solid var(--color-border-subtle)', borderRadius: '0.25rem', color: '#e2e8f0', fontFamily: "'JetBrains Mono', monospace" }}
                />
              </div>
            )}
            <OutputPanel
              output={output}
              error={runError}
              isRunning={isRunning}
              language={lang}
              pyLoading={pyLoading}
              loadProgress={loadProgress}
              isWasmSupported={isWasmSupported}
              pyError={pyError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
