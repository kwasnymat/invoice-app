import * as types from './types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  isLoading: false,
  user: null,
  errorMessage: {},
  errorStatus: null,
  idMessage: null,
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case types.USER_LOADED:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        user: action.payload,
      };
    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        isLoading: false,
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
        isLoading: false,
      };
    case types.GET_ERRORS:
      return {
        errorMessage: action.payload.msg,
        errorStatus: action.payload.status,
        idMessage: action.payload.id,
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
