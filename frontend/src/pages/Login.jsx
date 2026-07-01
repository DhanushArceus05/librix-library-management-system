import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const { login } = useAuth();
  const navigate  = useNavigate();

  const [form, setForm]       = useState({ email: '', password: '' });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email)    e.email    = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.password) e.password = 'Password is required.';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const books = [
    { w: 22, h: 110 }, { w: 16, h: 90 }, { w: 28, h: 130 }, { w: 18, h: 95 },
    { w: 24, h: 115 }, { w: 14, h: 80 }, { w: 20, h: 105 }, { w: 26, h: 120 },
    { w: 16, h: 88 },  { w: 22, h: 100 },
  ];
  const colors = [
    'rgba(245,166,35,0.5)', 'rgba(255,255,255,0.12)', 'rgba(245,166,35,0.3)',
    'rgba(255,255,255,0.08)', 'rgba(245,166,35,0.4)', 'rgba(255,255,255,0.15)',
    'rgba(245,166,35,0.2)', 'rgba(255,255,255,0.1)', 'rgba(245,166,35,0.35)',
    'rgba(255,255,255,0.09)',
  ];

  return (
    <div className="auth-shell">
      {/* Left panel */}
      <div className="auth-left">
        <div className="auth-brand">
          <span style={{ color: "var(--amber)" }}>Librix</span><br />
          Modern Library<br />
          Management
        </div>
        <p className="auth-tagline">
          Smart. Secure. Simple library management.
        </p>
        <div className="auth-shelf-decoration">
          {books.map((b, i) => (
            <div
              key={i}
              className="shelf-book"
              style={{ width: b.w, height: b.h, background: colors[i] }}
            />
          ))}
        </div>
        <div style={{
          height: '3px',
          background: 'rgba(245,166,35,0.4)',
          width: books.reduce((s, b) => s + b.w + 6, 0) - 6,
          borderRadius: '2px',
          marginTop: '2px',
        }} />
      </div>

      {/* Right panel */}
      <div className="auth-right">
        <div className="auth-form-box">
          <h2 className="auth-form-title">Welcome to Librix</h2>
          <p className="auth-form-sub">Sign in to access your library dashboard.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className={`form-input ${errors.email ? 'error' : ''}`}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoFocus
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className={`form-input ${errors.password ? 'error' : ''}`}
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {errors.password && <p className="form-error">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-primary-full"
              disabled={loading}
              style={{ marginTop: '8px' }}
            >
              {loading ? <span className="spinner" style={{ borderTopColor: '#0F1729' }} /> : 'Sign in'}
            </button>
          </form>

          <div className="auth-switch">
            Don't have an account?{' '}
            <button onClick={() => navigate('/register')}>Create one</button>
          </div>

          {/* Hint for demo */}
          <div style={{
            marginTop: '28px',
            padding: '14px 16px',
            background: 'var(--amber-pale)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid #F5D48A',
          }}>
            <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--amber-dark)', marginBottom: '6px' }}>
              Demo Account
            </p>
            <p style={{ fontSize: '12px', color: 'var(--ink-mid)', lineHeight: 1.6 }}>
              <strong>Administrator</strong><br />
              Email: librarian@library.com<br />
              Password: LibrixDemo@2026
              <hr style={{ margin: "10px 0", border: "none", borderTop: "1px solid #F5D48A" }} />
              Create a member account using the <strong>Register</strong> page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
