import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Controller} from 'react-hook-form';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  keyboardType,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : '#e8e8e8'},
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              
              
            />
          </View>
          {error && (
            <Text
              style={{
                color: 'red',
                alignSelf: 'stretch',
                left: 25,
                fontFamily: 'Roboto-Regular',
              }}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    fontSize: 17,
    backgroundColor: '#f2fff6',
    color: 'black',
    width: '90%',
    height: 45,
    alignSelf: 'center',
    borderRadius: 15,
    shadowOpacity: 1,
    shadowRadius: 15,
    shadowOffset: {
      height: 2,
      width: 21,
    },
    shadowColor: '#5770C21A',
    elevation: 10,
    paddingLeft: 40,
  },
  //     backgroundColor: 'white',
  //     width: '100%',
  //     borderColor: '#e8e8e8',
  //     borderWidth: 2,
  //     borderRadius: 5,
  //     paddingHorizontal: 10,
  //     marginVertical: 5,
  //   },
  input: {color: 'black'},
});
