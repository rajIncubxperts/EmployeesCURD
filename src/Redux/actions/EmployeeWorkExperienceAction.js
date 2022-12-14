import axios from 'axios';
import {BASE_URL} from '../../Config/config';
import {GET_EMPLOYEEWORKEXP_DATA, EDIT_EMPLOYEEWORKEXP_DATA, LOADING} from './../Types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getEmployeeWorkAction = EmployeeId => {
    return async dispatch => {
      await dispatch(loadingState(true))
      const getParseData = await AsyncStorage.getItem('userInfo');
      const convertPaeseData = JSON.parse(getParseData);
      axios
        .get(`${BASE_URL}/EmployeeWorkExperience/${EmployeeId}`, {
          headers: {
            Authorization:
              convertPaeseData == null ? '' : `Bearer ${convertPaeseData.result}`,  
          },
        })
        .then(async res => {
          let resData = res.data;
          console.log('Edit EmployeeWorkDATA Data ', resData);
          // You can invoke sync or async actions with `dispatch`
          await dispatch(editEmployeeWorkResponseData(resData.result));
          await dispatch(loadingState(false))
          global.actionType = ""
        })
        .catch(e => {
          dispatch(loadingState(false))
          console.log(`Get Employee error ${e}`);
        });
    };
  };
  
  export const createEmployeeWorkAction = (tempData) => {
    return async dispatch => {
      await dispatch(loadingState(true))
      const getParseData = await AsyncStorage.getItem('userInfo');
      const convertPaeseData = JSON.parse(getParseData);
      axios
        .post(`${BASE_URL}/EmployeesWorkExperience`, tempData, {
          headers: {
            Authorization:
              convertPaeseData == null ? '' : `Bearer ${convertPaeseData.result}`,
          },
        })
        .then(async res => {
          let resData = res.data;
          console.log('Edit Employee Data ', resData);
        })
        .catch(e => {
          dispatch(loadingState(false));
          console.log(`Get Employee error ${e}`);
        });
    };
  }

  export const updateEmployeeAction = (tempData) => {
    return async dispatch => {
      await dispatch(loadingState(true))
      const getParseData = await AsyncStorage.getItem('userInfo');
      const convertPaeseData = JSON.parse(getParseData);
      axios
        .put(`${BASE_URL}/EmployeesWorkExperience`, tempData, {
          headers: {
            Authorization:
              convertPaeseData == null ? '' : `Bearer ${convertPaeseData.result}`,
          },
        })
        .then(async res => {
          let resData = res.data;
          console.log('Edit Employee Data ', resData);
          await editEmployeeWorkResponseData(null);
          await dispatch(loadingState(false))
        })
        .catch(async e => {
          await dispatch(loadingState(false))
          console.log(`Get Employee error ${e}`);
        });
    };
  };
  

  export const getEmployeeWorkResponseData = data => {
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
  
  export const editEmployeeWorkResponseData = data => {
    return {
      type: EDIT_EMPLOYEE_DATA,
      payload: data,
    };
  };