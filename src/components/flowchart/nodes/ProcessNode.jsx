// src/components/flowchart/nodes/ProcessNode.jsx
import { Handle, Position } from '@xyflow/react';

export default function ProcessNode({ data, selected }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
      color: 'white',
      borderRadius: '0.4rem',
      padding: '0.6rem 1rem',
      fontSize: '0.8rem',
      border: selected ? '2px solid white' : '2px solid transparent',
      boxShadow: '0 0 15px rgba(59,130,246,0.25)',
      cursor: 'grab',
      minWidth: '100px',
      textAlign: 'center',
      userSelect: 'none',
    }}>
      <Handle type="target" position={Position.Top} style={{ background: 'rgba(255,255,255,0.5)', width: 8, height: 8 }} />
      {data.label}
      <Handle type="source" position={Position.Bottom} style={{ background: 'rgba(255,255,255,0.5)', width: 8, height: 8 }} />
      <Handle type="source" position={Position.Right} id="right" style={{ background: 'rgba(255,255,255,0.5)', width: 8, height: 8 }} />
      <Handle type="target" position={Position.Left} id="left" style={{ background: 'rgba(255,255,255,0.5)', width: 8, height: 8 }} />
    </div>
  );
}
