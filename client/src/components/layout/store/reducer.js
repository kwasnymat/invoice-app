import * as types from './types';

const initialState = {
  isLoading: false,
  isVisible: false,
  message: '',
  type: '',
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
        type: action.payload.type,
        isVisible: true,
      };
    case types.TOASTER_OFF:
      return {
        ...state,
        isVisible: false,
        message: action.payload.message,
        type: action.payload.type,
      };
    default:
      return state;
  }
};

export default sharedReducer;
