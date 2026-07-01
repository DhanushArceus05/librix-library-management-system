const express = require("express");
const router = express.Router();

const memberController = require("../controllers/memberController");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const validate = require("../middleware/validateMiddleware");
const { mongoIdParam } = require("../validators/validationRules");

// GET /api/members/me/books  — Authenticated member only  (must be before /:id)
router.get("/me/books", authenticate, authorize("member"), memberController.getMyBooks);

// GET /api/members/:id/borrowed-books — Librarian only
router.get(
  "/:id/borrowed-books",
  authenticate,
  authorize("librarian"),
  mongoIdParam("id"),
  validate,
  memberController.getMemberBorrowedBooks
);

// GET /api/members  — Librarian only
router.get("/", authenticate, authorize("librarian"), memberController.getAllMembers);

// DELETE /api/members/:id  — Librarian only
router.delete(
  "/:id",
  authenticate,
  authorize("librarian"),
  mongoIdParam("id"),
  validate,
  memberController.deleteMember
);

module.exports = router;
