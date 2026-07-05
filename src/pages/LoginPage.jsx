// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, LogIn, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useLanguageStore } from '../store/languageStore';
import { useProgressStore } from '../store/progressStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register } = useAuthStore();
  const { fetchProgress } = useProgressStore();
  const { lang } = useLanguageStore();

  const [tab, setTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [form, setForm] = useState({ email: '', password: '', username: '' });
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);
    try {
      if (tab === 'login') {
        await login(form.email, form.password);
        await fetchProgress();
        navigate('/dashboard');
      } else {
        if (!form.username.trim()) {
          setErrorMsg(lang === 'th' ? 'กรุณาใส่ชื่อผู้ใช้' : 'Please enter a username');
          return;
        }
        const result = await register(form.email, form.password, form.username.trim());
        // Supabase returns user but session is null when email confirmation is required
        if (result.user && !result.session) {
          setSuccessMsg(
            lang === 'th'
              ? `📩 ส่งอีเมลยืนยันไปที่ ${form.email} แล้ว — กรุณากดลิงก์ในอีเมลเพื่อเปิดใช้บัญชี`
              : `📩 Confirmation email sent to ${form.email} — click the link to activate your account`
          );
        } else {
          // Email confirmation disabled in Supabase → auto-login
          navigate('/dashboard');
        }
      }
    } catch (err) {
      const msg = err.message || 'เกิดข้อผิดพลาด';
      if (msg.includes('Invalid login credentials')) {
        setErrorMsg(lang === 'th' ? 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' : 'Invalid email or password');
      } else if (msg === 'USERNAME_TAKEN') {
        setErrorMsg(lang === 'th' ? 'Username นี้ถูกใช้งานไปแล้ว โปรดใช้ชื่ออื่น' : 'This Username is already taken, please choose another.');
      } else if (msg.includes('already registered') || msg.includes('User already registered')) {
        setErrorMsg(lang === 'th' ? 'อีเมลนี้มีบัญชีแล้ว — ลองเข้าสู่ระบบแทน' : 'This email is already registered — try logging in');
      } else if (msg.includes('Password should be at least')) {
        setErrorMsg(lang === 'th' ? 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' : 'Password must be at least 6 characters');
      } else if (msg.includes('rate limit') || msg.includes('email rate')) {
        setErrorMsg(lang === 'th'
          ? 'ส่งอีเมลบ่อยเกินไป — รอสักครู่แล้วลองใหม่ (หรือใช้อีเมลอื่น)'
          : 'Too many attempts — please wait a moment and try again');
      } else if (msg.includes('Email not confirmed')) {
        setErrorMsg(lang === 'th'
          ? 'อีเมลนี้ยังไม่ยืนยัน — เช็คกล่องจดหมาย หรือติดต่อแอดมิน'
          : 'Email not confirmed — check your inbox or contact admin');
      } else {
        setErrorMsg(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      background: 'var(--color-bg-primary)',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'relative', zIndex: 1,
          width: '100%', maxWidth: 420,
          background: 'var(--color-bg-card)',
          border: '1px solid rgba(124,58,237,0.2)',
          borderRadius: '1.25rem',
          padding: '2rem',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4), 0 0 60px rgba(124,58,237,0.08)',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
            <img src="/favicon.svg" alt="PyLearn" style={{ width: 36, height: 36 }} />
            <span style={{
              fontWeight: 800, fontSize: '1.3rem',
              background: 'linear-gradient(135deg, #a78bfa, #10b981)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>PyLearn</span>
          </Link>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '0.4rem' }}>
            {lang === 'th' ? 'เรียน Python ง่ายๆ ในเบราว์เซอร์' : 'Learn Python easily in your browser'}
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', background: 'var(--color-bg-elevated)',
          borderRadius: '0.75rem', padding: '0.25rem', marginBottom: '1.75rem',
        }}>
          {[
            { id: 'login', label: lang === 'th' ? 'เข้าสู่ระบบ' : 'Login', icon: LogIn },
            { id: 'register', label: lang === 'th' ? 'สมัครสมาชิก' : 'Register', icon: UserPlus },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setTab(id); setErrorMsg(''); }}
              style={{
                flex: 1, padding: '0.6rem', borderRadius: '0.5rem',
                border: 'none', cursor: 'pointer',
                background: tab === id ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : 'transparent',
                color: tab === id ? '#fff' : 'var(--color-text-muted)',
                fontWeight: tab === id ? 700 : 400,
                fontSize: '0.875rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                transition: 'all 0.2s',
              }}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimatePresence>
            {tab === 'register' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                  {lang === 'th' ? 'ชื่อผู้ใช้' : 'Username'}
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                  <input
                    type="text"
                    className="input-dark"
                    placeholder={lang === 'th' ? 'ชื่อที่คุณชอบ' : 'Your nickname'}
                    value={form.username}
                    onChange={e => update('username', e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                    autoComplete="username"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email */}
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
              {lang === 'th' ? 'อีเมล' : 'Email'}
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="email"
                className="input-dark"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
              {lang === 'th' ? 'รหัสผ่าน' : 'Password'}
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-dark"
                placeholder={lang === 'th' ? 'อย่างน้อย 6 ตัวอักษร' : 'At least 6 characters'}
                value={form.password}
                onChange={e => update('password', e.target.value)}
                style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }}
                required
                autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                style={{
                  position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 0,
                }}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  background: 'rgba(244,63,94,0.1)',
                  border: '1px solid rgba(244,63,94,0.3)',
                  borderRadius: '0.625rem',
                  padding: '0.75rem',
                  fontSize: '0.82rem', color: '#fb7185',
                }}
              >
                <AlertCircle size={14} />
                {errorMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
            style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}
          >
            {isLoading ? (
              <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
            ) : tab === 'login' ? (
              <><LogIn size={15} /> {lang === 'th' ? 'เข้าสู่ระบบ' : 'Login'}</>
            ) : (
              <><UserPlus size={15} /> {lang === 'th' ? 'สมัครสมาชิก' : 'Create Account'}</>
            )}
          </button>
        </form>

        {/* Success message (email confirmation) */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                marginTop: '1.25rem',
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.25)',
                borderRadius: '0.75rem',
                padding: '1rem',
                display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
              }}
            >
              <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0, marginTop: '0.1rem' }} />
              <div style={{ fontSize: '0.82rem', color: '#34d399', lineHeight: 1.6 }}>
                {successMsg}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Guest note */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
          {lang === 'th' ? 'หรือ ' : 'Or '}
          <Link to="/dashboard" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>
            {lang === 'th' ? 'เล่นแบบไม่สมัคร (ความคืบหน้าไม่ถูกบันทึก)' : 'Continue as Guest (progress not saved)'}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
