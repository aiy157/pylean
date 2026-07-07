// src/components/editor/CodeEditor.jsx
// Monaco-based Python code editor with:
// - Full Python keyword / builtin autocomplete
// - 4-space indent (Python standard)
// - Proper suggestion popup (no blocking autocomplete on every keypress)
import Editor, { loader } from '@monaco-editor/react';
import { useRef, useCallback } from 'react';

// ─── Python snippets / autocomplete items ────────────────────────────────────
const PYTHON_COMPLETIONS = [
  // Keywords
  { label: 'print',      kind: 1, insert: 'print($1)',         doc: 'print(value) — พิมพ์ข้อความออกหน้าจอ' },
  { label: 'input',      kind: 1, insert: 'input($1)',          doc: 'input(prompt) — รับค่าจากผู้ใช้' },
  { label: 'int',        kind: 1, insert: 'int($1)',            doc: 'int(x) — แปลงเป็นจำนวนเต็ม' },
  { label: 'float',      kind: 1, insert: 'float($1)',          doc: 'float(x) — แปลงเป็นจำนวนทศนิยม' },
  { label: 'str',        kind: 1, insert: 'str($1)',            doc: 'str(x) — แปลงเป็น string' },
  { label: 'len',        kind: 1, insert: 'len($1)',            doc: 'len(x) — ความยาวของ list/string' },
  { label: 'range',      kind: 1, insert: 'range($1)',          doc: 'range(stop) หรือ range(start, stop, step)' },
  { label: 'type',       kind: 1, insert: 'type($1)',           doc: 'type(x) — บอกประเภทของตัวแปร' },
  { label: 'list',       kind: 1, insert: 'list($1)',           doc: 'list(iterable) — สร้าง list' },
  { label: 'dict',       kind: 1, insert: 'dict()',             doc: 'สร้าง dictionary' },
  { label: 'set',        kind: 1, insert: 'set($1)',            doc: 'สร้าง set' },
  { label: 'tuple',      kind: 1, insert: 'tuple($1)',          doc: 'สร้าง tuple' },
  { label: 'abs',        kind: 1, insert: 'abs($1)',            doc: 'ค่าสัมบูรณ์' },
  { label: 'max',        kind: 1, insert: 'max($1)',            doc: 'ค่ามากที่สุด' },
  { label: 'min',        kind: 1, insert: 'min($1)',            doc: 'ค่าน้อยที่สุด' },
  { label: 'sum',        kind: 1, insert: 'sum($1)',            doc: 'ผลรวม' },
  { label: 'sorted',     kind: 1, insert: 'sorted($1)',         doc: 'เรียงลำดับ (คืน list ใหม่)' },
  { label: 'enumerate',  kind: 1, insert: 'enumerate($1)',      doc: 'คืน (index, value) สำหรับ loop' },
  { label: 'zip',        kind: 1, insert: 'zip($1)',            doc: 'รวม iterables เข้าด้วยกัน' },
  { label: 'map',        kind: 1, insert: 'map($1)',            doc: 'map(func, iterable)' },
  { label: 'filter',     kind: 1, insert: 'filter($1)',         doc: 'filter(func, iterable)' },
  { label: 'round',      kind: 1, insert: 'round($1)',          doc: 'ปัดเศษ' },
  { label: 'bool',       kind: 1, insert: 'bool($1)',           doc: 'แปลงเป็น True/False' },
  { label: 'open',       kind: 1, insert: 'open($1)',           doc: 'เปิดไฟล์' },
  // Snippets (kind: 14 = Snippet in Monaco)
  { label: 'if',         kind: 14, insert: 'if $1:\n    $2',       doc: 'if condition:' },
  { label: 'elif',       kind: 14, insert: 'elif $1:\n    $2',     doc: 'elif condition:' },
  { label: 'else',       kind: 14, insert: 'else:\n    $1',         doc: 'else:' },
  { label: 'for',        kind: 14, insert: 'for $1 in $2:\n    $3', doc: 'for loop' },
  { label: 'while',      kind: 14, insert: 'while $1:\n    $2',     doc: 'while loop' },
  { label: 'def',        kind: 14, insert: 'def $1($2):\n    $3',   doc: 'นิยามฟังก์ชัน' },
  { label: 'class',      kind: 14, insert: 'class $1:\n    $2',     doc: 'นิยาม class' },
  { label: 'try',        kind: 14, insert: 'try:\n    $1\nexcept $2:\n    $3', doc: 'try/except' },
  { label: 'import',     kind: 14, insert: 'import $1',             doc: 'import module' },
  { label: 'from',       kind: 14, insert: 'from $1 import $2',     doc: 'from module import ...' },
  { label: 'return',     kind: 14, insert: 'return $1',             doc: 'คืนค่าจากฟังก์ชัน' },
  { label: 'lambda',     kind: 14, insert: 'lambda $1: $2',         doc: 'ฟังก์ชันแบบย่อ' },
  { label: 'with',       kind: 14, insert: 'with $1 as $2:\n    $3', doc: 'context manager' },
  { label: 'assert',     kind: 14, insert: 'assert $1, "$2"',       doc: 'ตรวจสอบเงื่อนไข' },
  { label: 'raise',      kind: 14, insert: 'raise $1',              doc: 'โยน exception' },
  // Common patterns
  { label: 'fstring',    kind: 14, insert: 'f"$1{$2}$3"',          doc: 'f-string (interpolation)' },
  { label: 'list-comp',  kind: 14, insert: '[$1 for $2 in $3]',    doc: 'list comprehension' },
];

// ─── Register completions once globally ──────────────────────────────────────
let _completionsRegistered = false;

const registerPythonCompletions = (monaco) => {
  if (_completionsRegistered) return;
  _completionsRegistered = true;

  monaco.languages.registerCompletionItemProvider('python', {
    // Trigger on any letter, not just special chars
    triggerCharacters: [],
    provideCompletionItems: (model, position) => {
      const wordInfo = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: wordInfo.startColumn,
        endColumn: wordInfo.endColumn,
      };

      const suggestions = PYTHON_COMPLETIONS.map(item => ({
        label: item.label,
        kind: item.kind === 14
          ? monaco.languages.CompletionItemKind.Snippet
          : monaco.languages.CompletionItemKind.Function,
        insertText: item.insert,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: item.doc,
        range,
        sortText: item.label,  // alphabetical sort
      }));

      return { suggestions };
    },
  });
};

// ─── Editor options ───────────────────────────────────────────────────────────
const EDITOR_OPTIONS = {
  minimap: { enabled: false },
  fontSize: 14,
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  fontLigatures: true,
  lineNumbers: 'on',
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 4,
  insertSpaces: true,
  detectIndentation: false,   // always use tabSize=4 (Python standard)
  wordWrap: 'on',
  cursorBlinking: 'smooth',
  cursorSmoothCaretAnimation: 'on',
  renderWhitespace: 'selection',
  bracketPairColorization: { enabled: true },
  padding: { top: 12, bottom: 12 },
  scrollbar: {
    verticalScrollbarSize: 6,
    horizontalScrollbarSize: 6,
  },
  autoClosingBrackets: 'always',
  autoClosingQuotes: 'always',
  // Suggestions
  suggest: {
    showKeywords: true,
    showSnippets: true,
    showFunctions: true,
    showVariables: true,
    filterGraceful: true,
    preview: true,
  },
  quickSuggestions: {
    other: true,
    comments: false,
    strings: false,
  },
  suggestOnTriggerCharacters: true,
  wordBasedSuggestions: 'currentDocument',
  acceptSuggestionOnEnter: 'on',
  // ─── DISABLE word-based popup that competes with our custom provider ─
  parameterHints: { enabled: true },
};

const MobileToolbar = ({ onInsert }) => {
  const buttons = ['Tab', ':', '(', ')', '[', ']', '"', "'", '=', '+', '-'];
  return (
    <div className="md:hidden flex overflow-x-auto bg-[#1a1a2e] border-b border-white/5 p-1.5 gap-1.5 hide-scrollbar">
      {buttons.map(b => (
        <button 
          key={b}
          onClick={() => onInsert(b === 'Tab' ? '    ' : b)}
          className="px-3.5 py-1.5 bg-[#2d2d3a] text-gray-300 rounded-md text-sm font-mono active:bg-[#4d4d5a] whitespace-nowrap shadow-sm border border-white/5"
        >
          {b}
        </button>
      ))}
    </div>
  );
};

export default function CodeEditor({ value, onChange, height = '300px', readOnly = false }) {
  const editorRef = useRef(null);

  const handleBeforeMount = useCallback((monaco) => {
    registerPythonCompletions(monaco);
  }, []);

  const handleMount = useCallback((editor) => {
    editorRef.current = editor;
    // Add Ctrl+Space keyboard shortcut to trigger suggestions manually
    editor.addCommand(
      // eslint-disable-next-line no-bitwise
      (window.monaco?.KeyMod?.CtrlCmd | window.monaco?.KeyCode?.Space) ?? 2048 + 49,
      () => editor.trigger('keyboard', 'editor.action.triggerSuggest', {})
    );
    editor.focus();
  }, []);

  const insertText = useCallback((text) => {
    const editor = editorRef.current;
    if (!editor) return;
    const position = editor.getPosition();
    editor.executeEdits('mobile-toolbar', [
      {
        range: new window.monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
        text: text,
        forceMoveMarkers: true
      }
    ]);
    editor.focus();
  }, []);

  return (
    <div className="flex flex-col w-full" style={{ height }}>
      {!readOnly && <MobileToolbar onInsert={insertText} />}
      <div className="monaco-container flex-1 min-h-0 w-full">
        <Editor
          height="100%"
          language="python"
          theme="vs-dark"
          value={value}
          onChange={onChange}
          beforeMount={handleBeforeMount}
          onMount={handleMount}
          options={{ ...EDITOR_OPTIONS, readOnly }}
        />
      </div>
    </div>
  );
}
