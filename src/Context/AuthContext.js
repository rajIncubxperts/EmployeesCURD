import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../Config/config';
import {useNavigation} from '@react-navigation/native';
import { ROUTES } from '../constants';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  const register = (username, email, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/Register`, {
        username,
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch(e => {
        console.log(`register error ${e}`);
      });
  };

  const login = (username, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/Login`, {
        username,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        let Token = userInfo.result;
        console.log("Token",Token);
        console.log("UserInfo",userInfo.result);
      
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
       
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    setUserInfo(null);
    AsyncStorage.removeItem('userInfo');
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{register, login, logout, isLoading, userInfo}}>
      {children}
    </AuthContext.Provider>
  );
};
