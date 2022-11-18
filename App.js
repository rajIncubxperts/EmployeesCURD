import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, Text, StatusBar} from 'react-native';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './src/navigations/AuthNavigator';
import { AuthProvider, AuthContext} from './src/Context/AuthContext';
import DrawerNavigator from './src/navigations/DrawerNavigator';



export default function App() {
  // isAuthenticated = is...
 //const {userInfo} = useContext(AuthContext);
  return (
    <AuthProvider>
    <NavigationContainer>
            <StatusBar backgroundColor="#06bcee" />
      {/* { userInfo ?  <AuthNavigator /> : <DrawerNavigator /> } */}
      {/* <AuthNavigator /> */}
      <DrawerNavigator />
    </NavigationContainer>
    </AuthProvider>
  );
}
