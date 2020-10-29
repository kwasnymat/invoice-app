import axios from 'axios';

import * as types from './types';

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

export const fetchInvoices = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8080/feed/invoices');
    console.log(response.data);
    const { invoices } = response.data;
    dispatch(invoicesFetchSuccess(invoices));
  } catch (err) {
    console.log(err);
  }
};

export const fetchInvoice = (invoiceId) => async (dispatch) => {
  console.log(invoiceId);
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
    //   dispatch(loaderOn());
    await axios.post('http://localhost:8080/feed/invoice', invoice);
  } catch (err) {
    console.log(err);
  }
};
