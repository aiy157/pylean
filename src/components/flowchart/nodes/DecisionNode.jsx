// src/components/flowchart/nodes/DecisionNode.jsx
import { Handle, Position } from '@xyflow/react';

export default function DecisionNode({ data, selected }) {
  return (
    <div style={{ position: 'relative', width: 120, height: 60 }}>
      {/* Diamond SVG */}
      <svg width="120" height="60" style={{ position: 'absolute', top: 0, left: 0 }}>
        <polygon
          points="60,2 118,30 60,58 2,30"
          fill="#1e1e2e"
          stroke={selected ? 'white' : '#f59e0b'}
          strokeWidth={selected ? "3" : "2"}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.8rem', fontWeight: 500, color: '#e2e8f0',
        textAlign: 'center', padding: '0 1rem',
        userSelect: 'none',
        cursor: 'grab',
      }}>
        {data.label}
      </div>
      <Handle type="target" position={Position.Top} style={{ background: '#94a3b8', top: 0, width: 6, height: 6, border: 'none' }} />
      <Handle type="source" position={Position.Bottom} id="yes" style={{ background: '#10b981', bottom: 0, width: 6, height: 6, border: 'none' }} />
      <Handle type="source" position={Position.Right} id="no" style={{ background: '#f43f5e', right: 0, width: 6, height: 6, border: 'none' }} />
      <Handle type="target" position={Position.Left} style={{ background: '#94a3b8', left: 0, width: 6, height: 6, border: 'none' }} />
    </div>
  );
}
