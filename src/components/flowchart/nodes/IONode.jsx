// src/components/flowchart/nodes/IONode.jsx
import { Handle, Position } from '@xyflow/react';

export default function IONode({ data, selected }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #6b21a8, #9333ea)',
      color: 'white',
      padding: '0.6rem 1.2rem',
      fontSize: '0.8rem',
      border: selected ? '2px solid white' : '2px solid transparent',
      boxShadow: '0 0 15px rgba(147,51,234,0.3)',
      cursor: 'grab',
      minWidth: '100px',
      textAlign: 'center',
      userSelect: 'none',
      // Parallelogram shape via clip-path
      clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
    }}>
      <Handle type="target" position={Position.Top} style={{ background: 'rgba(255,255,255,0.5)', width: 8, height: 8 }} />
      {data.label}
      <Handle type="source" position={Position.Bottom} style={{ background: 'rgba(255,255,255,0.5)', width: 8, height: 8 }} />
    </div>
  );
}
