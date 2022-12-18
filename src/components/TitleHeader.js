import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../constants';
import { sizeHeight, sizeWidth } from '../Utils/Size';

function TitleHeader({onclick,handleEdit, ...props}) {
  return (
    <View style={[styles.container, props.style]}>
      <StatusBar
        backgroundColor="#165fa8"
        animated
        translucent={true}
        styles={{width: sizeWidth(100)}}
      />
      <View style={styles.header}>
        <View style={styles.headerBack}>
          <View style={styles.headerControlBar}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              {/* <Image
                source={require('../assets/BackArrow.png')}
                resizeMode="contain"
               ></Image> */}
              <FontAwesome5
                name="arrow-left"
                size={20}
                style={styles.headerBackArrow}
                color={COLORS.white}
              />
            </TouchableOpacity>
            <Text style={styles.title}> {props.title}</Text>
            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons
                name="pencil"
                style={styles.pencil}
                color={COLORS.white}
                onPress={handleEdit}
              />
              <FontAwesome5
                name="trash"
                style={styles.trash}
                color={COLORS.white}
                onPress={onclick}
              />
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
    height: sizeHeight(15),
  },
  headerBack: {
    width: '100%',
    height: sizeHeight(11.5),
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
    top: sizeHeight(-1.5),
    left: -15,
    width: sizeWidth(8),
    height: sizeHeight(30),
  },

  title: {
    color: '#FFFFFF',
    fontSize: 18,
    top: sizeHeight(-1.5),
    width: '75%',
  },
  pencil: {
    color: '#FFFFFF',
    fontSize: 25,
    top: sizeHeight(-1.8),
  },
  trash: {
    color: '#FFFFFF',
    fontSize: 20,
    top: sizeHeight(-1.5),
    paddingLeft: 25,
  },
  profileDetails: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'center',
  },
});

export default TitleHeader;
