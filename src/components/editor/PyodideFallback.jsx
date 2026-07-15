// src/components/editor/PyodideFallback.jsx
// ── Friendly error UI when Pyodide fails to load ───────────────────────────────
import { AlertTriangle, RefreshCw, ExternalLink, Smartphone, Monitor, Wifi } from 'lucide-react';

const ERROR_CONFIGS = {
  wasm_unsupported: {
    icon: '🚫',
    title: { th: 'เบราว์เซอร์ไม่รองรับ WebAssembly', en: 'Browser does not support WebAssembly' },
    detail: { th: 'Python ใน PyLearn ทำงานผ่าน WebAssembly ซึ่งเบราว์เซอร์นี้ไม่รองรับ', en: 'PyLearn runs Python via WebAssembly, which this browser does not support.' },
    steps: {
      th: ['อัปเดตเบราว์เซอร์เป็นเวอร์ชันล่าสุด', 'ลองใช้ Chrome, Firefox หรือ Edge', 'บน iOS: ใช้ Safari 16.4+ หรืออัปเดต iPadOS'],
      en:  ['Update your browser to the latest version', 'Try Chrome, Firefox, or Edge', 'On iOS: use Safari 16.4+ or update iPadOS'],
    },
    canRetry: false,
  },
  ios_crash: {
    icon: '📱',
    title: { th: 'ไม่สามารถโหลด Python บน iOS นี้ได้', en: 'Cannot load Python on this iOS version' },
    detail: { th: 'อุปกรณ์ iOS รุ่นเก่าหรือ RAM น้อยอาจรัน Python ใน Browser ไม่ได้', en: 'Older iOS devices or low-RAM devices may not run Python in the browser.' },
    steps: {
      th: ['อัปเดต iOS / iPadOS เป็น 16.4 ขึ้นไป', 'ปิดแท็บอื่นๆ เพื่อเพิ่ม RAM', 'ลองใช้บนคอมพิวเตอร์แทน'],
      en:  ['Update iOS/iPadOS to 16.4 or later', 'Close other tabs to free up RAM', 'Try using a desktop computer instead'],
    },
    canRetry: true,
  },
  network_error: {
    icon: '🌐',
    title: { th: 'โหลด Python ไม่สำเร็จ (Network Error)', en: 'Failed to load Python runtime (Network Error)' },
    detail: { th: 'ไม่สามารถดาวน์โหลด Python runtime จาก CDN ได้', en: 'Could not download the Python runtime from the CDN.' },
    steps: {
      th: ['ตรวจสอบการเชื่อมต่ออินเตอร์เน็ต', 'ลองรีโหลดหน้านี้', 'ปิด VPN หรือ firewall ชั่วคราว'],
      en:  ['Check your internet connection', 'Try reloading the page', 'Temporarily disable VPN or firewall'],
    },
    canRetry: true,
  },
  unknown: {
    icon: '⚠️',
    title: { th: 'โหลด Python ไม่สำเร็จ', en: 'Failed to load Python' },
    detail: { th: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ', en: 'An unknown error occurred.' },
    steps: {
      th: ['ลองรีโหลดหน้า', 'ล้าง Cache ของเบราว์เซอร์', 'ลองในเบราว์เซอร์อื่น'],
      en:  ['Try reloading the page', 'Clear browser cache', 'Try a different browser'],
    },
    canRetry: true,
  },
};

/** Detect error type from message string */
export function detectErrorType(errorMessage = '') {
  const msg = errorMessage.toLowerCase();
  if (!('WebAssembly' in window)) return 'wasm_unsupported';
  if (msg.includes('maximum call stack') || msg.includes('stack overflow')) return 'ios_crash';
  if (msg.includes('failed to load') || msg.includes('network') || msg.includes('cdn')) return 'network_error';
  return 'unknown';
}

export default function PyodideFallback({ errorMessage = '', language = 'th', onRetry }) {
  const type   = detectErrorType(errorMessage);
  const config = ERROR_CONFIGS[type] ?? ERROR_CONFIGS.unknown;
  const lang   = language === 'th' ? 'th' : 'en';

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100%', minHeight: 220, padding: '2rem 1.5rem', gap: '1rem',
      background: 'linear-gradient(135deg, rgba(244,63,94,0.04), rgba(124,58,237,0.04))',
      borderRadius: '0.75rem',
      border: '1px solid rgba(244,63,94,0.15)',
      textAlign: 'center',
    }}>
      {/* Icon */}
      <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>{config.icon}</div>

      {/* Title */}
      <h3 style={{
        margin: 0, fontSize: '1rem', fontWeight: 700,
        color: '#fb7185', fontFamily: 'Inter, sans-serif',
      }}>
        {config.title[lang]}
      </h3>

      {/* Detail */}
      <p style={{
        margin: 0, fontSize: '0.82rem', color: 'var(--color-text-muted)',
        fontFamily: 'Inter, sans-serif', maxWidth: 360, lineHeight: 1.6,
      }}>
        {config.detail[lang]}
      </p>

      {/* Steps */}
      <div style={{
        background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '0.5rem', padding: '0.75rem 1rem',
        textAlign: 'left', width: '100%', maxWidth: 380,
      }}>
        <p style={{
          margin: '0 0 0.5rem', fontSize: '0.72rem', fontWeight: 700,
          color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.06em',
          fontFamily: 'Inter, sans-serif',
        }}>
          {lang === 'th' ? 'วิธีแก้ไข' : 'How to fix'}
        </p>
        <ol style={{ margin: 0, paddingLeft: '1.2rem' }}>
          {config.steps[lang].map((step, i) => (
            <li key={i} style={{
              fontSize: '0.8rem', color: 'var(--color-text-secondary)',
              fontFamily: 'Inter, sans-serif', lineHeight: 1.7,
            }}>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Error details (collapsible) */}
      {errorMessage && (
        <details style={{ width: '100%', maxWidth: 380 }}>
          <summary style={{
            fontSize: '0.72rem', color: '#5a5a80', cursor: 'pointer',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {lang === 'th' ? '▶ รายละเอียด error' : '▶ Error details'}
          </summary>
          <pre style={{
            marginTop: '0.4rem', padding: '0.5rem', borderRadius: '0.3rem',
            background: 'rgba(0,0,0,0.4)', color: '#f43f5e',
            fontSize: '0.68rem', fontFamily: "'JetBrains Mono', monospace",
            whiteSpace: 'pre-wrap', textAlign: 'left', wordBreak: 'break-all',
          }}>
            {errorMessage}
          </pre>
        </details>
      )}

      {/* Retry button */}
      {config.canRetry && onRetry && (
        <button
          onClick={onRetry}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.5rem 1.25rem',
            background: 'rgba(124,58,237,0.15)',
            border: '1px solid rgba(124,58,237,0.35)',
            borderRadius: '0.5rem',
            color: '#a78bfa', fontFamily: 'Inter, sans-serif',
            fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
          }}
        >
          <RefreshCw size={14} />
          {lang === 'th' ? 'ลองใหม่' : 'Retry'}
        </button>
      )}
    </div>
  );
}
