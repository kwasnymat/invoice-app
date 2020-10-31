import axios from 'axios';

import * as types from './types';

// export const invoicesFetchSuccess = (invoices, totalItems) => {
//   return {
//     type: types.FETCH_INVOICES,
//     payload: (invoices, totalItems),
//   };
// };
export const invoicesFetchSuccess = (invoices) => {
  return {
    type: types.FETCH_INVOICES,
    payload: { invoices },
  };
};
export const invoiceFetchSuccess = (invoice) => {
  return {
    type: types.FETCH_INVOICE,
    payload: invoice.data.invoice,
  };
};

export const invoiceDeleteSuccess = (invoiceId) => {
  return {
    type: types.DELETE_INVOICE,
    payload: invoiceId,
  };
};

export const invoiceUpdateSucces = (invoiceId, invoiceData) => {
  return {
    type: types.UPDATE_INVOICE,
    payload: (invoiceId, invoiceData),
  };
};

// export const fetchInvoices = (pageNumber = '1', queryUrl = '') => async (
//   dispatch
// ) => {
//   console.log(pageNumber);
//   try {
//     const response = await axios.get(
//       `http://localhost:8080/feed/invoices?page=` + pageNumber
//     );

//     const { invoices, totalItems, currentPage } = response.data;
//     dispatch(invoicesFetchSuccess(invoices, totalItems, currentPage));
//   } catch (err) {
//     console.log(err);
//   }
// };

export const fetchInvoices = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8080/feed/invoices');

    const { invoices } = response.data;
    dispatch(invoicesFetchSuccess(invoices));
  } catch (err) {
    console.log(err);
  }
};

export const fetchInvoice = (invoiceId) => async (dispatch) => {
  try {
    const invoice = await axios.get(
      `http://localhost:8080/feed/invoices/${invoiceId}`
    );
    dispatch(invoiceFetchSuccess(invoice));
  } catch (err) {
    console.log(err);
  }
};

export const addInvoice = (invoice) => async (dispatch) => {
  try {
    await axios.post('http://localhost:8080/feed/invoice', invoice);
  } catch (err) {
    console.log(err);
  }
};

export const editInvoice = (invoiceId, invoiceData) => async (dispatch) => {
  try {
    await axios.put(
      `http://localhost:8080/feed/invoices/${invoiceId}`,
      invoiceData
    );
    dispatch(invoiceUpdateSucces(invoiceId, invoiceData));
  } catch (err) {
    console.log(err);
  }
};

export const deleteInvoice = (invoiceId) => async (dispatch) => {
  console.log(invoiceId);
  try {
    console.log(invoiceId);
    console.log(`http://localhost:8080/feed/invoices/${invoiceId}`);
    await axios.delete(`http://localhost:8080/feed/invoices/${invoiceId}`);
    dispatch(invoiceDeleteSuccess(invoiceId));
  } catch (err) {
    console.log(err);
  }
};
