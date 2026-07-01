const User = require("../models/User");
const { verifyAccessToken } = require("../utils/jwtUtils");
const { sendError } = require("../utils/apiResponse");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendError(res, 401, "Access denied. No token provided.");
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return sendError(res, 401, "Token has expired. Please log in again.");
      }
      return sendError(res, 401, "Invalid token. Please log in again.");
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return sendError(res, 401, "User associated with this token no longer exists.");
    }

    req.user = user;
    next();
  } catch (error) {
    return sendError(res, 500, "Authentication error.");
  }
};

module.exports = authenticate;
