import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {COLORS, ROUTES} from '../constants';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function CreateEmpHeader({onclick, ...props }) {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, props.style]}>
      <StatusBar
        backgroundColor='#165fa8'
        animated
        translucent={true}
        styles={{width: 100}}
      />
      <View style={styles.header}>
        <View style={styles.headerBack}>
          <View style={styles.headerControlBar}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <FontAwesome5
                name="arrow-left"
                size={20}
                style={styles.headerBackArrow}
                color={COLORS.white}
              />
            </TouchableOpacity>
            <Text style={styles.title}> {props.title}</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={onclick}>
                <Text style={styles.pencil}> {props.titleright}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    height: 110,
  },
  headerBack: {
    width: '100%',
    height: '75%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.blue,
  },
  headerControlBar: {
    marginTop: 60,
    width: '85%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerBack_imageStyle: {},
  headerImage: {
    flexDirection: 'column',
    width: 150,
    height: 150,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 190,
    height: 190,
  },
  headerBackArrow: {
    alignSelf: 'flex-start',
    top: -20,
    left: -15,
    width: 30,
    height: 30,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 18,
    top: -20,
    width: '75%',
  },
  pencil: {
    color: '#FFFFFF',
    fontSize: 20,
    top: -22,
  },
  trash: {
    color: '#FFFFFF',
    fontSize: 20,
    top: -20,
    paddingLeft: 25,
  },
  profileDetails: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'center',
  },
});

export default CreateEmpHeader;
