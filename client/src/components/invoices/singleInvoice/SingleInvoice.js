import React from 'react';

import './SingleInvoice.scss';

const SingleInvoice = () => {
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
                <i className='fa fa-print t-plus-1 fa-fw fa-lg'></i> Print
                Invoice
              </a>
            </span>
            (Company Name)
          </div>

          <div className='invoice-header'>
            <div className='invoice-from'>
              <small>Seller</small>
              <address className='m-t-5 m-b-5'>
                <strong className='text-inverse'>(Company name)</strong>
                <br></br>
                (Street)<br></br>
                (Zip Code, City) <br></br>
                (Vat Id)<br></br>
                (Phone number)
              </address>
            </div>
            <div className='invoice-to'>
              <small>Buyer</small>
              <address className='m-t-5 m-b-5'>
                <strong className='text-inverse'>(Company name)</strong>
                <br></br>
                (Street)<br></br>
                (Zip Code, City) <br></br>
                (Vat Id)<br></br>
                (Phone number)
              </address>
            </div>
            <div className='invoice-date'>
              <small>Invoice </small>
              <div className='date text-inverse m-t-5'>(Invoice date)</div>
              <div className='invoice-detail'>
                (Invoice number)<br></br>
              </div>
            </div>
          </div>

          <div className='invoice-content'>
            <div className='table-responsive'>
              <table className='table table-invoice'>
                <thead>
                  <tr>
                    <th>(Products)</th>

                    <th className='text-center' width='10%'>
                      (Unit cost)
                    </th>
                    <th className='text-center' width='10%'>
                      (Qty)
                    </th>
                    <th className='text-center' width='10%'>
                      (Price excluding VAT)
                    </th>
                    <th className='text-center' width='10%'>
                      (VAT %)
                    </th>
                    <th className='text-right' width='20%'>
                      (Price including VAT)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className='text-inverse'>(products name)</span>
                    </td>
                    <td className='text-center'>(1 )</td>
                    <td className='text-center'>(2 )</td>
                    <td className='text-right'>(2)</td>
                    <td className='text-right'>(23)</td>
                    <td className='text-right'>(22)</td>
                  </tr>
                  <tr>
                    <td>
                      <span className='text-inverse'>(products name)</span>
                      <br></br>
                    </td>
                    <td className='text-center'>(1 )</td>
                    <td className='text-center'>(2 )</td>
                    <td className='text-right'>(2)</td>
                    <td className='text-right'>(23)</td>
                    <td className='text-right'>(22)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='invoice-price'>
              <div className='invoice-price-left'>
                <div className='invoice-price-row'>
                  <div className='sub-price'>
                    <small>(Subtotal)</small>
                    <span className='text-inverse'>(45)</span>
                  </div>
                  <div className='sub-price'>
                    <i className='fa fa-plus text-muted'></i>
                  </div>
                  <div className='sub-price'>
                    <small>(Tax value)</small>
                    <span className='text-inverse'>(3)</span>
                  </div>
                </div>
              </div>
              <div className='invoice-price-right'>
                <small>(Grand total)</small>{' '}
                <span className='f-w-600'>(43)</span>
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
