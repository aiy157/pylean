// src/components/flowchart/nodes/IONode.jsx
import { Handle, Position } from '@xyflow/react';

export default function IONode({ data, selected }) {
  return (
    <div style={{ position: 'relative', width: 120, height: 40 }}>
      {/* Parallelogram SVG */}
      <svg width="120" height="40" style={{ position: 'absolute', top: 0, left: 0 }}>
        <polygon
          points="15,2 118,2 105,38 2,38"
          fill="#1e1e2e"
          stroke={selected ? 'white' : '#9333ea'}
          strokeWidth={selected ? "3" : "2"}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.85rem', fontWeight: 500, color: '#e2e8f0',
        textAlign: 'center', padding: '0 0.5rem',
        userSelect: 'none',
        cursor: 'grab',
      }}>
        {data.label}
      </div>
      <Handle type="target" position={Position.Top} style={{ background: '#94a3b8', width: 6, height: 6, border: 'none' }} />
      <Handle type="source" position={Position.Bottom} style={{ background: '#94a3b8', width: 6, height: 6, border: 'none' }} />
    </div>
  );
}
