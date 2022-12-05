import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {COLORS, ROUTES} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {loginAction, errorHandler} from './../../Redux/actions/AuthAction';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import Logo from '../../assets/icons/image2vector.svg';

const Login = props => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {userData, isLoading, error} = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

  const userLogin = async () => {
    //debugger;
    try {
      await dispatch(loginAction(username, password));
    } catch (err) {
      Alert.alert('Something went wrong please try different password');
    }
  };
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        {/* <View style={styles.row}>
              <Logo width={100} height={70} style={styles.mr7} />
            </View> */}
        <Spinner visible={isLoading} />
        <View style={styles.wFull}>
          <Text style={styles.loginContinueTxt}>Sign in to continue!</Text>

          <View
            style={[
              {borderColor: error.username ? 'red' : null, borderWidth: 1},
              styles.mainBox,
            ]}>
            <FontAwesome name="user" size={25} color={'grey'} />
            <TextInput
              style={[styles.SecondBox]}
              value={username}
              placeholder="Username"
              onChangeText={text => {
                dispatch(
                  errorHandler(
                    {
                      ...error,
                      username: '',
                    },
                    'login',
                  ),
                );
                setUserName(text);
              }}
            />
          </View>
          {error.username == null ? null : (
            <Text style={{color: 'red'}}>{error.username}</Text>
          )}

          <View
            style={[
              {borderColor: error.password ? 'red' : null, borderWidth: 2},
              styles.mainBox,
            ]}>
            <FontAwesome name="lock" size={25} color={'grey'} />
            <TextInput
              style={[styles.SecondBox]}
              placeholder="Password"
              value={password}
              secureTextEntry={isPasswordVisible ? false : true}
              onChangeText={text => {
                dispatch(
                  errorHandler(
                    {
                      ...error,
                      password: '',
                    },
                    'login',
                  ),
                );
                setPassword(text);
              }}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <FontAwesome
                name={isPasswordVisible ? 'eye-slash' : 'eye'}
                size={25}
                color="grey"
              />
            </TouchableOpacity>
          </View>
          {error.password == null ? null : (
            <Text style={{color: 'red'}}>{error.password}</Text>
          )}

          <View style={styles.loginBtnWrapper}>
            {/******************** LOGIN BUTTON *********************/}
            <TouchableOpacity
              onPress={() => {
                userLogin();
              }}
              activeOpacity={0.7}
              style={styles.loginBtn}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}> Don't have an account? </Text>
          {/******************** REGISTER BUTTON *********************/}
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.REGISTER)}>
            <Text style={[styles.signupBtn, {textDecorationLine: 'underline'}]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
 
  },
  container: {
    padding: 15,
    width: '100%',
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.primary,
    opacity: 0.9,
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: 'center',
    color: COLORS.gray,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
  },
  // Login Btn Styles
  loginBtnWrapper: {
    height: 55,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  linearGradient: {
    width: '100%',
    borderRadius: 50,
  },
  loginBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: COLORS.blue,
    borderRadius: 10,
  },
  loginText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '400',
  },
  forgotPassText: {
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 15,
  },
  // footer
  footer: {
    position: 'absolute',
    bottom: -15,
    textAlign: 'center',
    flexDirection: 'row',
  },
  footerText: {
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  signupBtn: {
    color: COLORS.blue,
    fontWeight: 'bold',
  },
  // utils
  wFull: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
  },
  mainBox: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  SecondBox: {
    flex: 1,
    marginLeft: 10,
  },
});
