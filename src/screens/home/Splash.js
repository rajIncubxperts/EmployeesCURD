import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';



export default function Splash({navigation}) {


  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 1000);
  }, []);

  return (
    <View style={styles.body}>
      <Image
        style={styles.logo}
        source={require('../../assets/f8dc8046aa60d65fbe068ac408c04ebf.jpg')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 300,
    height: 200,
    marginTop: 10,
    alignSelf: 'center',
  },
  text: {
    fontSize: 40,
    color: '#ffffff',
  },
});
