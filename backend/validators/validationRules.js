const { body, param, query } = require("express-validator");
const mongoose = require("mongoose");

// ─── Auth Validators ──────────────────────────────────────────────────────────

const registerValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required.")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters."),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Please provide a valid email address.")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required.")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),

  body("role")
    .optional()
    .custom((value) => {
      if (value && value !== "member") {
        throw new Error("You can only register as a member.");
      }
      return true;
    }),
];

const loginValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Please provide a valid email address.")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required."),
];

const refreshTokenValidation = [
  body("refreshToken")
    .notEmpty().withMessage("Refresh token is required."),
];

// ─── Book Validators ──────────────────────────────────────────────────────────

const addBookValidation = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required.")
    .isLength({ max: 300 }).withMessage("Title cannot exceed 300 characters."),

  body("author")
    .trim()
    .notEmpty().withMessage("Author is required.")
    .isLength({ min: 2, max: 200 }).withMessage("Author name must be between 2 and 200 characters."),

  body("isbn")
    .trim()
    .notEmpty().withMessage("ISBN is required."),

  body("category")
    .trim()
    .notEmpty().withMessage("Category is required.")
    .isLength({ max: 100 }).withMessage("Category cannot exceed 100 characters."),

  body("quantity")
    .notEmpty().withMessage("Quantity is required.")
    .isInt({ min: 0 }).withMessage("Quantity must be a non-negative whole number."),
];

const updateBookValidation = [
  body("title")
    .optional()
    .trim()
    .notEmpty().withMessage("Title cannot be empty.")
    .isLength({ max: 300 }).withMessage("Title cannot exceed 300 characters."),

  body("author")
    .optional()
    .trim()
    .notEmpty().withMessage("Author cannot be empty.")
    .isLength({ min: 2, max: 200 }).withMessage("Author name must be between 2 and 200 characters."),

  body("isbn")
    .optional()
    .trim()
    .notEmpty().withMessage("ISBN cannot be empty."),

  body("category")
    .optional()
    .trim()
    .notEmpty().withMessage("Category cannot be empty.")
    .isLength({ max: 100 }).withMessage("Category cannot exceed 100 characters."),

  body("quantity")
    .optional()
    .isInt({ min: 0 }).withMessage("Quantity must be a non-negative whole number."),
];

// ─── Param Validators ─────────────────────────────────────────────────────────

const mongoIdParam = (paramName = "id") => [
  param(paramName)
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error(`Invalid ${paramName}: '${value}' is not a valid ID.`);
      }
      return true;
    }),
];

// ─── Query Validators ─────────────────────────────────────────────────────────

const bookQueryValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 }).withMessage("Page must be a positive integer."),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100."),

  query("search")
    .optional()
    .trim(),

  query("category")
    .optional()
    .trim(),
];

module.exports = {
  registerValidation,
  loginValidation,
  refreshTokenValidation,
  addBookValidation,
  updateBookValidation,
  mongoIdParam,
  bookQueryValidation,
};
