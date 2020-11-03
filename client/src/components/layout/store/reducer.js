import * as types from './types';

const initialState = {
  isLoading: false,
  isToasterVisible: false,
  message: '',
  status: '',
};

const sharedReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADER_ON:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOADER_OFF:
      return {
        ...state,
        isLoading: false,
      };
    case types.TOASTER_ON:
      return {
        ...state,
        message: action.payload.message,
        status: action.payload.status,
        isToasterVisible: true,
      };
    case types.TOASTER_OFF:
      return {
        ...state,
        isToasterVisible: false,
        message: action.payload.message,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export default sharedReducer;
