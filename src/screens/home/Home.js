import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {COLORS, ROUTES} from '../../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector, useDispatch} from 'react-redux';
import {sizeFont, sizeWidth} from './../../Utils/Size';
import CustomButtonPlus from '../../components/CustomButtonPlus';
import CustomeFlatList from '../../components/CustomeFlatList';
import {useNavigation} from '@react-navigation/native';

const Home = props => {
  const navigation = useNavigation();
  const {isLoading} = useSelector(state => state.EmployeeReducer);

  const dispatch = useDispatch();

  console.log('is lOadin in Home >>', isLoading);

  return (
    <View>
      
      {isLoading ?  <View
          style={{ flex: 1 }}>
            <Spinner size={'large'} color={COLORS.blue} visible={isLoading} />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 50,
              fontWeight: '500',
              color:'red'
            }}>
            No Employees found
          </Text>
        </View> : <></>}

      <CustomeFlatList isLoading={isLoading}/>

      <CustomButtonPlus
        handleOnPress={() => {
          global.tempActionType = '';
          global.empId = '';
          navigation.navigate(ROUTES.EMPLOYEEFORM_DRAWER, {
            forNewRegistration: true
          });
        }}
        name={'plus'}
        size={20}
        color={'#ffffff'}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 10,
  },
  body: {
    flex: 1,
  },
  button: {
    width: sizeWidth(15),
    height: sizeWidth(15),
    borderRadius: sizeWidth(15),
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    bottom: sizeWidth(4),
    right: sizeWidth(4),
    elevation: 5,
  },
  btn: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 20,

    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    top: 20,
    right: 45,
  },
  trash: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    top: 20,
    right: 10,
  },
});
