// src/pages/FlowchartPage.jsx
import { useState } from 'react';
import { useLanguageStore } from '../store/languageStore';
import FlowchartEditor from '../components/flowchart/FlowchartEditor';
import { motion } from 'framer-motion';
import { PenLine, Eye } from 'lucide-react';

// Static flowchart examples as SVG-style components
const EXAMPLE_FLOWCHARTS = [
  {
    id: 'hello',
    title: { th: 'Hello World', en: 'Hello World' },
    description: { th: 'ผังงานง่ายที่สุด — แสดงข้อความ', en: 'Simplest flowchart — display text' },
    code: 'print("Hello, World!")',
    nodes: [
      { id: 's', label: { th: 'เริ่มต้น', en: 'Start' }, type: 'start', x: 150, y: 20 },
      { id: 'p', label: { th: 'แสดง "Hello, World!"', en: 'Display "Hello, World!"' }, type: 'process', x: 100, y: 110 },
      { id: 'e', label: { th: 'สิ้นสุด', en: 'End' }, type: 'end', x: 150, y: 200 },
    ],
    edges: [['s', 'p'], ['p', 'e']],
  },
  {
    id: 'agecheck',
    title: { th: 'ตรวจสอบอายุ', en: 'Age Check' },
    description: { th: 'ใช้เงื่อนไข if-else ตรวจสอบผู้ใหญ่', en: 'Using if-else to check if adult' },
    code: `age = int(input("อายุ: "))
if age >= 18:
    print("ผู้ใหญ่")
else:
    print("เด็ก")`,
    nodes: [
      { id: 's', label: { th: 'เริ่มต้น', en: 'Start' }, type: 'start', x: 160, y: 10 },
      { id: 'i', label: { th: 'รับค่า อายุ', en: 'Input: age' }, type: 'io', x: 110, y: 90 },
      { id: 'd', label: { th: 'อายุ >= 18?', en: 'age >= 18?' }, type: 'decision', x: 100, y: 180 },
      { id: 'y', label: { th: 'แสดง "ผู้ใหญ่"', en: 'Display "Adult"' }, type: 'process', x: 30, y: 290 },
      { id: 'n', label: { th: 'แสดง "เด็ก"', en: 'Display "Minor"' }, type: 'process', x: 210, y: 290 },
      { id: 'e', label: { th: 'สิ้นสุด', en: 'End' }, type: 'end', x: 160, y: 380 },
    ],
    edges: [['s', 'i'], ['i', 'd'], ['d', 'y', 'ใช่/Yes'], ['d', 'n', 'ไม่ใช่/No'], ['y', 'e'], ['n', 'e']],
  },
  {
    id: 'loop',
    title: { th: 'วนซ้ำนับ 1-5', en: 'Count 1 to 5' },
    description: { th: 'แสดงการทำงานของ for loop', en: 'Visualizes how a for loop works' },
    code: `for i in range(1, 6):
    print(i)`,
    nodes: [
      { id: 's', label: { th: 'เริ่มต้น', en: 'Start' }, type: 'start', x: 150, y: 10 },
      { id: 'init', label: { th: 'i = 1', en: 'i = 1' }, type: 'process', x: 120, y: 90 },
      { id: 'cond', label: { th: 'i <= 5?', en: 'i <= 5?' }, type: 'decision', x: 100, y: 175 },
      { id: 'print', label: { th: 'แสดง i', en: 'Display i' }, type: 'process', x: 30, y: 280 },
      { id: 'inc', label: { th: 'i = i + 1', en: 'i = i + 1' }, type: 'process', x: 30, y: 360 },
      { id: 'e', label: { th: 'สิ้นสุด', en: 'End' }, type: 'end', x: 220, y: 280 },
    ],
    edges: [['s', 'init'], ['init', 'cond'], ['cond', 'print', 'ใช่/Yes'], ['cond', 'e', 'ไม่ใช่/No'], ['print', 'inc'], ['inc', 'cond', '', true]],
  },
];

// Simple static flowchart SVG renderer
function StaticFlowchart({ chart, lang }) {
  const getNodeStyle = (type) => {
    const base = { fill: '#1e1e2e', stroke: '', rx: 0 };
    switch (type) {
      case 'start': return { ...base, stroke: '#10b981', shape: 'oval' };
      case 'end': return { ...base, stroke: '#f43f5e', shape: 'oval' };
      case 'process': return { ...base, stroke: '#3b82f6', shape: 'rect' };
      case 'decision': return { ...base, stroke: '#f59e0b', shape: 'diamond' };
      case 'io': return { ...base, stroke: '#9333ea', shape: 'para' };
      default: return { ...base, stroke: '#6b7280', shape: 'rect' };
    }
  };

  const nodeWidth = 140, nodeHeight = 40;

  return (
    <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: 460 }}>
      <svg width={380} height={460} style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* Edges */}
        {chart.edges.map(([from, to, label, curved], i) => {
          const fromNode = chart.nodes.find(n => n.id === from);
          const toNode = chart.nodes.find(n => n.id === to);
          if (!fromNode || !toNode) return null;
          const fx = fromNode.x + 70, fy = fromNode.y + nodeHeight;
          const tx = toNode.x + 70, ty = toNode.y;
          const midX = (fx + tx) / 2, midY = (fy + ty) / 2;
          return (
            <g key={i}>
              <defs>
                <marker id={`arrow-${i}`} viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#7c3aed" />
                </marker>
              </defs>
              {curved ? (
                <path
                  d={`M ${fx} ${fy} C ${fx - 80} ${fy + 30} ${tx - 80} ${ty - 30} ${tx} ${ty}`}
                  stroke="#7c3aed" strokeWidth="2" fill="none"
                  markerEnd={`url(#arrow-${i})`}
                />
              ) : (
                <line x1={fx} y1={fy} x2={tx} y2={ty} stroke="#7c3aed" strokeWidth="2" markerEnd={`url(#arrow-${i})`} />
              )}
              {label && (
                <text x={midX + 6} y={midY - 4} fill="#a78bfa" fontSize="10" fontWeight="600">{label}</text>
              )}
            </g>
          );
        })}
        {/* Nodes */}
        {chart.nodes.map(node => {
          const style = getNodeStyle(node.type);
          const x = node.x, y = node.y;
          const label = node.label[lang] || node.label.th;
          const lines = label.length > 16 ? [label.slice(0, 16), label.slice(16)] : [label];
          return (
            <g key={node.id}>
              {style.shape === 'oval' && (
                <ellipse cx={x + 70} cy={y + 20} rx={65} ry={20} fill={style.fill} stroke={style.stroke} strokeWidth="2" />
              )}
              {style.shape === 'rect' && (
                <rect x={x} y={y} width={nodeWidth} height={nodeHeight} rx="5" fill={style.fill} stroke={style.stroke} strokeWidth="2" />
              )}
              {style.shape === 'diamond' && (
                <polygon points={`${x + 70},${y} ${x + 140},${y + 20} ${x + 70},${y + 40} ${x},${y + 20}`}
                  fill={style.fill} stroke={style.stroke} strokeWidth="2" />
              )}
              {style.shape === 'para' && (
                <polygon points={`${x + 12},${y} ${x + 140},${y} ${x + 128},${y + 40} ${x},${y + 40}`}
                  fill={style.fill} stroke={style.stroke} strokeWidth="2" />
              )}
              {lines.map((line, i) => (
                <text key={i} x={x + 70} y={y + 22 + (i * 14) + (lines.length > 1 ? -7 : 0)}
                  textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="600">
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function FlowchartPage() {
  const { lang, t } = useLanguageStore();
  const [activeTab, setActiveTab] = useState('editor');
  const [selectedExample, setSelectedExample] = useState(0);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.25rem' }}>{t.flowchart.title}</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          {lang === 'th' ? 'เรียนรู้และฝึกวาดผังงาน เพื่อเข้าใจการคิดเชิงโปรแกรมก่อนเขียนโค้ด' : 'Learn and practice drawing flowcharts to understand algorithmic thinking before coding'}
        </p>
      </motion.div>

      {/* Tab Switch */}
      <div style={{
        display: 'flex', gap: '0.5rem', marginBottom: '1.5rem',
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: '0.75rem',
        padding: '0.35rem',
        width: 'fit-content',
      }}>
        {[
          { id: 'editor', icon: PenLine, label: t.flowchart.editor },
          { id: 'viewer', icon: Eye, label: t.flowchart.viewer },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1.25rem',
              borderRadius: '0.5rem',
              border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: '0.875rem',
              transition: 'all 0.2s',
              background: activeTab === tab.id ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : 'transparent',
              color: activeTab === tab.id ? 'white' : 'var(--color-text-secondary)',
              boxShadow: activeTab === tab.id ? '0 2px 10px rgba(124,58,237,0.3)' : 'none',
            }}
          >
            <tab.icon size={15} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'editor' ? (
        <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <FlowchartEditor />
        </motion.div>
      ) : (
        <motion.div key="viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '1.25rem' }}>
            {/* Example list */}
            <div style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: '0.75rem',
              padding: '0.75rem',
              height: 'fit-content',
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                {lang === 'th' ? 'ตัวอย่าง' : 'Examples'}
              </div>
              {EXAMPLE_FLOWCHARTS.map((ex, i) => (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExample(i)}
                  style={{
                    width: '100%', textAlign: 'left',
                    padding: '0.625rem 0.75rem',
                    borderRadius: '0.5rem',
                    border: 'none', cursor: 'pointer',
                    background: selectedExample === i ? 'rgba(124,58,237,0.15)' : 'transparent',
                    color: selectedExample === i ? '#a78bfa' : 'var(--color-text-secondary)',
                    fontSize: '0.85rem', fontWeight: selectedExample === i ? 600 : 400,
                    marginBottom: '0.25rem',
                    transition: 'all 0.2s',
                  }}
                >
                  {ex.title[lang]}
                </button>
              ))}
            </div>

            {/* Selected Example */}
            {EXAMPLE_FLOWCHARTS[selectedExample] && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  {/* Flowchart */}
                  <div style={{
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: '0.75rem',
                    padding: '1.25rem',
                  }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                      {lang === 'th' ? 'ผังงาน' : 'Flowchart'}
                    </div>
                    <StaticFlowchart chart={EXAMPLE_FLOWCHARTS[selectedExample]} lang={lang} />
                  </div>

                  {/* Code */}
                  <div>
                    <div style={{
                      background: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: '0.75rem',
                      padding: '1.25rem',
                      marginBottom: '1rem',
                    }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                        {lang === 'th' ? 'โค้ด Python' : 'Python Code'}
                      </div>
                      <div style={{ background: '#0d1117', borderRadius: '0.5rem', padding: '1rem' }}>
                        <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: '#10b981', lineHeight: 1.7 }}>
                          {EXAMPLE_FLOWCHARTS[selectedExample].code}
                        </pre>
                      </div>
                    </div>
                    <div style={{
                      background: 'rgba(124,58,237,0.06)',
                      border: '1px solid rgba(124,58,237,0.15)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                    }}>
                      <div style={{ fontSize: '0.875rem', color: '#c4b5fd', lineHeight: 1.6 }}>
                        💡 {EXAMPLE_FLOWCHARTS[selectedExample].description[lang]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
