// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
// import { fetchInvoices, deleteInvoice } from '../store/actions';

// import { Table } from 'react-bootstrap';
// import Pagination from 'react-js-pagination';

// import './Invoices.scss';

// const Invoices = () => {
//   //   const { invoices } = useSelector(({ invoices }) => invoices);
//   const { invoices, currentPage, totalPages } = useSelector(
//     // eslint-disable-next-line no-shadow
//     ({ players }) => players
//   );

//   const createQuery = (values) => {
//     const p = new URLSearchParams();
//     p.append('page', values || 1);
//     const page = p.toString();
//     return page && `?${page}`;
//   };

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(fetchInvoices());
//   }, [dispatch]);

//   const deleteInvoiceHandler = (invoiceId) => {
//     dispatch(deleteInvoice(invoiceId));
//   };

//   const handlePageClick = (values) => {
//     const queryString = createQuery(values);
//     dispatch(fetchInvoices(queryString));
//   };

//   const generaterInvoices = () =>
//     invoices.map((invoice, id) => {
//       const {
//         invoiceNumber,
//         dateInvoice,
//         BuyerCompanyName,
//         tax_amountTotal,
//         total_amount,
//         currency,
//         _id,
//       } = invoice;

//       return (
//         <tbody key={_id}>
//           <tr>
//             <td className='text-center'>{id + 1}</td>
//             <td className='text-center'>{invoiceNumber}</td>
//             <td className='text-center'>{dateInvoice}</td>
//             <td className='text-center'>{BuyerCompanyName} </td>
//             <td className='text-center'>
//               {tax_amountTotal} {currency}
//             </td>
//             <td className='text-center'>
//               {total_amount} {currency}
//             </td>
//             <td className='text-center'>
//               <NavLink to={`/invoices/${_id}`}>
//                 <span className='glyphicon glyphicon-edit'></span> Edit
//               </NavLink>
//               <a href='/' className='btn btn-danger btn-xs'>
//                 <span className='glyphicon glyphicon-remove'></span> Del
//               </a>
//               <button onClick={() => deleteInvoiceHandler(_id)}>delete</button>
//             </td>
//           </tr>
//         </tbody>
//       );
//     });

//   return (
//     <div className='row'>
//       <div className='col-lg-12'>
//         <Table responsive='sm custab'>
//           <thead>
//             <tr>
//               <th className='text-center'>#</th>
//               <th className='text-center'> Invoice number</th>
//               <th className='text-center'> Invoice date</th>
//               <th className='text-center'> Recipient</th>
//               <th className='text-center'> Vat amount </th>
//               <th className='text-center'> Total amount</th>
//               <th className='text-center'> Action</th>
//             </tr>
//           </thead>
//           {generaterInvoices()}
//         </Table>
//       </div>
//       <Pagination
//         hideDisabled
//         activePage={currentPage}
//         itemsCountPerPage={3}
//         totalItemsCount={invoices.length}
//         pageRangeDisplayed={3}
//         onChange={handlePageClick}
//         itemClass='page-item'
//         linkClass='page-link'
//         firstPageText='First'
//         lastPageText='Last'
//       />
//     </div>
//   );
// };
// export default Invoices;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchInvoices } from '../store/actions';

import { Table } from 'react-bootstrap';

import './Invoices.scss';

const Invoices = () => {
  const { invoices } = useSelector(({ invoices }) => invoices);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

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
            <td className='text-center'>{id + 1}</td>
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
                <span className='glyphicon glyphicon-edit'></span> Edit
              </NavLink>
              <a href='/' className='btn btn-danger btn-xs'>
                <span className='glyphicon glyphicon-remove'></span> Del
              </a>
            </td>
          </tr>
        </tbody>
      );
    });

  return (
    <div className='row'>
      <div className='col-lg-12'>
        <Table responsive='sm custab'>
          <thead>
            <tr>
              <th className='text-center'>#</th>
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
    </div>
  );
};
export default Invoices;
