// src/pages/Dashboard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '../store/languageStore';
import { useProgressStore } from '../store/progressStore';
import { MODULES } from '../data/curriculum';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, CheckCircle, PlayCircle, RotateCcw, AlertTriangle, X } from 'lucide-react';
import toast from 'react-hot-toast';

const BADGES_CONFIG = {
  first_lesson:   { icon: '🎓', label: { th: 'บทเรียนแรก',   en: 'First Lesson' } },
  first_exercise: { icon: '💪', label: { th: 'แบบฝึกหัดแรก', en: 'First Exercise' } },
  exercise_5:     { icon: '🏆', label: { th: 'ทำ 5 โจทย์',   en: '5 Exercises Done' } },
  exercise_10:    { icon: '🌟', label: { th: 'ทำ 10 โจทย์',  en: '10 Exercises Done' } },
  xp_100:         { icon: '⚡', label: { th: '100 XP',       en: '100 XP' } },
  xp_300:         { icon: '🔥', label: { th: '300 XP',       en: '300 XP' } },
};

export default function Dashboard() {
  const { t, lang } = useLanguageStore();
  const { xp, badges, isModuleUnlocked, getModuleProgress, resetProgress } = useProgressStore();
  const [showResetModal, setShowResetModal] = useState(false);

  const totalXPNeeded = MODULES[MODULES.length - 1].requiredXP + 100;
  const overallProgress = Math.min(100, Math.round((xp / totalXPNeeded) * 100));

  const handleReset = () => {
    resetProgress();
    setShowResetModal(false);
    toast.success(
      lang === 'th' ? '🔄 รีเซ็ตความก้าวหน้าเรียบร้อย' : '🔄 Progress reset successfully',
      { style: { background: '#1a1a2e', color: '#fb7185', border: '1px solid rgba(244,63,94,0.3)' } }
    );
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>

      {/* ── Reset Confirm Modal ── */}
      <AnimatePresence>
        {showResetModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(0,0,0,0.65)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem',
            }}
            onClick={() => setShowResetModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid rgba(244,63,94,0.3)',
                borderRadius: '1.25rem',
                padding: '2rem',
                maxWidth: 420, width: '100%',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '0.75rem',
                    background: 'rgba(244,63,94,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <AlertTriangle size={20} style={{ color: '#f43f5e' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fb7185' }}>
                      {lang === 'th' ? 'รีเซ็ตความก้าวหน้า' : 'Reset Progress'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.1rem' }}>
                      {lang === 'th' ? 'ไม่สามารถกู้คืนได้' : 'This cannot be undone'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowResetModal(false)}
                  className="btn-ghost"
                  style={{ padding: '0.35rem', borderRadius: '0.5rem' }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Warning box */}
              <div style={{
                background: 'rgba(244,63,94,0.07)',
                border: '1px solid rgba(244,63,94,0.2)',
                borderRadius: '0.75rem',
                padding: '1rem',
                marginBottom: '1.5rem',
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.65,
              }}>
                {lang === 'th' ? (
                  <>
                    การรีเซ็ตจะลบ:<br />
                    <strong style={{ color: '#fb7185' }}>XP ทั้งหมด • บทเรียนที่เรียนแล้ว • คะแนนโจทย์ทุกข้อ • ป้ายรางวัล</strong>
                    <br /><br />
                    ใช้สำหรับทดลองระบบ ก่อนรีเซ็ตให้แน่ใจว่าต้องการลบจริงๆ
                  </>
                ) : (
                  <>
                    This will permanently delete:<br />
                    <strong style={{ color: '#fb7185' }}>All XP • Completed lessons • Exercise scores • Badges</strong>
                    <br /><br />
                    Use this only for testing. Make sure you really want to reset.
                  </>
                )}
              </div>

              {/* Current stats */}
              <div style={{
                display: 'flex', gap: '0.75rem', marginBottom: '1.5rem',
              }}>
                {[
                  { label: 'XP', value: xp, color: '#a78bfa' },
                  { label: lang === 'th' ? 'ป้าย' : 'Badges', value: badges.length, color: '#fbbf24' },
                ].map(item => (
                  <div key={item.label} style={{
                    flex: 1, padding: '0.75rem', borderRadius: '0.625rem',
                    background: 'var(--color-bg-elevated)',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: item.color }}>{item.value}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => setShowResetModal(false)}
                  className="btn-ghost"
                  style={{ flex: 1, justifyContent: 'center', padding: '0.625rem' }}
                >
                  {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
                </button>
                <button
                  onClick={handleReset}
                  style={{
                    flex: 1, padding: '0.625rem',
                    background: 'linear-gradient(135deg, #be123c, #f43f5e)',
                    color: 'white', border: 'none',
                    borderRadius: '0.5rem', fontWeight: 700,
                    cursor: 'pointer', fontSize: '0.875rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <RotateCcw size={15} />
                  {lang === 'th' ? 'รีเซ็ตเลย' : 'Reset Now'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '2rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}
      >
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.25rem' }}>{t.dashboard.title}</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>{t.dashboard.subtitle}</p>
        </div>
        {/* Reset button */}
        <button
          onClick={() => setShowResetModal(true)}
          className="btn-ghost"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.45rem',
            fontSize: '0.8rem', color: '#fb7185',
            borderColor: 'rgba(244,63,94,0.25)',
            padding: '0.45rem 0.875rem',
          }}
        >
          <RotateCcw size={13} />
          {lang === 'th' ? 'รีเซ็ตความก้าวหน้า' : 'Reset Progress'}
        </button>
      </motion.div>

      {/* ── XP Overview Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass"
        style={{
          borderRadius: '1rem',
          padding: '1.5rem 2rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(16,185,129,0.05))',
          border: '1px solid rgba(124,58,237,0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '1rem',
              background: 'linear-gradient(135deg, #7c3aed, #10b981)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem',
            }}>🐍</div>
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>{t.dashboard.xp}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: '#a78bfa' }}>{xp}</span>
                <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>XP</span>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, maxWidth: 400 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{t.dashboard.progress}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a78bfa' }}>{overallProgress}%</span>
            </div>
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Badges */}
        {badges.length > 0 && (
          <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>{t.dashboard.badges}</div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {badges.map(bid => {
                const cfg = BADGES_CONFIG[bid];
                if (!cfg) return null;
                return (
                  <motion.div key={bid} initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="badge badge-violet"
                    style={{ fontSize: '0.78rem', padding: '0.3rem 0.75rem' }}
                  >
                    {cfg.icon} {cfg.label[lang]}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>

      {/* ── Modules Grid ── */}
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem' }}>
        {lang === 'th' ? 'โมดูลการเรียน' : 'Learning Modules'}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {MODULES.map((mod, i) => {
          const unlocked = isModuleUnlocked(mod.id);
          const progress = getModuleProgress(mod.id);

          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              style={{
                background: 'var(--color-bg-card)',
                border: `1px solid ${unlocked ? mod.color + '30' : 'rgba(255,255,255,0.04)'}`,
                borderRadius: '1rem',
                padding: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
                opacity: unlocked ? 1 : 0.6,
                transition: 'all 0.3s',
              }}
              className={unlocked ? 'card-hover' : ''}
            >
              {/* color accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: unlocked ? mod.color : 'rgba(255,255,255,0.08)',
                borderRadius: '1rem 1rem 0 0',
              }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', marginBottom: '1rem' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '0.6rem',
                  background: mod.colorDark,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.3rem', flexShrink: 0,
                  filter: unlocked ? 'none' : 'grayscale(1)',
                }}>
                  {mod.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Module {mod.id}</span>
                    {!unlocked && (
                      <span className="badge badge-rose" style={{ fontSize: '0.68rem' }}>
                        <Lock size={9} /> {mod.requiredXP} XP
                      </span>
                    )}
                    {unlocked && progress === 100 && (
                      <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>
                        <CheckCircle size={9} /> {lang === 'th' ? 'เสร็จแล้ว' : 'Done'}
                      </span>
                    )}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginTop: '0.1rem' }}>{mod.title[lang]}</div>
                </div>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                {mod.description[lang]}
              </p>

              {/* Progress bar */}
              {unlocked && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                      {mod.lessons.length} {lang === 'th' ? 'บทเรียน' : 'lessons'}
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: mod.color }}>{progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%`, background: mod.color }} />
                  </div>
                </div>
              )}

              {unlocked ? (
                <Link to={`/lessons/${mod.id}`}>
                  <button className="btn-primary" style={{
                    width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: `linear-gradient(135deg, ${mod.color}, ${mod.color}cc)`,
                  }}>
                    <PlayCircle size={15} />
                    {progress > 0 ? t.dashboard.continue : t.dashboard.start}
                  </button>
                </Link>
              ) : (
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '0.625rem', borderRadius: '0.5rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px dashed rgba(255,255,255,0.1)',
                  fontSize: '0.82rem', color: 'var(--color-text-muted)',
                }}>
                  <Lock size={13} />
                  {lang === 'th' ? `ต้องการ ${mod.requiredXP} XP เพื่อปลดล็อก` : `Requires ${mod.requiredXP} XP to unlock`}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
