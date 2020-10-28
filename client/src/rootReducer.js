import { combineReducers } from 'redux';

import invoiceReducer from './components/invoices/store/reducer';
// import sharedReducer from './shared/store/reducer';

const rootReducer = combineReducers({
  invoices: invoiceReducer,
  //   shared: sharedReducer,
});

export default rootReducer;
