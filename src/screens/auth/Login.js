import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, ROUTES} from '../../constants';

import {useNavigation} from '@react-navigation/native';

import {AuthContext} from '../../Context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';


const Login = props => {
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, login} = useContext(AuthContext);

  const userLogin = async () => {
    if (!username || !password) {
      Alert.alert('Please fill all the field');
      return;
    }
    try {
      const result = await login(username, password);
      console.log("Result",result);
    } catch (err) {
      Alert.alert('Something went wrong please try different password');
    }
  };
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <Spinner visible={isLoading} />
        <View style={styles.wFull}>
          

          <Text style={styles.loginContinueTxt}>Login in to continue</Text>

          <TextInput
            style={styles.input}
            value={username}
            placeholder="Enter user name"
            onChangeText={text => setUserName(text)}
          />

          <TextInput
            style={styles.input}
            value={password}
            placeholder="Enter password"
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />

          <View style={styles.loginBtnWrapper}>
            <LinearGradient
              colors={[COLORS.gradientForm, COLORS.primary]}
              style={styles.linearGradient}
              start={{y: 0.0, x: 0.0}}
              end={{y: 1.0, x: 0.0}}>
              {/******************** LOGIN BUTTON *********************/}
              <TouchableOpacity
                onPress={() => {
                  userLogin();
                  //navigation.navigate(ROUTES.HOME);

                }}
                activeOpacity={0.7}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Log In</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/***************** FORGOT PASSWORD BUTTON *****************/}
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD, {})}
            style={styles.forgotPassBtn}>
            <Text style={styles.forgotPassText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}> Don't have an account? </Text>
          {/******************** REGISTER BUTTON *********************/}
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.REGISTER)}>
            <Text style={styles.signupBtn}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
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
    bottom: 20,
    textAlign: 'center',
    flexDirection: 'row',
  },
  footerText: {
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  signupBtn: {
    color: COLORS.primary,
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
});
