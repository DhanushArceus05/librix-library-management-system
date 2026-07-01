import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookX } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--shelf-night)', padding: 32,
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: 20,
        background: 'rgba(245,166,35,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24, color: 'var(--amber)',
      }}>
        <BookX size={38} />
      </div>
      <h1 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 72, fontWeight: 700, color: 'var(--amber)',
        lineHeight: 1, marginBottom: 8,
      }}>404</h1>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 10 }}>
        Page not found
      </h2>
      <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', marginBottom: 32, textAlign: 'center', maxWidth: 360 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
        Go to dashboard
      </button>
    </div>
  );
}
