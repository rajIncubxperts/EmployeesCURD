import { GET_EMPLOYEE_DATA, EDIT_EMPLOYEE_DATA } from '../Types/types';

const initialState = {
    employeeData: null,
    editEmployeeData: null,
};

const EmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMPLOYEE_DATA:
            return {
                ...state,
                employeeData: action.payload,
            };

        default:
            return state;
    }
};

export default EmployeeReducer;
