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
    console.log(`http://localhost:8080/feed/invoices/${invoiceId}`);

    await axios.put(
      `http://localhost:8080/feed/invoices/${invoiceId}`,
      invoiceData
    );
  } catch (err) {
    console.log(err);
  }
};
