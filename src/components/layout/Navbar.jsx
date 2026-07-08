// src/components/layout/Navbar.jsx
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguageStore } from '../../store/languageStore';
import { useProgressStore } from '../../store/progressStore';
import { useAuthStore } from '../../store/authStore';
import { Zap, Globe, LayoutDashboard, BookOpen, GitBranch, LogOut, LogIn, User, Menu, X, Shield } from 'lucide-react';

export default function Navbar() {
  const { t, lang, toggleLang } = useLanguageStore();
  const { xp } = useProgressStore();
  const { user, isAdmin, logout, getUsername } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: t.nav.dashboard },
    { to: '/lessons', icon: BookOpen, label: t.nav.lessons },
    { to: '/flowchart', icon: GitBranch, label: t.nav.flowchart },
  ];

  if (isAdmin) {
    navLinks.push({
      to: '/admin',
      icon: Shield,
      label: lang === 'th' ? 'แอดมิน' : 'Admin'
    });
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

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
          <div style={{ width: 32, height: 32, borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/favicon.svg" alt="PyLearn Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <span style={{
            fontWeight: 800, fontSize: '1.1rem',
            background: 'linear-gradient(135deg, #a78bfa, #10b981)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>PyLearn</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
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

        {/* Desktop Right side */}
        <div className="hidden md:flex items-center gap-3">
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

          {/* Auth: User info or Login button */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* Username chip */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: '999px',
                padding: '0.3rem 0.75rem',
              }}>
                <User size={12} style={{ color: '#10b981' }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#10b981', maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {getUsername()}
                </span>
              </div>
              {/* Logout */}
              <button
                onClick={handleLogout}
                className="btn-ghost"
                title={lang === 'th' ? 'ออกจากระบบ' : 'Logout'}
                style={{ padding: '0.35rem 0.6rem', display: 'flex', alignItems: 'center' }}
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-primary"
              style={{ padding: '0.35rem 0.875rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
            >
              <LogIn size={13} />
              {lang === 'th' ? 'เข้าสู่ระบบ' : 'Login'}
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          {/* Always show XP on mobile header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(124,58,237,0.25)',
            borderRadius: '999px',
            padding: '0.2rem 0.5rem',
          }}>
            <Zap size={12} style={{ color: '#fbbf24' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a78bfa' }}>{xp}</span>
          </div>

          <button 
            className="btn-ghost" 
            style={{ padding: '0.4rem' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden" style={{
          background: 'rgba(13,13,20,0.95)',
          borderBottom: '1px solid var(--color-border-subtle)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {navLinks.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-item ${location.pathname.startsWith(to) ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
          
          <div style={{ height: '1px', background: 'var(--color-border-subtle)', margin: '0.5rem 0' }}></div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => { toggleLang(); setIsMobileMenuOpen(false); }}
              className="btn-ghost"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 0.875rem' }}
            >
              <Globe size={16} />
              {lang === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
            </button>
          </div>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={16} style={{ color: '#10b981' }} />
                <span style={{ fontSize: '0.9rem', color: '#10b981' }}>{getUsername()}</span>
              </div>
              <button
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                style={{ background: 'rgba(244,63,94,0.1)', color: '#fb7185', border: 'none', padding: '0.4rem 0.75rem', borderRadius: '0.4rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <LogOut size={14} /> {lang === 'th' ? 'ออกจากระบบ' : 'Logout'}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-primary"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ padding: '0.6rem', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
            >
              <LogIn size={15} />
              {lang === 'th' ? 'เข้าสู่ระบบ' : 'Login'}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
