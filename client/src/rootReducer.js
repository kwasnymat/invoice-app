import { combineReducers } from 'redux';

import invoiceReducer from './components/invoices/store/reducer';
import sharedReducer from './components/layout/store/reducer';

const rootReducer = combineReducers({
  invoices: invoiceReducer,
  shared: sharedReducer,
});

export default rootReducer;
