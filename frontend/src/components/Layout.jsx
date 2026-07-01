import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ title, actions, children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <header className="topbar">
          <h1 className="topbar-title">{title}</h1>
          {actions && <div className="topbar-actions">{actions}</div>}
        </header>
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}
