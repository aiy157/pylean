import { Link } from 'react-router-dom';
import { useLanguageStore } from '../store/languageStore';
import { AlertTriangle, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  const { lang } = useLanguageStore();

  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: 'var(--color-bg-card)',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: '1.5rem',
          padding: '3rem',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }}
      >
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(244,63,94,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          border: '1px solid rgba(244,63,94,0.2)'
        }}>
          <AlertTriangle size={40} color="#fb7185" />
        </div>
        
        <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
          404
        </h1>
        
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
          {lang === 'th' ? 'ไม่พบหน้าที่คุณต้องการ' : 'Page Not Found'}
        </h2>
        
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
          {lang === 'th' 
            ? 'ขออภัย หน้าที่คุณพยายามเข้าถึงไม่มีอยู่ในระบบ หรืออาจถูกย้ายไปแล้ว' 
            : 'Sorry, the page you are looking for does not exist or has been moved.'}
        </p>

        <Link 
          to="/" 
          className="btn-primary" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            textDecoration: 'none'
          }}
        >
          <Home size={18} />
          {lang === 'th' ? 'กลับหน้าแรก' : 'Back to Home'}
        </Link>
      </motion.div>
    </div>
  );
}
