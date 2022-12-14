import React, { useState, useEffect, useCallback } from 'react';
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
import { COLORS } from '../../constants';
import { SelectList } from 'react-native-dropdown-select-list';
import { ScrollView } from 'react-native-gesture-handler';
import Profile from './Profile';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CreateEmpHeader from '../../components/CreateEmpHeader';
import { useNavigation } from '@react-navigation/native';
import { MaterialDialog } from 'react-native-material-dialog';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { errorFormHandler } from '../../Redux/actions/AuthAction';
import { createEmployeeAction, loadingState } from './../../Redux/actions/EmployeeAction';
import { useFocusEffect } from '@react-navigation/native';
import { editEmployeeAction, editEmployeeResponseData, updateEmployeeAction } from './../../Redux/actions/EmployeeAction';
import { sizeFont, sizeWidth } from './../../Utils/Size';
import axios from 'axios';
import { GET_EMPLOYEE_DATA, EDIT_EMPLOYEE_DATA, LOADING } from '../../Redux/Types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../Config/config';



const EmployeeForm = props => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [text, setText] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [expertise, setExpertise] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [selected, setSelected] = React.useState("");
  const [selectBlood, setSelectBlood] = React.useState("");
  const [selectDept, setSelectDept] = React.useState("");
  const [selectCity, setSelectCity] = React.useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [empImage, setEmpImage] = useState(null);
  const [joinDate, setJoinDate] = useState("");
  const [srdonDate, setSrdonDate] = useState("");
  const [showJoinDatePicker, setShowJoinDatePicker] = useState(false);
  const [showSalaryDatePicker, setShowSalaryDatePicker] = useState(false);
  const [defaultDeptSelected, setDefaultDeptSelected] = React.useState({});
  const [defaultBloodSelected, setDefaultBloodSelected] = React.useState({});
  const [defaultCitySelected, setDefaultCitySelected] = React.useState({});
  const { editEmployeeData, isLoading } = useSelector(state => state.EmployeeReducer);
  const { errorForm } = useSelector(state => state.AuthReducer);
  // const {} = useSelector(state => console.log("State: ",state))
  const dispatch = useDispatch();

  const data = [
    { key: '1', value: 'Engineering' },
    { key: '2', value: 'Finance' },
    { key: '3', value: 'Administration' },
    { key: '4', value: 'Computers' },
    { key: '5', value: 'Business Development' },
    { key: '6', value: 'HR' },
  ];
  const city = [
    { key: '1', value: 'Pune' },
    { key: '2', value: 'Mumbai' },
    { key: '3', value: 'Indore' },
    { key: '4', value: 'Bangloare' },
    { key: '5', value: 'Channai' },
    { key: '6', value: 'Hyderabad' },
    { key: '7', value: 'Ranchi' },
  ];
  const bloodGroup = [
    { key: '1', value: 'A +ve' },
    { key: '2', value: 'A -ve' },
    { key: '3', value: 'B +ve' },
    { key: '4', value: 'B -ve' },
    { key: '5', value: 'O -ve' },
  ];

  useEffect(() => {
    dispatch(errorFormHandler({}));
  }, []);

  useFocusEffect(useCallback(() => {
    (async () => {
      if (global.actionType == "edit") {
        await dispatch(editEmployeeAction(global.empId));
        setTimeout(() => {
          console.log(" GET EDIT DATA  ", JSON.stringify(editEmployeeData))
          if (editEmployeeData != null) {
            setFirstName(editEmployeeData?.firstName)
            setLastName(editEmployeeData?.lastName)
            setPhone(editEmployeeData?.workPhone)
            setMobile(editEmployeeData?.mobileNumber)
            setExpertise(editEmployeeData?.expertise)
            setJobDesc(editEmployeeData?.jobDesc)
            setAboutMe(editEmployeeData?.aboutme)
            setJoinDate(
              moment(editEmployeeData?.joiningDate, 'DD-MM-YYYY').toISOString().substring(0, 10),
            );
            setSrdonDate(
              moment(editEmployeeData?.salaryRevisionDate, 'DD-MM-YYYY').toISOString().substring(0, 10),
            );
            setEmpImage(editEmployeeData?.profileImage)
            setDefaultDeptSelected(
              data.filter(f => f.value == editEmployeeData?.department)[0]
            )
            setSelectDept(editEmployeeData?.department)
            setSelectBlood(editEmployeeData?.bloodGroup)
            setSelectCity(editEmployeeData?.city)
            setDefaultBloodSelected(
              bloodGroup.filter(f => f.value == editEmployeeData?.bloodGroup)[0]
            )
            setDefaultCitySelected(
              city.filter(f => f.value == editEmployeeData?.city)[0]
            )
          }
        }, 500);
      }

    })()
  }, [editEmployeeData],))


  //console.log(selectDept)
  console.log(selectCity)

  // const onChangeTextValue = text => {
  //   if (+text) {
  //     setText(text);
  //   }
  // };

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

  handleClick = () => {
    // console.log('Click happened');
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
        <Spinner visible={isLoading} />
        updateHandler();
      } else {
        <Spinner visible={isLoading} />
        saveHandler();
      }
    }
  };

  const addImage = () => {
    Alert.alert('Choose Option', '', [
      {
        text: 'Remove',
        onPress: () => { setEmpImage(null) },
      },
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
    debugger;
    dispatch(loadingState(true))
    let options = {
      mediaType: 'photo',
      includeBase64: true,
    };
    const result = await launchCamera(options);
    console.log("Image Result",result)
    try {
      let base64 = result.assets[0].base64;
      let type = result.assets[0].type;
      let tempObj = `data:${type};base64,${base64}`;
      console.log("Image",tempObj)
      setEmpImage(tempObj);
      dispatch(loadingState(false))

    } catch (error) {
      console.log(error.message)
      dispatch(loadingState(false))
    }
  };

  const galleryHandler = async () => {
    dispatch(loadingState(true))
    let options = {
      mediaType: 'photo',
      includeBase64: true,
    };
    const result = await launchImageLibrary(options);
    let uri = result.assets[0].uri;
    console.log("Image Result gallety", uri);
    
    try {
      let base64 = result.assets[0].base64;
      let type = result.assets[0].type;
      let tempObj = `data:${type};base64,${base64}`;
      apiCallForUploadImage(uri);
      setEmpImage(tempObj);
      dispatch(loadingState(false))

    } catch (error) {
      console.log(error.message)
      dispatch(loadingState(false))
    }
  };

  const apiCallForUploadImage=(uri)=>{
    let formData = new FormData();
    formData.append('files',uri)


    // axios
    // .post(`${BASE_URL}/UploadProfile?employeeId=${}`, tempData, {
    //   headers: {
    //     Authorization:
    //       convertPaeseData == null ? '' : `Bearer ${convertPaeseData.result}`,
    //   },
    // })
    // .then(async res => {
    //   let resData = res.data;
    //   console.log('Edit Employee Data ', resData);
    //   props.navigation.goBack()
    // })
    // .catch(e => {
    //   dispatch(loadingState(false));
    //   console.log(`Get Employee error ${e}`);
    // });

  }

  const saveHandler = async () => {
    const tempObj = {
      "isActive": true,
      "createdBy": 'string',
      "createdAt": '2022-11-20T15:49:23.719Z',
      "updatedBy": '',
      "updatedAt": '2022-11-20T15:49:23.719Z',
      "id": 0,
      "firstName": firstName,
      "lastName": lastName,
      "workPhone": phone,
      "mobileNumber": mobile,
      "bloodGroup": selectBlood,
      "jobDesc": jobDesc,
      "expertise": expertise,
      "aboutme": aboutMe,
      "location": selectCity,
      "department": selectDept,
      "profileImage": empImage,
      "joiningDate": joinDate,
      "salaryRevisionDate": srdonDate,
    };
    console.log('Joining Date :-', joinDate);
    console.log(tempObj);
    await dispatch(createEmployeeAction(tempObj, props));
  };

  const updateHandler = async () => {

    var tempDept = ""
    data.map(obj => {
      if (obj.key == selectDept || obj.value == selectDept) {
        tempDept = obj.value
      }
    })

    var tempBlood = ""
    bloodGroup.map(obj => {
      if (obj.key == selectBlood || obj.value == selectBlood) {
        tempBlood = obj.value
      }
    })

    var tempCity = ""
    city.map(obj => {
      if (obj.key == selectCity || obj.value == selectCity) {
        tempCity = obj.value
      }
    })

    const tempObj = {
      "isActive": true,
      "createdBy": "string",
      "createdAt": "2022-11-20T11:26:18.765Z",
      "updatedBy": "string",
      "updatedAt": "2022-11-20T11:26:18.765Z",
      "id": global.empId,
      "firstName": firstName,
      "lastName": lastName,
      "workPhone": phone,
      "mobileNumber": mobile,
      "bloodGroup": tempBlood,
      "jobDesc": jobDesc,
      "expertise": expertise,
      "aboutme": aboutMe,
      "location": tempCity,
      "department": tempDept,
      "profileImage": empImage,
      "joiningDate": joinDate,
      "salaryRevisionDate": srdonDate
    }

    console.log("Update Employee", tempObj)
    dispatch(updateEmployeeAction(tempObj, props))

  }

  return (
    <>
      <ScrollView>
        <View>
          <CreateEmpHeader
            title={global.tempActionType == 'edit' ? "Update Employee" : "Create Employee"}
            titleright="Save"
            navigation={props.navigation}
            onclick={handleClick}></CreateEmpHeader>
        </View>

        <Profile
          updateImg={() => {
            addImage();
          }}
          imagePass={empImage}
        />
        <View style={{ margin: sizeWidth(3) }}>
          <View style={{ backgroundColor: COLORS.blue, padding: sizeWidth(2) }}>
            <Text
              style={{ fontSize: sizeFont(4), fontWeight: 'bold', color: COLORS.white }}>
              Basic Info
            </Text>
          </View>
          <View
            style={[
              { borderColor: errorForm.firstName ? 'red' : null, borderWidth: 1 },
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
              placeholderTextColor= 'grey' 
              style={{color:'black'}}
            />
          </View>
          {errorForm.firstName == null ? null : (
            <Text style={{ color: 'red' }}>{errorForm.firstName}</Text>
          )}
          <View
            style={[
              { borderColor: errorForm.lastName ? 'red' : null, borderWidth: 1 },
              styles.mainBox,
            ]}>
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={text => {
                dispatch(
                  errorFormHandler({
                    ...errorForm,
                    lastName: '',
                  }),
                );
                setLastName(text);
              }}
              placeholderTextColor= 'grey' 
              style={{color:'black'}}
            />
          </View>
          {errorForm.lastName == null ? null : (
            <Text style={{ color: 'red' }}>{errorForm.lastName}</Text>
          )}
          <View style={{ margin: sizeWidth(1) }} />
          <View style={{ backgroundColor: COLORS.blue, padding: sizeWidth(2) }}>
            <Text
              style={{ fontSize: sizeFont(4), fontWeight: 'bold', color: COLORS.white }}>
              Work
            </Text>
          </View>
          <View style={{ margin: sizeWidth(1) }} />
          <SelectList
            setSelected={val => {
              setSelectDept(val)
            }}
            data={data}
            defaultOption={defaultDeptSelected}
            save="value"
            placeholder="Select Department"
            inputStyles={{color:'black'}}
            dropdownTextStyles={{color:'gery'}}
            dropdownStyles={{backgroundColor:'grey'}} 
          />
          <View style={{ margin: sizeWidth(1) }} />
          <SelectList
            //defaultOption={{key: '1', value: 'Pune'}}
            setSelected={val => {
              setSelectCity(val)
            }}
            data={city}
            defaultOption={defaultCitySelected}
            save="value"
            placeholder="Select City"
            inputStyles={{color:'black'}}
            dropdownTextStyles={{color:'gery'}}
            dropdownStyles={{backgroundColor:'grey'}} 
          />
          <View
            style={[
              { borderColor: errorForm.phone ? 'red' : null, borderWidth: 1 },
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
              placeholderTextColor= 'grey' 
              style={{color:'black'}}
            />
          </View>
          {errorForm.phone == null ? null : (
            <Text style={{ color: 'red' }}>{errorForm.phone}</Text>
          )}
          <View style={{ margin: sizeWidth(1) }} />
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
              placeholderTextColor= 'grey' 
              style={{color:'black'}}
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


          <View style={{ margin: sizeWidth(1) }} />
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
              placeholderTextColor= 'grey' 
              style={{color:'black'}}
              value={srdonDate}
              onChangeText={text => {
                dispatch(
                  errorFormHandler({
                    ...errorForm,
                    srdonDate: '',
                  }),
                );
                setSrdonDate(text);
              }}
              // editable={false}
            />
          </View>
          {errorForm.srdonDate == null ? null : (
            <Text style={{color: 'red'}}>{errorForm.srdonDate}</Text>
          )}
          <View style={{ margin: sizeWidth(1) }} />
          <View style={{ backgroundColor: COLORS.blue, padding: sizeWidth(2) }}>
            <Text
              style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.white }}>
              Personal
            </Text>
          </View>
          <View style={{ margin: sizeWidth(1) }} />
          <View
            style={[
              { borderColor: errorForm.mobile ? 'red' : null, borderWidth: 1 },
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
              placeholderTextColor= 'grey' 
              style={{color:'black'}}
            />
          </View>
          {errorForm.mobile == null ? null : (
            <Text style={{ color: 'red' }}>{errorForm.mobile}</Text>
          )}
          <View style={{ margin: sizeWidth(1) }} />
          <SelectList
            setSelected={val => setSelectBlood(val)}
            data={bloodGroup}
            defaultOption={defaultBloodSelected}
            save="value"
            placeholder="Select Blood Group"
            inputStyles={{color:'black'}}
            dropdownTextStyles={{color:'gery'}}
            dropdownStyles={{backgroundColor:'grey'}} 
          />
          <View style={{ margin: sizeWidth(1) }} />
          <View style={{ backgroundColor: COLORS.blue, padding: sizeWidth(2) }}>
            <Text
              style={{ fontSize: sizeFont(4), fontWeight: 'bold', color: COLORS.white }}>
              Summary
            </Text>
          </View>
          <View style={{ margin: sizeWidth(1) }} />
          <View
            style={[
              { borderColor: errorForm.jobDesc ? 'red' : null, borderWidth: 1 },
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
              placeholderTextColor= 'grey' 
              style={{color:'black'}}
            />
          </View>
          {errorForm.jobDesc == null ? null : (
            <Text style={{ color: 'red' }}>{errorForm.jobDesc}</Text>
          )}
          <View
            style={[
              { borderColor: errorForm.expertise ? 'red' : null, borderWidth: 1 },
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
              placeholderTextColor= 'grey' 
              style={{color:'black'}}
            />
          </View>
          {errorForm.expertise == null ? null : (
            <Text style={{ color: 'red' }}>{errorForm.expertise}</Text>
          )}
          <View
            style={[
              { borderColor: errorForm.aboutMe ? 'red' : null, borderWidth: 1 },
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
              placeholderTextColor= 'grey' 
              style={{color:'black'}}
            />
          </View>
          {errorForm.aboutMe == null ? null : (
            <Text style={{ color: 'red' }}>{errorForm.aboutMe}</Text>
          )}
        </View>
      </ScrollView>
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
    shadowOffset: { width: 10, height: 10 },
  },
  mainBox: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: sizeWidth(3),
    marginVertical: sizeWidth(2.5),
  },
});
