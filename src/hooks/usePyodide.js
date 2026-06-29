// src/hooks/usePyodide.js
// Hook for running Python code in the browser via Pyodide (WebAssembly)
// Optimised for Safari / iPadOS: includes WASM check, execution timeout,
// and a deferred-load strategy that avoids crashing the browser tab.
import { useState, useEffect, useRef, useCallback } from 'react';
import { pyLog } from '../utils/errorAnalyzer';

// ─── Constants ────────────────────────────────────────────────────────────────
const PYODIDE_VERSION  = '0.27.0';
const PYODIDE_CDN      = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/pyodide.js`;
const PYODIDE_INDEX    = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

// Max ms before we kill a runaway script (e.g. while True:)
// Safari/iPad is more memory-constrained so keep it tighter.
const EXEC_TIMEOUT_MS  = 10_000;

// ─── Module-level singleton (shared across all hook instances) ────────────────
let _pyodideInstance = null;
let _loadingPromise  = null;

// ─── WebAssembly capability check ────────────────────────────────────────────
const checkWasmSupport = () => {
  try {
    if (typeof WebAssembly !== 'object') {
      console.warn('[PyLearn | Python Runtime] WebAssembly object not found in this environment.');
      return false;
    }
    // Quick compile test – catches older WebKit versions that claim support
    // but fail in practice.
    const bytes = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0]);
    new WebAssembly.Module(bytes);
    console.info('[PyLearn | Python Runtime] WebAssembly support confirmed.');
    return true;
  } catch (e) {
    console.error('[PyLearn | Python Runtime] WebAssembly compile test failed:', e.message);
    return false;
  }
};

// ─── Lazy loader (called only when the user reaches a page with an editor) ───
const loadPyodide = () => {
  if (_pyodideInstance) return Promise.resolve(_pyodideInstance);
  if (_loadingPromise)  return _loadingPromise;

  _loadingPromise = new Promise((resolve, reject) => {
    const doLoad = () => {
      console.info('[PyLearn | Python Runtime] Initialising Pyodide', PYODIDE_VERSION);
      window
        .loadPyodide({ indexURL: PYODIDE_INDEX })
        .then(py => {
          _pyodideInstance = py;
          console.info('[PyLearn | Python Runtime] Pyodide ready ✓');
          resolve(py);
        })
        .catch(err => {
          pyLog.engineError(err.message, 'loadPyodide()');
          reject(err);
        });
    };

    if (typeof window.loadPyodide === 'function') {
      doLoad();
      return;
    }

    const script    = document.createElement('script');
    script.src      = PYODIDE_CDN;
    // crossorigin="anonymous" is required when COEP: require-corp is active.
    script.crossOrigin = 'anonymous';
    script.onload   = doLoad;
    script.onerror  = () => {
      const msg = 'Failed to load Pyodide script from CDN';
      pyLog.engineError(msg, 'script.onerror');
      reject(new Error(msg));
    };
    document.head.appendChild(script);
  });

  return _loadingPromise;
};

// ─── Timeout wrapper ─────────────────────────────────────────────────────────
const withTimeout = (promise, ms) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => {
        pyLog.timeout(ms);
        reject(new Error(`⏱ หมดเวลา ${ms / 1000} วินาที — โค้ดอาจมี loop ไม่สิ้นสุด`));
      }, ms)
    ),
  ]);

// ─── Hook ────────────────────────────────────────────────────────────────────
export const usePyodide = () => {
  const [isLoading,     setIsLoading]     = useState(false);
  const [isReady,       setIsReady]       = useState(!!_pyodideInstance);
  const [error,         setError]         = useState(null);
  const [loadProgress,  setLoadProgress]  = useState('');   // human-readable status
  const [isWasmSupported] = useState(checkWasmSupport);
  const pyRef = useRef(_pyodideInstance);

  // Trigger load on mount (only once per session thanks to singleton)
  useEffect(() => {
    if (!isWasmSupported) {
      setError('เบราว์เซอร์นี้ไม่รองรับ WebAssembly — ลอง Safari 15.2+, Chrome หรือ Firefox ล่าสุด');
      return;
    }

    if (_pyodideInstance) {
      pyRef.current = _pyodideInstance;
      setIsReady(true);
      return;
    }

    setIsLoading(true);
    setLoadProgress('กำลังโหลด Python runtime…');

    loadPyodide()
      .then(py => {
        pyRef.current = py;
        setIsReady(true);
        setLoadProgress('');
      })
      .catch(err => {
        // Friendly message for iOS users
        const isStackOverflow = err.message?.includes('Maximum call stack');
        const msg = isStackOverflow
          ? 'ไม่สามารถโหลด Python บน iOS เวอร์ชันนี้ได้ — ลองอัปเดต iPadOS หรือใช้ Safari 16+'
          : (err.message || 'โหลด Python ไม่สำเร็จ');
        pyLog.engineError(err.message, isStackOverflow ? 'iOS stack overflow' : 'load failure');
        setError(msg);
        setLoadProgress('');
        // Reset promise so next mount can retry
        _loadingPromise = null;
      })
      .finally(() => setIsLoading(false));
  }, [isWasmSupported]);

  // ── runCode ──────────────────────────────────────────────────────────────
  const runCode = useCallback(async (code, stdin = '') => {
    if (!pyRef.current) {
      return { output: '', error: 'Python ยังไม่พร้อม', success: false };
    }

    const py = pyRef.current;
    let output   = '';
    let errorMsg = '';

    // ── Setup stdout / stderr capture ──────────────────────────────────────
    py.runPython(`
import sys, io
_stdout_capture = io.StringIO()
_stderr_capture = io.StringIO()
sys.stdout = _stdout_capture
sys.stderr = _stderr_capture
`);

    // ── stdin simulation (mock input()) ────────────────────────────────────
    if (stdin) {
      const lines = stdin.split('\n').map(l => l.trim()).filter(Boolean);
      py.runPython(`
_input_lines = ${JSON.stringify(lines)}
_input_index = [0]

def _mock_input(prompt=''):
    if _input_index[0] < len(_input_lines):
        val = _input_lines[_input_index[0]]
        _input_index[0] += 1
        if prompt:
            sys.stdout.write(prompt)
        return val
    return ''

import builtins
builtins.input = _mock_input
`);
    } else {
      py.runPython(`
import builtins
def _prompt_input(prompt=''):
    if prompt:
        sys.stdout.write(prompt)
    return ''
builtins.input = _prompt_input
`);
    }

    // ── Execute with timeout ────────────────────────────────────────────────
    try {
      await withTimeout(py.runPythonAsync(code), EXEC_TIMEOUT_MS);
      output = py.runPython('_stdout_capture.getvalue()');
      const stderr = py.runPython('_stderr_capture.getvalue()');
      if (stderr) {
        errorMsg = stderr;
        pyLog.codeError(stderr, code);
      }
    } catch (err) {
      errorMsg = err.message || String(err);
      // codeError logging is handled by analyseError() in the UI layer;
      // here we just log engine-level issues (timeout, Pyodide crash)
      if (!err.message?.includes('หมดเวลา')) {
        pyLog.engineError(errorMsg, 'runPythonAsync catch');
      }
      try { output = py.runPython('_stdout_capture.getvalue()'); } catch { /* ignore */ }
    } finally {
      // Restore streams no matter what
      try {
        py.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);
      } catch { /* ignore */ }
    }

    return {
      output:  output.trimEnd(),
      error:   errorMsg,
      success: !errorMsg,
    };
  }, []);

  return {
    isLoading,
    isReady,
    error,
    loadProgress,
    isWasmSupported,
    runCode,
  };
};
