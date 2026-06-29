// src/pages/LessonPage.jsx
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguageStore } from '../store/languageStore';
import { useProgressStore } from '../store/progressStore';
import { useAdminStore } from '../store/adminStore';
import { usePyodide } from '../hooks/usePyodide';
import { MODULES } from '../data/curriculum';
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
  Lock, AlertTriangle, ExternalLink
} from 'lucide-react';

const TAB_THEORY = 'theory';
const TAB_EXAMPLE = 'example';
const TAB_COMMANDS = 'commands';

export default function LessonPage() {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLanguageStore();
  const { completeLesson, isLessonComplete, isModuleUnlocked, isExercisePassed, getExerciseScore } = useProgressStore();
  const { getAllExercises } = useAdminStore();
  const { isLoading: pyLoading, isReady, error: pyError, loadProgress, isWasmSupported, runCode } = usePyodide();

  const mod = MODULES.find(m => m.id === parseInt(moduleId));
  const lessonIdx = mod?.lessons.findIndex(l => l.id === lessonId) ?? -1;
  const lesson = mod?.lessons[lessonIdx];

  const [activeTab, setActiveTab] = useState(TAB_THEORY);
  const [code, setCode] = useState('# ลองพิมพ์โค้ด Python ที่นี่\nprint("สวัสดีชาวโลก!")');
  const [output, setOutput] = useState('');
  const [runError, setRunError] = useState('');
  const [isRunning, setIsRunning] = useState(false);

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

  // ── Gate: find exercise matching this lesson by same order index ──
  const allExercises = getAllExercises();
  const moduleExercises = allExercises
    .filter(ex => ex.moduleId === mod.id)
    .sort((a, b) => a.order - b.order);
  const linkedExercise = moduleExercises[lessonIdx] ?? null;  // lesson 0 → exercise 0, etc.
  const exercisePassed = linkedExercise ? isExercisePassed(linkedExercise.id) : true;
  const exerciseBestScore = linkedExercise ? getExerciseScore(linkedExercise.id) : -1;
  // Block going to next lesson if there's a linked exercise that hasn't been passed
  const isNextBlocked = !!nextLesson && !!linkedExercise && !exercisePassed;

  const handleRun = async () => {
    if (!isReady) return;
    setIsRunning(true);
    setOutput('');
    setRunError('');
    const result = await runCode(code);
    setOutput(result.output);
    setRunError(result.error);
    setIsRunning(false);
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link to={`/exercise/${linkedExercise.id}`}>
                <button className="btn-ghost" style={{
                  padding: '0.4rem 0.875rem', fontSize: '0.8rem',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  color: '#fbbf24', borderColor: 'rgba(245,158,11,0.4)',
                  background: 'rgba(245,158,11,0.07)',
                }}>
                  <ExternalLink size={13} />
                  {lang === 'th' ? 'ทำโจทย์ก่อน' : 'Do Exercise First'}
                </button>
              </Link>
              <button disabled className="btn-primary" style={{
                padding: '0.4rem 1rem', fontSize: '0.82rem',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                opacity: 0.4, cursor: 'not-allowed',
              }}>
                <Lock size={13} /> {t.lesson.next}
              </button>
            </div>
          ) : (
            <button onClick={handleComplete} className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {nextLesson ? (<>{t.lesson.next} <ChevronRight size={13} /></>) : (<>{t.lesson.complete} <CheckCircle size={13} /></>)}
            </button>
          )}
        </div>
      </div>

      {/* ── Gate Warning Banner ── */}
      {isNextBlocked && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.625rem 1.5rem',
          background: 'rgba(245,158,11,0.08)',
          borderBottom: '2px solid rgba(245,158,11,0.3)',
          flexShrink: 0,
        }}>
          <AlertTriangle size={15} style={{ color: '#fbbf24', flexShrink: 0 }} />
          <span style={{ fontSize: '0.82rem', color: '#fbbf24', fontWeight: 600 }}>
            {lang === 'th'
              ? `ต้องผ่านโจทย์ "${linkedExercise.title.th}" ≥ 80% ก่อนไปบทถัดไป`
              : `Complete exercise "${linkedExercise.title.en}" with ≥ 80% to unlock next lesson`}
          </span>
          {exerciseBestScore >= 0 && (
            <span style={{ marginLeft: '0.5rem', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              ({lang === 'th' ? 'คะแนนล่าสุด' : 'Best score'}: {exerciseBestScore}%)
            </span>
          )}
          <Link to={`/exercise/${linkedExercise.id}`} style={{ marginLeft: 'auto', textDecoration: 'none' }}>
            <button style={{
              padding: '0.3rem 0.875rem', fontSize: '0.78rem',
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              background: 'rgba(245,158,11,0.15)', color: '#fbbf24',
              border: '1px solid rgba(245,158,11,0.4)',
              borderRadius: '0.4rem', cursor: 'pointer',
            }}>
              <ExternalLink size={12} />
              {lang === 'th' ? 'ไปทำโจทย์' : 'Go to Exercise'}
            </button>
          </Link>
        </div>
      )}

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
                disabled={!isReady || isRunning || !isWasmSupported}
                className="btn-emerald"
                style={{ padding: '0.35rem 0.875rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: (!isReady || isRunning || !isWasmSupported) ? 0.5 : 1 }}
              >
                {isRunning ? <Loader2 size={13} className="animate-spin" /> : <Play size={13} />}
                {t.exercise.run}
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
