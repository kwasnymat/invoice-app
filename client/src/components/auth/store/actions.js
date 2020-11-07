import axios from 'axios';
import { get } from 'react-hook-form';

import * as types from './types';

// import { loaderOff, loaderOn, toasterOn } from '../../layout/store/actions';

// export const registerUserSuccess = (payload) => {
//   return {
//     type: types.REGISTER_USER,
//     payload,
//   };
// };

// export const registerUserFail = (payload) => {
//   return {
//     type: types.REG_FAILED,
//     payload,
//   };
// };

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

export const loadUser = () => async (dispatch, getState) => {
  dispatch(userLoading());
  const token = getState().auth.token;
  const configuration = {
    headers: {
      'Content=type': 'application/json',
    },
  };
  if (token) {
    configuration.headers['x-auth-token'] = token;
  }
  try {
    const response = await axios.get(
      'http://localhost:8080/auth/user',
      configuration
    );
    dispatch(userLoaded(response.data));
  } catch (err) {
    dispatch(
      getErrors(
        err.response
        // err.response.data,
        // err.response.status
      )
    );
    dispatch({
      type: types.AUTH_ERROR,
    });
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    // dispatch(loaderOn());
    const response = await axios.put(
      'http://localhost:8080/auth/signup',
      userData
    );
    const { message } = response.data;
    const status = response.status;
    console.log(response);
    // dispatch(loaderOff());
    // dispatch(registerUserSuccess(response.data));
    // dispatch(toasterOn(message, status));
  } catch (err) {
    // dispatch(registerUserFail(err.response.data.message));
    // dispatch(toasterOn(err.response.data.message));
    // dispatch(loaderOff());
  }
};
