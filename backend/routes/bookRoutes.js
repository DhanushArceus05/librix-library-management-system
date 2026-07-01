const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const validate = require("../middleware/validateMiddleware");
const {
  addBookValidation,
  updateBookValidation,
  mongoIdParam,
  bookQueryValidation,
} = require("../validators/validationRules");

// GET /api/books  — All authenticated users
router.get("/", authenticate, bookQueryValidation, validate, bookController.getAllBooks);

// GET /api/books/:id  — All authenticated users
router.get("/:id", authenticate, mongoIdParam("id"), validate, bookController.getBookById);

// POST /api/books  — Librarian only
router.post("/", authenticate, authorize("librarian"), addBookValidation, validate, bookController.addBook);

// PUT /api/books/:id  — Librarian only
router.put(
  "/:id",
  authenticate,
  authorize("librarian"),
  mongoIdParam("id"),
  updateBookValidation,
  validate,
  bookController.updateBook
);

// DELETE /api/books/:id  — Librarian only
router.delete(
  "/:id",
  authenticate,
  authorize("librarian"),
  mongoIdParam("id"),
  validate,
  bookController.deleteBook
);

// POST /api/books/:id/borrow  — Member only
router.post(
  "/:id/borrow",
  authenticate,
  authorize("member"),
  mongoIdParam("id"),
  validate,
  bookController.borrowBook
);

// POST /api/books/:id/return  — Member only
router.post(
  "/:id/return",
  authenticate,
  authorize("member"),
  mongoIdParam("id"),
  validate,
  bookController.returnBook
);

module.exports = router;
