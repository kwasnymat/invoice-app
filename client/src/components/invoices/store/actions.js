import axios from 'axios';

import * as types from './types';

export const invoiceFetchSuccess = (invoices) => {
  return {
    type: types.FETCH_INVOICES,
    payload: { invoices },
  };
};

export const fetchInvoices = () => async (dispatch) => {
  try {
    // dispatch(loaderOn());
    const response = await axios.get('http://localhost:8080/feed/invoices');
    console.log(response.data);
    const { invoices } = response.data;
    console.log(invoices);
    // dispatch(loaderOff());
    dispatch(invoiceFetchSuccess(invoices));
  } catch (err) {
    console.log(err);
    // dispatch(loaderOff());
  }
};
