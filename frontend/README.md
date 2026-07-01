# 📚 Librix Frontend

<p align="center">
  <img src="./public/LIBRIX_Logo.png" width="140" alt="Librix Logo"/>
</p>

<h3 align="center">
Modern Library Management Platform - Frontend
</h3>

<p align="center">

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![React Router](https://img.shields.io/badge/React_Router-v6-red?logo=reactrouter)
![Axios](https://img.shields.io/badge/Axios-HTTP-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![CSS3](https://img.shields.io/badge/CSS3-Custom-blue)

</p>

---

# 🌟 Overview

Librix Frontend is a modern React application that provides an intuitive interface for managing library operations.

The application supports two user roles:

- 📚 Librarian
- 👤 Member

with secure authentication, role-based navigation, book management, borrowing workflows, and responsive dashboards.

---

# 🚀 Live Demo

## Frontend

Coming Soon

---

# ✨ Features

## Authentication

- Secure Login
- Member Registration
- JWT Authentication
- Session Persistence
- Automatic Logout
- Protected Routes

---

## Librarian Features

- Dashboard
- Manage Books
- Add Books
- Edit Books
- Delete Books
- Manage Members
- View Member Borrow History
- Profile

---

## Member Features

- Dashboard
- Browse Books
- Search Books
- Category Filter
- Borrow Books
- Return Books
- My Borrowed Books
- Profile

---

## User Experience

- Responsive Layout
- Sidebar Navigation
- Modern UI
- Toast Notifications
- Pagination
- Search
- Category Filtering
- Empty States
- Loading Animations

---

# 🛠 Technology Stack

| Layer | Technology |
|--------|------------|
| Framework | React 18 |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| Styling | CSS3 |
| State Management | React Context API |

---

# 📂 Project Structure

```
frontend
│
├── public
│   ├── LIBRIX_Logo.png
│   └── index.html
│
├── src
│
├── api
│   └── client.js
│
├── components
│   ├── Layout.jsx
│   ├── Modal.jsx
│   ├── ProtectedRoute.jsx
│   └── Sidebar.jsx
│
├── context
│   └── AuthContext.jsx
│
├── pages
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Books.jsx
│   ├── Members.jsx
│   ├── MyBooks.jsx
│   ├── Profile.jsx
│   └── NotFound.jsx
│
├── App.jsx
├── index.css
└── index.js
```

---

# 📋 Prerequisites

- Node.js v18+
- Backend API running
- MongoDB Atlas

---

# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/DhanushArceus05/librix-library-management-system.git
```

Navigate to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm start
```

Application URL

```
http://localhost:3000
```

Backend URL

```
http://localhost:5000
```

---

# 🔐 Demo Credentials

## Librarian

Email

```
librarian@library.com
```

Password

```
LibrixDemo@2026
```

---

## Member

Create a new account from the Register page.

---

# 🧭 Application Routes

| Route | Access |
|---------|--------|
| /login | Public |
| /register | Public |
| /dashboard | Authenticated |
| /books | Authenticated |
| /members | Librarian |
| /my-books | Member |
| /profile | Authenticated |

---

# 🔒 Authentication Flow

1. User logs in.
2. Backend returns JWT tokens.
3. Tokens are stored in sessionStorage.
4. Axios automatically attaches the access token.
5. Protected routes verify authentication.
6. Expired sessions redirect to Login.

---

# 🎨 Design System

Primary Theme

```
Sidebar
Dark Navy

Accent
Amber

Cards
White

Background
Light Gray
```

Typography

- Inter
- Playfair Display

---

# 🌐 Deployment

Recommended Platform

- Vercel

Build

```bash
npm run build
```

Output Folder

```
build/
```

Before deployment update

```
src/api/client.js
```

Replace

```
baseURL: "/api"
```

with your deployed backend URL.

---

# 🔗 Related Documentation

Main Project

```
../README.md
```

Backend

```
../backend/README.md
```

---

# 📸 Screenshots

Project screenshots are available in

```
../screenshots/
```

Including

- Login
- Librarian Dashboard
- Member Dashboard
- Manage Books
- Browse Books
- Members
- Borrow History
- My Books
- Profiles

---

# 🚀 Future Improvements

- Dark Mode
- Multi-language Support
- Mobile Responsive Enhancements
- Notifications
- Theme Customization
- Offline Support

---

# 👨‍💻 Author

## Dhanush M

AI Engineer | MERN Stack Developer | Data Science Enthusiast

GitHub

```
https://github.com/DhanushArceus05
```

LinkedIn

```
https://www.linkedin.com/in/dhanush-m-arceus05
```

---

# ⭐ Support

If you like this project,

please consider giving it a ⭐ on GitHub.

---

# 📜 License

MIT License

---

<p align="center">

Made with ❤️ using React

</p>