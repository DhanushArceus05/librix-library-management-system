import React from 'react';
import { User, Mail, Shield, Calendar } from 'lucide-react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  const initials = user.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
    }) : '—';

  return (
    <Layout title="Librix Profile">
      <div style={{ maxWidth: 560 }}>
        {/* Avatar + name banner */}
        <div style={{
          background: 'linear-gradient(135deg, var(--shelf-night) 0%, var(--shelf-mid) 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          marginBottom: 24,
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--amber)',
            color: 'var(--shelf-night)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, fontWeight: 800, flexShrink: 0,
          }}>
            {initials}
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
              {user.name}
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: user.role === 'librarian' ? 'rgba(245,166,35,0.2)' : 'rgba(255,255,255,0.1)',
              color: user.role === 'librarian' ? 'var(--amber)' : 'rgba(255,255,255,0.7)',
              padding: '4px 12px', borderRadius: 99,
              fontSize: 12, fontWeight: 600, textTransform: 'capitalize',
            }}>
              <Shield size={12} />
              {user.role === 'librarian' ? 'Librix Librarian' : 'Librix Member'}
            </div>
          </div>
        </div>

        {/* Info card */}
        <div className="card">
          <div className="card-body">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Librix Account details
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { icon: User,     label: 'Full Name', value: user.name },
                { icon: Mail,     label: 'Email',     value: user.email },
                { icon: Shield,   label: 'Account Type',      value: user.role, capitalize: true },
                { icon: Calendar, label: 'Joined Librix', value: formatDate(user.createdAt) },
              ].map(({ icon: Icon, label, value, capitalize }, i, arr) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '14px 0',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'var(--off-white)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--ink-light)', flexShrink: 0,
                  }}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11.5, color: 'var(--ink-light)', fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>
                      {label}
                    </div>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)',
                      textTransform: capitalize ? 'capitalize' : 'none' }}>
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p style={{ marginTop: 16, fontSize: 13, color: 'var(--ink-light)', lineHeight: 1.5 }}>
          Your Librix account information is managed by the system administrator. Contact your librarian if you need to update your account details.
        </p>
      </div>
    </Layout>
  );
}
