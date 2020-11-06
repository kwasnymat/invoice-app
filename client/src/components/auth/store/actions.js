import axios from 'axios';

import * as types from './types';

import { loaderOff, loaderOn, toasterOn } from '../../layout/store/actions';

export const registerUserSuccess = (payload) => {
  return {
    type: types.REGISTER_USER,
    payload,
  };
};

export const registerUserFail = (payload) => {
  return {
    type: types.REG_FAILED,
    payload,
  };
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const response = await axios.put(
      'http://localhost:8080/auth/signup',
      userData
    );
    const { message } = response.data;
    const status = response.status;
    console.log(response);
    dispatch(loaderOff());
    dispatch(registerUserSuccess(response.data));
    dispatch(toasterOn(message, status));
  } catch (err) {
    dispatch(registerUserFail(err.response.data.message));
    dispatch(toasterOn(err.response.data.message));
    dispatch(loaderOff());
  }
};
