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
        // console.log('Edit Employee Data ', resData);
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
    const getParseData = await AsyncStorage.getItem('userInfo');
    const convertPaeseData = JSON.parse(getParseData);
    console.log("tempData", tempData);
    return axios
      .post(`${BASE_URL}/Employee`, tempData, {
        headers: {
          Authorization:
            convertPaeseData == null ? '' : `Bearer ${convertPaeseData.result}`,
        },
      })
      .then(async res => {
          console.log("res add", res);
        let resData = res.data;
        await dispatch(loadingState(false))
        props.navigation.goBack()
        return resData
      
      })
      .catch(e => {
        dispatch(loadingState(false));
        console.log(`Get Employee error ${e}`);
      });
  };
}


export const editEmployeeAction = id => {
  debugger;
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
        // console.log('Edit Employee Data ', resData);
        // You can invoke sync or async actions with `dispatch`
        await dispatch(editEmployeeResponseData(resData.result));
        await dispatch(getWorkEmployeeAction([resData.result?.id]));
        console.log("Rexcx>>>>>>>>>>" , (resData.result.id))
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
        //console.log('Get Work Details Data ', JSON.stringify(resData.result));
        // You can invoke sync or async actions with `dispatch`
        await dispatch(getWorkEmployeeResponseData(resData.result));
        //await dispatch(loadingState(false))
        global.actionType = ""
      })
      .catch(e => {
        dispatch(loadingState(false))
        console.log(`Get Employee error ${e}`);
      });
  };
};

export const updateWorkAction = (data) => {
  debugger;
  console.log("update data",data)
  return async dispatch => {
    await dispatch(loadingState(true))
    const getParseData = await AsyncStorage.getItem('userInfo');
    const convertPaeseData = JSON.parse(getParseData);
    const dataPass = ([data])
  //  console.log('EmployeesWorkExperience - Put,  base url => ' +  `${BASE_URL}/EmployeesWorkExperience`)
    axios
      .put(`${BASE_URL}/EmployeesWorkExperience`, [data], {
        headers: {
          Authorization:
            convertPaeseData == null ? '' : `Bearer ${convertPaeseData.result}`,
        },
      })
      .then(async res => {
        let resData = res.data; 
        console.log('Updated Work Employee ', resData);
        // You can invoke sync or async actions with `dispatch`
        // global.actionType = "edit"
       //  await dispatch(getWorkEmployeeAction(dataPass?.employeeId));
      })
      .catch(async e => {
        dispatch(loadingState(false))
        console.log(`UPDATE Employee error ${e}`);
      });
  };
};



export const addWorkAction = (data) => {
  console.log("add data",data)
  return async dispatch => {
   // await dispatch(loadingState(true))
    const getParseData = await AsyncStorage.getItem('userInfo');
    const convertPaeseData = JSON.parse(getParseData);
    console.log("convertPaeseData",convertPaeseData)
    console.log("Data >>>>>>",[data])
    const dataPass = ([data])
    axios
      .post(`${BASE_URL}/EmployeesWorkExperience`, [data], {
        headers: {
          Authorization:
            convertPaeseData == null ? '' : `Bearer ${convertPaeseData.result}`,
        },
      })
      .then(async res => {
        let resData = res.data;
        console.log('Add Get Work ', res?.data);
      //  global.actionType = "edit"
      //   await dispatch(getWorkEmployeeAction(dataPass?.employeeId));
      })
      .catch(async e => {
     //   dispatch(loadingState(false))
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
        // console.log('Edit Employee Data ', resData);
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