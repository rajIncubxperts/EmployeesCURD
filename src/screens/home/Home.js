import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, ROUTES} from '../../constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Home = ({navigation}) => {
  return (
    <>
    <View style={styles.body}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(ROUTES.EMPLOYEEFORM_DRAWER)}> 
       <FontAwesome5 
       name={'plus'}
       size={20}
       color={'#ffffff'}
       style={{alignSelf:'center'}}
       />
      </TouchableOpacity>
    </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  body:{
    flex:1
  },
  button:{
    width: 60,
    height:60,
    borderRadius: 30,
    backgroundColor: COLORS.bgColor,
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    bottom:10,
    right:10,
    elevation:5
  }
});
