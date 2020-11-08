const express = require('express');
const auth = require('../middleware/auth');

const { body } = require('express-validator');

const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/invoices', auth, feedController.getInvoices);

router.get('/invoices/:invoiceId', auth, feedController.getInvoice);

router.put('/invoices/:invoiceId', auth, feedController.updateInvoice);

router.post('/invoice', auth, feedController.createInvoice);

router.delete('/invoices/:invoiceId', auth, feedController.deleteInvoice);

module.exports = router;
