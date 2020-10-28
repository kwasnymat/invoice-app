import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchInvoices } from './store/actions';

import { Card, CardDeck } from 'react-bootstrap';

const Invoices = () => {
  const { invoices } = useSelector(({ invoices }) => invoices);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  console.log(invoices);

  const generaterInvoices = () =>
    invoices.map((invoice) => (
      <tbody key={invoice._id}>
        <tr id='addr0'>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>a </td>
          <td>a</td>
        </tr>
      </tbody>
    ));

  return (
    <div className='row'>
      <div className='col-lg-12'>
        <table className='table table-bordered table-hover' id='tab_logic'>
          <thead>
            <tr>
              <th className='text-center'> Invoice number</th>
              <th className='text-center'> Product name</th>
              <th className='text-center'> Unit Cost</th>
              <th className='text-center'> Qty </th>
              <th className='text-center'> Price excluding VAT</th>
              <th className='text-center'> VAT %</th>
              <th className='text-center'> Price including VAT </th>
            </tr>
          </thead>
          {generaterInvoices()}
        </table>
      </div>
    </div>
  );
};
export default Invoices;
