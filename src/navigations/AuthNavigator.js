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
import Splash from '../screens/home/Splash';

const Stack = createStackNavigator();
// Navigator, Screen, Group

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="Splash">
      <Stack.Screen
        name={'Splash'}
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTES.HOME}
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTES.EMPLOYEEFORM}
        component={EmployeeForm}
        options={{
          title: 'Employee Form',
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Save"
              color="red"
            />
          ),
        }}
      />
      <Stack.Screen
        name={ROUTES.EMPLOYEEDETAILS}
        component={EmployeeDetails}
        
        options={{
          title: 'Yogeshwar Aher',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{
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
