import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { sizeWidth } from './../../Utils/Size';

const Profile = props => {
  const [image, setImage] = useState(null);
  const [showDefault, setShowDefault] = useState(true);

  useEffect(() => { }, [props.imagePass]);
// initially showDefault will be false
//var icon = showDefault ? {uri: props.imagePass } : require('../../assets/f8dc8046aa60d65fbe068ac408c04ebf.jpg');
//console.log("Icon Set here", props.imagePass);

const handelSubmit = () => {
  props.updateImg()
}
  return (
    
    <SafeAreaView>
      <View style={imageUploaderStyles.container}>
     
  {/* <View>
       <Image  
      style={{ elevation: 2,
        borderRadius: 999,
        overflow: "hidden",
        height: sizeWidth(30),
        width: sizeWidth(30),
        backgroundColor:'red'}}
      source={require("../../assets/f8dc8046aa60d65fbe068ac408c04ebf.jpg")}
      /> 
  </View> */}

{/* <Image
            style={{
              elevation: 2,
              borderRadius: 999,
              overflow: 'hidden',
              height: sizeWidth(30),
              width: sizeWidth(30),
              backgroundColor: 'red',
            }}
            source={require('../assets/f8dc8046aa60d65fbe068ac408c04ebf.jpg')}
          /> */}

          <View style={{
            elevation: 2,
            borderRadius: 999,
            overflow: "hidden",
            height: sizeWidth(30),
            width: sizeWidth(30),
            //backgroundColor:'red'
          }} >
          {props.imagePass ? 
            <Image
              onLoadStart={() => 
                setShowDefault(true)} 
              style={{
                height: sizeWidth(30),
                width: sizeWidth(30),
              }}
           source= {{ uri: props.imagePass } }
            /> : <Image
            onLoadStart={() => 
              setShowDefault(true)} 
            style={{
              height: sizeWidth(30),
              width: sizeWidth(30),
            }}
            source={require('../../assets/Profile.jpg')}
          />}
          </View>

        <View style={imageUploaderStyles.uploadBtnContainer}>
          <TouchableOpacity
            onPress={handelSubmit}
            style={imageUploaderStyles.uploadBtn}>
            <MaterialIcons name="edit" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const imageUploaderStyles = StyleSheet.create({
  container: {
    height: sizeWidth(30),
    width: sizeWidth(30),
    elevation: 2,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    alignSelf: 'center',
    margin: 8,
    // backgroundColor:'red'
  },
  uploadBtnContainer: {
    alignItems: "center",
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    bottom: 0,
    borderRadius: 30,
    backgroundColor: 'white',
    width: '35%',
    height: '37%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Profile.propTypes = {
  updateImg: PropTypes.any,
  imagePass: PropTypes.any,
};

export default Profile;
