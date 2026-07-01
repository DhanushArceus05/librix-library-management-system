import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "/api"
      : "https://librix-library-management-system.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401, clear session and redirect to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      sessionStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  refreshToken: (refreshToken) => api.post('/auth/refresh-token', { refreshToken }),
};

// ── Books ─────────────────────────────────────────────────────────────────────
export const booksAPI = {
  getAll: (params) => api.get('/books', { params }),
  getById: (id) => api.get(`/books/${id}`),
  create: (data) => api.post('/books', data),
  update: (id, data) => api.put(`/books/${id}`, data),
  delete: (id) => api.delete(`/books/${id}`),
  borrow: (id) => api.post(`/books/${id}/borrow`),
  return: (id) => api.post(`/books/${id}/return`),
};

// ── Members ───────────────────────────────────────────────────────────────────
export const membersAPI = {
  getAll: (params) => api.get('/members', { params }),
  delete: (id) => api.delete(`/members/${id}`),
  getMyBooks: () => api.get('/members/me/books'),
  getBorrowedBooks: (id) => api.get(`/members/${id}/borrowed-books`),
};

export default api;
