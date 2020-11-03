import * as types from './types';

export const loaderOn = () => ({
  type: types.LOADER_ON,
});

export const loaderOff = () => ({
  type: types.LOADER_OFF,
});

export const toasterOn = ({ message, type }) => ({
  type: types.TOASTER_ON,
  payload: { message, type },
});

export const toasterOff = ({ message, type }) => ({
  type: types.TOASTER_OFF,
  payload: { message, type },
});
