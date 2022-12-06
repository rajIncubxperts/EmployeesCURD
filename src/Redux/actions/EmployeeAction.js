import axios from 'axios';
import {BASE_URL} from '../../Config/config';
import {GET_EMPLOYEE_DATA, LOADING} from './../Types/types';
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

export const getEmployeeResponseData = data => {
  return {
    type: GET_EMPLOYEE_DATA,
    payload: data,
  };
};

const loadingState = data => {
    return {
      type: LOADING,
      payload: data,
    };
  };