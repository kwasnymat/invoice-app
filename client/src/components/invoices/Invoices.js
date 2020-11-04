import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { fetchInvoices, deleteInvoice } from './store/actions';

import { Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import FilterBar from '../layout/filterBar/FilterBar';
import Loader from '../layout/loader/Loader';
import axios from 'axios';
import './Invoices.scss';

const Invoices = () => {
  const { invoices, currentPage, totalItems } = useSelector(
    ({ invoices }) => invoices
  );

  const { isLoading } = useSelector(({ shared }) => shared);
  const [dataInvoices, setData] = useState();
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  useEffect(() => {
    const fetchInvoicesAll = async () => {
      const allInvoices = await axios('http://localhost:8080/feed/invoicesAll');
      const { invoicesAll } = allInvoices.data;
      setData(invoicesAll);
    };

    fetchInvoicesAll();
  }, []);

  console.log(dataInvoices);
  //   console.log(dataInvoices.allInv);

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
                onClick={() => deleteInvoiceHandler(_id)}
                className='fas fa-trash-alt deleteId_button'
              />
            </td>
          </tr>
        </tbody>
      );
    });

  const isListEmpty = !invoices.length && !isLoading && (
    <Navbar bg='light'>
      <span style={{ fontSize: '1.25rem' }}>
        There is currently no match for your search. Please revise your search
        and try again.
      </span>
    </Navbar>
  );
  console.log(dataInvoices);
  return (
    <>
      {dataInvoices && <FilterBar dataInvoices={dataInvoices} />}
      {isListEmpty}
      {isLoading ? (
        <Loader />
      ) : (
        <div className='row'>
          <div className='col-lg-12'>
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
              {generaterInvoices()}
            </Table>
          </div>
          <div className='pagination'>
            <Pagination
              activeLinkClass='active__page'
              hideDisabled
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
      )}
    </>
  );
};
export default Invoices;
