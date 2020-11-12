const express = require('express');
const User = require('../models/user');
const { body } = require('express-validator');
const authController = require('../controllers/auth');
const auth = require('../middleware/auth');

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

router.post('/login', authController.login);

router.get('/user', auth, authController.getUser);
router.put('/user/edit-user', auth, authController.editUser);

module.exports = router;
