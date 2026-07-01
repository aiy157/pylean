// src/components/ErrorBoundary.jsx
// Catches any render-time error in child components and shows a friendly fallback UI
// instead of a blank white page.
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[PyLearn | ErrorBoundary] Uncaught error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          color: 'var(--color-text-primary)',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: '0.5rem' }}>
            เกิดข้อผิดพลาดที่ไม่คาดคิด
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', maxWidth: 400, marginBottom: '1.5rem' }}>
            {this.state.error?.message || 'Something went wrong. Please refresh the page.'}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.6rem 1.25rem',
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                color: '#fff', border: 'none', borderRadius: '0.625rem',
                fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem',
              }}
            >
              🔄 โหลดหน้าใหม่
            </button>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); }}
              style={{
                padding: '0.6rem 1.25rem',
                background: 'rgba(255,255,255,0.07)',
                color: 'var(--color-text-primary)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.625rem',
                fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem',
              }}
            >
              ลองใหม่
            </button>
          </div>
          {/* Dev info */}
          {import.meta.env.DEV && (
            <pre style={{
              marginTop: '1.5rem', padding: '1rem',
              background: 'rgba(244,63,94,0.08)',
              border: '1px solid rgba(244,63,94,0.2)',
              borderRadius: '0.5rem',
              fontSize: '0.72rem', color: '#fb7185',
              maxWidth: 600, overflow: 'auto', textAlign: 'left',
            }}>
              {this.state.error?.stack}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
