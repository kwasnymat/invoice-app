import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { fetchInvoices, deleteInvoice } from './store/actions';

import { Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

import Loader from '../layout/loader/Loader';
import { useHistory } from 'react-router-dom';
import './Invoices.scss';

const Invoices = () => {
  const { invoices, currentPage, totalItems } = useSelector(
    ({ invoices }) => invoices
  );

  const { isLoading } = useSelector(({ shared }) => shared);
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  const deleteInvoiceHandler = (invoiceId) => {
    dispatch(deleteInvoice(invoiceId, history));
  };

  const handlePageClick = (values) => {
    dispatch(fetchInvoices(values));
  };

  const generaterInvoices = () =>
    invoices.map((invoice, id) => {
      const {
        invoiceNumber,
        dateInvoice,
        BuyerCompanyName,
        tax_amountTotal,
        total_amount,
        currency,
        _id,
      } = invoice;

      return (
        <tbody key={_id}>
          <tr>
            <td className='text-center'>{invoiceNumber}</td>
            <td className='text-center'>{dateInvoice}</td>
            <td className='text-center'>{BuyerCompanyName} </td>
            <td className='text-center'>
              {tax_amountTotal} {currency}
            </td>
            <td className='text-center'>
              {total_amount} {currency}
            </td>
            <td className='text-center'>
              <NavLink to={`/invoices/${_id}`}>
                <i className='fas fa-info-circle detailsId_button' />
              </NavLink>

              <i
                onClick={() => deleteInvoiceHandler(_id)}
                className='fas fa-trash-alt deleteId_button'
              />
            </td>
          </tr>
        </tbody>
      );
    });

  return isLoading ? (
    <Loader />
  ) : (
    <div className='row'>
      <div className='col-lg-12'>
        <Table responsive='sm custab'>
          <thead>
            <tr>
              <th className='text-center'> Invoice number</th>
              <th className='text-center'> Invoice date</th>
              <th className='text-center'> Recipient</th>
              <th className='text-center'> Vat amount </th>
              <th className='text-center'> Total amount</th>
              <th className='text-center'> Action</th>
            </tr>
          </thead>
          {generaterInvoices()}
        </Table>
      </div>
      <div className='pagination'>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={5}
          totalItemsCount={totalItems}
          pageRangeDisplayed={5}
          onChange={handlePageClick}
          itemClass='page-item'
          linkClass='page-link'
          firstPageText='First'
          lastPageText='Last'
        />
      </div>
    </div>
  );
};
export default Invoices;
