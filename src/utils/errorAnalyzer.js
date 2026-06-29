// src/utils/errorAnalyzer.js
// ─────────────────────────────────────────────────────────────────────────────
// Analyses a Python traceback string and returns:
//   { category, thMessage, enMessage, suggestion_th, suggestion_en, docsUrl }
//
// Used by OutputPanel to show friendly hints next to raw error text.
// All console.error() calls here produce structured English logs for devs.
// ─────────────────────────────────────────────────────────────────────────────

const LOG_PREFIX = '[PyLearn | Python Runtime]';

// ─── Structured console logger (English only, for devs) ──────────────────────
export const pyLog = {
  /** Runtime error that came from student code */
  codeError: (errorText, code) => {
    console.group(`${LOG_PREFIX} Code execution error`);
    console.error('Error message :', errorText);
    console.info ('Student code  :\n', code ?? '(not provided)');
    console.groupEnd();
  },

  /** Pyodide engine-level error (load failure, crash, etc.) */
  engineError: (errorText, context = '') => {
    console.error(`${LOG_PREFIX} Engine error [${context}]:`, errorText);
  },

  /** Execution timed out */
  timeout: (limitMs) => {
    console.warn(`${LOG_PREFIX} Execution timeout after ${limitMs}ms — possible infinite loop`);
  },

  /** Grader ran a test case */
  graderRun: (testIndex, input, expected, actual, passed) => {
    const status = passed ? '✅ PASS' : '❌ FAIL';
    console.group(`${LOG_PREFIX} Grader | Test #${testIndex + 1} — ${status}`);
    if (input !== undefined && input !== '') console.info('  Input    :', input);
    console.info('  Expected :', expected ?? '(any)');
    console.info('  Actual   :', actual);
    console.groupEnd();
  },

  /** Summary after all test cases run */
  graderSummary: (passCount, total, scorePercent) => {
    console.info(
      `${LOG_PREFIX} Grader summary: ${passCount}/${total} passed (${scorePercent}%)`
    );
  },
};

// ─── Error pattern catalogue ──────────────────────────────────────────────────
// Each entry: { match: RegExp, category, th, en, suggestion_th, suggestion_en, docsUrl? }
const ERROR_PATTERNS = [
  // ── SyntaxError ──────────────────────────────────────────────────────────
  {
    match: /SyntaxError/,
    category: 'SyntaxError',
    th: 'โค้ดเขียนผิดไวยากรณ์ Python',
    en: 'Python syntax error — the code is not valid Python.',
    suggestion_th: [
      'ตรวจสอบว่าวงเล็บ ( ) ครบหรือไม่',
      'ตรวจสอบ : หลัง if / for / def / while',
      'เช็ค indentation (ย่อหน้า) ให้ตรงกัน',
    ],
    suggestion_en: [
      'Check that all parentheses ( ) are balanced.',
      'Ensure you have a colon : after if / for / def / while.',
      'Verify indentation is consistent (use 4 spaces).',
    ],
  },

  // ── IndentationError ─────────────────────────────────────────────────────
  {
    match: /IndentationError/,
    category: 'IndentationError',
    th: 'ย่อหน้า (indentation) ไม่ถูกต้อง',
    en: 'Indentation error — Python is whitespace-sensitive.',
    suggestion_th: [
      'ใช้ช่องว่าง 4 ตัว หรือ Tab สม่ำเสมอ (ห้ามผสมกัน)',
      'บรรทัดใน if / for / def ต้องย่อหน้าเข้าไป',
    ],
    suggestion_en: [
      'Use 4 spaces per indent level consistently — do not mix tabs and spaces.',
      'Lines inside if / for / def must be indented.',
    ],
  },

  // ── NameError ────────────────────────────────────────────────────────────
  {
    match: /NameError:\s*name '(.+?)' is not defined/,
    category: 'NameError',
    th: 'ใช้ตัวแปรที่ยังไม่ได้ประกาศ',
    en: 'NameError — variable or function used before it was defined.',
    suggestion_th: [
      'ตรวจสอบการสะกดชื่อตัวแปร (Python แยก a กับ A)',
      'ต้องกำหนดค่าตัวแปรก่อนใช้งาน เช่น x = 0',
      'ถ้าเรียกฟังก์ชัน ต้อง def ก่อนเรียกใช้',
    ],
    suggestion_en: [
      'Check the spelling — Python is case-sensitive (a ≠ A).',
      'Make sure you assign the variable before using it (e.g. x = 0).',
      'If calling a function, define it with def before the call.',
    ],
  },

  // ── TypeError ────────────────────────────────────────────────────────────
  {
    match: /TypeError/,
    category: 'TypeError',
    th: 'ใช้ประเภทข้อมูล (type) ผิด',
    en: 'TypeError — an operation was applied to an incompatible type.',
    suggestion_th: [
      'ถ้าต้องการรวม str กับ int ให้ใช้ str() ก่อน เช่น str(x) + "cm"',
      'ตรวจสอบว่าฟังก์ชันรับ argument ครบหรือไม่',
      'ตรวจสอบว่าวัตถุที่เรียกเป็น function จริงๆ',
    ],
    suggestion_en: [
      'To concatenate str + int, convert first: str(x) + "cm".',
      'Check that you are passing the correct number of arguments.',
      'Ensure you are calling an actual function, not a variable.',
    ],
  },

  // ── ValueError ───────────────────────────────────────────────────────────
  {
    match: /ValueError/,
    category: 'ValueError',
    th: 'ค่าที่ส่งให้ฟังก์ชันไม่ถูกต้อง',
    en: 'ValueError — function received an argument with the right type but wrong value.',
    suggestion_th: [
      'int("abc") จะ error เพราะ "abc" ไม่ใช่ตัวเลข',
      'ตรวจสอบค่าก่อนแปลงประเภท',
    ],
    suggestion_en: [
      'int("abc") fails because "abc" is not a number — validate input first.',
      'Check the value before converting types.',
    ],
  },

  // ── IndexError ───────────────────────────────────────────────────────────
  {
    match: /IndexError/,
    category: 'IndexError',
    th: 'เข้าถึง index ที่ไม่มีอยู่ใน list',
    en: 'IndexError — index out of range.',
    suggestion_th: [
      'Python นับ index เริ่มจาก 0 (list 3 ตัว → index 0,1,2)',
      'ตรวจสอบ len(list) ก่อนเข้าถึง',
    ],
    suggestion_en: [
      'Python indexes start at 0 — a list with 3 items has indexes 0, 1, 2.',
      'Check len(your_list) before accessing an index.',
    ],
  },

  // ── KeyError ─────────────────────────────────────────────────────────────
  {
    match: /KeyError/,
    category: 'KeyError',
    th: 'ใช้ key ที่ไม่มีอยู่ใน dictionary',
    en: 'KeyError — key does not exist in the dictionary.',
    suggestion_th: [
      'ใช้ .get(key) แทน [key] เพื่อไม่ให้ error',
      'ตรวจสอบด้วย if key in dict ก่อน',
    ],
    suggestion_en: [
      'Use dict.get(key) instead of dict[key] to avoid KeyError.',
      'Check with if key in dict: before accessing.',
    ],
  },

  // ── AttributeError ───────────────────────────────────────────────────────
  {
    match: /AttributeError/,
    category: 'AttributeError',
    th: 'เรียกใช้ attribute หรือ method ที่ไม่มี',
    en: 'AttributeError — the object does not have that attribute or method.',
    suggestion_th: [
      'ตรวจสอบการสะกด method เช่น .append() ไม่ใช่ .Append()',
      'ใช้ dir(object) เพื่อดู method ที่มี',
    ],
    suggestion_en: [
      'Check spelling — .append() not .Append() — Python is case-sensitive.',
      'Use dir(object) to see available methods.',
    ],
  },

  // ── ZeroDivisionError ────────────────────────────────────────────────────
  {
    match: /ZeroDivisionError/,
    category: 'ZeroDivisionError',
    th: 'หารด้วยศูนย์',
    en: 'ZeroDivisionError — division by zero.',
    suggestion_th: [
      'ตรวจสอบค่าตัวหารก่อน เช่น if b != 0: result = a / b',
    ],
    suggestion_en: [
      'Check the divisor before dividing: if b != 0: result = a / b.',
    ],
  },

  // ── RecursionError ───────────────────────────────────────────────────────
  {
    match: /RecursionError/,
    category: 'RecursionError',
    th: 'ฟังก์ชัน recursive เรียกตัวเองจนล้น stack',
    en: 'RecursionError — maximum recursion depth exceeded.',
    suggestion_th: [
      'ตรวจสอบ base case ของ recursion ว่ามีและถูกต้อง',
      'ลอง เขียนด้วย loop แทน recursion',
    ],
    suggestion_en: [
      'Ensure your recursive function has a valid base case that stops the recursion.',
      'Consider rewriting with a loop instead.',
    ],
  },

  // ── ImportError / ModuleNotFoundError ───────────────────────────────────
  {
    match: /ImportError|ModuleNotFoundError/,
    category: 'ImportError',
    th: 'ไม่พบ module ที่ต้องการ import',
    en: 'ImportError — the requested module is not available in this environment.',
    suggestion_th: [
      'Pyodide รองรับ standard library ครบ แต่ third-party บางตัวอาจไม่มี',
      'ลอง import ที่รองรับ: math, random, datetime, json, re, collections',
    ],
    suggestion_en: [
      'Pyodide includes the full Python standard library.',
      'Only some third-party packages are pre-bundled. Try: math, random, datetime, json, re, collections.',
    ],
  },

  // ── Timeout (injected by usePyodide) ─────────────────────────────────────
  {
    match: /หมดเวลา|Execution timeout/,
    category: 'TimeoutError',
    th: 'โค้ดใช้เวลานานเกินกำหนด',
    en: 'Execution timed out — code took too long to complete.',
    suggestion_th: [
      'ตรวจสอบว่ามี while True: หรือ loop ไม่มีที่สิ้นสุดหรือไม่',
      'ลด input ที่ทำให้ loop วนหลายครั้ง',
    ],
    suggestion_en: [
      'Check for while True: or any loop that never terminates.',
      'Reduce the size of inputs that cause the loop to iterate many times.',
    ],
  },
];

// ─── Main analyser ────────────────────────────────────────────────────────────
/**
 * @param {string} errorText  - Raw Python traceback / error string
 * @param {string} [code]     - Student's source code (optional, used for logging)
 * @returns {{
 *   category: string,
 *   raw: string,
 *   th: string,
 *   en: string,
 *   suggestion_th: string[],
 *   suggestion_en: string[],
 *   docsUrl?: string
 * }}
 */
export const analyseError = (errorText, code, { skipLog = false } = {}) => {
  if (!errorText) return null;

  // Log to console (English, for developers) — skip if already logged upstream
  if (!skipLog) pyLog.codeError(errorText, code);

  for (const pattern of ERROR_PATTERNS) {
    if (pattern.match.test(errorText)) {
      const result = {
        category:       pattern.category,
        raw:            errorText,
        th:             pattern.th,
        en:             pattern.en,
        suggestion_th:  pattern.suggestion_th,
        suggestion_en:  pattern.suggestion_en,
        docsUrl:        pattern.docsUrl,
      };
      console.info(`${LOG_PREFIX} Error classified as: ${pattern.category}`);
      return result;
    }
  }

  // Unknown / unclassified error
  console.warn(`${LOG_PREFIX} Unclassified error:`, errorText);
  return {
    category:      'RuntimeError',
    raw:           errorText,
    th:            'เกิดข้อผิดพลาดขณะรันโค้ด',
    en:            'A runtime error occurred.',
    suggestion_th: ['อ่าน traceback ด้านบนเพื่อหาบรรทัดที่มีปัญหา'],
    suggestion_en: ['Read the traceback above to identify the problematic line.'],
  };
};
