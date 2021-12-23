const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/users");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const { email, password, userId } = req.body;

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User(userId, email, hashedPw);
      return user.save();
    })
    .then(() => {
      res.status(201).json({ message: "User created!"});
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const { userId } = req.params;
  User.delete(userId)
    .then(() => {
      res.status(200).json({
        message: "User deleted successfully.",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
