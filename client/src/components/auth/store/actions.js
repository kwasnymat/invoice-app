import axios from 'axios';

import * as types from './types';

// import { loaderOff, loaderOn, toasterOn } from '../../layout/store/actions';

export const getErrors = (errorMessage, errorStatus, idMessage = null) => {
  return {
    type: types.GET_ERRORS,
    payload: { errorMessage, errorStatus, idMessage },
  };
};

export const clearErrors = () => {
  return {
    type: types.CLEAR_ERRORS,
  };
};

export const userLoaded = (payload) => {
  return {
    type: types.USER_LOADED,
    payload,
  };
};
export const userLoading = () => {
  return {
    type: types.USER_LOADING,
  };
};

export const userRegisteredSuccess = (res) => {
  return {
    type: types.REGISTER_SUCCESS,
    payload: res,
  };
};

export const userLoginSuccess = (res) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: res,
  };
};

export const logout = () => ({
  type: types.LOGOUT_SUCCESS,
});

export const loadUser = () => async (dispatch, getState) => {
  dispatch(userLoading());
  try {
    const response = await axios.get(
      'http://localhost:8080/auth/user',
      tokenConfig(getState)
    );
    dispatch(userLoaded(response.data));
  } catch (err) {
    dispatch(getErrors(err.response.data.message, err.response.status));
    dispatch({
      type: types.AUTH_ERROR,
    });
  }
};
export const loginUser = (userData, history) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/auth/login',
      userData
    );
    history.push(`/invoices/`);
    dispatch(userLoginSuccess(response.data));
  } catch (err) {
    dispatch(
      getErrors(err.response.data.message, err.response.status, 'LOGIN_FAIL')
    );
    dispatch({
      type: types.LOGIN_FAIL,
    });
  }
};

export const registerUser = (userData, history) => async (dispatch) => {
  try {
    const response = await axios.put(
      'http://localhost:8080/auth/signup',
      userData
    );
    history.push(`/invoices/`);
    // const { message } = response.data;
    // const status = response.status;
    // console.log(response);
    // dispatch(loaderOff());
    dispatch(userRegisteredSuccess(response.data));
    // dispatch(toasterOn(message, status));
  } catch (err) {
    dispatch(
      getErrors(err.response.data.message, err.response.status, 'REGISTER_FAIL')
    );
    dispatch({
      type: types.REGISTER_FAIL,
    });
  }
};

export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
