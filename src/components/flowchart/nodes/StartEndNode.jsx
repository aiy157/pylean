// src/components/flowchart/nodes/StartEndNode.jsx
import { Handle, Position } from '@xyflow/react';

export default function StartEndNode({ data, selected }) {
  const isStart = data.variant === 'start';
  return (
    <div style={{
      background: '#1e1e2e',
      color: '#e2e8f0',
      borderRadius: '999px',
      padding: '0.5rem 1.25rem',
      fontWeight: 500,
      fontSize: '0.85rem',
      border: `2px solid ${isStart ? '#10b981' : '#f43f5e'}`,
      boxShadow: selected ? '0 0 0 2px rgba(255,255,255,0.8)' : 'none',
      cursor: 'grab',
      minWidth: '90px',
      textAlign: 'center',
      userSelect: 'none',
    }}>
      <Handle type="target" position={Position.Top} style={{ background: '#94a3b8', width: 6, height: 6, border: 'none' }} />
      {data.label}
      <Handle type="source" position={Position.Bottom} style={{ background: '#94a3b8', width: 6, height: 6, border: 'none' }} />
    </div>
  );
}
