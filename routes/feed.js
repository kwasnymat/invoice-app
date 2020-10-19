const express = require('express');

const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/invoices', feedController.getInvoice);

router.post('/post', feedController.createInvoice);

module.exports = router;
