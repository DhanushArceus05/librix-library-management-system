const authService = require("../services/authService");
const { sendSuccess, sendError } = require("../utils/apiResponse");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.registerMember({ name, email, password });

    return sendSuccess(res, 201, "Registration successful. Please log in.", { user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.loginUser({ email, password });

    return sendSuccess(res, 200, "Login successful.", {
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken: token } = req.body;
    const tokens = await authService.refreshAccessToken(token);

    return sendSuccess(res, 200, "Token refreshed successfully.", tokens);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logoutUser(req.user._id);
    return sendSuccess(res, 200, "Logged out successfully.");
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    return sendSuccess(res, 200, "Profile retrieved successfully.", { user: req.user });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, refreshToken, logout, getMe };
