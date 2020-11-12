const { validationResult } = require('express-validator');

const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) throw Error('User does not exist');

    const checkIfPasswordMatch = await bcrypt.compare(password, user.password);
    if (!checkIfPasswordMatch) throw Error('Invalid password');

    const token = jwt.sign({ id: user._id }, config.get('jwt'), {
      expiresIn: 3600,
    });
    if (!token) throw Error("Couldn't sign the token");

    res.status(200).json({
      token,
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        CompanyName: user.CompanyName,
        CompanyStreet: user.CompanyStreet,
        CompanyZip: user.CompanyZip,
        CompanyCity: user.CompanyCity,
        CompanyVat: user.CompanyVat,
        CompanyPhone: user.CompanyPhone,
      },
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists!' });
    }
    const hashedPw = await bcrypt.hash(password, 12);
    user = new User({
      username,
      email,
      password: hashedPw,
    });
    const result = await user.save();
    const token = jwt.sign({ userId: user._id }, config.get('jwt'), {
      expiresIn: 3600,
    });

    res.status(201).json({
      token,
      message: 'User created!',
      userId: result._id,
      username: result.username,
      email: result.email,
    });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).select('-password');

    if (!user) throw Error('User does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.editUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const {
    CompanyName,
    CompanyStreet,
    CompanyZip,
    CompanyCity,
    CompanyVat,
    CompanyPhone,
  } = req.body;
  try {
    const user = await User.findById(req.user);
    if (!user) {
      const error = new Error('Could not find user!');
      error.statusCode = 404;
      throw error;
    }
    user.CompanyName = CompanyName;
    user.CompanyStreet = CompanyStreet;
    user.CompanyZip = CompanyZip;
    user.CompanyCity = CompanyCity;
    user.CompanyVat = CompanyVat;
    user.CompanyPhone = CompanyPhone;

    const result = await user.save();
    res.status(200).json({ message: 'User updated!', user: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
