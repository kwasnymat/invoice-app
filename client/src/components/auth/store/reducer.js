import * as types from './types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  user: null,
  errorMessage: {},
  errorStatus: null,
  idMessage: null,
  isLoadingUser: false,
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOADING:
      return {
        ...state,
        isLoadingUser: true,
      };
    case types.USER_LOADED:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
        isLoadingUser: false,
      };
    case types.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
      };
    case types.AUTH_ERROR:
    case types.LOGIN_FAIL:
    case types.LOGOUT_SUCCESS:
    case types.REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuth: false,
      };
    case types.GET_ERRORS:
      return {
        errorMessage: action.payload.errorMessage,
        errorStatus: action.payload.errorStatus,
        idMessage: action.payload.idMessage,
      };
    case types.CLEAR_ERRORS:
      return {
        errorMessage: {},
        errorStatus: null,
        idMessage: null,
      };
    default:
      return state;
  }
};

export default invoiceReducer;
