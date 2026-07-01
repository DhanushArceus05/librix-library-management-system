import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm]       = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = 'Name must be at least 2 characters.';
    if (!form.email) e.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters.';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match.';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    try {
      await register(form.name.trim(), form.email, form.password);
      toast.success('Account created! Please sign in.');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="auth-shell">
      <div className="auth-left">
        <div className="auth-brand">
          Join the<br /><span>library</span><br />community.
        </div>
        <p className="auth-tagline">
          Create an account to browse the collection, borrow books, and track your reading.
        </p>
        <div className="auth-shelf-decoration">
          {[28,16,22,18,24,14,20,26,16,22].map((w, i) => (
            <div key={i} className="shelf-book" style={{
              width: w,
              height: [110,90,130,95,115,80,105,120,88,100][i],
              background: ['rgba(245,166,35,0.5)','rgba(255,255,255,0.12)','rgba(245,166,35,0.3)',
                'rgba(255,255,255,0.08)','rgba(245,166,35,0.4)','rgba(255,255,255,0.15)',
                'rgba(245,166,35,0.2)','rgba(255,255,255,0.1)','rgba(245,166,35,0.35)',
                'rgba(255,255,255,0.09)'][i],
            }} />
          ))}
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-box">
          <h2 className="auth-form-title">Create account</h2>
          <p className="auth-form-sub">Members can browse and borrow books.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label">Full name</label>
              <input
                className={`form-input ${errors.name ? 'error' : ''}`}
                type="text"
                placeholder="Rohith Kumar"
                value={form.name}
                onChange={set('name')}
                autoFocus
              />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className={`form-input ${errors.email ? 'error' : ''}`}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={set('email')}
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  type="password"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={set('password')}
                />
                {errors.password && <p className="form-error">{errors.password}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">Confirm password</label>
                <input
                  className={`form-input ${errors.confirm ? 'error' : ''}`}
                  type="password"
                  placeholder="Repeat password"
                  value={form.confirm}
                  onChange={set('confirm')}
                />
                {errors.confirm && <p className="form-error">{errors.confirm}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-primary-full"
              disabled={loading}
              style={{ marginTop: '8px' }}
            >
              {loading ? <span className="spinner" style={{ borderTopColor: '#0F1729' }} /> : 'Create account'}
            </button>
          </form>

          <div className="auth-switch">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')}>Sign in</button>
          </div>
        </div>
      </div>
    </div>
  );
}
