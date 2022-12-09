import React, {useState} from 'react';
import {Button, HelperText} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  TextInput,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import {COLORS, IMGS, ROUTES} from '../../constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import TitleHeader from '../../components/TitleHeader';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const EmployeeDetails = ({route, navigation, title}) => {
  // This is to manage Modal State
  //const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [username, setUserName] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [srdonDate, setSrdonDate] = useState('');
  const [showJoinDatePicker, setShowJoinDatePicker] = useState(false);
  const [showBox, setShowBox] = useState(true);

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

  // Create toggleModalVisibility function that will
  // Open and close modal upon button clicks.
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };
  // On date change method
  const onToDateChange = (event, selectedDate) => {
    console.log('date testtttt', event);
    const currentDate = selectedDate || new Date();
    setShowJoinDatePicker(false);
    setJoinDate(moment(currentDate, 'DD-MM-YYYY').format('DD-MM-YYYY'));
    setSrdonDate(moment(currentDate, 'DD-MM-YYYY').format('DD-MM-YYYY'));
  };
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View>
          <TitleHeader title={title} navigation={navigation}></TitleHeader>
        </View>
        <ScrollView style={{marginHorizontal: 5}}>
          <View>
            <Image source={IMGS.user} style={styles.userImg} />
            <View style={{backgroundColor: COLORS.blue, padding: 10}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: COLORS.white}}>
                Work
              </Text>
            </View>
            <View style={styles.txtborder}>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> Department</Text>-
                {`${route.params?.item?.department}`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> Location</Text>- {`${route.params?.item?.location}`}
              </Text>
              <Text style={styles.textcolor}> 
                <Text style={{fontWeight: 'bold'}}> Work Phone</Text>-
                {`${route.params?.item?.workPhone}`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}>Salary Revision Due On</Text>
                - {`${route.params?.item?.salaryRevisionDate}`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}>
                  <Text style={{fontWeight: 'bold'}}> Date of Joining</Text>
                </Text>
                -{`${route.params?.item?.joiningDate}`}
              </Text>
            </View>
            <View style={{margin: 5}} />
            <View style={{backgroundColor: COLORS.blue, padding: 10}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: COLORS.white}}>
                Personal
              </Text>
            </View>
            <View style={styles.txtborder}>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> Mobile Phone</Text> -
                {`${route.params?.item?.mobileNumber}`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> Blood Group</Text> - {`${route.params?.item?.bloodGroup}`}
              </Text>
            </View>
            <View style={{margin: 5}} />
            <View style={{backgroundColor: COLORS.blue, padding: 10}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: COLORS.white}}>
                Summary
              </Text>
            </View>
            <View style={styles.txtborder}>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> Job Description</Text> - {`${route.params?.item?.jobDesc}`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> About Me</Text> - {`${route.params?.item?.aboutme}`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}>
                
                  Ask Me About/Expertise
                </Text>
                - {`${route.params?.item?.expertise}`}
              </Text>
            </View>
            <View style={{margin: 5}} />
            <View style={{backgroundColor: COLORS.blue, padding: 10}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: COLORS.white}}>
                Work Experience
              </Text>
            </View>
            {showBox && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  alignContent: 'center',
                }}>
                <View style={styles.txtborder}>
                  <Text style={styles.textcolor}>
                    <Text style={{fontWeight: 'bold'}}> Company name</Text> -
                    xyz
                  </Text>
                  <Text style={styles.textcolor}>
                    <Text style={{fontWeight: 'bold'}}> Job Title</Text> -
                    hcdcd13333
                  </Text>
                  <Text style={styles.textcolor}>
                    <Text style={{fontWeight: 'bold'}}> From Date</Text> - 23
                    Nov 2022
                  </Text>
                  <Text style={styles.textcolor}>
                    <Text style={{fontWeight: 'bold'}}> To Date</Text> - 23 Nov
                    2022
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={toggleModalVisibility}>
                  <MaterialCommunityIcons
                    name={'pencil'}
                    size={25}
                    color={COLORS.black}
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.trash}
                  onPress={() => showConfirmDialog()}>
                  <FontAwesome5
                    name={'trash'}
                    size={20}
                    color={COLORS.black}
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
              </View>
            )}
            <View style={{margin: 5}} />
          </View>
        </ScrollView>
        <View>
          {/**  We are going to create a Modal with Text Input. */}
          {/* <Button title="Show Modal" onPress={toggleModalVisibility} /> */}

          <View style={styles.body}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                global.tempActionType = '';
                global.empId = '';
                toggleModalVisibility();
              }}>
              <FontAwesome5
                name={'plus'}
                size={20}
                color={'#ffffff'}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>

          {/** This is our modal component containing textinput and a button */}
          <Modal
            animationType="slide"
            transparent
            visible={isModalVisible}
            presentationStyle="overFullScreen"
            onDismiss={toggleModalVisibility}>
            <View style={styles.viewWrapper}>
              <View style={styles.modalView}>
                <Text style={styles.underlineTextStyle}>Add Experience</Text>
                <TextInput
                  placeholder="Previous Company"
                  value={inputValue}
                  style={styles.textInput}
                  onChangeText={value => setInputValue(value)}
                />
                <TextInput
                  placeholder="Job Title"
                  value={inputValue}
                  style={styles.textInput}
                  onChangeText={value => setInputValue(value)}
                />
                <View
                  onTouchEndCapture={() => {
                    setShowJoinDatePicker(true);
                  }}>
                  <TextInput
                    placeholder="Salary Revision Due On"
                    value={joinDate}
                    style={styles.textInputDate}
                  />
                </View>
                <View
                  onTouchEndCapture={() => {
                    setShowJoinDatePicker(true);
                  }}>
                  <TextInput
                    placeholder="Date of Joining"
                    value={srdonDate}
                    style={[styles.textInputbottom]}
                  />
                </View>
                {/** This button is responsible to close the modal */}
                {/* <Button title="Close" onPress={toggleModalVisibility} /> */}
                <TouchableOpacity
                  style={styles.btnOkModal}
                  onPress={toggleModalVisibility}>
                  <Text style={{color: COLORS.blue}}>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnModal}
                  onPress={toggleModalVisibility}>
                  <Text style={{color: COLORS.blue}}>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
      {showJoinDatePicker ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={'date'}
          maximumDate={new Date()}
          is24Hour={false}
          display="default"
          useCurrent={false}
          onChange={onToDateChange}
        />
      ) : null}
    </>
  );
};

export default EmployeeDetails;

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
  userImg: {
    width: 80,
    height: 80,
    borderRadius: 110 / 2,
    alignSelf: 'center',
  },
  underlineTextStyle: {
    textDecorationLine: 'underline',
    color: '#0a0a0a',
    marginBottom: 20,
    lineHeight: 36,
    fontSize: 18,
  },
  btnModal: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 10,
  },
  btnOkModal: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 50,
  },
  textcolor: {
    color: COLORS.black,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  SecondBox: {
    flex: 1,
    marginLeft: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  screen: {
    flex: 1,
  },
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '40%',
    left: '50%',
    elevation: 5,
    transform: [{translateX: -(width * 0.4)}, {translateY: -90}],
    height: 330,
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  textInput: {
    width: width - 110,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    marginBottom: 8,
  },
  textInputDate: {
    width: width - 110,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    marginBottom: 8,
    paddingRight: 60,
  },
  textInputbottom: {
    width: width - 110,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    marginBottom: 70,
    paddingRight: 85,
  },
  btn: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    right: 100,
    top: 20,
  },
  trash: {
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    top: 20,
    right: 50,
  },
  txtborder: {
    backgroundColor: COLORS.grayLight,
    shadowColor: '#000000',
    paddingLeft: 15,
    shadowOpacity: 0.8,
    color: COLORS.black,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  buttons: {
    backgroundColor: COLORS.primary,
    padding: 17,
    margin: 10,
    borderRadius: 5,
    fontSize: 18,
    width: 180,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
