import * as types from './types';

export const loaderOn = () => ({
  type: types.LOADER_ON,
});

export const loaderOff = () => ({
  type: types.LOADER_OFF,
});

export const toasterOn = (message, status) => ({
  type: types.TOASTER_ON,
  payload: { message, status },
});

export const toasterOff = (message, status) => ({
  type: types.TOASTER_OFF,
  payload: { message, status },
});
