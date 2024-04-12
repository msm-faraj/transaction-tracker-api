module.exports = function (err, req, res, next) {
  // If the error is due to JWT verification failure
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).send("Invalid token.");
  }

  // If the error is a Sequelize database error
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).send("This item has already been added.");
  }

  // For other types of errors, send a generic error response
  res.status(500).json({ message: err.message });
};
