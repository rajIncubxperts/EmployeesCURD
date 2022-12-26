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
  FlatList,
  Image,
} from 'react-native';
import {COLORS, IMGS, ROUTES} from '../../constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import TitleHeader from '../../components/TitleHeader';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import { errorFormHandler } from '../../Redux/actions/AuthAction';
import DateTimePicker from "react-native-modal-datetime-picker";
import Spinner from 'react-native-loading-spinner-overlay';
import {
  editEmployeeAction,
  deleteEmployeeAction,
  getWorkEmployeeAction,
  updateWorkAction,
  addWorkAction,
} from './../../Redux/actions/EmployeeAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ProfileImg from '../../components/ProfileImg';
import {useNavigation} from '@react-navigation/native';
import {sizeFont, sizeWidth} from './../../Utils/Size';
import PropupModel from '../../components/PropupModel';
const {width} = Dimensions.get('window');

const EmployeeDetails = ({title, route, navigation}) => {
  const {workDataGet, editEmployeeData, isLoading} = useSelector(
    state => state.EmployeeReducer,
  );
  const { errorForm } = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

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

  const [prevComp, setPrevComp] = useState('');
  const [jobTit, setJobTit] = useState('');
  const [workFromDt, setWorkFromDt] = useState('');
  const [workToDt, setWorkTODt] = useState('');

  const [modalprevComp, setModalPrevComp] = useState('');
  const [modalJobTit, setModalJobTit] = useState('');
  const [modalworkFromDt, setModalWorkFromDt] = useState("");
  const [modalworkToDt, setModalWorkToDt] = useState("");
  const [empExpId, setEmpExpId] = useState('');
  const [empGetData, setempGetData] = useState([]);
  const [AddOrEdit,setAddOrEdit] = useState('add');

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
  };

  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };

  const hideDatePicker = () => {
    setShowJoinDatePicker(false)
  }
  
  const handleConfirm = (date) => {
    let finalDate = moment(date, 'DD-MM-YYYY').toISOString().substring(0, 10)
    setModalWorkFromDt(finalDate);
    hideDatePicker();
  };

  const hideSalaryDatePicker = () => {
    setShowSalaryDatePicker(false);
  }
 
  const handleSalaryConfirm = (date) => {
    let finalDate = moment(date, 'DD-MM-YYYY').toISOString().substring(0, 10)
    setModalWorkToDt(finalDate);
    hideSalaryDatePicker();
  };
  

  useEffect(() => {
  //   let today = new Date()
  // setModalWorkFromDt(today);
  // setModalWorkToDt(today);
    dispatch(errorFormHandler({}));

  //  console.log("date Here ::", today)
  }, [])

  const updateModalHandler = async () => {

    var isError = false;
    var error = {};

    if (modalJobTit == '') {
      error.modalJobTit = "Field can't be empty.";
      isError = true;
    }
    if (modalprevComp == '') {
      error.modalprevComp = "Field can't be empty.";
      isError = true;
    }
    if (modalworkFromDt == '') {
      error.modalworkFromDt = "Field can't be empty.";
      isError = true;
    }
    if (modalworkToDt == '') {
      error.modalworkToDt = "Field can't be empty.";
      isError = true;
    }
    if (isError) {
      dispatch(errorFormHandler(error));
    }else{
      console.log("dateDel")
      // const dataDel = {
      //   id: empExpId
      // }
      
      const data = {
        id: empExpId,
        employeeId: global.empId,
        previousCompany: modalprevComp,
        jobTitle: modalJobTit,
        fromDate: moment((modalworkFromDt)).toISOString(),
        toDate: moment((modalworkToDt)).toISOString(),
        isActive: true,
      };  
      if (AddOrEdit == 'edit') {
        setModalVisible(false);
      await dispatch(updateWorkAction(data));
      
      }else if(AddOrEdit == 'add'){
        const data = {
          id: 0,
          employeeId: global.empId,
          previousCompany: modalprevComp,
          jobTitle: modalJobTit,
          fromDate: moment((modalworkFromDt)).toISOString(),
          toDate: moment((modalworkToDt)).toISOString(),
          isActive: true,
        };
        await dispatch(addWorkAction(data));
        setModalVisible(false);
      }
      // else{
      //   await dispatch(updateWorkAction(dataDel));
      // }
    }
   
  }

const remove = async () => {
  const dataDel = {
    id: empExpId,
    employeeId: global.empId,
    isActive:false
  }
  console.log('dataDele is ::',dataDel)
await dispatch(updateWorkAction(dataDel));
}


  useFocusEffect(
    useCallback(() => {
      (async () => {
        if (global.actionType == 'edit') {
          await dispatch(editEmployeeAction(global.empId));
          setTimeout(() => {
            const object = workDataGet?.map(obj => obj.id);
            if (workDataGet != null) {
              setModalVisible(false);
              setPrevComp(workDataGet[0]?.previousCompany);
              setJobTit(workDataGet[0]?.jobTitle);
              setWorkFromDt(
                moment(workDataGet[0]?.fromDate).format('DD MMM YYYY'),
              );
              setWorkTODt(moment(workDataGet[0]?.toDate).format('DD MMM YYYY'));
            }
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
          });
        }
      })();
    }, [editEmployeeData, workDataGet]),
  );

  useEffect(() => {
    getEmpDetails();
  });
  const getEmpDetails = async () => {
    const getParseData = await AsyncStorage.getItem('userInfo');
    const convertPaeseData = JSON.parse(getParseData);
    axios
      .get(
        `https://tech-resources-core-api.azurewebsites.net/EmployeeWorkExperience/${global.empId}`,
        {
          headers: {
            Authorization:
              convertPaeseData == null
                ? ''
                : `Bearer ${convertPaeseData.result}`,
          },
        },
      )
      .then(async res => {
        setempGetData(res.data.result);
      })
      .catch(e => {
        console.log(`Get Employee WorkExp eDerror ${e}`);
      });
  };
  const handleClicks = item => {
    setListItem(route.params?.item);
    setisModalVisible(true);
    console.log("Item ::" , item);
    console.log("SetListItem ::",  setListItem(route.params?.item?.id))
  };

  const handleEdits = item => {
    {
      global.actionType = 'edit';
      global.tempActionType = 'edit';
      global.empId = route.params?.item?.id;
      navigation.navigate(ROUTES.EMPLOYEEFORM_DRAWER);
    }
  };

  const renderItemEmpl = ({item}) => {

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignContent: 'center',
        }}>
        {item?.length === 0 ? (
          <Text
            style={{
              alignSelf: 'flex-start',
              margin: sizeWidth(2),
              padding: sizeWidth(4),
              color: COLORS.black,
              fontWeight: 'bold',
              marginLeft: sizeWidth(24),
            }}>
            No experience available!.
          </Text>
        ) : (
          <>
            <View style={styles.txtborder}>
              <View style={{margin:7}}>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> Company name</Text>
                {`- ${item.previousCompany == undefined ? '' : item.previousCompany}`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> Job Title</Text>
                {`- ${item.jobTitle == undefined ? '' : item.jobTitle}`}
              </Text>
              <Text Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> From Date</Text>
                {`- ${item.fromDate == undefined ? '' :  moment(item.fromDate).format('DD MMM YYYY')}`}
              </Text>

              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> To Date</Text>
                {`- ${item.toDate == undefined ? '' : moment(item.toDate).format('DD MMM YYYY')}`}
              </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setModalVisible(true);
                setModalPrevComp(item?.previousCompany);
                setModalJobTit(item?.jobTitle);
                setModalWorkFromDt(item?.fromDate);
                setModalWorkToDt(item?.toDate);
                setEmpExpId(item?.id)
                setAddOrEdit('edit')  
                
              }}>
              <MaterialCommunityIcons
                name={'pencil'}
                size={25}
                color={COLORS.black}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.trash}
              onPress={() => {remove();  
               setEmpExpId(item?.id)}}>  
              <FontAwesome5
                name={'trash'}
                size={20}
                color={COLORS.black}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </>
        )}
        
      </View>
    );
  };

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
            <View
              style={{
                backgroundColor: COLORS.blue,
                padding: sizeWidth(2),
                marginHorizontal: 10,
              }}>
              <Text
                style={{fontSize: sizeFont(4), fontWeight: 'bold', color: COLORS.white}}>
                Work
              </Text>
            </View>
            <View style={styles.txtborder}>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> Department</Text>-
                {`${
                  editEmployeeData?.department == undefined
                    ? ''
                    : editEmployeeData.department
                }`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> Location</Text>-
                {`${
                  editEmployeeData?.location == undefined
                    ? ''
                    : editEmployeeData.location
                }`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> Work Phone</Text>-
                {`${
                  editEmployeeData?.workPhone == undefined
                    ? ''
                    : editEmployeeData.workPhone
                }`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> Salary Revision Due On</Text>
                -{' '}
                {`${
                  editEmployeeData?.salaryRevisionDate == undefined
                    ? ''
                    :  moment(editEmployeeData.salaryRevisionDat).format('DD MMM YYYY')
                }`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}>
                  <Text style={{fontWeight: 'bold'}}> Date of Joining</Text>
                </Text>
                -
                {`${
                  editEmployeeData?.joiningDate == undefined
                    ? ''
                    :  moment(editEmployeeData.joiningDate).format('DD MMM YYYY')
                }`}
              </Text>
            </View>
            <View style={{margin: 5}} />
            <View
              style={{
                backgroundColor: COLORS.blue,
                padding: sizeWidth(2),
                marginHorizontal: 10,
              }}>
              <Text
                style={{fontSize: sizeFont(4), fontWeight: 'bold', color: COLORS.white}}>
                Personal
              </Text>
            </View>
            <View style={styles.txtborder}>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> Mobile Phone</Text> -
                {`${
                  editEmployeeData?.mobileNumber == undefined
                    ? ''
                    : editEmployeeData.mobileNumber
                }`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> Blood Group</Text> -
                {`${
                  editEmployeeData?.bloodGroup == undefined
                    ? ''
                    : editEmployeeData.bloodGroup
                }`}
              </Text>
            </View>
            <View style={{margin: 5}} />
            <View
              style={{
                backgroundColor: COLORS.blue,
                padding: sizeWidth(2),
                marginHorizontal: 10,
              }}>
              <Text
                style={{fontSize: sizeFont(4), fontWeight: 'bold', color: COLORS.white}}>
                Summary
              </Text>
            </View>
            <View style={styles.txtborder}>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> Job Description</Text> -
                {`${
                  editEmployeeData?.jobDesc == undefined
                    ? ''
                    : editEmployeeData.jobDesc
                }`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}> About Me</Text> -
                {`${
                  editEmployeeData?.aboutme == undefined
                    ? ''
                    : editEmployeeData.aboutme
                }`}
              </Text>
              <Text style={styles.textcolor}>
                <Text style={{fontWeight: 'bold'}}>Ask Me About/Expertise</Text>
                -{' '}
                {`${
                  editEmployeeData?.expertise == undefined
                    ? ''
                    : editEmployeeData.expertise
                }`}
              </Text>
            </View>
            <View style={{margin: 5}} />
            <View
              style={{
                backgroundColor: COLORS.blue,
                padding: sizeWidth(2),
                marginHorizontal: 10,
              }}>
              <Text
                style={{fontSize: sizeFont(4), fontWeight: 'bold', color: COLORS.white}}>
                Work Experience
              </Text>
            </View>
            
            <FlatList
              data={empGetData}
              renderItem={renderItemEmpl}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={{margin: 5}} />
          </View>
        </ScrollView>
      

        <View style={{flex:1}}>
          <View style={styles.body}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(true);
                setModalPrevComp('');
                setModalJobTit('');
                setModalWorkFromDt('');
                setModalWorkToDt('');
                setAddOrEdit('add')
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
          propagateSwipe={true}
            animationType="slide"
            transparent
            visible={isModalVisible}
            presentationStyle="overFullScreen"
            onDismiss={toggleModalVisibility}>
            <View style={styles.viewWrapper}>
              <View style={styles.modalView}>
                <Text style={styles.underlineTextStyle}>
                  {global.tempActionType == 'pencil'
                    ? 'Update Experince'
                    : 'Add Experince'}
                </Text>
                
            <View>
            <TextInput
                  placeholder="Previous Company"
                  value={modalprevComp}
                  style={styles.textInput}
                  onChangeText={value => {
                    dispatch(
                      errorFormHandler({
                        ...errorForm,
                        modalprevComp: '',
                      }),
                    );
                    setModalPrevComp(value);
                    
                  }}
                  placeholderTextColor="grey"
                />

            </View>
            {errorForm.modalprevComp ? <Text style={{ color: 'red',  alignSelf:'flex-start',  marginLeft:20, marginBottom:5 }}>{ "Field can't be empty"}</Text> : null } 
               <View>
               <TextInput
                  placeholder="Job Title"
                  value={modalJobTit}
                  style={styles.textInput}
                  onChangeText={value => {
                    dispatch(
                      errorFormHandler({
                        ...errorForm,
                        modalJobTit: '',
                      }),
                    );
                    setModalJobTit(value);
                  }}
                  placeholderTextColor="grey"
                />

               </View>
               {errorForm.modalJobTit ? <Text style={{ color: 'red', alignSelf:'flex-start',  marginLeft:20, marginBottom:5  }}>{ "Field can't be empty"}</Text> : null } 
                <View
                  onTouchEndCapture={() => {
                    setShowJoinDatePicker(true);
                  }}>
                  <TextInput
                    placeholder="Salary Revision Due On"
                    placeholderTextColor="grey"
                    style={styles.textInputDate}
                    value={modalworkFromDt}
                    onChangeText={text => {
                      dispatch(
                        errorFormHandler({
                          ...errorForm,
                          modalworkFromDt : "",
                        }),
                      );
                      setModalWorkToDt(text);
                    }}
                  />
                </View>
                {errorForm.modalworkFromDt ? <Text style={{ color: 'red', alignSelf:'flex-start',  marginLeft:20, marginBottom:5  }}>{ "Field can't be empty"}</Text> : null } 
                <View
                  onTouchEndCapture={() => {
                    setShowSalaryDatePicker(true);
                  }}>
                  <TextInput
                    placeholder="Date of Joining"
                    value={modalworkToDt}
                    style={[styles.textInputbottom]}
                    onChangeText={text => {
                      dispatch(
                        errorFormHandler({
                          ...errorForm,
                          modalworkToDt: '',
                        }),
                      );
                      setModalWorkToDt(text);
                      
                    }}
                    placeholderTextColor="grey"
                  />
                </View>
                {errorForm.modalworkToDt ? <Text style={{ color: 'red', alignSelf:'flex-start',  marginLeft:20, marginBottom:40  }}>{ "Field can't be empty"}</Text> : null } 
                <TouchableOpacity 
                  style={styles.btnOkModal}
                  onPress={() => updateModalHandler()
          
                   }>
                  <Text style={{color: COLORS.blue}}>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnModal}
                  onPress={() => {
                    setModalJobTit(jobTit);
                    setModalPrevComp(prevComp);
                    setModalWorkFromDt(workFromDt);
                    setModalWorkToDt(workToDt);
                    setModalVisible(false);
                  }}>
                  <Text style={{color: COLORS.blue}}>CANCEL</Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={showJoinDatePicker}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  minimumDate={new Date()}
                  maximumDate={new Date(2040, 10, 20)}
                />
                <DateTimePicker
                  isVisible={showSalaryDatePicker}
                  mode="date"
                  onConfirm={handleSalaryConfirm}
                  onCancel={hideSalaryDatePicker}
                  maximumDate={new Date()}
                />
              </View>
            </View>
            
          </Modal>
        </View>
      </SafeAreaView>
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
    height: 390,
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
    marginBottom: 8,
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
    right: 80,
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
    right: 35,
  },
  txtborder: {
    backgroundColor: '#faf7ed',
    shadowColor: '#000000',
    paddingLeft: 15,
    shadowOpacity: 0.8,
    color: COLORS.black,
    paddingBottom:7,
    shadowRadius: 2,
    elevation:10,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,

    marginHorizontal: 10,
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
