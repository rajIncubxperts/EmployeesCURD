import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {COLORS, ROUTES} from '../../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {errorHandler, registerAction} from './../../Redux/actions/AuthAction';
import {color} from 'react-native-reanimated';

const Register = props => {
  // const {navigation} = props;
  const navigation = useNavigation();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);

  const {userData, isLoading, errorReg} = useSelector(
    state => state.AuthReducer,
  );
  const dispatch = useDispatch();

  const userRegister = async () => {
    try {
      await dispatch(
        registerAction(username, email, password, confirmpassword),
      );
    } catch (err) {
      Alert.alert('Something went wrong please try different password');
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.wFull}>
          {/* <Text style={styles.loginContinueTxt}>Register in to continue</Text> */}

          <View
            style={[
              {borderColor: errorReg.username ? 'red' : null, borderWidth: 1},
              styles.mainBox,
            ]}>
            <FontAwesome name="user" size={25} color={'grey'} />
            <TextInput
              style={[styles.SecondBox]}
              {...errorReg}
              value={username}
              placeholder="Username"
              onChangeText={text => {
                dispatch(
                  errorHandler({
                    ...errorReg,
                    username: '',
                  }),
                );
                setUserName(text);
              }}
            />
          </View>
          {errorReg.username == null ? null : (
            <Text style={{color: 'red'}}>{errorReg.username}</Text>
          )}

          <View
            style={[
              {borderColor: errorReg.email ? 'red' : null, borderWidth: 2},
              styles.mainBox,
            ]}>
            <MaterialCommunityIcons
              name="email-outline"
              size={25}
              color={'grey'}
            />
            <TextInput
              style={[styles.SecondBox]}
              value={email}
              placeholder="Email Address"
              onChangeText={text => {
                dispatch(
                  errorHandler({
                    ...errorReg,
                    email: '',
                  }),
                );

                setEmail(text);
              }}
            />
          </View>
          {errorReg.email == null ? null : (
            <Text style={{color: 'red'}}>{errorReg.email}</Text>
          )}

          <View
            style={[
              {borderColor: errorReg.password ? 'red' : null, borderWidth: 2},
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
                  errorHandler({
                    ...errorReg,
                    password: '',
                  }),
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
          {errorReg.password == null ? null : (
            <Text style={{color: 'red'}}>{errorReg.password}</Text>
          )}
          <View
            style={[
              {
                borderColor: errorReg.confirmpassword ? 'red' : null,
                borderWidth: 2,
              },
              styles.mainBox,
            ]}>
            <FontAwesome name="lock" size={25} color={'grey'} />
            <TextInput
              style={[styles.SecondBox]}
              placeholder="Confirm Password"
              value={confirmpassword}
              secureTextEntry={isPasswordVisible2 ? false : true}
              onChangeText={text => {
                dispatch(
                  errorHandler({
                    ...errorReg,
                    confirmpassword: '',
                  }),
                );
                setConfirmPassword(text);
              }}
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible2(!isPasswordVisible2)}>
              <FontAwesome
                name={isPasswordVisible2 ? 'eye-slash' : 'eye'}
                size={25}
                color="grey"
              />
            </TouchableOpacity>
          </View>
          {errorReg.confirmpassword == null ? null : (
            <Text style={{color: 'red'}}>{errorReg.confirmpassword}</Text>
          )}
          <View style={{}}>
            <Text style={{color: COLORS.black}}>Password Must be</Text>
            <Text style={{color: COLORS.black}}>
              <Text style={{fontWeight: 'bold'}}>*</Text> At least 6 Characters
            </Text>
            <Text style={{color: COLORS.black}}>
              <Text style={{fontWeight: 'bold'}}>*</Text> At least one non
              alphanumerice Characters.
            </Text>
            <Text style={{color: COLORS.black}}>
              <Text style={{fontWeight: 'bold'}}>*</Text> At least one lowercase
              ('a'-'z').
            </Text>
            <Text style={{color: COLORS.black}}>
              <Text style={{fontWeight: 'bold'}}>*</Text> At least one uppercase
              ('A'-'Z').
            </Text>
            <Text style={{color: COLORS.black}}>
              <Text style={{fontWeight: 'bold'}}>*</Text> At least one digit
              ('0'-'9').
            </Text>
          </View>

          <View style={styles.loginBtnWrapper}>
            <TouchableOpacity
              onPress={() => {
                userRegister();
              }}
              activeOpacity={0.7}
              style={styles.loginBtn}>
              <Text style={styles.loginText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}> Have an account? </Text>
          {/******************** REGISTER BUTTON *********************/}
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
            <Text style={styles.signupBtn}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;

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
    textDecorationLine: 'underline',
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
  iconPositionTop: {
    position: 'absolute',
    top: 220,
    left: 300,
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
