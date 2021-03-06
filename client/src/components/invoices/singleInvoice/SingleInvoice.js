import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { fetchInvoice, deleteInvoice } from '../store/actions';
import ModalPop from '../../layout/modalPop/ModalPop';
import Loader from '../../layout/loader/Loader';
import logo from '../../../assets/logo.png';

import './SingleInvoice.scss';

const SingleInvoice = ({ match }) => {
  const { invoice } = useSelector(({ invoices }) => invoices);
  const { isLoading } = useSelector(({ shared }) => shared);

  const [show, setShow] = useState(false);
  const [idInvoice, setId] = useState();
  const handleClose = () => setShow(false);

  const invoiceId = match.params.id;
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInvoice(invoiceId));
  }, [dispatch, invoiceId]);

  const deleteInvoiceHandler = (invoiceId) => {
    dispatch(deleteInvoice(invoiceId, history));
  };

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

  const exportToPdfInvoice = () => {
    html2canvas(document.querySelector('#capture')).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 5, 190, 160);
      pdf.save(`Invoice nr: ${invoiceNumber}.pdf`);
    });
  };

  const printInvoice = () => {
    html2canvas(document.querySelector('#capture')).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 5, 190, 160);
      pdf.autoPrint();
      window.open(pdf.output('bloburl'), '_blank');
    });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className='invoice__generator'>
      {show && (
        <ModalPop
          idInvoice={idInvoice}
          closeModal={handleClose}
          show={show}
          deleteInvoiceHandler={deleteInvoiceHandler}
        />
      )}
      <p
        className='btn btn-sm btn-white m-b-10 p-l-5 action__invoice'
        onClick={exportToPdfInvoice}
      >
        <i className='fa fa-file t-plus-1 text-danger fa-fw fa-lg'></i> Export
        as PDF
      </p>
      <p
        className='btn btn-sm btn-white m-b-10 p-l-5 action__invoice'
        onClick={printInvoice}
      >
        <i className='fa fa-print t-plus-1 fa-fw fa-lg'></i> Print Invoice
      </p>
      <p
        className='btn btn-sm btn-white m-b-10 p-l-5 action__invoice'
        onClick={() => {
          setShow(true);
          setId(_id);
        }}
      >
        <i className='fas fa-trash-alt t-plus-1 fa-fw fa-lg'></i> Delete Invoice
      </p>
      <p className='btn btn-sm btn-white m-b-10 p-l-5 action__invoice editInvoice__button'>
        <NavLink to={`/invoices/edit/${_id}`}>
          <i className='fas fa-edit t-plus-1 fa-fw fa-lg' />
          Edit Invoice
        </NavLink>
      </p>
      <div className='container inv my-5 py-5 invoice__page' id='capture'>
        <div className='row'>
          <div className='col-xs-6 col-md-3'></div>
          <div className='col-xs-6 col-md-9'></div>
        </div>
        <div className='row'>
          <div className='col-xs-6 col-md-8'>
            <img
              className='invoiceCompany__logo'
              src={logo}
              alt='invoiceApp logo'
            />
          </div>
          <div className='col-xs-6 col-md-4'>
            <h1 className='font-weight-lighter py-1 px-3 invoice__titleMain'>
              INVOICE
            </h1>
          </div>
        </div>
        <div className='row contact__details'>
          <div className='col-xs-4 col-md-4 seller__details'>
            <p className='mb-2 invoice__title'>INVOICER</p>
            <h3>
              <p className='mb-0'>{SellerCompanyName} </p>
            </h3>
            <p className='mb-0'>{SellerCompanyStreet} </p>
            <p className='mb-0'>
              {SellerCompanyZip} {SellerCompanyCity}
            </p>
            <p className='mb-0'>Vat: {SellerCompanyVat}</p>
            <p className='mb-0'>Cell: {SellerCompanyPhone}</p>
          </div>
          <div className='col-xs-4 col-md-4 buyer__details'>
            <p className='mb-2 invoice__title'>INVOICE TO</p>
            <h6>
              <p className='mb-0'>{BuyerCompanyName} </p>
            </h6>
            <p className='mb-0'>{BuyerCompanyStreet} </p>
            <p className='mb-0'>
              {BuyerCompanyZip} {BuyerCompanyCity}
            </p>
            <p className='mb-0'>Vat: {BuyerCompanyVat}</p>
            <p className='mb-0'>Cell: {BuyerCompanyPhone}</p>
          </div>

          <div className='col-xs-4 col-md-4 invoice__createDetails'>
            <div className='row'>
              <div className='col-lg-12'>
                <table>
                  <tbody>
                    <tr>
                      <td>Invoice No</td>
                      <td className='px-3'>:</td>
                      <td>{invoiceNumber}</td>
                    </tr>
                    <tr>
                      <td>Date</td>
                      <td className='px-3'>:</td>
                      <td>{dateInvoice}</td>
                    </tr>
                    <tr>
                      <td>City</td>
                      <td className='px-3'>:</td>
                      <td>{cityInvoice}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            <table className='table table-striped table__positions'>
              <thead>
                <tr>
                  <th scope='col'>NO</th>
                  <th scope='col'>ITEM DESCREPTION</th>
                  <th scope='col'>UNIT COST</th>
                  <th scope='col'>QTY</th>
                  <th scope='col'>PRICE EX VAT</th>
                  <th scope='col'> VAT %</th>
                  <th scope='col'>TOTAL</th>
                </tr>
              </thead>
              <tbody>
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
                      <tr key={id}>
                        <td>{id + 1} </td>
                        <td>
                          <b>{productName}</b>
                        </td>
                        <td>
                          {unitCost} {currency}
                        </td>
                        <td>{qty}</td>
                        <td>
                          {priceNoVat} {currency}
                        </td>
                        <td>{vat} %</td>
                        <td>
                          {totalMoney} {currency}
                        </td>
                      </tr>
                    );
                  })}

                <tr>
                  <td colSpan='5'></td>
                  <td>
                    <b>SUB Total</b>
                  </td>
                  <td>
                    <b>
                      {sub_total} {currency}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td colSpan='5'></td>
                  <td>
                    <b>TAX VAT AMOUNT</b>
                  </td>
                  <td>
                    <b>
                      {tax_amountTotal} {currency}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td colSpan='5'></td>
                  <td>
                    <b>GRAND TOTAL</b>
                  </td>
                  <td>
                    <b>
                      {total_amount} {currency}
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-lg-6'>
            <div className='invoice-note'>
              * Make invoice payable to {SellerCompanyName}
              <br></br>* Payment is due within 14 days<br></br>* If you have any
              questions concerning this invoice, contact {SellerCompanyName}{' '}
              cell: {SellerCompanyPhone}
            </div>
          </div>
          <div className='col-lg-3'></div>
          <div className='col-lg-3 text-center signature__main'>
            <p className='signature'>signature</p>
            <p className='signature__company'>{SellerCompanyName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleInvoice;
