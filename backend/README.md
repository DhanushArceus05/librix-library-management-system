# 📚 Librix Backend API

<p align="center">
  <img src="../frontend/public/LIBRIX_Logo.png" width="140" alt="Librix Logo"/>
</p>

<h3 align="center">
RESTful Backend API for Librix – Modern Library Management Platform
</h3>

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![REST API](https://img.shields.io/badge/API-REST-blue)
![License](https://img.shields.io/badge/License-MIT-blue)

</p>

---

# 🌟 Overview

Librix Backend API powers the **Librix Library Management Platform**, providing a secure, scalable, and production-ready REST API for managing books, members, authentication, and borrowing workflows.

The backend follows a layered architecture using **Controllers → Services → Models**, making it easy to maintain and extend.

It supports two user roles:

- 📚 Librarian
- 👤 Member

with complete role-based authorization using JWT Authentication.

---

# 🚀 Live API

## Development

```
http://localhost:5000/api
```

## Production

https://librix-library-management-system.onrender.com

---

# ✨ Features

## Authentication

- JWT Authentication
- Refresh Token Rotation
- Password Hashing using bcrypt
- Secure Login
- Secure Registration
- Role-Based Authorization

---

## Book Management

- Add Books
- Update Books
- Delete Books
- View Book Details
- Search Books
- Category Filtering
- Pagination
- Inventory Management

---

## Borrow Management

- Borrow Books
- Return Books
- Duplicate Borrow Prevention
- Quantity Tracking
- Borrow History

---

## Member Management

- View Members
- Delete Members
- View Borrow History
- Protected Member Routes

---

## Security

- JWT Authentication
- Helmet
- CORS
- Password Hashing
- Express Validator
- Centralized Error Handling
- Protected Routes

---

# 🛠 Technology Stack

| Layer | Technology |
|--------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | JWT |
| Password Encryption | bcryptjs |
| Validation | express-validator |
| Security | Helmet + CORS |
| Logging | Morgan |
| Environment | dotenv |
| Development | Nodemon |

---

# 📂 Project Structure

```
backend
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   ├── bookController.js
│   └── memberController.js
│
├── middleware
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   ├── validateMiddleware.js
│   └── errorMiddleware.js
│
├── models
│   ├── User.js
│   ├── Book.js
│   └── Borrow.js
│
├── routes
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── memberRoutes.js
│
├── services
│   ├── authService.js
│   ├── bookService.js
│   ├── borrowService.js
│   └── memberService.js
│
├── scripts
│   └── seedLibrarian.js
│
├── utils
│
├── validators
│
├── app.js
├── server.js
├── package.json
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/DhanushArceus05/librix-library-management-system.git

cd librix-library-management-system/backend
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment

Create a `.env`

```
PORT=5000

DATABASE_URL=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET

JWT_REFRESH_SECRET=YOUR_REFRESH_SECRET

JWT_EXPIRES_IN=1d

JWT_REFRESH_EXPIRES_IN=7d

NODE_ENV=development
```

---

## Seed Demo Librarian

```bash
npm run seed
```

This automatically creates or updates the demo librarian account.

| Email | Password |
|--------|----------|
| librarian@library.com | LibrixDemo@2026 |

---

## Start Development Server

```bash
npm run dev
```

Server

```
http://localhost:5000
```

Health Check

```
http://localhost:5000/api/health
```

---

# 🔐 Environment Variables

Create a `.env` file in the backend root directory.

```env
PORT=5000

DATABASE_URL=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=your_super_secret_jwt_key_change_in_production

JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_in_production

JWT_EXPIRES_IN=1d

JWT_REFRESH_EXPIRES_IN=7d

NODE_ENV=development
```

| Variable | Description |
|----------|-------------|
| PORT | Backend server port |
| DATABASE_URL | MongoDB Atlas connection string |
| JWT_SECRET | Secret used for signing access tokens |
| JWT_REFRESH_SECRET | Secret used for refresh tokens |
| JWT_EXPIRES_IN | Access token expiry |
| JWT_REFRESH_EXPIRES_IN | Refresh token expiry |
| NODE_ENV | Application environment |

---

# 🗄 Database Configuration

Librix supports both **MongoDB Atlas** and **Local MongoDB**.

## MongoDB Atlas (Recommended)

1. Create a free cluster.
2. Create a database user.
3. Add your IP Address.
4. Copy the MongoDB connection string.
5. Update your `.env`.

Example

```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/library_management
```

---

## Local MongoDB

```env
DATABASE_URL=mongodb://localhost:27017/library_management
```

---

# 🌱 Demo Librarian Seeder

Librix includes a professional seed script.

Run

```bash
npm run seed
```

The script will:

- Create the librarian if it doesn't exist.
- Update the librarian password if it already exists.
- Prevent duplicate librarian accounts.

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Librarian | librarian@library.com | LibrixDemo@2026 |

Members can create their own account through the registration page.

---

# 📡 API Base URL

## Development

```
http://localhost:5000/api
```

## Production

Coming Soon

---

# 📨 Standard API Response

Every endpoint returns a consistent JSON structure.

Success

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {},
  "meta": {}
}
```

Error

```json
{
  "success": false,
  "message": "Something went wrong.",
  "errors": []
}
```

---

# 🔒 Authentication

Librix uses JWT Authentication.

Every protected endpoint requires

```
Authorization: Bearer <Access Token>
```

Authentication Flow

```
Register/Login
        │
        ▼
Receive Access Token
        │
        ▼
Call Protected APIs
        │
        ▼
Token Expires
        │
        ▼
Refresh Token
        │
        ▼
Continue Using APIs
```

---

# 👥 User Roles

## 📚 Librarian

Permissions

- Add Books
- Edit Books
- Delete Books
- Manage Members
- View Borrow History
- View Dashboard

---

## 👤 Member

Permissions

- Register
- Login
- Browse Books
- Borrow Books
- Return Books
- View My Books
- View Profile

---

# 📖 API Modules

The backend consists of three major API modules.

## Authentication

```
/api/auth
```

Handles

- Register
- Login
- Logout
- Refresh Token
- Current User

---

## Books

```
/api/books
```

Handles

- CRUD Operations
- Borrow
- Return
- Search
- Pagination
- Category Filter

---

## Members

```
/api/members
```

Handles

- Member Management
- Borrow History
- My Books
- Delete Member

---

# 📌 API Documentation

This section documents the primary REST API endpoints used by the Librix backend.

All protected routes require the following header:

```http
Authorization: Bearer <accessToken>
```

---

# 🔑 Authentication APIs

Base Route

```http
/api/auth
```

---

## Register Member

```http
POST /api/auth/register
```

Creates a new member account.

Librarians are not registered through the public API. Librarian accounts are created using the seed script.

### Access

Public

### Request Body

```json
{
  "name": "Dhanush M",
  "email": "dhanush@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Registration successful. Please log in.",
  "data": {
    "user": {
      "_id": "USER_ID",
      "name": "Dhanush M",
      "email": "dhanush@example.com",
      "role": "member",
      "createdAt": "2026-07-01T10:00:00.000Z"
    }
  }
}
```

### Validation Rules

| Field | Rule |
|---|---|
| name | Required |
| email | Required, valid email, unique |
| password | Required, minimum 6 characters |
| role | Only member registration is allowed |

---

## Login

```http
POST /api/auth/login
```

Authenticates a librarian or member and returns access and refresh tokens.

### Access

Public

### Request Body

```json
{
  "email": "librarian@library.com",
  "password": "LibrixDemo@2026"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": {
      "_id": "USER_ID",
      "name": "Head Librarian",
      "email": "librarian@library.com",
      "role": "librarian"
    },
    "accessToken": "JWT_ACCESS_TOKEN",
    "refreshToken": "JWT_REFRESH_TOKEN"
  }
}
```

### Possible Errors

```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

---

## Refresh Token

```http
POST /api/auth/refresh-token
```

Generates a new access token and refresh token using a valid refresh token.

### Access

Public

### Request Body

```json
{
  "refreshToken": "JWT_REFRESH_TOKEN"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Token refreshed successfully.",
  "data": {
    "accessToken": "NEW_ACCESS_TOKEN",
    "refreshToken": "NEW_REFRESH_TOKEN"
  }
}
```

---

## Logout

```http
POST /api/auth/logout
```

Logs out the authenticated user and invalidates the stored refresh token.

### Access

Authenticated User

### Headers

```http
Authorization: Bearer <accessToken>
```

### Success Response

```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

---

## Get Current User

```http
GET /api/auth/me
```

Returns the currently logged-in user profile.

### Access

Authenticated User

### Headers

```http
Authorization: Bearer <accessToken>
```

### Success Response

```json
{
  "success": true,
  "message": "User profile retrieved successfully.",
  "data": {
    "user": {
      "_id": "USER_ID",
      "name": "Dhanush M",
      "email": "dhanush@example.com",
      "role": "member",
      "createdAt": "2026-07-01T10:00:00.000Z"
    }
  }
}
```

---

# 🔐 Authentication Notes

- Passwords are hashed using bcrypt before being stored.
- Access tokens are used to authorize protected API requests.
- Refresh tokens are used to generate new access tokens.
- The authenticated user object is attached to the request after JWT verification.
- Role-based middleware protects member-only and librarian-only endpoints.

---

# ✅ Authentication Testing Flow

1. Run the librarian seed script.

```bash
npm run seed
```

2. Login as librarian.

```json
{
  "email": "librarian@library.com",
  "password": "LibrixDemo@2026"
}
```

3. Copy the `accessToken`.

4. Use the token in protected requests.

```http
Authorization: Bearer <accessToken>
```

5. Register a member account.

6. Login as member.

7. Test role-restricted endpoints.

---

# 📚 Books API

Base Route

```http
/api/books
```

All book routes require authentication.

---

## Get All Books

```http
GET /api/books
```

Returns a paginated list of books.

### Access

- Librarian
- Member

### Query Parameters

| Parameter | Description |
|------------|-------------|
| page | Page number |
| limit | Number of records |
| search | Search by title or author |
| category | Filter by category |

Example

```http
GET /api/books?page=1&limit=10
```

```http
GET /api/books?search=Clean
```

```http
GET /api/books?category=Programming
```

### Success Response

```json
{
  "success": true,
  "message": "Books retrieved successfully.",
  "data": {
    "books": []
  },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

---

## Get Single Book

```http
GET /api/books/:id
```

Returns detailed information about a book.

### Access

- Librarian
- Member

---

## Add Book

```http
POST /api/books
```

Creates a new book.

### Access

Librarian Only

### Request Body

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "9780132350884",
  "category": "Programming",
  "quantity": 10
}
```

### Success Response

```json
{
  "success": true,
  "message": "Book created successfully."
}
```

---

## Update Book

```http
PUT /api/books/:id
```

Updates an existing book.

### Access

Librarian Only

### Request Body

```json
{
  "title": "Updated Title",
  "quantity": 15
}
```

### Success Response

```json
{
  "success": true,
  "message": "Book updated successfully."
}
```

---

## Delete Book

```http
DELETE /api/books/:id
```

Deletes a book.

### Access

Librarian Only

### Success Response

```json
{
  "success": true,
  "message": "Book deleted successfully."
}
```

---

## Borrow Book

```http
POST /api/books/:id/borrow
```

Allows a member to borrow a book.

### Access

Member Only

### Business Rules

- Book must exist.
- Book must have available copies.
- Same member cannot borrow the same book twice without returning it.
- Available quantity decreases automatically.

### Success Response

```json
{
  "success": true,
  "message": "Book borrowed successfully."
}
```

---

## Return Book

```http
POST /api/books/:id/return
```

Returns a borrowed book.

### Access

Member Only

### Business Rules

- Book must already be borrowed.
- Available quantity increases automatically.
- Borrow record is updated.

### Success Response

```json
{
  "success": true,
  "message": "Book returned successfully."
}
```

---

# 📖 Book Schema

| Field | Type |
|---------|------|
| title | String |
| author | String |
| isbn | String |
| category | String |
| quantity | Number |
| availableQuantity | Number |
| createdAt | Date |
| updatedAt | Date |

---

# 📚 Book Features

- Add New Books
- Edit Existing Books
- Delete Books
- Borrow Books
- Return Books
- Inventory Tracking
- Search Books
- Category Filtering
- Pagination
- Automatic Quantity Updates

---

# 👥 Members API

Base Route

```http
/api/members
```

All member routes require authentication.

---

## Get All Members

```http
GET /api/members
```

Returns all registered members.

### Access

Librarian Only

### Query Parameters

| Parameter | Description |
|----------|-------------|
| page | Page number |
| limit | Records per page |

Example

```http
GET /api/members?page=1&limit=10
```

### Success Response

```json
{
  "success": true,
  "message": "Members retrieved successfully.",
  "data": {
    "members": []
  },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "totalPages": 2
  }
}
```

---

## Get Member Borrow History

```http
GET /api/members/:id/borrowed-books
```

Returns all books currently borrowed by a specific member.

### Access

Librarian Only

### Success Response

```json
{
  "success": true,
  "message": "Member borrowed books retrieved successfully.",
  "data": {
    "member": {
      "_id": "USER_ID",
      "name": "Dhanush M",
      "email": "dhanush@example.com"
    },
    "borrowedBooks": [
      {
        "title": "Clean Code",
        "author": "Robert C. Martin",
        "borrowDate": "2026-07-01T08:30:00.000Z"
      }
    ]
  }
}
```

---

## Delete Member

```http
DELETE /api/members/:id
```

Deletes a member account.

### Access

Librarian Only

### Business Rules

- Member must exist.
- Members with active borrowed books cannot be deleted.

### Success Response

```json
{
  "success": true,
  "message": "Member deleted successfully."
}
```

---

## My Borrowed Books

```http
GET /api/members/me/books
```

Returns the authenticated member's currently borrowed books.

### Access

Member Only

### Success Response

```json
{
  "success": true,
  "message": "Borrowed books retrieved successfully.",
  "data": {
    "borrows": []
  }
}
```

---

# 🔒 Authorization Matrix

| Endpoint | Member | Librarian |
|-----------|:------:|:---------:|
| POST /api/auth/register | ✅ | ✅ |
| POST /api/auth/login | ✅ | ✅ |
| GET /api/auth/me | ✅ | ✅ |
| POST /api/auth/logout | ✅ | ✅ |
| POST /api/auth/refresh-token | ✅ | ✅ |
| GET /api/books | ✅ | ✅ |
| GET /api/books/:id | ✅ | ✅ |
| POST /api/books | ❌ | ✅ |
| PUT /api/books/:id | ❌ | ✅ |
| DELETE /api/books/:id | ❌ | ✅ |
| POST /api/books/:id/borrow | ✅ | ❌ |
| POST /api/books/:id/return | ✅ | ❌ |
| GET /api/members | ❌ | ✅ |
| GET /api/members/:id/borrowed-books | ❌ | ✅ |
| DELETE /api/members/:id | ❌ | ✅ |
| GET /api/members/me/books | ✅ | ❌ |

---

# 📊 HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Request Successful |
| 201 | Resource Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

# 🔄 Authentication Workflow

```
Client
   │
   ▼
Login
   │
   ▼
Receive JWT Access Token
   │
   ▼
Access Protected Routes
   │
   ▼
Token Expired
   │
   ▼
Refresh Token
   │
   ▼
Continue Session
```

---

# 🧪 API Testing

Recommended testing sequence

1. Seed the demo librarian

```bash
npm run seed
```

2. Login as Librarian

3. Add Books

4. Register a Member

5. Login as Member

6. Browse Books

7. Borrow Book

8. Return Book

9. View Member Borrow History

10. Delete Member

---

# 🌐 Deployment

Librix Backend API can be deployed to any Node.js hosting platform.

## Recommended Platform

- Render

---

## Render Deployment

1. Push the backend to GitHub.
2. Create a new **Web Service** on Render.
3. Connect your GitHub repository.
4. Configure:

| Setting | Value |
|----------|-------|
| Build Command | `npm install` |
| Start Command | `npm start` |

5. Add the following Environment Variables:

```
DATABASE_URL
JWT_SECRET
JWT_REFRESH_SECRET
JWT_EXPIRES_IN
JWT_REFRESH_EXPIRES_IN
NODE_ENV=production
PORT
```

6. Deploy.

---

## Production Checklist

- MongoDB Atlas configured
- Environment variables added
- HTTPS enabled
- JWT secrets updated
- Demo librarian seeded
- Health endpoint tested
- API accessible

---

# 📦 Available Scripts

| Command | Description |
|----------|-------------|
| npm install | Install dependencies |
| npm run dev | Start development server |
| npm start | Start production server |
| npm run seed | Create or update demo librarian |

---

# 🗂 Database Models

## User

| Field | Type |
|--------|------|
| name | String |
| email | String |
| password | String (Hashed) |
| role | member / librarian |
| refreshToken | String |
| createdAt | Date |
| updatedAt | Date |

---

## Book

| Field | Type |
|--------|------|
| title | String |
| author | String |
| isbn | String |
| category | String |
| quantity | Number |
| availableQuantity | Number |
| createdAt | Date |
| updatedAt | Date |

---

## Borrow

| Field | Type |
|--------|------|
| memberId | ObjectId |
| bookId | ObjectId |
| borrowDate | Date |
| returnDate | Date |
| status | borrowed / returned |

---

# 🔐 Security Features

- JWT Authentication
- Refresh Token Rotation
- Password Hashing (bcrypt)
- Role-Based Authorization
- Route Protection
- Input Validation
- Helmet Security Headers
- CORS Protection
- Centralized Error Handling

---

# 🚀 Future Improvements

- Book Reservation System
- Fine Management
- Email Notifications
- QR Code Support
- Barcode Scanner Integration
- Analytics Dashboard
- Activity Logs
- Multi-Library Support
- Mobile API Versioning

---

# 📄 API Documentation

The frontend application for Librix is documented separately.

See

```
../frontend/README.md
```

Main project documentation

```
../README.md
```

---

# 👨‍💻 Author

## Dhanush M

AI Engineer | MERN Stack Developer | Data Science Enthusiast

### GitHub

https://github.com/DhanushArceus05

### LinkedIn

https://www.linkedin.com/in/dhanush-m-arceus05

---

# ⭐ Support

If you found this project useful,

please consider giving it a ⭐ on GitHub.

---

# 📜 License

This project is licensed under the **MIT License**.

Feel free to use, modify, and distribute it for educational and personal projects.

---

<p align="center">

Made with ❤️ using Node.js, Express.js and MongoDB

</p>