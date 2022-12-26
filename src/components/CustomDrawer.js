import React, { useContext } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, IMGS, ROUTES } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { authResponseData } from './../Redux/actions/AuthAction';
import { useState } from 'react';
import { useCallback } from 'react';
import SimpleModal from './SimpleModal';
import { sizeFont, sizeWidth } from '../Utils/Size';
const { width } = Dimensions.get('screen');

const CustomDrawer = props => {
  const navigation = useNavigation();
  const [isModalVisible, setisModalVisible] = useState(false);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [chooseData, setchooseData] = useState();

  // const signOutHandler = async () => {
  //   await AsyncStorage.removeItem('userInfo');
  //   await dispatch(authResponseData(null));
  //   forceUpdate();
  // };

  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };
  const setData = data => {
    setchooseData(data);
  };

  return (
    <>
      <DrawerContentScrollView {...props}>
        {/* <ImageBackground source={IMGS.bgPattern} style={{height: 140}}> */}
        <View style={{ justifyContent: 'space-between' }}>
          <Image source={IMGS.user} style={styles.userImg} />
          <View
            style={{
              marginLeft: sizeWidth(20),
              alignContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <Text style={{ color: 'black', fontWeight: '400', fontSize: sizeFont(4) }}>
              IX-Dev
            </Text>
            <Text style={{ color: 'black', fontWeight: '400' }}>
              incubxpertsdev@gmail.com
            </Text>
          </View>
          <View style={{ marginHorizontal: sizeWidth(5) }}>
            <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: sizeWidth(7),
              }}
            />
          </View>
        </View>
        {/* </ImageBackground> */}

        <View
          onTouchEndCapture={() => {
            global.tempActionType = '';
            global.empId = '';
          }}
          style={styles.drawerListWrapper}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: sizeWidth(5), borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          nRequestClose={() => changeModalVisible(false)}>
          <SimpleModal
            title="Logout"
            description="Are you sure you want to logout?"
            changeModalVisible={changeModalVisible}
            setData={setData}
          />
        </Modal>
        <TouchableOpacity
          onPress={() => changeModalVisible(true)}
          style={{ paddingVertical: sizeWidth(4) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons style={{  color: COLORS.black}} name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: sizeFont(4),
                fontFamily: 'Roboto-Medium',
                marginLeft: sizeWidth(2),
                color: COLORS.black
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userImg: {
    width: sizeWidth(12),
    height: sizeWidth(12),
    borderRadius: sizeWidth(12),
    left: sizeWidth(5),
    bottom: -sizeWidth(10),
    borderWidth: 4,
    borderColor: COLORS.white,
  },
});
