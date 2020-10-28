exports.getInvoice = (req, res, next) => {
  res.status(200).json({
    invoices: [
      {
        _id: '1',
        invoiceNumber: '238/16',
        dateInvoice: '2020-01-02',
        cityInvoice: 'Bielsko-Biała',
        SellerCompanyName: 'Bax Spółka Akcyjna',
        SellerCompanyStreet: 'Korfantego 1/12',
        SellerCompanyZip: '40-004',
        SellerCompanyCity: 'Katowice',
        SellerCompanyVat: '928272628262',
        SellerCompanyPhone: '262526272',
        BuyerCompanyName: 'Wall District',
        BuyerCompanyStreet: 'Cansas 20',
        BuyerCompanyZip: '098272',
        BuyerCompanyCity: 'Warszawa',
        BuyerCompanyVat: '82728276282',
        BuyerCompanyPhone: '827625282',
        currency: '$',
        sub_total: '20222',
        tax_amountTotal: '1200',
        total_amount: '30200',
        items: [
          {
            productName: 'Biurko',
            unitCost: '200',
            qty: '3',
            priceNoVat: '100',
            vat: '23',
            totalMoney: '200',
          },
        ],
      },
    ],
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
