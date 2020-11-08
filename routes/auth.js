const express = require('express');
const User = require('../models/user');
const { body } = require('express-validator');
const authController = require('../controllers/auth');

const router = express.Router();

router.put(
  '/signup',
  [
    body('email').isEmail().withMessage('Invalid email addres'),
    body('password').trim().isLength({ min: 4 }),
    body('username').trim().not().isEmpty(),
  ],
  authController.signup
);

router.put(
  '/login',

  authController.signup
);

module.exports = router;
