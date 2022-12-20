import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../Config/config';
import {
  AUTH_USER_DATA,
  ERROR,
  ERROR_FORM,
  ERROR_REG,
  LOADING,
  SHOW_ALERT,
} from './../Types/types';

export const loginAction = (username, password) => {
  return async dispatch => {
    var isError = false;
    var error = {};
    if (username == '') {
      error.username = "Field can't be empty.";
      isError = true;
    }
    if (password == '') {
      error.password = "Field can't be empty.";
      isError = true;
    }
    if (isError) {
      dispatch(errorHandler(error, 'login'));
    } else {
      await dispatch(loadingState(true));
      fetch(`${BASE_URL}/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password,
        })
      })
        .then(res => {
          res.json();
        })
        .then(data => console.log(data))  
        .catch(err => console.log("api Erorr: ", err));
      axios
        .post(`${BASE_URL}/Login`, {
          username,
          password,
        })
        .then(async res => {
          let userInfo = res.data;
          let Token = userInfo.result;
          await dispatch(authResponseData(userInfo));
          await dispatch(loadingState(false));
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        })
        .catch(({ error, response }) => {
          dispatch(showAlertState({ show: true, message: JSON.stringify(response?.data.message) }));
          dispatch(loadingState(false));
        });
    }
  };
};

export const registerAction = (username, email, password, confirmpassword) => {
  return async dispatch => {
    var isError = false;
    var error = {};
    var strPasswordPattern =
      /^(?=.{6,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/;
    var strEmailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (username == '') {
      error.username = "Field can't be empty.";
      isError = true;
    }
    if (email == '') {
      error.email = "Email can't be empty.";
      isError = true;
    } else if (!strEmailPattern.test(email)) {
      error.email = 'Please enter valid email.';
      isError = true;
    }
    if (password === '') {
      error.password = "Password can't be empty.";
      isError = true;
    } else if (!strPasswordPattern.test(password)) {
      error.password = 'Enter Valid Password';
      isError = true;
    }
    console.log('confirmpassword');
    console.log(confirmpassword);

    if (confirmpassword === null || confirmpassword === '') {
      error.confirmpassword = "Password can't be empty.";
      isError = true;
    } else {
      if (confirmpassword !== password) {
        error.confirmpassword = 'Passwoad and confirm password should be same.';
        isError = true;
      }
    }

    if (isError) {
      dispatch(errorHandler(error));
    } else {
      await dispatch(loadingState(true));
      axios
        .post(`${BASE_URL}/Register`, {
          username,
          email,
          password,
        })
        .then(async res => {
          let userInfo = res.data;
          AsyncStorage.setItem('userInfo', '');
          await dispatch(authResponseData(""));
          await dispatch(loadingState(false));
        })
        .catch(e => {
          console.log(`register error ${e}`);
          dispatch(loadingState(false));
        });
    } 
  };
};

export const authResponseData = data => {
  return {
    type: AUTH_USER_DATA,
    payload: data,
  };
};

const loadingState = data => {
  return {
    type: LOADING,
    payload: data,
  };
};

export const showAlertState = data => {
  return {
    type: SHOW_ALERT,
    payload: data,
  };
};

export const errorHandler = (data, type = '') => {
  return {
    type: type == 'login' ? ERROR : ERROR_REG,
    payload: data,
  };
};

export const errorFormHandler = data => {
  return {
    type: ERROR_FORM,
    payload: data,
  };
};
