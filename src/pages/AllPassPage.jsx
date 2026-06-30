// src/pages/AllPassPage.jsx
// Protected admin unlock gate — requires a passcode stored in Supabase
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { useProgressStore } from '../store/progressStore';
import { useLanguageStore } from '../store/languageStore';

export default function AllPassPage() {
  const navigate = useNavigate();
  const enableAdminUnlockMode = useProgressStore(s => s.enableAdminUnlockMode);
  const { lang } = useLanguageStore();

  const [passcode, setPasscode] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const { data, error: dbErr } = await supabase
        .from('allpass_config')
        .select('passcode')
        .eq('id', 1)
        .single();

      if (dbErr) throw dbErr;

      if (data.passcode === passcode.trim()) {
        setSuccess(true);
        setTimeout(() => {
          enableAdminUnlockMode();
          navigate('/dashboard');
        }, 1200);
      } else {
        setError(lang === 'th' ? 'รหัสไม่ถูกต้อง' : 'Incorrect passcode');
      }
    } catch (err) {
      setError(lang === 'th'
        ? 'ไม่สามารถตรวจสอบรหัสได้ กรุณาลองใหม่'
        : 'Cannot verify passcode. Please try again.');
      console.error('AllPass check failed:', err.message);
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
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(239,68,68,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'relative', zIndex: 1,
          width: '100%', maxWidth: 380,
          background: 'var(--color-bg-card)',
          border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: '1.25rem',
          padding: '2rem',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4), 0 0 60px rgba(239,68,68,0.05)',
          textAlign: 'center',
        }}
      >
        {/* Icon */}
        <motion.div
          animate={success ? { scale: [1, 1.2, 1] } : {}}
          style={{
            width: 60, height: 60, borderRadius: '50%', margin: '0 auto 1.25rem',
            background: success ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${success ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.25)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.4s',
          }}
        >
          {success
            ? <CheckCircle2 size={28} style={{ color: '#10b981' }} />
            : <ShieldCheck size={28} style={{ color: '#f87171' }} />
          }
        </motion.div>

        <h2 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
          {lang === 'th' ? 'Admin Preview Mode' : 'Admin Preview Mode'}
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1.75rem' }}>
          {lang === 'th'
            ? 'ใส่รหัสผ่านเพื่อปลดล็อกทุกบทเรียนสำหรับตรวจสอบ'
            : 'Enter passcode to unlock all lessons for review'}
        </p>

        {!success ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={{
                position: 'absolute', left: '0.875rem', top: '50%',
                transform: 'translateY(-50%)', color: 'var(--color-text-muted)',
              }} />
              <input
                type={showPass ? 'text' : 'password'}
                className="input-dark"
                placeholder={lang === 'th' ? 'ใส่รหัส allpass' : 'Enter allpass code'}
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem', textAlign: 'left' }}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPass(s => !s)}
                style={{
                  position: 'absolute', right: '0.875rem', top: '50%',
                  transform: 'translateY(-50%)', background: 'none',
                  border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 0,
                }}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  background: 'rgba(244,63,94,0.1)',
                  border: '1px solid rgba(244,63,94,0.3)',
                  borderRadius: '0.625rem',
                  padding: '0.6rem 0.75rem',
                  fontSize: '0.82rem', color: '#fb7185',
                }}
              >
                <AlertCircle size={14} /> {error}
              </motion.div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading || !passcode.trim()}
              style={{
                justifyContent: 'center', display: 'flex',
                alignItems: 'center', gap: '0.5rem',
                background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
              }}
            >
              {isLoading
                ? <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                : <><ShieldCheck size={15} /> {lang === 'th' ? 'ยืนยันรหัส' : 'Confirm'}</>
              }
            </button>

            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-ghost"
              style={{ fontSize: '0.82rem' }}
            >
              {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: '#10b981', fontWeight: 600, fontSize: '0.95rem' }}
          >
            {lang === 'th' ? '✅ ปลดล็อกสำเร็จ! กำลังพาไปยัง Dashboard…' : '✅ Unlocked! Redirecting to Dashboard…'}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
