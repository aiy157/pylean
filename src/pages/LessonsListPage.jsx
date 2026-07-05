// src/pages/LessonsListPage.jsx — Module overview with lesson list
import { Link, useParams } from 'react-router-dom';
import { useLanguageStore } from '../store/languageStore';
import { useProgressStore } from '../store/progressStore';
import { useAdminStore } from '../store/adminStore';
import { MODULES } from '../data/curriculum';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, PlayCircle, ChevronRight, BookOpen, Dumbbell } from 'lucide-react';

export default function LessonsListPage() {
  const { moduleId } = useParams();
  const { lang, t } = useLanguageStore();
  const { isModuleUnlocked, isLessonComplete, isExerciseComplete, isExercisePassed, getExerciseScore } = useProgressStore();
  const { getAllExercises } = useAdminStore();

  // If moduleId is provided, show lessons for that module
  if (moduleId) {
    const mod = MODULES.find(m => m.id === parseInt(moduleId));
    if (!mod) return null;
    const unlocked = isModuleUnlocked(mod.id);
    const allExercises = getAllExercises().filter(e => e.moduleId === mod.id);

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Module Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '2rem' }}>
          <Link to="/lessons" style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '1rem' }}>
            ← {lang === 'th' ? 'โมดูลทั้งหมด' : 'All Modules'}
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '0.875rem',
              background: mod.colorDark, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', border: `1px solid ${mod.color}40`,
            }}>
              {mod.icon}
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{mod.title[lang]}</h1>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{mod.description[lang]}</p>
            </div>
          </div>
        </motion.div>

        {/* Lessons */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <BookOpen size={15} style={{ color: mod.color }} />
            <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>{lang === 'th' ? 'บทเรียน' : 'Lessons'}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {mod.lessons.map((lesson, i) => {
              const done = isLessonComplete(lesson.id);
              
              // Check if locked
              let isLocked = !unlocked;
              if (unlocked && i > 0) {
                const prev = mod.lessons[i - 1];
                const prevDone = isLessonComplete(prev.id);

                // Fix: match exercise by lessonId field first, fall back to same-order index
                // This prevents wrong locking when exercise count != lesson count
                const moduleExercisesSorted = [...allExercises].sort((a, b) => a.order - b.order);
                const prevLinkedExercise = moduleExercisesSorted.find(ex => ex.lessonId === prev.id) ?? null;
                const prevExercisePassed = prevLinkedExercise
                  ? isExercisePassed(prevLinkedExercise.id)
                  : true;  // no exercise linked to prev lesson → not required

                if (!prevDone || !prevExercisePassed) {
                  isLocked = true;
                }
              }

              const isClickable = !isLocked;

              return (
                <motion.div
                   key={lesson.id}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={isClickable ? `/lessons/${mod.id}/${lesson.id}` : '#'}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '1rem',
                      background: done ? 'rgba(16,185,129,0.05)' : 'var(--color-bg-card)',
                      border: `1px solid ${done ? 'rgba(16,185,129,0.2)' : 'var(--color-border-subtle)'}`,
                      borderRadius: '0.75rem',
                      padding: '1rem 1.25rem',
                      transition: 'all 0.2s',
                      cursor: isClickable ? 'pointer' : 'not-allowed',
                      opacity: isClickable ? 1 : 0.55,
                    }}
                    onMouseEnter={e => isClickable && (e.currentTarget.style.borderColor = `${mod.color}50`)}
                    onMouseLeave={e => e.currentTarget.style.borderColor = done ? 'rgba(16,185,129,0.2)' : 'var(--color-border-subtle)'}
                    >
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: done ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)',
                        border: `2px solid ${done ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {done ? (
                          <CheckCircle size={16} style={{ color: '#10b981' }} />
                        ) : isLocked ? (
                          <Lock size={14} style={{ color: 'var(--color-text-muted)' }} />
                        ) : (
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>{i + 1}</span>
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.15rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          {lesson.title[lang]}
                          {isLocked && <Lock size={12} style={{ color: 'var(--color-text-muted)' }} />}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', gap: '0.5rem' }}>
                          <span>+{lesson.xpReward} XP</span>
                          {lesson.hasFlowchart && <span className="badge badge-violet" style={{ fontSize: '0.65rem' }}>📊 Flowchart</span>}
                        </div>
                      </div>
                      <ChevronRight size={15} style={{ color: 'var(--color-text-muted)' }} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Exercises */}
        {allExercises.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Dumbbell size={15} style={{ color: '#f59e0b' }} />
              <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>{lang === 'th' ? 'แบบฝึกหัด & ท้าทายท้ายโมดูล' : 'Exercises & Challenges'}</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {allExercises.map((ex, i) => {
                const isChallenge = !ex.lessonId;
                const done = isExerciseComplete(ex.id);
                const diffColors = { easy: '#10b981', medium: '#f59e0b', hard: '#f43f5e' };
                const diffLabels = {
                  easy: { th: 'ง่าย', en: 'Easy' },
                  medium: { th: 'ปานกลาง', en: 'Medium' },
                  hard: { th: 'ยาก', en: 'Hard' },
                };
                return (
                  <motion.div
                    key={ex.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (mod.lessons.length + i) * 0.06 }}
                  >
                    <Link
                      to={unlocked ? `/exercise/${ex.id}` : '#'}
                      style={{ textDecoration: 'none', display: 'block' }}
                    >
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '1rem',
                        background: done ? 'rgba(16,185,129,0.05)' : 'var(--color-bg-card)',
                        border: `1px solid ${done ? 'rgba(16,185,129,0.2)' : 'var(--color-border-subtle)'}`,
                        borderRadius: '0.75rem',
                        padding: '1rem 1.25rem',
                        cursor: unlocked ? 'pointer' : 'not-allowed',
                        opacity: unlocked ? 1 : 0.5,
                      }}
                      onMouseEnter={e => unlocked && (e.currentTarget.style.borderColor = 'rgba(245,158,11,0.3)')}
                      onMouseLeave={e => e.currentTarget.style.borderColor = done ? 'rgba(16,185,129,0.2)' : 'var(--color-border-subtle)'}
                      >
                        <div style={{
                          width: 36, height: 36, borderRadius: '50%',
                          background: done ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.1)',
                          border: `2px solid ${done ? '#10b981' : '#f59e0b50'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, fontSize: '0.9rem',
                        }}>
                          {done ? <CheckCircle size={16} style={{ color: '#10b981' }} /> : '💻'}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.15rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            {ex.title[lang]}
                            {isChallenge && (
                              <span style={{ fontSize: '0.65rem', background: 'rgba(245,158,11,0.15)', color: '#fbbf24', padding: '0.15rem 0.4rem', borderRadius: '4px', border: '1px solid rgba(245,158,11,0.3)' }}>
                                {lang === 'th' ? '⭐ ท้าทายท้ายโมดูล' : '⭐ Final Challenge'}
                              </span>
                            )}
                            {!isChallenge && (
                              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
                                {lang === 'th' ? '(โหมดทบทวน)' : '(Review)'}
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <span style={{ color: diffColors[ex.difficulty], fontWeight: 600 }}>● {diffLabels[ex.difficulty]?.[lang]}</span>
                            <span style={{ color: 'var(--color-text-muted)' }}>+{ex.xpReward} XP</span>
                          </div>
                        </div>
                        <ChevronRight size={15} style={{ color: 'var(--color-text-muted)' }} />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // All modules view
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{lang === 'th' ? 'บทเรียนทั้งหมด' : 'All Lessons'}</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
          {lang === 'th' ? 'เลือกโมดูลที่ต้องการเรียน' : 'Choose a module to start'}
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {MODULES.map((mod, i) => {
          const unlocked = isModuleUnlocked(mod.id);
          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Link to={`/lessons/${mod.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '1.25rem',
                  background: 'var(--color-bg-card)',
                  border: `1px solid ${unlocked ? mod.color + '25' : 'rgba(255,255,255,0.04)'}`,
                  borderRadius: '1rem',
                  padding: '1.25rem 1.5rem',
                  opacity: unlocked ? 1 : 0.55,
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => unlocked && (e.currentTarget.style.transform = 'translateX(4px)')}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: '0.75rem',
                    background: mod.colorDark, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.4rem', flexShrink: 0, filter: unlocked ? 'none' : 'grayscale(1)',
                  }}>
                    {mod.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '1rem' }}>{mod.title[lang]}</span>
                      {!unlocked && <Lock size={13} style={{ color: 'var(--color-text-muted)' }} />}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>{mod.description[lang]}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                      {mod.lessons.length} {lang === 'th' ? 'บทเรียน' : 'lessons'}
                      {mod.requiredXP > 0 && ` • ${mod.requiredXP} XP ${lang === 'th' ? 'ที่ต้องการ' : 'required'}`}
                    </div>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
