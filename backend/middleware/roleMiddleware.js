const { sendError } = require("../utils/apiResponse");

/**
 * Restrict access to specific roles
 * @param {...string} roles - Allowed roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, 401, "Authentication required.");
    }

    if (!roles.includes(req.user.role)) {
      return sendError(
        res,
        403,
        `Access denied. This action requires one of the following roles: ${roles.join(", ")}.`
      );
    }

    next();
  };
};

module.exports = authorize;
