import * as types from './types';

const initialState = {
  invoices: [],
  invoice: {},
  form: {},
  //   currentPage: 1,
  //   totalPages: 1,
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_INVOICES:
      return {
        ...state,
        invoices: action.payload.invoices,
        // currentPage: action.payload.currentPage,
        // totalPages: action.payload.totalPages,
      };
    case types.FETCH_INVOICE:
      return {
        ...state,
        invoice: action.payload,
      };
    case types.DELETE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.filter(
          (invoice) => invoice.id !== action.payload
        ),
      };
    case types.UPDATE_INVOICE:
      return {
        ...state,
        form: {
          ...state.form,
          [action.id]: action.value,
        },
      };
    default:
      return state;
  }
};

export default invoiceReducer;