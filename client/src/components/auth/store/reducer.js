import * as types from './types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: true,
  error: null,
  user: null,
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_USER:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        loading: false,
      };
    case types.REG_FAILED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default invoiceReducer;
