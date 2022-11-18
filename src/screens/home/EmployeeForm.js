import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {COLORS} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput, Button, HelperText} from 'react-native-paper';
import {SelectList} from 'react-native-dropdown-select-list';
import {ScrollView} from 'react-native-gesture-handler';
import Profile from './Profile';


const EmployeeForm = props => {

  const [text, setText] = React.useState('');
  const onChangeText = text => setText(text);
  const [selected, setSelected] = React.useState('');

  const data = [
    {key: '1', value: 'Engineering'},
    {key: '2', value: 'Finance'},
    {key: '3', value: 'Administration'},
    {key: '4', value: 'Computers'},
    {key: '5', value: 'Business Development'},
    {key: '6', value: 'HR'},
  ];

  
  const onChangeTextValue = (text) => {
    if (+text) {
      setText(text);
    }
  }
 

  return (
    <>
    
      <ScrollView>
        <Profile />
        <View style={{margin: 10}}>
          <View style={{backgroundColor: 'blue', padding: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Basic Info</Text>
          </View>
          <TextInput label="First Name" mode="outlined" />
          <TextInput
            label="Last Name"
            mode="outlined"
            value={text}
            onChangeText={text => setText(text)}
          />
          <View style={{margin: 5}} />
          <View style={{backgroundColor: 'blue', padding: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Work</Text>
          </View>
          <View style={{margin: 5}} />
          <SelectList
            setSelected={val => setSelected(val)}
            data={data}
            save="value"
          />
          <View style={{margin: 5}} />
          <SelectList
            setSelected={val => setSelected(val)}
            data={data}
            save="value"
          />
        
        </View>
      </ScrollView>
    </>
  );
};

export default EmployeeForm;

const imageUploaderStyles = StyleSheet.create({

});
