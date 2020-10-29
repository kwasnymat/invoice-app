import { combineReducers } from 'redux';

import invoiceReducer from './components/store/reducer';
// import sharedReducer from './shared/store/reducer';

const rootReducer = combineReducers({
  invoices: invoiceReducer,
  //   shared: sharedReducer,
});

export default rootReducer;
