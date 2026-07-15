// src/components/editor/OutputPanel.jsx
// ─────────────────────────────────────────────────────────────────────────────
// BornToDev-style output panel with 3 tabs:
//   [Output]  — stdout / success view
//   [Log]     — raw Python traceback with syntax coloring
//   [แปล Log] — Thai-translated traceback line by line + fix hints
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import {
  Terminal, AlertCircle, CheckCircle, Loader2, WifiOff,
  ChevronDown, ChevronRight, Lightbulb, FileText, Languages,
  Copy, Check,
} from 'lucide-react';
import { analyseError }                          from '../../utils/errorAnalyzer';
import { parseTraceback, translateTraceback }    from '../../utils/tracebackParser';

// ─── Tiny copy-to-clipboard hook ─────────────────────────────────────────────
function useCopy(text) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return [copied, copy];
}

// ─── Tab pill button ──────────────────────────────────────────────────────────
function TabBtn({ active, onClick, children, dot }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.35rem',
        padding: '0.35rem 0.75rem',
        borderRadius: '0.375rem',
        border: active ? '1px solid rgba(124,58,237,0.5)' : '1px solid transparent',
        background: active ? 'rgba(124,58,237,0.15)' : 'transparent',
        color: active ? '#a78bfa' : '#5a5a80',
        fontSize: '0.78rem',
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        transition: 'all 0.15s',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
      {dot && (
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: dot,
          display: 'inline-block',
          flexShrink: 0,
        }} />
      )}
    </button>
  );
}

// ─── Raw Traceback Renderer (Log tab) ────────────────────────────────────────
function TracebackView({ errorText }) {
  const [copied, copy] = useCopy(errorText);
  const { lines } = parseTraceback(errorText);

  const colorMap = {
    header:  '#9090b8',
    file:    '#60a5fa',
    code:    '#e2e8f0',
    pointer: '#f59e0b',
    error:   '#f87171',
    text:    '#c4cde4',
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Copy button */}
      <button
        onClick={copy}
        title="Copy raw log"
        style={{
          position: 'absolute', top: 0, right: 0,
          display: 'flex', alignItems: 'center', gap: '0.3rem',
          padding: '0.2rem 0.55rem',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '0.3rem',
          color: '#5a5a80',
          fontSize: '0.72rem',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {copied ? <Check size={11} /> : <Copy size={11} />}
        {copied ? 'Copied!' : 'Copy'}
      </button>

      <pre style={{
        margin: 0,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        paddingRight: '4rem',
        lineHeight: 1.65,
        fontSize: '0.82rem',
      }}>
        {lines.length > 0
          ? lines.map((ln, i) => (
            <span key={i} style={{ display: 'block', color: colorMap[ln.type] ?? '#e2e8f0' }}>
              {ln.type === 'file'    && <span style={{ color: '#4a4a6a' }}>{'  '}</span>}
              {ln.type === 'code'    && <span style={{ color: '#4a4a6a' }}>{'    '}</span>}
              {ln.type === 'pointer' && <span style={{ color: '#4a4a6a' }}>{'    '}</span>}
              {ln.raw}
            </span>
          ))
          : <span style={{ color: '#f87171' }}>{errorText}</span>
        }
      </pre>
    </div>
  );
}

// ─── Translated Traceback (แปล Log tab) ───────────────────────────────────────
function TranslatedView({ errorText, lang }) {
  const { lines, errorType, errorMessage, errorLineNo } = parseTraceback(errorText);
  const analysis = analyseError(errorText, undefined, { skipLog: true });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>

      {/* Line number callout */}
      {errorLineNo && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.45rem 0.75rem',
          background: 'rgba(248,113,113,0.08)',
          border: '1px solid rgba(248,113,113,0.2)',
          borderRadius: '0.4rem',
          fontSize: '0.8rem',
        }}>
          <AlertCircle size={13} style={{ color: '#f87171', flexShrink: 0 }} />
          <span style={{ color: '#fca5a5' }}>
            {lang === 'th'
              ? <>ข้อผิดพลาดเกิดที่ <strong style={{ color: '#f87171' }}>บรรทัดที่ {errorLineNo}</strong> ในโค้ดของคุณ</>
              : <>Error occurred at <strong style={{ color: '#f87171' }}>line {errorLineNo}</strong> in your code</>
            }
          </span>
        </div>
      )}

      {/* Translated lines */}
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '0.4rem',
        overflow: 'hidden',
      }}>
        {lines.map((ln, i) => {
          let translated = '';
          let bg = 'transparent';
          let borderLeft = 'none';

          switch (ln.type) {
            case 'header':
              translated = translateTraceback.header();
              bg = 'rgba(144,144,184,0.05)';
              break;
            case 'file':
              translated = translateTraceback.file(ln.raw);
              bg = 'rgba(96,165,250,0.05)';
              borderLeft = '2px solid rgba(96,165,250,0.3)';
              break;
            case 'code':
              translated = translateTraceback.code(ln.raw);
              bg = 'rgba(255,255,255,0.02)';
              break;
            case 'pointer':
              translated = translateTraceback.pointer(ln.raw);
              bg = 'rgba(245,158,11,0.05)';
              borderLeft = '2px solid rgba(245,158,11,0.3)';
              break;
            case 'error':
              translated = translateTraceback.error(ln.errorType, ln.errorMessage);
              bg = 'rgba(248,113,113,0.08)';
              borderLeft = '3px solid rgba(248,113,113,0.5)';
              break;
            default:
              translated = ln.raw;
          }

          if (!translated) return null;
          return (
            <div key={i} style={{
              padding: '0.45rem 0.875rem',
              background: bg,
              borderLeft,
              borderBottom: i < lines.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
              fontFamily: ln.type === 'code' ? "'JetBrains Mono', monospace" : 'Inter, sans-serif',
              fontSize: '0.78rem',
              lineHeight: 1.65,
              whiteSpace: 'pre-wrap',
              color: ln.type === 'error' ? '#fca5a5' : ln.type === 'pointer' ? '#fde68a' : ln.type === 'file' ? '#93c5fd' : '#c4cde4',
            }}>
              {translated}
            </div>
          );
        })}
      </div>

      {/* Fix hints */}
      {analysis && (
        <FixHints analysis={analysis} lang={lang} />
      )}
    </div>
  );
}

// ─── Fix Hints card ───────────────────────────────────────────────────────────
function FixHints({ analysis, lang }) {
  const [open, setOpen] = useState(true);
  const suggestions = lang === 'th' ? analysis.suggestion_th : analysis.suggestion_en;
  const headline    = lang === 'th' ? analysis.th             : analysis.en;

  return (
    <div style={{
      border: '1px solid rgba(245,158,11,0.25)',
      borderRadius: '0.5rem',
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.55rem 0.875rem',
          background: 'rgba(245,158,11,0.07)',
          border: 'none', cursor: 'pointer',
          color: '#fbbf24',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.8rem',
        }}
      >
        <Lightbulb size={13} style={{ flexShrink: 0 }} />
        <span style={{ flex: 1, textAlign: 'left', fontWeight: 700 }}>
          {lang === 'th' ? 'วิธีแก้ไข' : 'How to fix'}
          {' — '}
          <span style={{ fontWeight: 400, color: '#fde68a' }}>{headline}</span>
        </span>
        {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
      </button>

      {open && (
        <ul style={{
          margin: 0,
          padding: '0.625rem 1rem 0.625rem 2.25rem',
          background: 'rgba(245,158,11,0.03)',
          listStyle: 'disc',
          color: '#fde68a',
          fontSize: '0.8rem',
          lineHeight: 1.75,
          fontFamily: 'Inter, sans-serif',
        }}>
          {suggestions.map((s, i) => (
            <li key={i} style={{ marginBottom: i < suggestions.length - 1 ? '0.15rem' : 0 }}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Python Loading bar ───────────────────────────────────────────────────────
function PythonLoadingView({ loadProgress, lang }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Loader2 size={14} className="animate-spin" style={{ color: '#7c3aed', flexShrink: 0 }} />
        <span style={{ color: '#7c3aed', fontSize: '0.875rem', fontFamily: 'Inter, sans-serif' }}>
          {loadProgress || (lang === 'th' ? 'กำลังโหลด Python runtime…' : 'Loading Python runtime…')}
        </span>
      </div>
      <div style={{ height: 4, borderRadius: 9999, background: 'rgba(124,58,237,0.12)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: '40%',
          background: 'linear-gradient(90deg,#7c3aed,#a78bfa)',
          borderRadius: 9999,
          animation: 'pyloadSlide 1.5s ease-in-out infinite',
        }} />
      </div>
      <style>{`@keyframes pyloadSlide{0%{transform:translateX(-100%)}50%{transform:translateX(250%)}100%{transform:translateX(-100%)}}`}</style>
      <span style={{ color: '#4a4a6a', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}>
        {lang === 'th'
          ? 'Python runtime ~10 MB — ใช้เวลาโหลดครั้งแรกสักครู่ ครั้งถัดไปเร็วกว่า'
          : 'Python runtime ~10 MB — first load takes a moment, subsequent loads are instant'}
      </span>
    </div>
  );
}

// ─── Interactive Terminal Input ─────────────────────────────────────────────────
function InteractiveInputView({ prompts, onSubmit, lang }) {
  const [text, setText] = useState('');

  const handleKeyDown = (e) => {
    // Ctrl+Enter or Cmd+Enter → submit
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onSubmit(text);
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      background: '#0d1117', padding: '0.875rem',
      fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem',
      gap: '0.6rem',
    }}>
      {/* Header hint */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.45rem 0.75rem',
        background: 'rgba(124,58,237,0.08)',
        border: '1px solid rgba(124,58,237,0.25)',
        borderRadius: '0.4rem',
        fontSize: '0.78rem', color: '#c4b5fd',
        fontFamily: 'Inter, sans-serif', lineHeight: 1.5,
      }}>
        <Terminal size={13} style={{ flexShrink: 0 }} />
        <span>
          {lang === 'th'
            ? <>⚡ โค้ดต้องการ <strong>input</strong> — พิมพ์ค่าทีละบรรทัด (1 บรรทัด = 1 ค่า) แล้วกด <kbd style={{ background:'rgba(255,255,255,0.1)', padding:'0.1rem 0.35rem', borderRadius:'0.2rem', fontSize:'0.72rem' }}>Ctrl+Enter</kbd> หรือปุ่มรันโค้ด</>
            : <>⚡ Code needs <strong>input</strong> — type one value per line, then press <kbd style={{ background:'rgba(255,255,255,0.1)', padding:'0.1rem 0.35rem', borderRadius:'0.2rem', fontSize:'0.72rem' }}>Ctrl+Enter</kbd> or Run</>}
        </span>
      </div>

      {/* Prompt hints (labels from input('...') calls) */}
      {prompts.length > 0 && prompts.some(p => p) && (
        <div style={{
          padding: '0.4rem 0.65rem',
          background: 'rgba(163,230,203,0.05)',
          border: '1px solid rgba(163,230,203,0.15)',
          borderRadius: '0.35rem',
          fontSize: '0.75rem', color: '#6b9e8a',
          fontFamily: 'Inter, sans-serif', lineHeight: 1.8,
        }}>
          <span style={{ color: '#4a6e5a', fontWeight: 600, marginRight: '0.4rem' }}>
            {lang === 'th' ? 'prompt ที่โค้ดถาม:' : 'Prompts in code:'}
          </span>
          {prompts.filter(p => p).map((p, i) => (
            <span key={i} style={{
              display: 'inline-block', marginRight: '0.5rem',
              background: 'rgba(163,230,203,0.08)',
              padding: '0 0.3rem', borderRadius: '0.2rem', color: '#a3e6cb',
            }}>"{p}"</span>
          ))}
        </div>
      )}

      {/* Single textarea for all input values */}
      <textarea
        autoFocus
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={Math.max(prompts.length, 3)}
        placeholder={
          lang === 'th'
            ? `พิมพ์ค่า input ที่นี่...\n(1 บรรทัด = 1 ค่า)`
            : `Type input values here...\n(1 line = 1 value)`
        }
        style={{
          width: '100%', padding: '0.5rem 0.65rem',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(124,58,237,0.35)',
          borderRadius: '0.375rem',
          color: '#e2e8f0',
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem',
          resize: 'vertical', outline: 'none', lineHeight: 1.65,
          boxSizing: 'border-box', minHeight: '70px',
        }}
      />

      {/* Run button */}
      <button
        onClick={() => onSubmit(text)}
        style={{
          alignSelf: 'flex-end',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.4rem 1.25rem',
          background: 'rgba(124,58,237,0.2)',
          border: '1px solid rgba(124,58,237,0.45)',
          borderRadius: '0.375rem',
          color: '#a78bfa', fontFamily: 'Inter, sans-serif',
          fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
        }}
      >
        ▶ {lang === 'th' ? 'รันโค้ด' : 'Run Code'}
      </button>
    </div>
  );
}

// ─── Main OutputPanel ─────────────────────────────────────────────────────────
export default function OutputPanel({
  output          = '',
  error           = '',
  isRunning       = false,
  language        = 'th',
  code            = '',
  pyLoading       = false,
  loadProgress    = '',
  isWasmSupported = true,
  pyError         = null,
  customInput     = '',
  setCustomInput  = null,
  // Interactive input mode
  waitingForInput = false,
  inputPrompts    = [],      // extracted prompt strings from input() calls
  onInputSubmit   = null,   // async (inputValue: string) => void
}) {
  const hasError  = Boolean(error);
  const hasOutput = Boolean(output);

  // Automatically switch to Log tab when a new error arrives
  const [tab, setTab] = useState('output');  // 'output' | 'log' | 'translate'
  useEffect(() => {
    if (hasError && !isRunning) setTab('log');
    if (!hasError && hasOutput) setTab('output');
  }, [hasError, hasOutput, isRunning]);

  const lang = language;

  // ── Determine tab dot colours ──────────────────────────────────────────────
  const logDot = hasError ? '#f87171' : null;

  // ── Header status icon ─────────────────────────────────────────────────────
  const statusIcon = (() => {
    if (!isWasmSupported)  return <WifiOff     size={13} style={{ color: '#f43f5e' }} />;
    if (pyError)           return <AlertCircle size={13} style={{ color: '#f43f5e' }} />;
    if (pyLoading)         return <Loader2     size={13} style={{ color: '#7c3aed' }} className="animate-spin" />;
    if (isRunning)         return <Loader2     size={13} style={{ color: '#7c3aed' }} className="animate-spin" />;
    if (hasError)          return <AlertCircle size={13} style={{ color: '#f43f5e' }} />;
    if (hasOutput)         return <CheckCircle size={13} style={{ color: '#10b981' }} />;
    return null;
  })();

  // ── Special full-panel states (no tabs needed) ─────────────────────────────
  if (!isWasmSupported) return (
    <PanelShell lang={lang} statusIcon={statusIcon} tabBar={null}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.875rem' }}>
        <span style={{ color: '#f43f5e', fontSize: '0.875rem' }}>
          ❌ {lang === 'th' ? 'เบราว์เซอร์ไม่รองรับ WebAssembly' : 'Browser does not support WebAssembly'}
        </span>
        <span style={{ color: '#9090b8', fontSize: '0.78rem' }}>
          {lang === 'th' ? 'ลอง Safari 15.2+, Chrome หรือ Firefox รุ่นล่าสุด' : 'Try Safari 15.2+, Chrome, or the latest Firefox'}
        </span>
      </div>
    </PanelShell>
  );

  if (pyLoading) return (
    <PanelShell lang={lang} statusIcon={statusIcon} tabBar={null}>
      <div style={{ padding: '0.875rem' }}>
        <PythonLoadingView loadProgress={loadProgress} lang={lang} />
      </div>
    </PanelShell>
  );

  if (pyError) return (
    <PanelShell lang={lang} statusIcon={statusIcon} tabBar={null}>
      <div style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <pre style={{ color: '#f87171', whiteSpace: 'pre-wrap', fontSize: '0.82rem', margin: 0 }}>❌ {pyError}</pre>
      </div>
    </PanelShell>
  );

  // ── waitingForInput: show interactive terminal ────────────────────────────
  if (waitingForInput && onInputSubmit) return (
    <PanelShell lang={lang} statusIcon={<Terminal size={13} style={{ color: '#a78bfa' }} />} tabBar={null}>
      <InteractiveInputView prompts={inputPrompts} onSubmit={onInputSubmit} lang={lang} />
    </PanelShell>
  );

  // ── Tab bar ────────────────────────────────────────────────────────────────
  const tabBar = (
    <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', padding: '0.375rem 0.875rem', background: '#0d1117', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <TabBtn active={tab === 'output'}    onClick={() => setTab('output')}>
        <Terminal size={12} />
        {lang === 'th' ? 'ผลลัพธ์' : 'Output'}
      </TabBtn>
      <TabBtn active={tab === 'log'}       onClick={() => setTab('log')} dot={logDot}>
        <FileText size={12} />
        Log
      </TabBtn>
      <TabBtn active={tab === 'translate'} onClick={() => setTab('translate')} dot={logDot}>
        <Languages size={12} />
        {lang === 'th' ? 'แปล Log 🇹🇭' : 'Explain Log'}
      </TabBtn>
    </div>
  );

  // ── Tab body ───────────────────────────────────────────────────────────────
  const body = (() => {
    if (isRunning) return (
      <span style={{ color: '#7c3aed', fontFamily: 'Inter, sans-serif' }}>
        {lang === 'th' ? '⚙️ กำลังรันโค้ด...' : '⚙️ Running code...'}
      </span>
    );

    // OUTPUT tab
    if (tab === 'output') {
      return (
        <div style={{ flex: 1, padding: '0.6rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <span style={{
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.07em',
            color: '#5a5a80', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase',
          }}>stdout</span>
          {isRunning ? (
            <span style={{ color: '#7c3aed', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem' }}>
              ⚙️ {lang === 'th' ? 'กำลังรันโค้ด...' : 'Running…'}
            </span>
          ) : hasError && !hasOutput ? (
            <div style={{ color: '#5a5a80', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={14} style={{ color: '#f43f5e' }} />
              {lang === 'th' ? 'โค้ดเกิด error — ดูรายละเอียดที่แท็บ Log' : 'Code errored — see Log tab'}
            </div>
          ) : hasOutput ? (
            <pre style={{
              color: '#e2e8f0', whiteSpace: 'pre-wrap', margin: 0,
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', lineHeight: 1.6,
            }}>{output}</pre>
          ) : (
            <span style={{ color: '#3a3a5a', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem' }}>
              {lang === 'th' ? '▶ กด Run เพื่อรันโค้ด' : '▶ Press Run to execute'}
            </span>
          )}
        </div>
      );
    }

    // LOG tab
    if (tab === 'log') {
      if (!hasError) return (
        <span style={{ color: '#4a4a6a', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem' }}>
          {lang === 'th' ? '✅ ไม่มี error — log จะแสดงเมื่อโค้ดเกิดข้อผิดพลาด' : '✅ No errors — log appears when your code throws an exception'}
        </span>
      );
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {/* Partial stdout before error */}
          {hasOutput && (
            <div>
              <div style={{ fontSize: '0.72rem', color: '#5a5a80', marginBottom: '0.3rem', fontFamily: 'Inter, sans-serif' }}>
                stdout (ก่อน error):
              </div>
              <pre style={{ color: '#e2e8f0', whiteSpace: 'pre-wrap', margin: 0, fontSize: '0.82rem' }}>{output}</pre>
              <div style={{ margin: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }} />
            </div>
          )}
          {/* Raw traceback label */}
          <div style={{ fontSize: '0.72rem', color: '#5a5a80', fontFamily: 'Inter, sans-serif', marginBottom: '0.1rem' }}>
            stderr / traceback:
          </div>
          <TracebackView errorText={error} />
        </div>
      );
    }

    // TRANSLATE tab
    if (tab === 'translate') {
      if (!hasError) return (
        <span style={{ color: '#4a4a6a', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem' }}>
          {lang === 'th' ? '✅ ไม่มี error — คำแปลจะแสดงเมื่อโค้ดเกิดข้อผิดพลาด' : '✅ No errors — translation appears when your code throws an exception'}
        </span>
      );
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {/* Intro callout */}
          <div style={{
            padding: '0.5rem 0.75rem',
            background: 'rgba(124,58,237,0.07)',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: '0.4rem',
            fontSize: '0.78rem',
            color: '#c4b5fd',
            fontFamily: 'Inter, sans-serif',
            lineHeight: 1.6,
          }}>
            {lang === 'th'
              ? <>💡 <strong>วิธีอ่าน Error Log:</strong> Python จะบอกว่าเกิดอะไรขึ้น ที่ไหน และบรรทัดไหน ฝึกอ่านให้คล่องแล้วจะ debug เองได้เร็วขึ้นมาก!</>
              : <>💡 <strong>How to read an Error Log:</strong> Python tells you what happened, where, and on which line. Practice reading it — you'll debug much faster!</>
            }
          </div>
          <TranslatedView errorText={error} lang={lang} />
        </div>
      );
    }

    return null;
  })();

  return (
    <PanelShell lang={lang} statusIcon={statusIcon} tabBar={tabBar}>
      <div style={{
        padding: '0.875rem',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.85rem',
        lineHeight: 1.6,
        minHeight: '80px',
      }}>
        {body}
      </div>
    </PanelShell>
  );
}

// ─── Shell wrapper ────────────────────────────────────────────────────────────
function PanelShell({ children, statusIcon, tabBar }) {
  return (
    <div style={{
      background: '#0d1117',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      minHeight: '120px',
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.45rem 0.875rem',
        background: '#161b22',
        borderBottom: tabBar ? 'none' : '1px solid rgba(255,255,255,0.06)',
      }}>
        <Terminal size={13} style={{ color: '#10b981' }} />
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#9090b8', fontFamily: 'Inter, sans-serif' }}>
          Console
        </span>
        {statusIcon && <div style={{ marginLeft: 'auto' }}>{statusIcon}</div>}
      </div>

      {/* Optional tab bar */}
      {tabBar}

      {children}
    </div>
  );
}
