import React, { useEffect, useState, useCallback } from 'react';
import {
  Users,
  Trash2,
  Search,
  XCircle,
  Mail,
  Calendar,
  Eye,
  BookOpen,
  CheckCircle,
  RefreshCw,
} from 'lucide-react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { membersAPI } from '../api/client';
import toast from 'react-hot-toast';

function ConfirmDelete({ member, onConfirm, onCancel, loading }) {
  return (
    <div>
      <div className="confirm-icon"><Trash2 size={22} /></div>

      <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
        Delete "{member?.name}"?
      </p>

      <p style={{ fontSize: 13.5, color: 'var(--ink-light)', lineHeight: 1.5 }}>
        This member will be permanently removed from Librix. Members with active borrowed books cannot be deleted.
      </p>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button className="btn btn-danger" onClick={onConfirm} disabled={loading}>
          {loading
            ? <span className="spinner" style={{ borderTopColor: 'var(--error)' }} />
            : 'Remove Member'}
        </button>
      </div>
    </div>
  );
}

export default function Members() {
  const [members, setMembers] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [historyTarget, setHistoryTarget] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(false);

  const fetchMembers = useCallback(async () => {
    setLoading(true);

    try {
      const res = await membersAPI.getAll({ page, limit: 15 });
      setMembers(res.data.data.members);
      setMeta(res.data.meta ?? {});
    } catch {
      toast.error('Unable to load Librix members.');
    }

    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleViewHistory = async (member) => {
    setHistoryTarget(member);
    setHistoryData(null);
    setHistoryLoading(true);

    try {
      const res = await membersAPI.getBorrowedBooks(member._id);
      setHistoryData(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message ?? 'Unable to load member borrow history.');
    }

    setHistoryLoading(false);
  };

  const handleDelete = async () => {
    setDeleting(true);

    try {
      await membersAPI.delete(deleteTarget._id);
      toast.success('Member removed successfully.');
      setDeleteTarget(null);
      fetchMembers();
    } catch (err) {
      toast.error(err.response?.data?.message ?? 'Failed to remove member.');
    }

    setDeleting(false);
  };

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : '—';

  const filtered = members.filter((m) =>
    !searchInput ||
    m.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    m.email.toLowerCase().includes(searchInput.toLowerCase())
  );

  const totalPages = meta.totalPages ?? 1;

  return (
    <Layout title="Librix Members">
      <div className="filter-bar">
        <div className="search-wrap">
          <Search size={15} />
          <input
            className="search-input"
            placeholder="Search members by name or email..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        {searchInput && (
          <button className="btn btn-ghost" onClick={() => setSearchInput('')}>
            <XCircle size={15} /> Clear
          </button>
        )}

        <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--ink-light)' }}>
          {meta.total ?? 0} Registered Member{meta.total !== 1 ? 's' : ''}
        </span>
      </div>

      {loading ? (
        <div className="loading-screen">
          <div className="spinner spinner-lg" />
          <span>Loading Librix members...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"><Users size={28} /></div>
          <h3>{searchInput ? 'No members match your search.' : 'No registered members.'}</h3>
          <p>New Librix users will appear here after creating an account.</p>
        </div>
      ) : (
        <>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Member Name</th>
                  <th>Email</th>
                  <th>Joined On</th>
                  <th style={{ width: 150 }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((m) => (
                  <tr key={m._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            background: 'var(--amber-pale)',
                            color: 'var(--amber-dark)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: 13,
                            flexShrink: 0,
                          }}
                        >
                          {m.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>

                        <span style={{ fontWeight: 600 }}>{m.name}</span>
                      </div>
                    </td>

                    <td>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          color: 'var(--ink-mid)',
                        }}
                      >
                        <Mail size={13} /> {m.email}
                      </span>
                    </td>

                    <td>
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          color: 'var(--ink-light)',
                          fontSize: 13,
                        }}
                      >
                        <Calendar size={13} /> {formatDate(m.createdAt)}
                      </span>
                    </td>

                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleViewHistory(m)}
                          title="View borrowed books"
                        >
                          <Eye size={13} />
                          View
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setDeleteTarget(m)}
                          title="Delete member"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <span className="pagination-info">
                Page {meta.page} of {totalPages}
              </span>

              <div className="pagination-controls">
                <button
                  className="page-btn"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  ‹
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    className={`page-btn ${p === page ? 'active' : ''}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}

                <button
                  className="page-btn"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Confirm deletion"
      >
        {deleteTarget && (
          <ConfirmDelete
            member={deleteTarget}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
            loading={deleting}
          />
        )}
      </Modal>

      <Modal
        open={!!historyTarget}
        onClose={() => {
          setHistoryTarget(null);
          setHistoryData(null);
        }}
        title="Member Borrow History"
      >
        {historyLoading ? (
          <div className="loading-screen" style={{ minHeight: 180 }}>
            <div className="spinner spinner-lg" />
            <span>Loading borrowed books...</span>
          </div>
        ) : historyData ? (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 20,
                paddingBottom: 16,
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  background: 'var(--amber-pale)',
                  color: 'var(--amber-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 15,
                  flexShrink: 0,
                }}
              >
                {historyData.member?.name
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>
                  {historyData.member?.name}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13,
                    color: 'var(--ink-light)',
                    marginTop: 3,
                  }}
                >
                  <Mail size={13} />
                  {historyData.member?.email}
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 10,
                marginBottom: 20,
              }}
            >
              <div className="stat-card" style={{ padding: 14 }}>
                <div className="stat-label">Total Records</div>
                <div className="stat-value" style={{ fontSize: 22 }}>
                  {historyData.summary?.totalBorrowedRecords ?? 0}
                </div>
              </div>

              <div className="stat-card" style={{ padding: 14 }}>
                <div className="stat-label">Currently Borrowed</div>
                <div className="stat-value amber" style={{ fontSize: 22 }}>
                  {historyData.summary?.currentlyBorrowed ?? 0}
                </div>
              </div>

              <div className="stat-card" style={{ padding: 14 }}>
                <div className="stat-label">Returned</div>
                <div className="stat-value" style={{ fontSize: 22 }}>
                  {historyData.summary?.returnedBooks ?? 0}
                </div>
              </div>
            </div>

            {!historyData.borrows?.length ? (
              <div className="empty-state" style={{ padding: '28px 18px' }}>
                <div className="empty-state-icon">
                  <BookOpen size={24} />
                </div>
                <h3>No borrow history yet.</h3>
                <p>This member has not borrowed any books from Librix.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {historyData.borrows.map((borrow) => {
                  const book = borrow.bookId ?? {};
                  const isBorrowed = borrow.status === 'borrowed';

                  return (
                    <div key={borrow._id} className="card" style={{ padding: 14 }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: 14,
                          alignItems: 'flex-start',
                        }}
                      >
                        <div>
                          <span className="book-category">
                            {book.category ?? 'General'}
                          </span>

                          <div
                            style={{
                              fontSize: 15,
                              fontWeight: 700,
                              color: 'var(--ink)',
                              marginTop: 6,
                            }}
                          >
                            {book.title ?? 'Untitled Book'}
                          </div>

                          <div
                            style={{
                              fontSize: 13,
                              color: 'var(--ink-light)',
                              marginTop: 3,
                            }}
                          >
                            by {book.author ?? '—'}
                          </div>

                          <div
                            style={{
                              fontSize: 12,
                              color: 'var(--ink-light)',
                              marginTop: 6,
                            }}
                          >
                            Quantity: 1
                          </div>
                        </div>

                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '4px 10px',
                            borderRadius: 99,
                            fontSize: 12,
                            fontWeight: 700,
                            color: isBorrowed ? 'var(--amber-dark)' : 'var(--success)',
                            background: isBorrowed
                              ? 'var(--amber-pale)'
                              : 'var(--success-pale)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {isBorrowed ? <RefreshCw size={12} /> : <CheckCircle size={12} />}
                          {isBorrowed ? 'Borrowed' : 'Returned'}
                        </span>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          gap: 16,
                          flexWrap: 'wrap',
                          marginTop: 12,
                          paddingTop: 10,
                          borderTop: '1px solid var(--border)',
                          fontSize: 12.5,
                          color: 'var(--ink-light)',
                        }}
                      >
                        <span>Borrowed: {formatDate(borrow.borrowDate)}</span>

                        {borrow.returnDate && (
                          <span>Returned: {formatDate(borrow.returnDate)}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : null}
      </Modal>
    </Layout>
  );
}