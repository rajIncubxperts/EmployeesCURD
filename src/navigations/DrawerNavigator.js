import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS, ROUTES } from '../constants';
import { EmployeeForm, Home, EmployeeDetails } from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomDrawer from '../components/CustomDrawer';
import { sizeWidth } from '../Utils/Size';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.blue,
        drawerActiveTintColor: COLORS.white,
        drawerLabelStyle: {
          marginLeft: -sizeWidth(5),
        },
      }}>
      <Drawer.Screen
        name={ROUTES.HOME_DRAWER}
        component={Home}
        options={{
          headerShown: true,
          title: 'Home',
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.blue,
          },

          drawerIcon: ({ focused, color, size }) => (
            <Icon name="home" size={18} color={color} />
          ),
          headerRight: () => (
            <View style={{ margin: sizeWidth(5) }}>
              <FontAwesome5
                name="search"
                backgroundColor={COLORS.black}
                color={COLORS.black}
                size={18}
                onPress={() => Alert.alert('trash')}
              />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name={ROUTES.EMPLOYEEFORM_DRAWER}
        component={EmployeeForm}
        options={{
          unmountOnBlur: true,
          //headerShown: true,
          title: 'Create Employee',
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.blue,
          },
          drawerIcon: ({ focused, color, size }) => (
            <AntDesign name="form" size={18} color={color} />
          ),
          headerRight: () => <Button color="#841584" title="Save" />,
        }}
      />
      <Drawer.Screen
        name={ROUTES.EMPLOYEEDETAILS_DRAWER}
        component={EmployeeDetails}
        options={{
          title: '',
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.blue,
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
