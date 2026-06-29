// src/components/editor/CodeEditor.jsx
import Editor from '@monaco-editor/react';
import { useRef } from 'react';

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
};

export default function CodeEditor({ value, onChange, height = '300px', readOnly = false }) {
  const editorRef = useRef(null);

  const handleMount = (editor) => {
    editorRef.current = editor;
    // Focus on mount
    editor.focus();
  };

  return (
    <div className="monaco-container" style={{ height }}>
      <Editor
        height={height}
        language="python"
        theme="vs-dark"
        value={value}
        onChange={onChange}
        onMount={handleMount}
        options={{ ...EDITOR_OPTIONS, readOnly }}
      />
    </div>
  );
}
