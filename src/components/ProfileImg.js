import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import {sizeWidth} from '../Utils/Size';

const ProfileImg = props => {
  useEffect(() => {}, [props.imagePass]);

  return (
    <SafeAreaView>
      <View style={imageUploaderStyles.container}>
    
          {props.imagePass ?
            <Image
              style={{
                elevation: 2,
                borderRadius: 999,
                overflow: 'hidden',
                height: sizeWidth(30),
                width: sizeWidth(30),
              }}
              source={{uri: props.imagePass}}
            /> : <Image
            style={{
              elevation: 2,
              borderRadius: 999,
              overflow: 'hidden',
              height: sizeWidth(30),
              width: sizeWidth(30),
            }}
            source={require('../assets/corporate.png')}
          />
           }
    
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
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '35%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

ProfileImg.propTypes = {
  updateImg: PropTypes.any,
  imagePass: PropTypes.any,
};

export default ProfileImg;
