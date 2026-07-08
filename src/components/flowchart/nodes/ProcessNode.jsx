// src/components/flowchart/nodes/ProcessNode.jsx
import { Handle, Position } from '@xyflow/react';

export default function ProcessNode({ data, selected }) {
  return (
    <div style={{
      background: '#1e1e2e',
      color: '#e2e8f0',
      borderRadius: '4px',
      padding: '0.6rem 1rem',
      fontSize: '0.85rem',
      fontWeight: 500,
      border: '2px solid #3b82f6',
      boxShadow: selected ? '0 0 0 2px rgba(255,255,255,0.8)' : 'none',
      cursor: 'grab',
      minWidth: '100px',
      textAlign: 'center',
      userSelect: 'none',
    }}>
      <Handle type="target" position={Position.Top} style={{ background: '#94a3b8', width: 6, height: 6, border: 'none' }} />
      {data.label}
      <Handle type="source" position={Position.Bottom} style={{ background: '#94a3b8', width: 6, height: 6, border: 'none' }} />
      <Handle type="source" position={Position.Right} id="right" style={{ background: '#94a3b8', width: 6, height: 6, border: 'none' }} />
      <Handle type="target" position={Position.Left} id="left" style={{ background: '#94a3b8', width: 6, height: 6, border: 'none' }} />
    </div>
  );
}
