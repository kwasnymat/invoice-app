import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { fetchInvoices, deleteInvoice, saveQuery } from './store/actions';
import { Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import FilterBar from '../layout/filterBar/FilterBar';
import Loader from '../layout/loader/Loader';
import ModalPop from '../layout/modalPop/ModalPop';
import './Invoices.scss';

const Invoices = () => {
  const { invoices, currentPage, totalPages, allInvoices, query } = useSelector(
    ({ invoices }) => invoices
  );

  const [show, setShow] = useState(false);
  const [idInvoice, setId] = useState();
  const handleClose = () => setShow(false);

  const { isLoading } = useSelector(({ shared }) => shared);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInvoices());
    dispatch(saveQuery(''));
  }, [dispatch]);

  const deleteInvoiceHandler = (invoiceId) => {
    dispatch(deleteInvoice(invoiceId, history));
  };

  const handlePageClick = (values) => {
    const url = new URLSearchParams({ page: values }).toString();
    dispatch(fetchInvoices(`?${url}&${query}`));
  };

  const totalItems = totalPages * invoices.length;
  const generaterInvoices = () => (
    <Table responsive='sm custab'>
      <thead className='invoices__thead'>
        <tr>
          <th className='text-center'> Invoice number</th>
          <th className='text-center'> Invoice date</th>
          <th className='text-center'> Recipient</th>
          <th className='text-center'> Vat amount </th>
          <th className='text-center'> Total amount</th>
          <th className='text-center'> Action</th>
        </tr>
      </thead>
      {invoices.map((invoice) => {
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
          <tbody key={_id} className='recipment__details'>
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
                  onClick={() => {
                    setShow(true);
                    setId(_id);
                  }}
                  className='fas fa-trash-alt deleteId_button'
                />
              </td>
            </tr>
          </tbody>
        );
      })}
    </Table>
  );
  const isInvoicesListEmpty = !invoices.length && !isLoading && (
    <Navbar className='invoice__noMatch custab'>
      <span>
        There is no match for your search. Please revise your filters and try
        again.
      </span>
    </Navbar>
  );

  return (
    <>
      <FilterBar allInvoices={allInvoices} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className='row'>
          {show && (
            <ModalPop
              idInvoice={idInvoice}
              closeModal={handleClose}
              show={show}
              deleteInvoiceHandler={deleteInvoiceHandler}
            />
          )}
          <div className='col-lg-12'>
            {invoices.length !== 0 && generaterInvoices()}
            {isInvoicesListEmpty}
            <div className='pagination'>
              {invoices.length !== 0 && (
                <Pagination
                  activeLinkClass='active__page'
                  activePage={currentPage}
                  itemsCountPerPage={invoices.length}
                  totalItemsCount={totalItems}
                  pageRangeDisplayed={totalPages}
                  onChange={handlePageClick}
                  itemClass='page-item'
                  linkClass='page-link'
                  firstPageText='First'
                  lastPageText='Last'
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Invoices;
