import React, {useState, useEffect, useCallback} from 'react';
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
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  editEmployeeAction,
  deleteEmployeeAction,
} from './../../Redux/actions/EmployeeAction';
import ProfileImg from '../../components/ProfileImg';
import {errorFormHandler} from '../../Redux/actions/AuthAction';
import {useNavigation} from '@react-navigation/native';
import {sizeFont, sizeWidth} from './../../Utils/Size';
import PropupModel from '../../components/PropupModel';
const {width} = Dimensions.get('window');

const EmployeeDetails = ({title, route, navigation}) => {
  const {editEmployeeData, isLoading} = useSelector(
    state => state.EmployeeReducer,
  );
  const dispatch = useDispatch();

  // const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibles, setisModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [username, setUserName] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [srdonDate, setSrdonDate] = useState('');
  const [showJoinDatePicker, setShowJoinDatePicker] = useState(false);
  const [showSalaryDatePicker, setShowSalaryDatePicker] = useState(false);
  const [showBox, setShowBox] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [text, setText] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [expertise, setExpertise] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [selected, setSelected] = React.useState('');
  const [selectBlood, setSelectBlood] = React.useState('');
  const [selectDept, setSelectDept] = React.useState('');
  const [phone, setPhone] = useState('');
  const [mobile, setMobile] = useState('');
  const [empImage, setEmpImage] = useState(null);
  const [listItem, setListItem] = useState(null);
  const [chooseData, setchooseData] = useState();

  // Create toggleModalVisibility function that will
  // Open and close modal upon button clicks.
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };
  const deleteHandler = async id => {
    setisModalVisible(false);
    setListItem(null);
    await dispatch(deleteEmployeeAction(id));
  };
  const setData = data => {
    setchooseData(data);
  }

  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };
  // On date change method
  const onToDateChange = (event, selectedDate) => {
    console.log('date testtttt', event, selectedDate);
    const currentDate = selectedDate || new Date();
    console.log('Date', currentDate);
    setShowJoinDatePicker(false);
    setJoinDate(
      moment(currentDate, 'DD-MM-YYYY').toISOString().substring(0, 10),
    );
  };

  // On date change method
  const onToDateChangeAction = (event, selectedDate) => {
    console.log('date testtttt', event, selectedDate);
    const currentDate = selectedDate || new Date();
    console.log('Date', currentDate);
    setShowSalaryDatePicker(false);
    setSrdonDate(
      moment(currentDate, 'DD-MM-YYYY').toISOString().substring(0, 10),
    );
  };
  //  const base64Image = route.params?.item?.profileImage;
  //  console.log("Profile Image",base64Image)
  useEffect(() => {
    dispatch(errorFormHandler({}));
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        if (global.actionType == 'edit') {
          await dispatch(editEmployeeAction(global.empId));
          setTimeout(() => {
            console.log(' GET EDIT  ', JSON.stringify(editEmployeeData));
            if (editEmployeeData != null) {
              setFirstName(editEmployeeData?.firstName);
              setLastName(editEmployeeData?.lastName);
              setPhone(editEmployeeData?.workPhone);
              setMobile(editEmployeeData?.mobileNumber);
              setExpertise(editEmployeeData?.expertise);
              setJobDesc(editEmployeeData?.jobDesc);
              setAboutMe(editEmployeeData?.aboutme);
              setJoinDate(
                moment(editEmployeeData?.joiningDate, 'DD-MM-YYYY')
                  .toISOString()
                  .substring(0, 10),
              );
              setSrdonDate(
                moment(editEmployeeData?.salaryRevisionDate, 'DD-MM-YYYY')
                  .toISOString()
                  .substring(0, 10),
              );
              setEmpImage(editEmployeeData?.profileImage);
              setSelectDept(editEmployeeData?.department);
              setSelectBlood(editEmployeeData?.bloodGroup);
            }
          }, 500);
        }
      })();
    }, [editEmployeeData]),
  );

  handleClicks = item => {
    console.log('item here', item);
    setListItem(item);
    setisModalVisible(true);
    console.log('Cliked Delete');   
  };

  handleEdits = item => {
    {
      global.actionType = 'edit';
      global.tempActionType = 'edit';
      global.empId = item?.id;
      navigation.navigate(ROUTES.EMPLOYEEFORM_DRAWER);
    }
  };
  const onAddWorkExp =  () => {
    console.log("hchdchdc")
  }
  return (
    <>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisibles}
        nRequestClose={() => changeModalVisible(false)}>
        <PropupModel
          deleteHandler={() => deleteHandler(listItem?.id)}
          title="Delete Employee"
          description="Are you sure you want to remove delete employee?"
          changeModalVisible={changeModalVisible}
          setData={setData}
        />
      </Modal>
      <SafeAreaView style={{flex: 1}}>
        <View>
          <TitleHeader
            title={`${route.params?.item?.firstName} ${route.params?.item?.lastName} - #${route.params?.item?.id}`}
            onclick={handleClicks}
            handleEdit={handleEdits}
            navigation={navigation}></TitleHeader>
        </View>
        <ScrollView style={{marginHorizontal: 5}}>
          <View>
            <ProfileImg
              updateImg={() => {
                addImage();
              }}
              imagePass={empImage}
            />
            <View style={{backgroundColor: COLORS.blue, padding: 10}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', color: COLORS.white}}>
                Work
              </Text>
            </View>
            <View style={styles.txtborder}>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> Department</Text>-
                {`${editEmployeeData?.department}`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> Location</Text>-
                {`${editEmployeeData?.location}`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> Work Phone</Text>-
                {`${editEmployeeData?.workPhone}`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}>Salary Revision Due On</Text>
                - {`${editEmployeeData?.salaryRevisionDate}`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}>
                  <Text style={{fontWeight: 'bold'}}> Date of Joining</Text>
                </Text>
                -{`${editEmployeeData?.joiningDate}`}
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
                {`${editEmployeeData?.mobileNumber}`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> Blood Group</Text> -
                {`${editEmployeeData?.bloodGroup}`}
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
                <Text style={{fontWeight: 'bold'}}> Job Description</Text> -
                {`${editEmployeeData?.jobDesc}`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> About Me</Text> -
                {`${editEmployeeData?.aboutme}`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}>Ask Me About/Expertise</Text>
                - {`${editEmployeeData?.expertise}`}
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
                  placeholderTextColor="grey"
                />
                <TextInput
                  placeholder="Job Title"
                  value={inputValue}
                  style={styles.textInput}
                  onChangeText={value => setInputValue(value)}
                  placeholderTextColor="grey"
                />
                {/* <View
                  onTouchEndCapture={() => {
                    setShowJoinDatePicker(true);
                  }}>
                  <TextInput
                    placeholder="Salary Revision Due On"
                    value={joinDate}
                    style={styles.textInputDate}
                    placeholderTextColor= 'grey' 
                  
                  />
                </View> */}
                <View
                  onTouchEndCapture={() => {
                    setShowJoinDatePicker(true);
                  }}>
                  <TextInput
                    placeholder="Salary Revision Due On"
                    placeholderTextColor="grey"
                    style={styles.textInputDate}
                    value={joinDate}
                    onChangeText={text => {
                      setJoinDate(text);
                    }}
                  />
                </View>
                <View
                  onTouchEndCapture={() => {
                    setShowSalaryDatePicker(true);
                  }}>
                  <TextInput
                    placeholder="Date of Joining"
                    value={srdonDate}
                    style={[styles.textInputbottom]}
                    onChangeText={text => {
                      setSrdonDate(text);
                    }}
                    placeholderTextColor="grey"
                  />
                </View>
                {/** This button is responsible to close the modal */}
                {/* <Button title="Close" onPress={toggleModalVisibility} /> */}
                <TouchableOpacity
                  style={styles.btnOkModal}
                  onPress={() => onAddWorkExp()}>
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
      {showSalaryDatePicker ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={'date'}
          maximumDate={new Date()}
          is24Hour={false}
          display="default"
          useCurrent={false}
          onChange={onToDateChangeAction}
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
    marginBottom: 15,
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
    color: 'black',
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
    color: 'black',
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
    color: 'black',
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
