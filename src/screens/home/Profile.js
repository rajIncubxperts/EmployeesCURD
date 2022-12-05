import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const Profile = props => {
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
        <View style={imageUploaderStyles.uploadBtnContainer}>
          <TouchableOpacity
            onPress={() => props.updateImg()}
            style={imageUploaderStyles.uploadBtn}>
            <Text>{props.imagePass ? 'Edit' : 'Upload'} Image</Text>
            <Ionicons name="camera" size={15} color="black" />
          </TouchableOpacity>
        </View>
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

Profile.propTypes = {
  updateImg: PropTypes.any,
  imagePass: PropTypes.any,
};

export default Profile;
