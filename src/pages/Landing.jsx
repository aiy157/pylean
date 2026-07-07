// src/pages/Landing.jsx
import { Link } from 'react-router-dom';
import { useCurriculumStore } from '../store/curriculumStore';
import { useLanguageStore } from '../store/languageStore';
import { useProgressStore } from '../store/progressStore';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Layers, CheckSquare, GitBranch, Play, Code2 } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

export default function Landing() {
  const { t, lang } = useLanguageStore();
  const { xp } = useProgressStore();
  const { modules } = useCurriculumStore();

  const features = [
    { icon: Layers, title: t.landing.feat1_title, desc: t.landing.feat1_desc, color: '#7c3aed' },
    { icon: Play, title: t.landing.feat2_title, desc: t.landing.feat2_desc, color: '#10b981' },
    { icon: GitBranch, title: t.landing.feat3_title, desc: t.landing.feat3_desc, color: '#3b82f6' },
    { icon: CheckSquare, title: t.landing.feat4_title, desc: t.landing.feat4_desc, color: '#f59e0b' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-bg" style={{ padding: '5rem 1.5rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient orbs */}
        <div style={{
          position: 'absolute', top: '10%', left: '15%', width: 300, height: 300,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.12), transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '15%', width: 250, height: 250,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.08), transparent)',
          pointerEvents: 'none',
        }} />

        <motion.div initial="hidden" animate="show" variants={stagger} style={{ position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <motion.div variants={fadeUp} style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
            <span className="badge badge-violet" style={{ fontSize: '0.8rem', padding: '0.3rem 1rem' }}>
              🐍 Python Learning Platform
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '0.5rem' }}>
            <span className="gradient-text">{t.landing.hero_title}</span>
          </motion.h1>
          <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>
            {t.landing.hero_title2}
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={fadeUp} style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--color-text-secondary)',
            maxWidth: 560, margin: '0 auto 2.5rem', lineHeight: 1.7,
          }}>
            {t.landing.hero_subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/dashboard">
              <button className="btn-primary" style={{ fontSize: '1rem', padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {t.landing.start_btn} <ArrowRight size={16} />
              </button>
            </Link>
            <Link to="/lessons">
              <button className="btn-ghost" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
                {t.landing.view_curriculum}
              </button>
            </Link>
          </motion.div>

          {/* Stats row */}
          {xp > 0 && (
            <motion.div variants={fadeUp} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              marginTop: '2rem', background: 'rgba(124,58,237,0.1)',
              border: '1px solid rgba(124,58,237,0.2)', borderRadius: '999px',
              padding: '0.5rem 1.25rem',
            }}>
              <Zap size={14} style={{ color: '#fbbf24' }} />
              <span style={{ fontSize: '0.875rem', color: '#a78bfa' }}>
                {lang === 'th' ? `คุณมี ${xp} XP แล้ว! เรียนต่อเลย →` : `You have ${xp} XP! Keep going →`}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Code preview card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            marginTop: '4rem',
            maxWidth: 500,
            margin: '4rem auto 0',
            background: '#0d1117',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '1rem',
            padding: '1.25rem',
            textAlign: 'left',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4), 0 0 40px rgba(124,58,237,0.1)',
          }}
        >
          <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f43f5e' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontSize: '0.75rem', color: '#4a4a6a', marginLeft: '0.5rem' }}>hello.py</span>
          </div>
          <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', lineHeight: 1.7, color: '#e2e8f0' }}>
            <span style={{ color: '#d8b4fe' }}>name</span> = <span style={{ color: '#6ee7b7' }}>input</span>(<span style={{ color: '#fcd34d' }}>"ชื่อของคุณ: "</span>)
            <br />
            <span style={{ color: '#6ee7b7' }}>print</span>(<span style={{ color: '#fcd34d' }}>f"สวัสดี, &#123;name&#125;!"</span>)
          </pre>
          <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.75rem', background: '#161b22', borderRadius: '0.4rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#10b981' }}>
            {'> สวัสดี, สมชาย!'}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800 }}>
            {t.landing.features_title}
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass card-hover"
              style={{ borderRadius: '1rem', padding: '1.75rem', border: '1px solid var(--color-border-subtle)' }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: '0.6rem',
                background: `${feat.color}20`,
                border: `1px solid ${feat.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                <feat.icon size={20} style={{ color: feat.color }} />
              </div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>{feat.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modules Preview */}
      <section style={{ padding: '4rem 1.5rem 6rem', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800 }}>
            {t.landing.modules_title}
          </h2>
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {modules.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '0.75rem',
                padding: '1rem 1.25rem',
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: '0.6rem',
                background: mod.colorDark,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem', flexShrink: 0,
              }}>
                {mod.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{mod.title[lang]}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>{mod.description[lang]}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  {mod.lessons.length} {lang === 'th' ? 'บทเรียน' : 'lessons'}
                </span>
                <span className="badge" style={{
                  background: `${mod.color}20`, color: mod.color,
                  border: `1px solid ${mod.color}40`, fontSize: '0.72rem',
                }}>
                  {mod.requiredXP === 0 ? (lang === 'th' ? 'เปิดให้เรียน' : 'Available') : `${mod.requiredXP} XP`}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to="/dashboard">
            <button className="btn-primary" style={{ fontSize: '1rem', padding: '0.75rem 2.5rem' }}>
              {t.landing.start_btn} →
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
