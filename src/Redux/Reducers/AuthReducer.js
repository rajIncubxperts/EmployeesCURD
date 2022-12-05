import { AUTH_USER_DATA, ERROR, ERROR_FORM, ERROR_REG, LOADING } from '../Types/types';

const initialState = {
  userData: null,
  isLoading: false,
  error: {},
  errorReg: {},
  errorForm: {}
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ERROR_REG:
      return {
        ...state,
        errorReg: action.payload,
      };
    case ERROR_FORM:
      return {
        ...state,
        errorForm: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
