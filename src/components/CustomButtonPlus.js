import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  GestureResponderEvent,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextProps,
} from 'react-native';
import {COLORS} from '../constants';
import {sizeWidth, sizeHeight} from '../Utils/Size';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomButtonPlus = props => {
  const {handleOnPress, name, size, color} = props;
  return (
    <View style={styles.body}>
      <TouchableOpacity onPress={handleOnPress} style={styles.button}>
        <FontAwesome5
          name={name}
          size={size}
          color={color}
          style={{alignSelf: 'center'}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  button: {
    width: sizeWidth(15),
    height: sizeWidth(15),
    borderRadius: sizeWidth(15),
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    bottom: sizeWidth(4),
    right: sizeWidth(4),
    elevation: 5,
  },
});
export default CustomButtonPlus;
