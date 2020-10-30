import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchInvoice } from '../../store/actions.js';

import './SingleInvoice.scss';

const SingleInvoice = ({ match }) => {
  const { invoice } = useSelector(({ invoices }) => invoices);

  const dispatch = useDispatch();
  useEffect(() => {
    const invoiceId = match.params.id;
    dispatch(fetchInvoice(invoiceId));
  }, [dispatch, match.params.id]);

  const {
    _id,
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
  } = invoice;

  return (
    <div className='container'>
      <div className='col-md-12'>
        <div className='invoice'>
          <div className='invoice-company text-inverse f-w-600'>
            <span className='pull-right hidden-print'>
              <a href='/' className='btn btn-sm btn-white m-b-10 p-l-5'>
                <i className='fa fa-file t-plus-1 text-danger fa-fw fa-lg'></i>{' '}
                Export as PDF
              </a>
              <a href='/' className='btn btn-sm btn-white m-b-10 p-l-5'>
                <i className='fa fa-print t-plus-1 fa-fw fa-lg'></i> Prissnt
                Invoice
              </a>
              <NavLink to={`/invoices/edit/${_id}`}>
                <span className='glyphicon glyphicon-edit'>Editsssss</span>
              </NavLink>
            </span>
          </div>

          <div className='invoice-header'>
            <div className='invoice-from'>
              <small>Seller</small>
              <address className='m-t-5 m-b-5'>
                <strong className='text-inverse'>{SellerCompanyName}</strong>
                <br></br>
                {SellerCompanyStreet}
                <br></br>
                {SellerCompanyZip}
                {SellerCompanyCity} <br></br>
                {SellerCompanyVat}
                <br></br>
                {SellerCompanyPhone}
              </address>
            </div>
            <div className='invoice-to'>
              <small>Buyer</small>
              <address className='m-t-5 m-b-5'>
                <strong className='text-inverse'> {BuyerCompanyName}</strong>
                <br></br>
                {BuyerCompanyStreet}
                <br></br>
                {BuyerCompanyZip} {BuyerCompanyCity} <br></br>
                {BuyerCompanyVat}
                <br></br>
                {BuyerCompanyPhone}
              </address>
            </div>
            <div className='invoice-date'>
              <small>Invoice </small>
              <div className='date text-inverse m-t-5'> {invoiceNumber}</div>
              <div className='invoice-detail'>
                {dateInvoice}
                <br></br>
                {cityInvoice}
              </div>
            </div>
          </div>

          <div className='invoice-content'>
            <div className='table-responsive'>
              <table className='table table-invoice'>
                <thead>
                  <tr>
                    <th>Products</th>

                    <th className='text-center' width='10%'>
                      Unit cost
                    </th>
                    <th className='text-center' width='10%'>
                      Qty
                    </th>
                    <th className='text-center' width='10%'>
                      Price excluding VAT
                    </th>
                    <th className='text-center' width='10%'>
                      VAT %
                    </th>
                    <th className='text-right' width='20%'>
                      Price including VAT
                    </th>
                  </tr>
                </thead>
                {items &&
                  items.map((item, id) => {
                    const {
                      productName,
                      unitCost,
                      qty,
                      priceNoVat,
                      vat,
                      totalMoney,
                    } = item;
                    return (
                      <tbody key={id}>
                        <tr>
                          <td className='text-center'>{productName}</td>
                          <td className='text-center'>
                            {unitCost} {currency}
                          </td>
                          <td className='text-center'>{qty}</td>
                          <td className='text-center'>
                            {priceNoVat} {currency}
                          </td>
                          <td className='text-center'>{vat} %</td>
                          <td className='text-center'>
                            {totalMoney} {currency}{' '}
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            </div>
            <div className='invoice-price'>
              <div className='invoice-price-left'>
                <div className='invoice-price-row'>
                  <div className='sub-price'>
                    <small>Subtotal</small>
                    <span className='text-inverse'>{sub_total}</span>
                  </div>
                  <div className='sub-price'>
                    <i className='fa fa-plus text-muted'></i>
                  </div>
                  <div className='sub-price'>
                    <small>Tax value</small>
                    <span className='text-inverse'>{tax_amountTotal})</span>
                  </div>
                </div>
              </div>
              <div className='invoice-price-right'>
                <small>Grand total</small>{' '}
                <span className='f-w-600'>{total_amount}</span>
              </div>
            </div>
          </div>

          <div className='invoice-note'>
            * Make invoice payable to (company name)<br></br>* Payment is due
            within 14 days<br></br>* If you have any questions concerning this
            invoice, contact (company name, email)
          </div>

          <br></br>
          <div className='invoice-footer'>
            <p className='text-center m-b-5 f-w-600'>
              THANK YOU FOR YOUR BUSINESS
            </p>
            <p className='text-center'>
              <span className='m-r-10'>
                <i className='fa fa-fw fa-lg fa-globe'></i> baxu.com
              </span>
              <span className='m-r-10'>
                <i className='fa fa-fw fa-lg fa-phone-volume'></i> tel
              </span>
              <span className='m-r-10'>
                <i className='fa fa-fw fa-lg fa-envelope'></i> email
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleInvoice;
