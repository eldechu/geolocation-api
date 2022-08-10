const jwt = require("jsonwebtoken");
const { JWT_secret } = require("../constraints/constraints");

module.exports = (req, res, next) => {
  const reqAuthorizationHeader = req.get("Authorization");
  if (!reqAuthorizationHeader) {
    const error = new Error("Missing JWT authentication token.");
    error.statusCode = 401;
    throw error;
  }

  const token = reqAuthorizationHeader.split(" ")[1];
  let dekodedToken;
  try {
    //catching jwt errors
    dekodedToken = jwt.verify(token, JWT_secret);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
  if (!dekodedToken) {
    // token validation failed
    const error = new Error("Authentication failed.");
    error.statusCode = 401;
    throw error;
  }
  next();
};
