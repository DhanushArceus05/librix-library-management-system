const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");
const {
  registerValidation,
  loginValidation,
  refreshTokenValidation,
} = require("../validators/validationRules");

// POST /api/auth/register
router.post("/register", registerValidation, validate, authController.register);

// POST /api/auth/login
router.post("/login", loginValidation, validate, authController.login);

// POST /api/auth/refresh-token
router.post("/refresh-token", refreshTokenValidation, validate, authController.refreshToken);

// POST /api/auth/logout  (protected)
router.post("/logout", authenticate, authController.logout);

// GET /api/auth/me  (protected)
router.get("/me", authenticate, authController.getMe);

module.exports = router;
