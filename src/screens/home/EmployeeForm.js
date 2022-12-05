import React, {useState, useEffect, useCallback} from 'react';
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {COLORS} from '../../constants';
import {Button, HelperText} from 'react-native-paper';
import {SelectList} from 'react-native-dropdown-select-list';
import {ScrollView} from 'react-native-gesture-handler';
import Profile from './Profile';
import {useFocusEffect} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CreateEmpHeader from '../../components/CreateEmpHeader';
import {useNavigation} from '@react-navigation/native';
import {MaterialDialog} from 'react-native-material-dialog';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {errorFormHandler} from '../../Redux/actions/AuthAction';

const EmployeeForm = props => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [text, setText] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [expertise, setExpertise] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const onChangeText = text => setText(text);
  const [selected, setSelected] = React.useState('');
  const [phone, setPhone] = useState('');
  const [mobile, setMobile] = useState('');
  const [empImage, setEmpImage] = useState(null);
  const [joinDate, setJoinDate] = useState('');
  const [srdonDate, setSrdonDate] = useState('');
  const [showJoinDatePicker, setShowJoinDatePicker] = useState(false);
  const [showSalaryDatePicker, setShowSalaryDatePicker] = useState(false);

  const {errorForm} = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  //const [visible, setVisible] = useState(true);

  // const [visible, setVisible] = React.useState(false);

  // const showDialog = () => setVisible(true);

  // const hideDialog = () => setVisible(false);
  const data = [
    {key: '1', value: 'Engineering'},
    {key: '2', value: 'Finance'},
    {key: '3', value: 'Administration'},
    {key: '4', value: 'Computers'},
    {key: '5', value: 'Business Development'},
    {key: '6', value: 'HR'},
  ];
  const city = [
    {key: '1', value: 'Pune'},
    {key: '2', value: 'Mumbai'},
    {key: '3', value: 'Indore'},
    {key: '4', value: 'Bangloare'},
    {key: '5', value: 'Channai'},
    {key: '6', value: 'Hyderabad'},
    {key: '7', value: 'Ranchi'},
  ];
  const bloodGroup = [
    {key: '1', value: 'A +ve'},
    {key: '2', value: 'A -ve'},
    {key: '3', value: 'B +ve'},
    {key: '4', value: 'B -ve'},
    {key: '5', value: 'O -ve'},
  ];

  useEffect(() => {
    dispatch(errorFormHandler({}));
  }, []);

  const onChangeTextValue = text => {
    if (+text) {
      setText(text);
    }
  };
  
  // On date change method
  const onToDateChange = (event, selectedDate) => {
    console.log('date testtttt', event, selectedDate);
    const currentDate = selectedDate || new Date();
    console.log('Date', currentDate);
    setShowJoinDatePicker(false);
    setJoinDate(moment(currentDate, 'DD-MM-YYYY').format('DD-MM-YYYY'));
  };
  // On date change method
  const onToDateChangeAction = (event, selectedDate) => {
    console.log('date testtttt', event, selectedDate);
    const currentDate = selectedDate || new Date();
    console.log('Date', currentDate);
    setShowSalaryDatePicker(false);
    setSrdonDate(moment(currentDate, 'DD-MM-YYYY').format('DD-MM-YYYY'));
  };
  handleClick = () => {
    console.log('Click happened');
    var isError = false;
    var error = {};
    if (firstName == '') {
      error.firstName = "Field can't be empty.";
      isError = true;
    }
    if (lastName == '') {
      error.lastName = "Field can't be empty.";
      isError = true;
    }
    if (phone == '') {
      error.phone = "Field can't be empty.";
      isError = true;
    }
    if (mobile == '') {
      error.mobile = "Field can't be empty.";
      isError = true;
    }
    if (joinDate == '') {
      error.joinDate = "Field can't be empty.";
      isError = true;
    }
    if (srdonDate == '') {
      error.srdonDate = "Field can't be empty.";
      isError = true;
    }
    if (jobDesc == '') {
      error.jobDesc = "Field can't be empty.";
      isError = true;
    }
    if (expertise == '') {
      error.expertise = "Field can't be empty.";
      isError = true;
    }
    if (aboutMe == '') {
      error.aboutMe = "Field can't be empty.";
      isError = true;
    }
    if (isError) {
      dispatch(errorFormHandler(error));
    } else {
      if (global.tempActionType == 'edit') {
        updateHandler();
      } else {
        saveHandler();
      }
    }
  };

  const addImage = () => {
    Alert.alert('Choose Option', '', [
      {
        text: 'Camera',
        onPress: () => cameraHandelr(),
      },
      {
        text: 'Gallery',
        onPress: () => galleryHandler(),
      },
    ]);
  };

  const cameraHandelr = async () => {
    let options = {
      mediaType: 'photo',
      includeBase64: true,
    };
    const result = await launchCamera(options);
    let base64 = result.assets[0].base64;
    let type = result.assets[0].type;
    let tempObj = `data:${type};base64,${base64}`;
    setEmpImage(tempObj);
  };

  const galleryHandler = async () => {
    let options = {
      mediaType: 'photo',
      includeBase64: true,
    };
    const result = await launchImageLibrary(options);
    let base64 = result.assets[0].base64;
    let type = result.assets[0].type;
    let tempObj = `data:${type};base64,${base64}`;
    setEmpImage(tempObj);
  };

  return (
    <>
      {/* <MaterialDialog
 visible={visible}
  title="Use Google's Location Service?"
  colorAccent='red'
  onOk={() => setVisible({ visible: false })}
  onCancel={() => setVisible({ visible: false })}>
  <Text style={styles.dialogText}>
    Let Google help apps determine location. This means sending anonymous
    location data to Google, even when no apps are running.
  </Text>
</MaterialDialog> */}

      <ScrollView>
        <View>
          <CreateEmpHeader
            title="Create Employee"
            titleright="Save"
            navigation={props.navigation}
            onclick={handleClick}></CreateEmpHeader>
        </View>

        {/* <Provider >
      <View style={{}}>
        <Button onPress={showDialog}>Show Dialog</Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>This is simple dialog</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button   color="red" onPress={hideDialog}>Yes</Button>
                <Button onPress={hideDialog}>No</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider> */}

        <Profile
          updateImg={() => {
            addImage();
          }}
          imagePass={empImage}
        />
        <View style={{margin: 10}}>
          <View style={{backgroundColor: COLORS.blue, padding: 10}}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: COLORS.white}}>
              Basic Info
            </Text>
          </View>
          <View
            style={[
              {borderColor: errorForm.firstName ? 'red' : null, borderWidth: 1},
              styles.mainBox,
            ]}>
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={text => {
                dispatch(
                  errorFormHandler({
                    ...errorForm,
                    firstName: '',
                  }),
                );
                setFirstName(text);
              }}
            />
          </View>
          {errorForm.firstName == null ? null : (
            <Text style={{color: 'red'}}>{errorForm.firstName}</Text>
          )}
          <View
            style={[
              {borderColor: errorForm.lastName ? 'red' : null, borderWidth: 1},
              styles.mainBox,
            ]}>
            <TextInput
              placeholder="Last Name"
              onChangeText={text => {
                dispatch(
                  errorFormHandler({
                    ...errorForm,
                    lastName: '',
                  }),
                );
                setLastName(text);
              }}
            />
          </View>
          {errorForm.lastName == null ? null : (
            <Text style={{color: 'red'}}>{errorForm.lastName}</Text>
          )}
          <View style={{margin: 5}} />
          <View style={{backgroundColor: COLORS.blue, padding: 10}}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: COLORS.white}}>
              Work
            </Text>
          </View>
          <View style={{margin: 5}} />
          <SelectList
            setSelected={val => setSelected(val)}
            data={data}
            save="value"
            placeholder="Select Department"
          />
          <View style={{margin: 5}} />
          <SelectList
            //defaultOption={{key: '1', value: 'Pune'}}
            setSelected={val => setSelected(val)}
            data={city}
            save="value"
            placeholder="Select City"
          />
          <View
            style={[
              {borderColor: errorForm.phone ? 'red' : null, borderWidth: 1},
              styles.mainBox,
            ]}>
            <TextInput
              placeholder="Work Phone"
              value={phone}
              keyboardType="numeric"
              onChangeText={text => {
                dispatch(
                  errorFormHandler({
                    ...errorForm,
                    phone: '',
                  }),
                );
                setPhone(text);
              }}
            />
          </View>
          {errorForm.phone == null ? null : (
            <Text style={{color: 'red'}}>{errorForm.phone}</Text>
          )}
          <View style={{margin: 5}} />
          <View
            style={[
              {borderColor: errorForm.joinDate ? 'red' : null, borderWidth: 1},
              styles.mainBox,
            ]}
            onTouchEndCapture={() => {
              setShowJoinDatePicker(true);
            }}>
            <TextInput
              placeholder="Salary Revision Due On"
              value={joinDate}
              onChangeText={text => {
                dispatch(
                  errorFormHandler({
                    ...errorForm,
                    joinDate: '',
                  }),
                );
                setJoinDate(text);
              }}
              //showSoftInputOnFocus={false}
              // keyboardType="numeric"
              //editable={false}
            />
          </View>
          {errorForm.joinDate == null ? null : (
            <Text style={{color: 'red'}}>{errorForm.joinDate}</Text>
          )}

          <View style={{margin: 5}} />
          <View
            style={[
              {borderColor: errorForm.srdonDate ? 'red' : null, borderWidth: 1},
              styles.mainBox,
            ]}
            onTouchEndCapture={() => {
              setShowSalaryDatePicker(true);
            }}>
            <TextInput
              placeholder="Date of Joining"
              value={srdonDate}
              // editable={false}
            />
          </View>
          {errorForm.srdonDate == null ? null : (
            <Text style={{color: 'red'}}>{errorForm.srdonDate}</Text>
          )}
          <View style={{margin: 5}} />
          <View style={{backgroundColor: COLORS.blue, padding: 10}}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: COLORS.white}}>
              Personal
            </Text>
          </View>
          <View style={{margin: 5}} />
          <View
            style={[
              {borderColor: errorForm.mobile ? 'red' : null, borderWidth: 1},
              styles.mainBox,
            ]}>
            <TextInput
              placeholder="Mobile No"
              value={mobile}
              mode="outlined"
              keyboardType="numeric"
              onChangeText={text => {
                dispatch(
                  errorFormHandler({
                    ...errorForm,
                    mobile: '',
                  }),
                );
                setMobile(text);
              }}
            />
          </View>
          {errorForm.mobile == null ? null : (
            <Text style={{color: 'red'}}>{errorForm.mobile}</Text>
          )}
          <View style={{margin: 5}} />
          <SelectList
            setSelected={val => setSelected(val)}
            data={bloodGroup}
            save="value"
            placeholder="Select Blood Group"
          />
          <View style={{margin: 5}} />
          <View style={{backgroundColor: COLORS.blue, padding: 10}}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', color: COLORS.white}}>
              Summary
            </Text>
          </View>
          <View style={{margin: 5}} />
          <View
            style={[
              {borderColor: errorForm.jobDesc ? 'red' : null, borderWidth: 1},
              styles.mainBox,
            ]}>
            <TextInput
              placeholder="Job Desc"
              multiline={true}
              value={jobDesc}
              onChangeText={text => {
                dispatch(
                  errorFormHandler({
                    ...errorForm,
                    jobDesc: '',
                  }),
                );
                setJobDesc(text);
              }}
            />
          </View>
          {errorForm.jobDesc == null ? null : (
            <Text style={{color: 'red'}}>{errorForm.jobDesc}</Text>
          )}
          <View
            style={[
              {borderColor: errorForm.expertise ? 'red' : null, borderWidth: 1},
              styles.mainBox,
            ]}>
            <TextInput
              placeholder="Expertise"
              multiline={true}
              value={expertise}
              onChangeText={text => {
                dispatch(
                  errorFormHandler({
                    ...errorForm,
                    expertise: '',
                  }),
                );
                setExpertise(text);
              }}
            />
          </View>
          {errorForm.expertise == null ? null : (
            <Text style={{color: 'red'}}>{errorForm.expertise}</Text>
          )}
          <View
            style={[
              {borderColor: errorForm.aboutMe ? 'red' : null, borderWidth: 1},
              styles.mainBox,
            ]}>
            <TextInput
              placeholder="About Me"
              numberOfLines={4}
              multiline={true}
              value={aboutMe}
              onChangeText={text => {
                dispatch(
                  errorFormHandler({
                    ...errorForm,
                    aboutMe: '',
                  }),
                );
                setAboutMe(text);
              }}
            />
          </View>
          {errorForm.aboutMe == null ? null : (
            <Text style={{color: 'red'}}>{errorForm.aboutMe}</Text>
          )}
        </View>
      </ScrollView>
      {showJoinDatePicker ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={'date'}
          maximumDate={new Date()}
          is24Hour={true}
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

export default EmployeeForm;

const styles = StyleSheet.create({
  calenderStyle: {
    width: '85%',
    height: '70%',
    alignSelf: 'center',
    borderRadius: 30,
    shadowRadius: 15,
    shadowOpacity: 0.9,
    elevation: 10,
    shadowOffset: {width: 10, height: 10},
  },
  mainBox: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});
