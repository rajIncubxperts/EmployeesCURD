import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';

const ProfileImg = props => {
  const [image, setImage] = useState(null);

  useEffect(() => {}, [props.imagePass]);

  return (
    <SafeAreaView>
      <View style={imageUploaderStyles.container}>
        {props.imagePass && (
          <Image
            style={{
              height: 150,
              width: 150,
            }}
            source={{uri: props.imagePass}}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 100,
    width: 110,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
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
