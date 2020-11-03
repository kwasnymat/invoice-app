import axios from 'axios';

import * as types from './types';

import { loaderOff, loaderOn, toasterOn } from '../../layout/store/actions';

export const invoicesFetchSuccess = (invoices, totalItems, currentPage) => {
  return {
    type: types.FETCH_INVOICES,
    payload: { invoices, totalItems, currentPage },
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

export const fetchInvoices = (pageNumber) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const response = await axios.get(
      `http://localhost:8080/feed/invoices?page=${pageNumber}`
    );
    console.log(response);
    const { invoices, totalItems, currentPage } = response.data;
    dispatch(loaderOff());
    dispatch(invoicesFetchSuccess(invoices, totalItems, currentPage));
  } catch (err) {
    dispatch(loaderOff());
  }
};

export const fetchInvoice = (invoiceId) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const invoice = await axios.get(
      `http://localhost:8080/feed/invoices/${invoiceId}`
    );
    dispatch(loaderOff());
    dispatch(invoiceFetchSuccess(invoice));
  } catch (err) {
    dispatch(loaderOff());
  }
};

export const addInvoice = (invoiceData, history) => async (dispatch) => {
  console.log(invoiceData);
  try {
    dispatch(loaderOn());
    const response = await axios.post(
      'http://localhost:8080/feed/invoice',
      invoiceData
    );
    const { invoice } = response.data;
    dispatch(loaderOff());
    history.push(`/invoices/${invoice._id}`);
  } catch (err) {
    dispatch(loaderOff());
  }
};

export const editInvoice = (invoiceId, invoiceData, history) => async (
  dispatch
) => {
  try {
    dispatch(loaderOn());
    await axios.put(
      `http://localhost:8080/feed/invoices/${invoiceId}`,
      invoiceData
    );
    dispatch(invoiceUpdateSucces(invoiceId, invoiceData));
    dispatch(loaderOff());
    history.push(`/invoices/${invoiceId}`);
  } catch (err) {
    dispatch(loaderOff());
  }
};

export const deleteInvoice = (invoiceId) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    console.log(`http://localhost:8080/feed/invoices/${invoiceId}`);
    await axios.delete(`http://localhost:8080/feed/invoices/${invoiceId}`);
    dispatch(loaderOff());
    dispatch(invoiceDeleteSuccess(invoiceId));
  } catch (err) {
    dispatch(loaderOff());
  }
};
