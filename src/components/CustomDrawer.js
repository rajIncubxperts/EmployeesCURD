import React, {useContext} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, IMGS, ROUTES} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../Context/AuthContext';

const {width} = Dimensions.get('screen');

const CustomDrawer = props => {
  const navigation = useNavigation();
  const {isLoading, logout} = useContext(AuthContext);
  return (
    <>
      <DrawerContentScrollView {...props}>
    
        <ImageBackground source={IMGS.bgPattern} style={{height: 140}}>
        <Image source={IMGS.user} style={styles.userImg} />
        <View style={{}}>
        <Text style={{position: 'absolute', marginLeft : 150, bottom:30}}>IX-Dev</Text>
        </View>
        <Text style={{position: 'absolute', marginLeft : 120, bottom:30}}>incubxpertsdev@gmail.com</Text>
        </ImageBackground>
      
      
        <View style={styles.drawerListWrapper}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.LOGIN)}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
      
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
    width: 90,
    height: 90,
    borderRadius: 110 / 2,
    left: width / 3 - 110,
    bottom: -110 / 3,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  drawerListWrapper: {
    marginTop: 35,
  },
});
