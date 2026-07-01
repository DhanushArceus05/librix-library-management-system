import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, BookMarked, TrendingUp } from 'lucide-react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { booksAPI, membersAPI } from '../api/client';

function StatCard({ label, value, icon: Icon, accent }) {
  return (
    <div className="stat-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span className="stat-label">{label}</span>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: accent ? 'var(--amber-pale)' : 'var(--off-white)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: accent ? 'var(--amber-dark)' : 'var(--ink-light)',
        }}>
          <Icon size={18} />
        </div>
      </div>
      <div className={`stat-value ${accent ? 'amber' : ''}`}>{value ?? '—'}</div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [stats, setStats]   = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        if (user?.role === 'librarian') {
          const [booksRes, membersRes] = await Promise.all([
            booksAPI.getAll({ limit: 1 }),
            membersAPI.getAll({ limit: 1 }),
          ]);
          setStats({
            totalBooks:   booksRes.data.meta?.total ?? 0,
            totalMembers: membersRes.data.meta?.total ?? 0,
          });
        } else {
          const [booksRes, myBooksRes] = await Promise.all([
            booksAPI.getAll({ limit: 1 }),
            membersAPI.getMyBooks(),
          ]);
          setStats({
            totalBooks:    booksRes.data.meta?.total ?? 0,
            currentBorrow: myBooksRes.data.data?.borrows?.length ?? 0,
          });
        }
      } catch (_) {}
      setLoading(false);
    };
    if (user) load();
  }, [user]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <Layout title="Librix Dashboard">
      {/* Welcome banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--shelf-night) 0%, var(--shelf-mid) 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px 32px',
        marginBottom: 28,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative shelf books */}
        <div style={{
          position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)',
          display: 'flex', gap: 5, alignItems: 'flex-end', opacity: 0.25,
        }}>
          {[60,45,70,50,65,42,58].map((h, i) => (
            <div key={i} style={{
              width: [16,12,18,14,20,12,16][i], height: h,
              background: 'var(--amber)',
              borderRadius: '2px 2px 0 0',
            }} />
          ))}
        </div>
        <img
          src="/LIBRIX_Logo.png"
          alt="Librix"
          style={{
            width: "56px",
            height: "56px",
            objectFit: "contain",
            marginBottom: "14px",
          }}
        />
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>{greeting},</p>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
          {user?.name}
        </h2>
        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.65)",
            marginTop: 6,
          }}
        >
          Welcome to <strong>Librix</strong> — your modern library management platform.
        </p>
      </div>

      {/* Stats */}
      {!loading && (
        <div className="stats-grid">
          {user?.role === 'librarian' ? (
            <>
              <StatCard label="Total Books"   value={stats.totalBooks}   icon={BookOpen} accent />
              <StatCard label="Total Members" value={stats.totalMembers} icon={Users} />
            </>
          ) : (
            <>
              <StatCard label="Books Available" value={stats.totalBooks}    icon={BookOpen} accent />
              <StatCard label="Currently Borrowed" value={stats.currentBorrow} icon={BookMarked} />
            </>
          )}
        </div>
      )}

      {/* Workspace */}
      <div style={{ marginBottom: 12 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
          Your Workspace
        </h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => navigate('/books')}>
            <BookOpen size={15} />
            {user?.role === 'librarian' ? 'Manage Books' : 'Browse Books'}
          </button>
          {user?.role === 'member' && (
            <button className="btn btn-secondary" onClick={() => navigate('/my-books')}>
              <BookMarked size={15} />
              My Borrowed Books
            </button>
          )}
          {user?.role === 'librarian' && (
            <button className="btn btn-secondary" onClick={() => navigate('/members')}>
              <Users size={15} />
              View Members
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
