const jwt = require("jsonwebtoken");
const config = require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(
      token,
      process.env.transaction_tracker_jwtPrivateKey
    );
    req.user = decoded;
    next();
  } catch (ex) {
    // Passing the error to the next middleware for centralized error handling
    next(ex);
  }
};
