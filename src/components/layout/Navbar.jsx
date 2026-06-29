// src/components/layout/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useLanguageStore } from '../../store/languageStore';
import { useProgressStore } from '../../store/progressStore';
import { Zap, Globe, LayoutDashboard, BookOpen, Code2, GitBranch, Shield } from 'lucide-react';

export default function Navbar() {
  const { t, lang, toggleLang } = useLanguageStore();
  const { xp } = useProgressStore();
  const location = useLocation();

  const navLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: t.nav.dashboard },
    { to: '/lessons', icon: BookOpen, label: t.nav.lessons },
    { to: '/flowchart', icon: GitBranch, label: t.nav.flowchart },
  ];

  return (
    <nav style={{
      background: 'rgba(13,13,20,0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(124,58,237,0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: 32, height: 32, borderRadius: '0.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <img src="/favicon.svg" alt="PyLearn Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <span style={{
            fontWeight: 800, fontSize: '1.1rem',
            background: 'linear-gradient(135deg, #a78bfa, #10b981)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>PyLearn</span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {navLinks.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-item ${location.pathname.startsWith(to) ? 'active' : ''}`}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </div>

        {/* Right side: XP + Language + Admin */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* XP Display */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(124,58,237,0.25)',
            borderRadius: '999px',
            padding: '0.3rem 0.75rem',
          }}>
            <Zap size={13} style={{ color: '#fbbf24' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a78bfa' }}>{xp} XP</span>
          </div>

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="btn-ghost"
            style={{ padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem' }}
          >
            <Globe size={13} />
            {lang === 'th' ? 'TH' : 'EN'}
          </button>

          {/* Admin Link */}
          <Link
            to="/admin"
            style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}
            title="Admin"
          >
            <Shield size={16} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
