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
    <div style={{ display: 'flex', height: 'calc(100vh - 200px)', minHeight: '500px', gap: '1rem' }}>
      {/* Palette Panel */}
      <div style={{
        width: '160px',
        flexShrink: 0,
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: '0.75rem',
        padding: '1rem 0.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {lang === 'th' ? 'รูปทรง' : 'Shapes'}
        </div>
        {PALETTE_ITEMS.map((item, idx) => (
          <div
            key={idx}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('nodeType', item.type);
              e.dataTransfer.setData('nodeData', JSON.stringify(item.data));
            }}
            style={{
              background: `rgba(${item.color === '#10b981' ? '16,185,129' : item.color === '#f43f5e' ? '244,63,94' : item.color === '#3b82f6' ? '59,130,246' : item.color === '#f59e0b' ? '245,158,11' : '147,51,234'}, 0.15)`,
              border: `1px solid ${item.color}50`,
              borderRadius: '0.5rem',
              padding: '0.5rem 0.6rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: item.color,
              cursor: 'grab',
              userSelect: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {item.label[lang]}
          </div>
        ))}

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--color-border-subtle)', margin: '0.25rem 0' }} />

        {/* Action buttons */}
        <button onClick={saveChart} className="btn-ghost" style={{ padding: '0.4rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'center' }}>
          <Save size={12} /> {lang === 'th' ? 'บันทึก' : 'Save'}
        </button>
        <button onClick={loadChart} className="btn-ghost" style={{ padding: '0.4rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'center' }}>
          <FolderOpen size={12} /> {lang === 'th' ? 'โหลด' : 'Load'}
        </button>
        <button onClick={clearAll} style={{
          background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)',
          borderRadius: '0.5rem', padding: '0.4rem 0.5rem', fontSize: '0.75rem',
          color: '#fb7185', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'center',
        }}>
          <Trash2 size={12} /> {lang === 'th' ? 'ล้าง' : 'Clear'}
        </button>
        <button onClick={() => setShowInstructions(!showInstructions)} style={{
          background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)',
          borderRadius: '0.5rem', padding: '0.4rem 0.5rem', fontSize: '0.75rem',
          color: '#a78bfa', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'center',
        }}>
          <Info size={12} /> {lang === 'th' ? 'วิธีใช้' : 'Help'}
        </button>
      </div>

      {/* Canvas + Property Panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {/* Instructions banner */}
        {showInstructions && (
          <div style={{
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            fontSize: '0.8rem',
            color: '#c4b5fd',
          }}>
            <div style={{ fontWeight: 600, marginBottom: '0.4rem' }}>💡 {lang === 'th' ? 'วิธีใช้' : 'Instructions'}</div>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <li>{lang === 'th' ? t.flowchart.inst1 : t.flowchart.inst1}</li>
              <li>{lang === 'th' ? t.flowchart.inst2 : t.flowchart.inst2}</li>
              <li>{lang === 'th' ? t.flowchart.inst3 : t.flowchart.inst3}</li>
              <li>{lang === 'th' ? t.flowchart.inst4 : t.flowchart.inst4}</li>
            </ul>
          </div>
        )}

        {/* Selected Node Editor */}
        {selectedNode && (
          <div style={{
            background: 'var(--color-bg-card)',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
              {lang === 'th' ? 'แก้ไขข้อความ:' : 'Edit label:'}
            </span>
            <input
              className="input-dark"
              value={editLabel}
              onChange={e => updateSelectedLabel(e.target.value)}
              placeholder={t.flowchart.label_placeholder}
              style={{ flex: 1 }}
              autoFocus
            />
            <button
              onClick={deleteSelected}
              style={{
                background: 'rgba(244,63,94,0.15)',
                border: '1px solid rgba(244,63,94,0.3)',
                borderRadius: '0.4rem',
                padding: '0.4rem 0.75rem',
                color: '#fb7185',
                cursor: 'pointer',
                fontSize: '0.8rem',
                display: 'flex', alignItems: 'center', gap: '0.3rem',
              }}
            >
              <Trash2 size={13} /> {lang === 'th' ? 'ลบ' : 'Delete'}
            </button>
          </div>
        )}

        {/* React Flow Canvas */}
        <div
          ref={reactFlowWrapper}
          style={{
            flex: 1,
            borderRadius: '0.75rem',
            overflow: 'hidden',
            border: '1px solid var(--color-border-subtle)',
          }}
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
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="rgba(255,255,255,0.05)" />
            <Controls />
            <MiniMap
              nodeColor={(n) => {
                const colorMap = { startEnd: '#10b981', process: '#3b82f6', decision: '#f59e0b', io: '#9333ea' };
                return colorMap[n.type] || '#7c3aed';
              }}
              style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.06)' }}
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
