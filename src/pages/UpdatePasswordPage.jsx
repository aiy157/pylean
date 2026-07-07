import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useLanguageStore } from '../store/languageStore';
import { supabase } from '../utils/supabase';

export default function UpdatePasswordPage() {
  const navigate = useNavigate();
  const { updatePassword } = useAuthStore();
  const { lang } = useLanguageStore();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // When Supabase redirects with a password reset token, it logs the user in automatically
  // But we still want to make sure they have a session before allowing them to update
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setErrorMsg(lang === 'th' ? 'เซสชั่นหมดอายุ กรุณาขอลิงก์รีเซ็ตรหัสผ่านใหม่' : 'Session expired. Please request a new reset link.');
      }
    });
  }, [lang]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setErrorMsg(lang === 'th' ? 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' : 'Password must be at least 6 characters');
      return;
    }
    
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);
    try {
      await updatePassword(password);
      setSuccessMsg(lang === 'th' ? 'เปลี่ยนรหัสผ่านสำเร็จ!' : 'Password updated successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setErrorMsg(err.message || 'Error updating password');
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
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: 'relative', zIndex: 1,
          width: '100%', maxWidth: 420,
          background: 'var(--color-bg-card)',
          border: '1px solid rgba(124,58,237,0.2)',
          borderRadius: '1.25rem',
          padding: '2.5rem 2rem',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4), 0 0 60px rgba(124,58,237,0.08)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            {lang === 'th' ? 'ตั้งรหัสผ่านใหม่' : 'Reset Password'}
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
            {lang === 'th' ? 'กรุณากรอกรหัสผ่านใหม่ของคุณ' : 'Please enter your new password'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
              {lang === 'th' ? 'รหัสผ่านใหม่' : 'New Password'}
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-dark"
                placeholder={lang === 'th' ? 'อย่างน้อย 6 ตัวอักษร' : 'At least 6 characters'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }}
                required
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
            
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  borderRadius: '0.625rem',
                  padding: '0.75rem',
                  fontSize: '0.82rem', color: '#10b981',
                }}
              >
                <CheckCircle size={14} />
                {successMsg}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading || !!successMsg}
            style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
          >
            {isLoading ? (
              <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
            ) : (
              <><Save size={15} /> {lang === 'th' ? 'เปลี่ยนรหัสผ่าน' : 'Update Password'}</>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
