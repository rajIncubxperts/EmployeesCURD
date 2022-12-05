import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {ROUTES, COLORS} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {authResponseData} from './../Redux/actions/AuthAction';
import {useState} from 'react';
import {useCallback} from 'react';

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = 180;

const SimpleModal = props => {
  const dispatch = useDispatch();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  closeModal = (bool, data) => {
    props.changeModalVisible(bool);
    props.setData(data);
  };

  const signOutHandler = async () => {
    await AsyncStorage.removeItem('userInfo');
    await dispatch(authResponseData(null));
    forceUpdate();
  };

  return (
    <TouchableOpacity disabled={true} style={[styles.container]}>
      <View style={styles.modal}>
        <View style={styles.textView}>
          <Text
            style={[
              styles.text,
              {fontSize: 20, marginBottom: 20, fontWeight: 'bold'},
            ]}>
            {props.title}
          </Text>
          <Text style={styles.text}>{props.description}</Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={signOutHandler}
            style={styles.touchableOpacity}>
            <Text
              style={[styles.text, {color: COLORS.blue, fontWeight: '400'}]}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => closeModal(false, 'No')}
            style={styles.touchableOpacity}>
            <Text
              style={[styles.text, {color: COLORS.blue, fontWeight: '400'}]}>
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    height: HEIGHT_MODAL,
    width: WIDTH - 80,
    alignSelf: 'center',
    paddingTop: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  textView: {
    flex: 1,
    marginLeft: 20,
  },
  text: {
    margin: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: COLORS.black,
  },
  buttonView: {
    width: '40%',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: 10,
    elevation: 20,
    shadowColor: '#52006A',
  },
  touchableOpacity: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
});

export default SimpleModal;
