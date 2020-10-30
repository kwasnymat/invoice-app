const express = require('express');

const { body } = require('express-validator');

const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/invoices', feedController.getInvoices);

router.get('/invoices/:invoiceId', feedController.getInvoice);

router.put('/invoices/:invoiceId', feedController.updateInvoice);

router.post('/invoice', feedController.createInvoice);

module.exports = router;
