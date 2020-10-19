exports.getInvoice = (req, res, next) => {
  res.status(200).json({
    invoices: [{ invoiceNumber: 'First invoice', content: 'Paid bro' }],
  });
};

exports.createInvoice = (req, res, next) => {
  const invoiceNumber = req.body.invoiceNumber;
  const content = req.body.content;

  res.status(201).json({
    message: 'Invoice created',
    invoice: {
      id: new Date().toISOString(),
      invoiceNumber: invoiceNumber,
      content: content,
    },
  });
};
