import * as types from './types';

const initialState = {
  invoices: [],
  allInvoices: [],
  invoice: {},
  currentPage: 1,
  totalPages: 1,
  query: '',
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_INVOICES:
      return {
        ...state,
        invoices: action.payload.invoices,
        allInvoices: action.payload.allInvoices,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    case types.FETCH_INVOICE:
      return {
        ...state,
        invoice: action.payload,
      };
    case types.SAVE_QUERY:
      return {
        ...state,
        query: action.payload,
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
