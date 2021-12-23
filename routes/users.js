const express = require('express');
const { body } = require('express-validator');

const User = require('../models/users');
const userController = require('../controllers/users');

const router = express.Router();

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findByEmail(value).then(userDoc => {
          if (userDoc.rowCount > 0) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
  ],
  userController.signup
);

router.delete("/:userId", userController.deleteUser);


module.exports = router;