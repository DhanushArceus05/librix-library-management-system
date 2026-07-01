import React, { useEffect, useState, useCallback } from 'react';
import { BookMarked, RefreshCw, Calendar, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout';
import { membersAPI, booksAPI } from '../api/client';
import toast from 'react-hot-toast';

export default function MyBooks() {
  const [borrows, setBorrows]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [returning, setReturning] = useState(null);

  const fetchMyBooks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await membersAPI.getMyBooks();
      setBorrows(res.data.data.borrows ?? []);
    } catch {
      toast.error('Unable to load your borrowed books.');
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchMyBooks(); }, [fetchMyBooks]);

  const handleReturn = async (borrow) => {
    const bookId = borrow.bookId?._id;
    if (!bookId) return;
    setReturning(bookId);
    try {
      await booksAPI.return(bookId);
      toast.success(`"${borrow.bookId?.title}" returned successfully.`);
      fetchMyBooks();
    } catch (err) {
      toast.error(err.response?.data?.message ?? 'Failed to return book.');
    }
    setReturning(null);
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const daysSince = (d) => {
    const diff = Date.now() - new Date(d).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <Layout title="My Librix Collection">
      {loading ? (
        <div className="loading-screen">
          <div className="spinner spinner-lg" />
          <span>Loading your Librix collection…</span>
        </div>
      ) : borrows.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"><BookMarked size={28} /></div>
          <h3>No borrowed books yet.</h3>
          <p>Browse the Librix collection and borrow your first book.</p>
          <a href="/books" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Explore Librix
          </a>
        </div>
      ) : (
        <>
          <p style={{ fontSize: 13.5, color: 'var(--ink-light)', marginBottom: 20 }}>
            You currently have <strong style={{ color: 'var(--ink)' }}>{borrows.length}</strong> active borrowed book{borrows.length !== 1 ? 's' : ''} in your Librix account.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {borrows.map((b) => {
              const book = b.bookId ?? {};
              const days = daysSince(b.borrowDate);
              const isReturning = returning === book._id;
              return (
                <div key={b._id} className="card" style={{ overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'stretch' }}>
                    {/* Amber spine */}
                    <div style={{
                      width: 5, background: 'var(--amber)', flexShrink: 0, borderRadius: '0 0 0 0',
                    }} />
                    <div style={{
                      flex: 1, padding: '18px 22px',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      gap: 16, flexWrap: 'wrap',
                    }}>
                      {/* Book info */}
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <span style={{
                          display: 'inline-block', fontSize: 10.5, fontWeight: 600,
                          letterSpacing: '0.8px', textTransform: 'uppercase',
                          color: 'var(--amber-dark)', background: 'var(--amber-pale)',
                          padding: '2px 8px', borderRadius: 99, marginBottom: 6,
                        }}>
                          {book.category ?? 'General'}
                        </span>
                        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 3 }}>
                          {book.title ?? 'Unknown Book'}
                        </div>
                        <div style={{ fontSize: 13.5, color: 'var(--ink-light)' }}>
                          by {book.author ?? '—'}
                        </div>
                      </div>

                      {/* Borrow dates */}
                      <div style={{
                        display: 'flex', flexDirection: 'column', gap: 6,
                        fontSize: 13, color: 'var(--ink-light)', minWidth: 160,
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <Calendar size={13} />
                          Borrowed {formatDate(b.borrowDate)}
                        </span>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          fontSize: 12, fontWeight: 600,
                          color: days > 14 ? 'var(--error)' : days > 7 ? 'var(--warning)' : 'var(--success)',
                          background: days > 14 ? 'var(--error-pale)' : days > 7 ? '#FFFBEB' : 'var(--success-pale)',
                          padding: '3px 10px', borderRadius: 99, width: 'fit-content',
                        }}>
                          <CheckCircle size={12} />
                          {days === 0 ? 'Borrowed Today' : `${days} day${days !== 1 ? 's' : ''} ago`}
                        </span>
                      </div>

                      {/* Return button */}
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleReturn(b)}
                        disabled={isReturning}
                        style={{ flexShrink: 0 }}
                      >
                        {isReturning
                          ? <span className="spinner" />
                          : <><RefreshCw size={14} /> Return Book</>
                        }
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </Layout>
  );
}
