import { GET_EMPLOYEE_DATA, EDIT_EMPLOYEE_DATA, LOADING } from '../Types/types';

const initialState = {
  employeeData: null,
  editEmployeeData: null,
  isLoading: false
};

const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_DATA:
      return {
        ...state,
        employeeData: action.payload,
      };
    case EDIT_EMPLOYEE_DATA:
      return {
        ...state,
        editEmployeeData: action.payload,
      };
    case LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default EmployeeReducer;
