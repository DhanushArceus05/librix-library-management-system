import React, { useEffect, useState, useCallback } from 'react';
import {
  BookOpen, Plus, Search, Edit2, Trash2,
  XCircle, RefreshCw,
} from 'lucide-react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { booksAPI, membersAPI } from '../api/client';
import toast from 'react-hot-toast';

// ─── Book Form (Add / Edit) ────────────────────────────────────────────────
function BookForm({ initial = {}, onSave, onCancel, loading }) {
  const [form, setForm] = useState({
    title:    initial.title    ?? '',
    author:   initial.author   ?? '',
    isbn:     initial.isbn     ?? '',
    category: initial.category ?? '',
    quantity: initial.quantity ?? '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.title.trim())    e.title    = 'Title is required.';
    if (!form.author.trim())   e.author   = 'Author is required.';
    if (!form.isbn.trim())     e.isbn     = 'ISBN is required.';
    if (!form.category.trim()) e.category = 'Category is required.';
    const qty = Number(form.quantity);
    if (form.quantity === '' || isNaN(qty) || qty < 0 || !Number.isInteger(qty))
      e.quantity = 'Quantity must be a non-negative whole number.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave({ ...form, quantity: Number(form.quantity) });
  };

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input className={`form-input ${errors.title ? 'error' : ''}`}
            value={form.title} onChange={set('title')} placeholder="Clean Code" />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Author</label>
          <input className={`form-input ${errors.author ? 'error' : ''}`}
            value={form.author} onChange={set('author')} placeholder="Robert C. Martin" />
          {errors.author && <p className="form-error">{errors.author}</p>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">ISBN</label>
          <input className={`form-input ${errors.isbn ? 'error' : ''}`}
            value={form.isbn} onChange={set('isbn')} placeholder="978-0132350884" />
          {errors.isbn && <p className="form-error">{errors.isbn}</p>}
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <input className={`form-input ${errors.category ? 'error' : ''}`}
            value={form.category} onChange={set('category')} placeholder="Programming" />
          {errors.category && <p className="form-error">{errors.category}</p>}
        </div>
      </div>
      <div className="form-group" style={{ maxWidth: 160 }}>
        <label className="form-label">Quantity</label>
        <input className={`form-input ${errors.quantity ? 'error' : ''}`}
          type="number" min="0" value={form.quantity} onChange={set('quantity')}
          placeholder="5" />
        {errors.quantity && <p className="form-error">{errors.quantity}</p>}
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading
            ? <span className="spinner" style={{ borderTopColor: '#0F1729' }} />
            : initial._id ? 'Save changes' : 'Add book'}
        </button>
      </div>
    </form>
  );
}

// ─── Confirm Delete Dialog ─────────────────────────────────────────────────
function ConfirmDelete({ book, onConfirm, onCancel, loading }) {
  return (
    <div>
      <div className="confirm-icon"><Trash2 size={22} /></div>
      <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
        Delete "{book?.title}"?
      </p>
      <p style={{ fontSize: 13.5, color: 'var(--ink-light)', lineHeight: 1.5 }}>
        This action cannot be undone. The book will be permanently removed from the library.
      </p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button className="btn btn-danger" onClick={onConfirm} disabled={loading}>
          {loading ? <span className="spinner" style={{ borderTopColor: 'var(--error)' }} /> : 'Delete book'}
        </button>
      </div>
    </div>
  );
}

// ─── Single Book Card ──────────────────────────────────────────────────────
function BookCard({ book, role, onBorrow, onReturn, onEdit, onDelete, borrowedIds }) {
  const available  = book.availableQuantity > 0;
  const isBorrowed = borrowedIds?.has(book._id);

  return (
    <div className="book-card">
      <div className="book-card-spine" />
      <div className="book-card-body">
        <span className="book-category">{book.category}</span>
        <div className="book-title">{book.title}</div>
        <div className="book-author">by {book.author}</div>
        <div className="book-isbn">{book.isbn}</div>
        <div className="book-availability">
          <span className={`availability-badge ${available ? 'available' : 'unavailable'}`}>
            <span className="availability-dot" />
            {available
              ? `${book.availableQuantity} of ${book.quantity} available`
              : 'Unavailable'}
          </span>
        </div>
      </div>
      <div className="book-card-actions">
        {role === 'member' && (
          isBorrowed
            ? <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}
                onClick={() => onReturn(book)}>
                <RefreshCw size={13} /> Return
              </button>
            : <button
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
                disabled={!available}
                onClick={() => onBorrow(book)}>
                <BookOpen size={13} />
                {available ? 'Borrow' : 'Unavailable'}
              </button>
        )}
        {role === 'librarian' && (
          <>
            <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => onEdit(book)}>
              <Edit2 size={13} /> Edit
            </button>
            <button className="btn btn-danger btn-sm" style={{ flex: 1 }} onClick={() => onDelete(book)}>
              <Trash2 size={13} /> Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main Books Page ───────────────────────────────────────────────────────
export default function Books() {
  const { user } = useAuth();
  const role     = user?.role;

  const [books, setBooks]         = useState([]);
  const [meta, setMeta]           = useState({});
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [category, setCategory]   = useState('');
  const [page, setPage]           = useState(1);
  const [categories, setCategories] = useState([]);
  const [borrowedIds, setBorrowedIds] = useState(new Set());

  // Modals
  const [addOpen, setAddOpen]         = useState(false);
  const [editBook, setEditBook]       = useState(null);
  const [deleteBook, setDeleteBook]   = useState(null);
  const [saving, setSaving]           = useState(false);
  const [deleting, setDeleting]       = useState(false);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12 };
      if (search)   params.search   = search;
      if (category) params.category = category;
      const res = await booksAPI.getAll(params);
      setBooks(res.data.data.books);
      setMeta(res.data.meta ?? {});
      // Collect unique categories from all results on first load
      if (!search && !category && page === 1) {
        const cats = [...new Set(res.data.data.books.map((b) => b.category).filter(Boolean))];
        setCategories((prev) => [...new Set([...prev, ...cats])]);
      }
    } catch {
      toast.error('Failed to load books.');
    }
    setLoading(false);
  }, [page, search, category]);

  // Fetch member's borrowed books to show return button
  const fetchMyBorrowed = useCallback(async () => {
    if (role !== 'member') return;
    try {
      const res = await membersAPI.getMyBooks();
      const ids = new Set(res.data.data.borrows.map((b) => b.bookId?._id));
      setBorrowedIds(ids);
    } catch {}
  }, [role]);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);
  useEffect(() => { fetchMyBorrowed(); }, [fetchMyBorrowed]);

  // Debounce search
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    const t = setTimeout(() => { setSearch(searchInput); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  // ── Handlers ──
  const handleAdd = async (data) => {
    setSaving(true);
    try {
      await booksAPI.create(data);
      toast.success('Book added successfully.');
      setAddOpen(false);
      fetchBooks();
    } catch (err) {
      toast.error(err.response?.data?.message ?? 'Failed to add book.');
    }
    setSaving(false);
  };

  const handleEdit = async (data) => {
    setSaving(true);
    try {
      await booksAPI.update(editBook._id, data);
      toast.success('Book updated successfully.');
      setEditBook(null);
      fetchBooks();
    } catch (err) {
      toast.error(err.response?.data?.message ?? 'Failed to update book.');
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await booksAPI.delete(deleteBook._id);
      toast.success('Book deleted.');
      setDeleteBook(null);
      fetchBooks();
    } catch (err) {
      toast.error(err.response?.data?.message ?? 'Failed to delete book.');
    }
    setDeleting(false);
  };

  const handleBorrow = async (book) => {
    try {
      await booksAPI.borrow(book._id);
      toast.success(`"${book.title}" borrowed successfully.`);
      fetchBooks();
      fetchMyBorrowed();
    } catch (err) {
      toast.error(err.response?.data?.message ?? 'Failed to borrow book.');
    }
  };

  const handleReturn = async (book) => {
    try {
      await booksAPI.return(book._id);
      toast.success(`"${book.title}" returned successfully.`);
      fetchBooks();
      fetchMyBorrowed();
    } catch (err) {
      toast.error(err.response?.data?.message ?? 'Failed to return book.');
    }
  };

  const totalPages = meta.totalPages ?? 1;

  return (
    <Layout
      title={role === 'librarian' ? 'Librix Inventory' : 'Librix Library'}
      actions={
        role === 'librarian' && (
          <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
            <Plus size={15} /> Add Book
          </button>
        )
      }
    >
      {/* Filter bar */}
      <div className="filter-bar">
        <div className="search-wrap">
          <Search size={15} />
          <input
            className="search-input"
            placeholder="Search books by title, author or ISBN..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
        >
          <option value="">All categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {(search || category) && (
          <button className="btn btn-ghost" onClick={() => {
            setSearchInput(''); setSearch(''); setCategory(''); setPage(1);
          }}>
            <XCircle size={15} /> Clear
          </button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="loading-screen">
          <div className="spinner spinner-lg" />
          <span>Loading Librix collection...</span>
        </div>
      ) : books.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"><BookOpen size={28} /></div>
          <h3>{search || category ? 'No books match your search.' : 'No books available.'}</h3>
          <p>{role === 'librarian' ? 'Start building your Librix collection by adding your first book.' : 'Check back later.'}</p>
          {role === 'librarian' && (
            <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
              <Plus size={15} /> Add first book
            </button>
          )}
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 12, fontSize: 13, color: 'var(--ink-light)' }}>
            {meta.total} book{meta.total !== 1 ? 's' : ''} found
          </div>
          <div className="books-grid">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                role={role}
                borrowedIds={borrowedIds}
                onBorrow={handleBorrow}
                onReturn={handleReturn}
                onEdit={setEditBook}
                onDelete={setDeleteBook}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <span className="pagination-info">
                Page {meta.page} of {totalPages} · {meta.total} books
              </span>
              <div className="pagination-controls">
                <button className="page-btn" disabled={page === 1} onClick={() => setPage(page - 1)}>‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .reduce((acc, p, idx, arr) => {
                    if (idx > 0 && p - arr[idx - 1] > 1) acc.push('…');
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === '…'
                      ? <span key={`e${i}`} style={{ padding: '0 4px', color: 'var(--ink-light)' }}>…</span>
                      : <button key={p} className={`page-btn ${p === page ? 'active' : ''}`}
                          onClick={() => setPage(p)}>{p}</button>
                  )}
                <button className="page-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>›</button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Add modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add new book">
        <BookForm onSave={handleAdd} onCancel={() => setAddOpen(false)} loading={saving} />
      </Modal>

      {/* Edit modal */}
      <Modal open={!!editBook} onClose={() => setEditBook(null)} title="Edit book">
        {editBook && (
          <BookForm
            initial={editBook}
            onSave={handleEdit}
            onCancel={() => setEditBook(null)}
            loading={saving}
          />
        )}
      </Modal>

      {/* Delete confirm modal */}
      <Modal open={!!deleteBook} onClose={() => setDeleteBook(null)} title="Confirm deletion">
        {deleteBook && (
          <ConfirmDelete
            book={deleteBook}
            onConfirm={handleDelete}
            onCancel={() => setDeleteBook(null)}
            loading={deleting}
          />
        )}
      </Modal>
    </Layout>
  );
}
