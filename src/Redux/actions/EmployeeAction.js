import axios from 'axios';
import { BASE_URL } from '../../Config/config';
import { GET_EMPLOYEE_DATA, EDIT_EMPLOYEE_DATA, LOADING, GET_WORK_EMPLOYEE_DATA } from './../Types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getEmployeeAction = () => {
  return async dispatch => {
    await dispatch(loadingState(true));
    const getParseData = await AsyncStorage.getItem('userInfo');
    const convertPaeseData = JSON.parse(getParseData);
    axios
      .get(`${BASE_URL}/Employee`, {
        headers: {
          Authorization:
            convertPaeseData == null ? '' : `Bearer ${convertPaeseData.result}`,
        },
      })
      .then(async res => {
        let resData = res.data;
        console.log('Get Employee Data ', resData);
        await dispatch(getEmployeeResponseData(resData.result));
        await dispatch(loadingState(false));
      })
      .catch(e => {
        dispatch(loadingState(false));
        console.log(`Get Employee error ${e}`);
      });
  };
};

export const deleteEmployeeAction = id => {
  return async dispatch => {
    await dispatch(loadingState(true))
    const getParseData = await AsyncStorage.getItem('userInfo');
    const convertPaeseData = JSON.parse(getParseData);
    axios
      .delete(`${BASE_URL}/Employee/${id}`, {
        headers: {
          Authorization:
            convertPaeseData == null ? '' : `Bearer ${convertPaeseData.result}`,
        },
      })
      .then(async res => {
        let resData = res.data;
        console.log('Edit Employee Data ', resData);
        await dispatch(getEmployeeAction());
        await dispatch(loadingState(false))
      })
      .catch(e => {
        dispatch(loadingState(false))
        console.log(`Get Employee error ${e}`);
      });
  };
};

export const createEmployeeAction = (tempData, props) => {
  return async dispatch => {
    await dispatch(loadingState(true))
    const getParseData =  await AsyncStorage.getItem('userInfo');
    const convertPaeseData = JSON.parse(getParseData);
    axios
      .post(`${BASE_URL}/Employee`, tempData, {
        headers: {
          Authorization:
            convertPaeseData == null ? '' : `Bearer ${convertPaeseData.result}`,
        },
      })
      .then(async res => {
        let resData = res.data;
      // var test =   await editEmployeeResponseData(resData);
        console.log('Edit Employee Data POST API ', resData);
        //dispatch(res.data);
        //console.log("Test ID", test)

        //props.navigation.goBack()
      })
      .catch(e => {
        dispatch(loadingState(false));
        console.log(`Get Employee error ${e}`);
      });
  };
}

export const editEmployeeAction = id => {
  return async dispatch => {
    await dispatch(loadingState(true))
    const getParseData = await AsyncStorage.getItem('userInfo');
    const convertPaeseData = JSON.parse(getParseData);
    axios
      .get(`${BASE_URL}/Employee/${id}`, {
        headers: {
          Authorization:
            convertPaeseData == null ? '' : `Bearer ${convertPaeseData.result}`,
        },
      })
      .then(async res => {
        let resData = res.data;
        console.log('Edit Employee Data ', resData);
        // You can invoke sync or async actions with `dispatch`
        await dispatch(editEmployeeResponseData(resData.result));
        await dispatch(getWorkEmployeeAction(resData.result?.id));
      })
      .catch(e => {
        dispatch(loadingState(false))
        console.log(`Get Employee error ${e}`);
      });
  };
};

export const getWorkEmployeeAction = id => {
  return async dispatch => {
    const getParseData = await AsyncStorage.getItem('userInfo');
    const convertPaeseData = JSON.parse(getParseData);
    axios
      .get(`${BASE_URL}/EmployeeWorkExperience/${id}`, {
        headers: {
          Authorization:
            convertPaeseData == null ? '' : `Bearer ${convertPaeseData.result}`,
        },
      })
      .then(async res => {
        let resData = res.data;
        console.log('Get Work Details Data ', resData);
        // You can invoke sync or async actions with `dispatch`
        await dispatch(getWorkEmployeeResponseData(resData.result));
        await dispatch(loadingState(false))
        global.actionType = ""
      })
      .catch(e => {
        dispatch(loadingState(false))
        console.log(`Get Employee error ${e}`);
      });
  };
};

export const updateWorkAction = data => {
  return async dispatch => {
    await dispatch(loadingState(true))
    const getParseData = await AsyncStorage.getItem('userInfo');
    const convertPaeseData = JSON.parse(getParseData);
    const dataPass = data
    axios
      .put(`${BASE_URL}/EmployeeWorkExperience`, dataPass, {
        headers: {
          Authorization:
            convertPaeseData == null ? '' : `Bearer ${convertPaeseData.result}`,
        },
      })
      .then(async res => {
        let resData = res.data;
        console.log('Updated Get Work ', resData);
        // You can invoke sync or async actions with `dispatch`
        global.actionType = "edit"
        await dispatch(getWorkEmployeeAction(dataPass?.employeeId));
      })
      .catch(async e => {
        dispatch(loadingState(false))
        console.log(`UPDATE Employee error ${e}`);
      });
  };
};

export const addWorkAction = data => {
  return async dispatch => {
    await dispatch(loadingState(true))
    const getParseData = await AsyncStorage.getItem('userInfo');
    const convertPaeseData = JSON.parse(getParseData);
    const dataPass = data
    axios
      .post(`${BASE_URL}/EmployeesWorkExperience`, dataPass, {
        headers: {
          Authorization:
            convertPaeseData == null ? '' : `Bearer ${convertPaeseData.result}`,
        },
      })
      .then(async res => {
        let resData = res.data;
        console.log('Add Get Work ', {resData});
        // You can invoke sync or async actions with `dispatch`
        global.actionType = "edit"
        await dispatch(getWorkEmployeeAction(dataPass?.employeeId));
      })
      .catch(async e => {
        dispatch(loadingState(false))
        console.log(`ADdd Employee error ${e}`);
      });
  };
};

export const updateEmployeeAction = (tempData, props) => {
  return async dispatch => {
    await dispatch(loadingState(true))
    const getParseData = await AsyncStorage.getItem('userInfo');
    const convertPaeseData = JSON.parse(getParseData);
    axios
      .put(`${BASE_URL}/Employee`, tempData, {
        headers: {
          Authorization:
            convertPaeseData == null ? '' : `Bearer ${convertPaeseData.result}`,
        },
      })
      .then(async res => {
        let resData = res.data;
        console.log('Edit Employee Data ', resData);
        await editEmployeeResponseData(null);
        await dispatch(loadingState(false))
        props.navigation.goBack()
      })
      .catch(async e => {
        await dispatch(loadingState(false))
        console.log(`Get Employee error ${e}`);
      });
  };
};


export const getEmployeeResponseData = data => {
  return {
    type: GET_EMPLOYEE_DATA,
    payload: data,
  };
};

export const loadingState = data => {
  return {
    type: LOADING,
    payload: data,
  };
};

export const editEmployeeResponseData = data => {
  return {
    type: EDIT_EMPLOYEE_DATA,
    payload: data,
  };
};

export const getWorkEmployeeResponseData = data => {
  return {
    type: GET_WORK_EMPLOYEE_DATA,
    payload: data,
  };
};