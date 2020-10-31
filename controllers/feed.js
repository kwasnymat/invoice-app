const Invoice = require('../models/post');

const { validationResult } = require('express-validator');
const post = require('../models/post');

// exports.getInvoices = async (req, res, next) => {
//   const currentPage = req.query.page || 1;
//   const perPage = 2;
//   try {
//     const totalItems = await Post.find().countDocuments();
//     const invoices = await Invoice.find()
//       .skip((currentPage - 1) * perPage)
//       .limit(perPage);

//     res.status(200).json({
//       message: 'Fetched invoices successfully.',
//       invoices: invoices,
//       totalItems: totalItems,
//       currentPage: currentPage,
//     });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };

exports.getInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json({
      message: 'Fetched invoices successfully.',
      invoices: invoices,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createInvoice = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
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
  });

  try {
    await invoice.save();
    res.status(201).json({
      invoice,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getInvoice = async (req, res, next) => {
  const invoiceId = req.params.invoiceId;
  const invoice = await post.findById(invoiceId);
  try {
    if (!invoice) {
      const error = new Error('Could not find invoice.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Invoice fetched.', invoice: invoice });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateInvoice = async (req, res, next) => {
  const invoiceId = req.params.invoiceId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
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
      const error = new Error('Could not find invoice.');
      error.statusCode = 404;
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
};

exports.deleteInvoice = async (req, res, next) => {
  const invoiceId = req.params.invoiceId;
  try {
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      const error = new Error('Could not find invoice.');
      error.statusCode = 404;
      throw error;
    }
    await Invoice.findByIdAndRemove(invoiceId);
    res.status(200).json({ message: 'Invoice deleted.' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
