import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen, Users, BookMarked, LayoutDashboard, LogOut, UserCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const memberLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/books',     icon: BookOpen,         label: 'Browse Books' },
  { to: '/my-books',  icon: BookMarked,       label: 'My Borrowed Books' },
  { to: '/profile',   icon: UserCircle,       label: 'Profile' },
];

const librarianLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/books',     icon: BookOpen,         label: 'Manage Books' },
  { to: '/members',   icon: Users,            label: 'Manage Members' },
  { to: '/profile',   icon: UserCircle,       label: 'Profile' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate  = useNavigate();

  const links = user?.role === 'librarian' ? librarianLinks : memberLinks;

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully.');
    navigate('/login');
  };

  const decorBooks = [
    { w: 18, h: 32 }, { w: 14, h: 25 }, { w: 20, h: 36 },
    { w: 12, h: 27 }, { w: 16, h: 33 }, { w: 22, h: 29 }, { w: 14, h: 35 },
  ];
  const decorColors = [
    'rgba(245,166,35,0.4)', 'rgba(255,255,255,0.1)', 'rgba(245,166,35,0.2)',
    'rgba(255,255,255,0.08)', 'rgba(245,166,35,0.3)', 'rgba(255,255,255,0.06)', 'rgba(245,166,35,0.15)',
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <img
          src="/LIBRIX_Logo.png"
          alt="Librix Logo"
          style={{
            width: "60px",
            height: "60px",
            objectFit: "contain",
            marginBottom: "10px"
          }}
        />
        <div className="sidebar-logo-mark">LIBRIX</div>
        <div className="sidebar-logo-sub">Modern Library Platform</div>
      </div>

      {/* Decorative mini-shelf */}
      <div style={{ padding: '14px 20px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end' }}>
          {decorBooks.map((b, i) => (
            <div key={i} style={{
              width: b.w, height: b.h,
              background: decorColors[i],
              borderRadius: '2px 2px 0 0',
              flexShrink: 0,
            }} />
          ))}
        </div>
        <div style={{
          height: '2px',
          background: 'rgba(255,255,255,0.12)',
          borderRadius: '1px',
          marginBottom: '12px',
        }} />
      </div>

      {/* Navigation */}
      <div className="sidebar-section-label">Navigation</div>
      <nav className="sidebar-nav">
        {links.map(({ to, icon: Icon, label }) => (
          <button
            key={to}
            className={`sidebar-link ${location.pathname === to ? 'active' : ''}`}
            onClick={() => navigate(to)}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{initials}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.name}</div>
            <div className="sidebar-user-role">
              {user?.role === "librarian" ? "Librarian" : "Member"}
            </div>
          </div>
        </div>
        <button
          className="sidebar-link"
          onClick={handleLogout}
          style={{ color: 'rgba(239,68,68,0.75)' }}
        >
          <LogOut size={15} />
          Log out
        </button>
      </div>
    </aside>
  );
}
