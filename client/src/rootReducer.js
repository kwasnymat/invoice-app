import { combineReducers } from 'redux';

import invoiceReducer from './components/invoices/store/reducer';
import sharedReducer from './components/layout/store/reducer';
import authReducer from './components/auth/store/reducer';

const rootReducer = combineReducers({
  invoices: invoiceReducer,
  shared: sharedReducer,
  auth: authReducer,
});

export default rootReducer;
