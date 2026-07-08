// src/components/flowchart/FlowchartEditor.jsx
import { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useLanguageStore } from '../../store/languageStore';
import {
  Play, Square, RectangleHorizontal, Diamond, AlignLeft,
  Trash2, Save, FolderOpen, Info
} from 'lucide-react';

// ─── Custom Node Types ────────────────────────────────────────────────────────
import StartEndNode from './nodes/StartEndNode';
import ProcessNode from './nodes/ProcessNode';
import DecisionNode from './nodes/DecisionNode';
import IONode from './nodes/IONode';

const nodeTypes = {
  startEnd: StartEndNode,
  process: ProcessNode,
  decision: DecisionNode,
  io: IONode,
};

let nodeIdCounter = 1;
const newId = () => `node-${Date.now()}-${nodeIdCounter++}`;

const PALETTE_ITEMS = [
  { type: 'startEnd', label: { th: '⬭ เริ่ม/จบ', en: '⬭ Start/End' }, color: '#10b981', data: { label: 'เริ่มต้น', variant: 'start' } },
  { type: 'startEnd', label: { th: '⬭ สิ้นสุด', en: '⬭ End' }, color: '#f43f5e', data: { label: 'สิ้นสุด', variant: 'end' } },
  { type: 'process', label: { th: '▭ กระบวนการ', en: '▭ Process' }, color: '#3b82f6', data: { label: 'กระบวนการ' } },
  { type: 'decision', label: { th: '◇ เงื่อนไข', en: '◇ Decision' }, color: '#f59e0b', data: { label: 'เงื่อนไข?' } },
  { type: 'io', label: { th: '▱ รับ/แสดงผล', en: '▱ Input/Output' }, color: '#9333ea', data: { label: 'รับข้อมูล' } },
];

const SAVE_KEY = 'pylearn_flowchart';

export default function FlowchartEditor() {
  const { t, lang } = useLanguageStore();
  const [nodes, setNodes, onNodesChange] = useNodesState([
    { id: 'start-default', type: 'startEnd', position: { x: 250, y: 50 }, data: { label: lang === 'th' ? 'เริ่มต้น' : 'Start', variant: 'start' } },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [editLabel, setEditLabel] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => {
    setEdges(eds => addEdge({
      ...params,
      animated: false,
      style: { stroke: '#7c3aed', strokeWidth: 2 },
      markerEnd: { type: 'arrowclosed', color: '#7c3aed' },
    }, eds));
  }, [setEdges]);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('nodeType');
    const dataStr = event.dataTransfer.getData('nodeData');
    if (!type || !reactFlowInstance) return;

    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const data = dataStr ? JSON.parse(dataStr) : { label: 'Node' };
    const newNode = { id: newId(), type, position, data };
    setNodes(nds => [...nds, newNode]);
  }, [reactFlowInstance, setNodes]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeClick = useCallback((_, node) => {
    setSelectedNode(node);
    setEditLabel(node.data.label || '');
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const updateSelectedLabel = (val) => {
    setEditLabel(val);
    if (!selectedNode) return;
    setNodes(nds => nds.map(n =>
      n.id === selectedNode.id ? { ...n, data: { ...n.data, label: val } } : n
    ));
  };

  const deleteSelected = () => {
    if (!selectedNode) return;
    setNodes(nds => nds.filter(n => n.id !== selectedNode.id));
    setEdges(eds => eds.filter(e => e.source !== selectedNode.id && e.target !== selectedNode.id));
    setSelectedNode(null);
  };

  const clearAll = () => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
  };

  const saveChart = () => {
    const data = { nodes, edges };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    alert(lang === 'th' ? 'บันทึกแล้ว!' : 'Saved!');
  };

  const loadChart = () => {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) { alert(lang === 'th' ? 'ไม่มีข้อมูลที่บันทึกไว้' : 'No saved data'); return; }
    const data = JSON.parse(raw);
    setNodes(data.nodes || []);
    setEdges(data.edges || []);
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: 'calc(100vh - 160px)', minHeight: '600px',
      border: '1px solid var(--color-border-subtle)',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      background: 'var(--color-bg-primary)',
    }}>
      {/* ─── Top Toolbar ─── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.6rem 1rem',
        background: 'var(--color-bg-card)',
        borderBottom: '1px solid var(--color-border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={saveChart} className="btn-ghost" style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Save size={14} /> {lang === 'th' ? 'บันทึก' : 'Save'}
          </button>
          <button onClick={loadChart} className="btn-ghost" style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <FolderOpen size={14} /> {lang === 'th' ? 'โหลด' : 'Load'}
          </button>
          <button onClick={clearAll} className="btn-ghost" style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#fb7185' }}>
            <Trash2 size={14} /> {lang === 'th' ? 'ล้างหน้ากระดาษ' : 'Clear Canvas'}
          </button>
        </div>
        <button onClick={() => setShowInstructions(!showInstructions)} className="btn-ghost" style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#a78bfa' }}>
          <Info size={14} /> {lang === 'th' ? 'วิธีใช้' : 'Help'}
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* ─── Left Sidebar (Palette) ─── */}
        <div style={{
          width: '200px',
          background: 'var(--color-bg-card)',
          borderRight: '1px solid var(--color-border-subtle)',
          padding: '1rem',
          display: 'flex', flexDirection: 'column', gap: '1rem',
          overflowY: 'auto'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {lang === 'th' ? 'รูปทรงพื้นฐาน' : 'Basic Shapes'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
            {PALETTE_ITEMS.map((item, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('nodeType', item.type);
                  e.dataTransfer.setData('nodeData', JSON.stringify(item.data));
                }}
                style={{
                  background: 'var(--color-bg-primary)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '0.4rem',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  cursor: 'grab',
                  userSelect: 'none',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = item.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border-subtle)'}
              >
                <div style={{ width: 12, height: 12, borderRadius: item.type === 'startEnd' ? '50%' : '2px', background: item.color }} />
                {item.label[lang]}
              </div>
            ))}
          </div>
          
          {showInstructions && (
            <div style={{
              marginTop: 'auto',
              background: 'rgba(124,58,237,0.1)',
              border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: '0.5rem',
              padding: '0.75rem',
              fontSize: '0.75rem',
              color: '#c4b5fd',
            }}>
              <ul style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', margin: 0 }}>
                <li>{lang === 'th' ? t.flowchart.inst1 : t.flowchart.inst1}</li>
                <li>{lang === 'th' ? t.flowchart.inst2 : t.flowchart.inst2}</li>
                <li>{lang === 'th' ? t.flowchart.inst3 : t.flowchart.inst3}</li>
              </ul>
            </div>
          )}
        </div>

        {/* ─── Center Canvas ─── */}
        <div
          ref={reactFlowWrapper}
          style={{ flex: 1, position: 'relative' }}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
            deleteKeyCode="Delete"
          >
            {/* Grid background for professional look */}
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#4b5563" />
            <Controls style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-subtle)' }} />
          </ReactFlow>
        </div>

        {/* ─── Right Sidebar (Properties) ─── */}
        <div style={{
          width: '260px',
          background: 'var(--color-bg-card)',
          borderLeft: '1px solid var(--color-border-subtle)',
          padding: '1rem',
          display: 'flex', flexDirection: 'column', gap: '1.25rem',
          overflowY: 'auto'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {lang === 'th' ? 'คุณสมบัติ' : 'Properties'}
          </div>

          {selectedNode ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.4rem' }}>
                  {lang === 'th' ? 'ข้อความ (Label)' : 'Text Label'}
                </label>
                <textarea
                  className="input-dark"
                  value={editLabel}
                  onChange={e => updateSelectedLabel(e.target.value)}
                  placeholder={t.flowchart.label_placeholder}
                  style={{ width: '100%', minHeight: '80px', fontSize: '0.85rem', resize: 'vertical' }}
                  autoFocus
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.4rem' }}>
                  {lang === 'th' ? 'ตำแหน่ง (Position)' : 'Position'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  <div style={{ background: 'var(--color-bg-primary)', padding: '0.4rem', borderRadius: '0.25rem', textAlign: 'center' }}>
                    X: {Math.round(selectedNode.position.x)}
                  </div>
                  <div style={{ background: 'var(--color-bg-primary)', padding: '0.4rem', borderRadius: '0.25rem', textAlign: 'center' }}>
                    Y: {Math.round(selectedNode.position.y)}
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border-subtle)', marginTop: '0.5rem', paddingTop: '1.5rem' }}>
                <button
                  onClick={deleteSelected}
                  style={{
                    width: '100%',
                    background: 'rgba(244,63,94,0.1)',
                    border: '1px solid rgba(244,63,94,0.3)',
                    borderRadius: '0.4rem',
                    padding: '0.6rem',
                    color: '#fb7185',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                  }}
                >
                  <Trash2 size={15} /> {lang === 'th' ? 'ลบรูปทรงนี้' : 'Delete Node'}
                </button>
              </div>
            </div>
          ) : (
            <div style={{
              textAlign: 'center', padding: '2rem 1rem',
              color: 'var(--color-text-muted)', fontSize: '0.85rem'
            }}>
              {lang === 'th' ? 'คลิกที่รูปทรงเพื่อดูและแก้ไขคุณสมบัติ' : 'Select a node to edit its properties'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
