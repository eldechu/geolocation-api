const jwt = require("jsonwebtoken");
const _ = require("underscore");
const {
  JWT_secret,
  JWT_secret_expiration,
  authenticatedUsers,
} = require("../constraints/constraints");

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = _.find(
      authenticatedUsers,
      (u) => u.email === email && u.password === password
    );
    if (user === undefined) {
      const error = new Error("Authorization failed. User not found");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({ email: email }, JWT_secret, {
      expiresIn: JWT_secret_expiration,
    });

    res.status(200).json({ token: token, userId: email });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
