const express = require('express');
const Invoice = require('../models/invoice');
const { body } = require('express-validator');
const authController = require('../controllers/auth');

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Invalid email addres')
      .custom((value, { req }) => {
        return Invoice.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('Email adress exists already');
          }
        });
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 4 }),
    body('name').trim().not().isEmpty(),
  ],
  authController.signup
);

module.exports = router;
