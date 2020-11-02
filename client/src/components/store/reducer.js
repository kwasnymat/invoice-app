import * as types from './types';

const initialState = {
  invoices: [],
  invoice: {},
  currentPage: 1,
  totalItems: 1,
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_INVOICES:
      return {
        ...state,
        invoices: action.payload.invoices,
        currentPage: action.payload.currentPage,
        totalItems: action.payload.totalItems,
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
          (invoice) => invoice._id !== action.payload
        ),
      };
    case types.UPDATE_INVOICE:
      return {
        ...state,
        invoice: {
          ...state.invoice,
          [action.invoiceId]: action.invoiceData,
        },
      };
    default:
      return state;
  }
};

export default invoiceReducer;
