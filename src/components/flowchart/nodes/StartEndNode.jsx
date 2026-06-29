// src/components/flowchart/nodes/StartEndNode.jsx
import { Handle, Position } from '@xyflow/react';

export default function StartEndNode({ data, selected }) {
  const isStart = data.variant === 'start';
  return (
    <div style={{
      background: isStart ? 'linear-gradient(135deg, #059669, #10b981)' : 'linear-gradient(135deg, #be123c, #f43f5e)',
      color: 'white',
      borderRadius: '999px',
      padding: '0.5rem 1.25rem',
      fontWeight: 700,
      fontSize: '0.8rem',
      border: selected ? '2px solid white' : '2px solid transparent',
      boxShadow: isStart ? '0 0 15px rgba(16,185,129,0.4)' : '0 0 15px rgba(244,63,94,0.4)',
      cursor: 'grab',
      minWidth: '80px',
      textAlign: 'center',
      userSelect: 'none',
    }}>
      <Handle type="target" position={Position.Top} style={{ background: 'rgba(255,255,255,0.5)', width: 8, height: 8 }} />
      {data.label}
      <Handle type="source" position={Position.Bottom} style={{ background: 'rgba(255,255,255,0.5)', width: 8, height: 8 }} />
    </div>
  );
}
