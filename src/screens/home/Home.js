import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Alert,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, ROUTES} from '../../constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Card, Title, Paragraph} from 'react-native-paper';
import SimpleModal from '../../components/SimpleModal';
import PropupModel from '../../components/PropupModel';


const Home = ({navigation}) => {
  const [showBox, setShowBox] = useState(true);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [chooseData, setchooseData] = useState();

  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };
  // const changeModalActionVisible = bool => {
  //   setisModalVisible(bool);
  // }
  const setData = data => {
    setchooseData(data);
  };

  const showConfirmDialog = () => {
    return Alert.alert(
      'Delete Employee?',
      'Are you sure you want to remove delete employee?',
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            setShowBox(false);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
        },
      ],
    );
  };

  return (
    <>
      <TouchableNativeFeedback
        onPress={() => navigation.navigate('EmployeeDetails Tab')}>
        <View>
          {showBox && (
            <Card>
              <Card.Content>
                <Title
                  style={{textDecorationLine: 'underline', fontWeight: 'bold'}}>
                  #789
                </Title>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() =>
                    navigation.navigate(ROUTES.EMPLOYEEFORM_DRAWER)
                  }>
                  <MaterialCommunityIcons
                    name={'pencil'}
                    size={25}
                    color={COLORS.black}
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.trash}
                  // onPress={() => showConfirmDialog()}
                  onPress={() => changeModalVisible(true)}>
                  <FontAwesome5
                    name={'trash'}
                    size={20}
                    color={COLORS.black}
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible}
                  nRequestClose={() => changeModalVisible(false)}>
                  <PropupModel
                    title="Delete Employee"
                    description='Are you sure you want to remove delete employee?'
                    changeModalVisible={changeModalVisible}
                    setData={setData}
                   
                  />
                </Modal>
                <Title>Yogeshwar Aher</Title>
                <View style={{flexDirection: 'row', paddingLeft: 5}}>
                  <MaterialIcons name="location-city" size={22} color="black" />
                  <Paragraph style={{paddingLeft: 5}}>Chennai</Paragraph>
                </View>

                <View style={{flexDirection: 'row', paddingLeft: 5}}>
                  <FontAwesome name="building-o" size={22} color="black" />
                  <Paragraph style={{paddingLeft: 10}}>
                    Administration
                  </Paragraph>
                </View>
                <View style={{flexDirection: 'row', paddingLeft: 5}}>
                  <MaterialIcons name="call" size={22} color="black" />
                  <Paragraph style={{paddingLeft: 5}}>889922999</Paragraph>
                </View>
              </Card.Content>
            </Card>
          )}
        </View>
      </TouchableNativeFeedback>
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(ROUTES.EMPLOYEEFORM_DRAWER)}>
          <FontAwesome5
            name={'plus'}
            size={20}
            color={'#ffffff'}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5,
  },
  btn: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 20,

    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    top: 20,
    right: 45,
  },
  trash: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    top: 20,
    right: 10,
  },
});
