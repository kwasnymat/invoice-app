import { Router } from 'express';

import Invoice from '../models/invoice.js';
import auth from '../middleware/auth.js';
import User from '../models/user.js';

const router = Router();

router.get('/invoices', auth, async (req, res, next) => {
  try {
    const { page = 1, limit = 5, ...params } = req.query;
    params.creator = req.user;
    const invoices = await Invoice.find(params)
      .sort({ invoiceNumber: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const countedInvoces = await Invoice.countDocuments(params);
    const invoicesAll = await Invoice.find({ creator: req.user });
    res.status(200).json({
      message: 'Fetched invoices successfully!',
      invoices: invoices,
      allInvoices: invoicesAll,
      totalPages: Math.ceil(countedInvoces / Number(limit)),
      currentPage: Number(page),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

router.get('/invoices/:invoiceId', auth, async (req, res, next) => {
  const invoiceId = req.params.invoiceId;
  const invoice = await Invoice.findById(invoiceId);
  try {
    if (!invoice) {
      const error = new Error('Could not find invoice!');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Invoice fetched!', invoice: invoice });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

router.put('/invoices/:invoiceId', auth, async (req, res, next) => {
  const invoiceId = req.params.invoiceId;

  const {
    invoiceNumber,
    dateInvoice,
    cityInvoice,
    SellerCompanyName,
    SellerCompanyStreet,
    SellerCompanyZip,
    SellerCompanyCity,
    SellerCompanyVat,
    SellerCompanyPhone,
    BuyerCompanyName,
    BuyerCompanyStreet,
    BuyerCompanyZip,
    BuyerCompanyCity,
    BuyerCompanyVat,
    BuyerCompanyPhone,
    currency,
    sub_total,
    tax_amountTotal,
    total_amount,
    items,
    productName,
    unitCost,
    qty,
    priceNoVat,
    vat,
    totalMoney,
  } = req.body;
  try {
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      const error = new Error('Could not find invoice!');
      error.statusCode = 404;
      throw error;
    }
    if (invoice.creator.toString() !== req.user) {
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }
    invoice.invoiceNumber = invoiceNumber;
    invoice.dateInvoice = dateInvoice;
    invoice.cityInvoice = cityInvoice;
    invoice.SellerCompanyName = SellerCompanyName;
    invoice.SellerCompanyStreet = SellerCompanyStreet;
    invoice.SellerCompanyZip = SellerCompanyZip;
    invoice.SellerCompanyCity = SellerCompanyCity;
    invoice.SellerCompanyVat = SellerCompanyVat;
    invoice.SellerCompanyPhone = SellerCompanyPhone;
    invoice.BuyerCompanyName = BuyerCompanyName;
    invoice.BuyerCompanyStreet = BuyerCompanyStreet;
    invoice.BuyerCompanyZip = BuyerCompanyZip;
    invoice.BuyerCompanyCity = BuyerCompanyCity;
    invoice.BuyerCompanyVat = BuyerCompanyVat;
    invoice.BuyerCompanyPhone = BuyerCompanyPhone;
    invoice.currency = currency;
    invoice.sub_total = sub_total;
    invoice.tax_amountTotal = tax_amountTotal;
    invoice.total_amount = total_amount;
    invoice.items = items;
    invoice.productName = productName;
    invoice.unitCost = unitCost;
    invoice.qty = qty;
    invoice.priceNoVat = priceNoVat;
    invoice.vat = vat;
    invoice.totalMoney = totalMoney;
    const result = await invoice.save();
    res.status(200).json({ message: 'Invoice updated!', invoice: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

router.post('/invoice', auth, async (req, res, next) => {
  const {
    invoiceNumber,
    dateInvoice,
    cityInvoice,
    SellerCompanyName,
    SellerCompanyStreet,
    SellerCompanyZip,
    SellerCompanyCity,
    SellerCompanyVat,
    SellerCompanyPhone,
    BuyerCompanyName,
    BuyerCompanyStreet,
    BuyerCompanyZip,
    BuyerCompanyCity,
    BuyerCompanyVat,
    BuyerCompanyPhone,
    currency,
    sub_total,
    tax_amountTotal,
    total_amount,
    items,
    productName,
    unitCost,
    qty,
    priceNoVat,
    vat,
    totalMoney,
  } = req.body;

  const invoice = new Invoice({
    invoiceNumber,
    dateInvoice,
    cityInvoice,
    SellerCompanyName,
    SellerCompanyStreet,
    SellerCompanyZip,
    SellerCompanyCity,
    SellerCompanyVat,
    SellerCompanyPhone,
    BuyerCompanyName,
    BuyerCompanyStreet,
    BuyerCompanyZip,
    BuyerCompanyCity,
    BuyerCompanyVat,
    BuyerCompanyPhone,
    currency,
    sub_total,
    tax_amountTotal,
    total_amount,
    items,
    productName,
    unitCost,
    qty,
    priceNoVat,
    vat,
    totalMoney,
    creator: req.user,
  });

  try {
    await invoice.save();
    const user = await User.findById(req.user);
    user.invoices.push(invoice);
    await user.save();
    res.status(201).json({
      invoice,
      message: 'Invoice created!',
      creator: { _id: user._id, name: user.name },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

router.delete('/invoices/:invoiceId', auth, async (req, res, next) => {
  const invoiceId = req.params.invoiceId;
  try {
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      const error = new Error('Could not find invoice!');
      error.statusCode = 404;
      throw error;
    }
    await Invoice.findByIdAndRemove(invoiceId);
    const user = await User.findById(req.user);
    user.invoices.pull(invoiceId);
    await user.save();
    res.status(200).json({ message: 'Invoice deleted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

export default router;
