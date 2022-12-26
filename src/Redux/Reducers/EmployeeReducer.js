import { GET_EMPLOYEE_DATA, EDIT_EMPLOYEE_DATA, GET_WORK_EMPLOYEE_DATA,LOADING, LISTLOADING } from '../Types/types';

const initialState = {
  employeeData: {pageSize: 0, pageNum: 0, result:[], endOfList: false},
  editEmployeeData: null,
  isLoading: false,
  listLoading: false,
  workDataGet: null,
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
      case GET_WORK_EMPLOYEE_DATA:
        return {
          ...state,
          workDataGet: action.payload,
        };
    case LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
      case LISTLOADING:
        return {
          ...state,
          listLoading: action.payload,
        };
    default:
      return state;
  }
};

export default EmployeeReducer;
