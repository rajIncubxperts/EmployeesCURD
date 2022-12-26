import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Login,
  Register,
  EmployeeForm,
  EmployeeDetails,
} from '../screens';
import {COLORS, ROUTES} from '../constants';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.LOGIN}>

      <Stack.Screen
        name={ROUTES.HOME}
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTES.EMPLOYEEFORM}
        component={EmployeeForm}
      />
      <Stack.Screen
        name={ROUTES.EMPLOYEEDETAILS}
        component={EmployeeDetails}
      />
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{
          unmountOnBlur: true,
          title: 'React Native API',
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.blue,
          },
        }}
      />
      <Stack.Screen
       name={ROUTES.REGISTER} component={Register}  options={{
          title: 'Register',
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.blue,
          },
        }} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
