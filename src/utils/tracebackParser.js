// src/utils/tracebackParser.js
// ─────────────────────────────────────────────────────────────────────────────
// Parses a raw Python traceback string into a structured object so the UI
// can render each line in a meaningful, colour-coded way.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A single parsed line of the traceback.
 * @typedef {{ type: 'header'|'file'|'code'|'pointer'|'error'|'text', raw: string, lineNo?: number, file?: string, col?: number }} TBLine
 */

/**
 * Parses a Python traceback into structured lines.
 * @param {string} text
 * @returns {{ lines: TBLine[], errorType: string, errorMessage: string, errorLineNo: number|null }}
 */
export function parseTraceback(text) {
  if (!text) return { lines: [], errorType: '', errorMessage: '', errorLineNo: null };

  const rawLines = text.split('\n');
  const lines = [];
  let errorType    = '';
  let errorMessage = '';
  let errorLineNo  = null;

  for (let i = 0; i < rawLines.length; i++) {
    const raw = rawLines[i];

    if (raw.startsWith('Traceback (most recent call last):')) {
      lines.push({ type: 'header', raw });

    } else if (/^\s+File ".+", line \d+/.test(raw)) {
      // e.g.   File "<exec>", line 3, in <module>
      const m = raw.match(/File "(.+?)", line (\d+)/);
      const ln = m ? parseInt(m[2]) : null;
      if (ln && !errorLineNo) errorLineNo = ln;
      lines.push({ type: 'file', raw, lineNo: ln, file: m?.[1] });

    } else if (/^\s{4,}[^\s]/.test(raw) && lines.length > 0 && lines[lines.length - 1].type === 'file') {
      // The code snippet line right after a File line
      lines.push({ type: 'code', raw });

    } else if (/^\s*\^+/.test(raw)) {
      // Caret pointer line
      lines.push({ type: 'pointer', raw });

    } else if (/^[A-Za-z][A-Za-z0-9_]*Error/.test(raw) || /^[A-Za-z][A-Za-z0-9_]*Exception/.test(raw) || /^Timeout/.test(raw)) {
      // Final error line e.g. "TypeError: can only concatenate str..."
      const colonIdx = raw.indexOf(':');
      errorType    = colonIdx !== -1 ? raw.slice(0, colonIdx).trim() : raw.trim();
      errorMessage = colonIdx !== -1 ? raw.slice(colonIdx + 1).trim() : '';
      lines.push({ type: 'error', raw, errorType, errorMessage });

    } else if (raw.trim() !== '') {
      lines.push({ type: 'text', raw });
    }
  }

  return { lines, errorType, errorMessage, errorLineNo };
}

/**
 * Translates individual parts of a Python traceback line into Thai.
 */
export const translateTraceback = {
  header: () => '📋 เกิดข้อผิดพลาด — Python กำลังแสดง trace เส้นทางที่โค้ดไปถึงก่อน error',

  file: (raw) => {
    const m = raw.match(/File "(.+?)", line (\d+)(?:, in (.+))?/);
    if (!m) return raw;
    const [, file, lineNo, scope] = m;
    const fileLabel = file === '<exec>' || file.includes('exec') ? 'โค้ดของคุณ' : file;
    const scopeLabel = scope === '<module>' ? 'ระดับหลัก (global)' : scope ? `ฟังก์ชัน ${scope}` : '';
    return `📄 เกิดที่ ${fileLabel} บรรทัดที่ ${lineNo}${scopeLabel ? ` (${scopeLabel})` : ''}`;
  },

  code: (raw) => `   ▶ โค้ดที่รัน: ${raw.trim()}`,

  pointer: (raw) => {
    const col = raw.indexOf('^');
    return `   ↑ ตำแหน่งที่น่าจะผิด (คอลัมน์ที่ ${col + 1})`;
  },

  error: (errorType, errorMessage) => {
    const typeMap = {
      SyntaxError:        'SyntaxError — เขียน syntax Python ผิด',
      IndentationError:   'IndentationError — ย่อหน้าไม่ถูกต้อง',
      NameError:          'NameError — ใช้ชื่อตัวแปร/ฟังก์ชันที่ไม่มีอยู่',
      TypeError:          'TypeError — ใช้ type ข้อมูลผิดประเภท',
      ValueError:         'ValueError — ค่าที่ส่งไม่ถูกต้องสำหรับ function นี้',
      IndexError:         'IndexError — index เกินขนาด list/tuple',
      KeyError:           'KeyError — key ไม่มีใน dictionary',
      AttributeError:     'AttributeError — method/attribute ไม่มีในวัตถุนี้',
      ZeroDivisionError:  'ZeroDivisionError — หารด้วยศูนย์',
      RecursionError:     'RecursionError — เรียก function ซ้ำจนล้น stack',
      ImportError:        'ImportError — ไม่พบ module ที่ต้องการ',
      ModuleNotFoundError:'ModuleNotFoundError — ไม่พบ module นี้ใน Pyodide',
      StopIteration:      'StopIteration — iterator ไม่มีค่าถัดไปแล้ว',
      RuntimeError:       'RuntimeError — ข้อผิดพลาดขณะรัน',
      MemoryError:        'MemoryError — หน่วยความจำไม่พอ',
      OverflowError:      'OverflowError — ค่าตัวเลขใหญ่เกินกว่าที่รองรับ',
      TimeoutError:       'TimeoutError — โค้ดใช้เวลาเกิน 10 วินาที',
    };
    const typeLabel = typeMap[errorType] ?? `${errorType} — ข้อผิดพลาดประเภทนี้`;
    return `🔴 ${typeLabel}\n   ข้อความ: "${errorMessage}"`;
  },
};
