import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  FlatList,
  RefreshControl
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { COLORS, ROUTES } from '../../constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Card, Title, Paragraph } from 'react-native-paper';
import PropupModel from '../../components/PropupModel';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  getEmployeeAction,
  deleteEmployeeAction,
  editEmployeeResponseData,
} from '../../Redux/actions/EmployeeAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authResponseData } from '../../Redux/actions/AuthAction';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { sizeFont, sizeWidth } from './../../Utils/Size';




const Home = ({ navigation }) => {
  const [showBox, setShowBox] = useState(true);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [listItem, setListItem] = useState(null);
  const [chooseData, setchooseData] = useState();
  const [refreshing, setRefreshing] = React.useState(false);

  const { employeeData, isLoading } = useSelector(state => state.EmployeeReducer);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(editEmployeeResponseData(null));
      dispatch(getEmployeeAction());
      (async () => {
        const getParseData = await AsyncStorage.getItem('userInfo');
        const convertPaeseData = JSON.parse(getParseData);
        await dispatch(authResponseData(convertPaeseData));
      })();
    }, []),
  );

  const deleteHandler = async id => {
    setisModalVisible(false);
    setListItem(null);
    await dispatch(deleteEmployeeAction(id));
  };

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
            deleteHandler(item?.id);
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

  const onRefresh = React.useCallback(async () => {
    setRefreshing(false);
    if (employeeData?.length < 100) {
      try {
        dispatch(getEmployeeAction());
        setRefreshing(false)
      } catch (error) {
        console.error(error);
      }
    }
    else{
      //ToastAndroid.show('No more new data available', ToastAndroid.SHORT);
      Alert.alert('No more new data available')
      setRefreshing(false)
    }
  }, [refreshing]);

  const renderEmployeeList = ({ item, index }) => {
    console.log("Get to check Data", item);
    return (
      <>
        <TouchableNativeFeedback
          onPress={() => {
            global.actionType = 'edit';
            global.tempActionType = 'edit';
            global.empId = item?.id;
            navigation.navigate('EmployeeDetails Tab', { item });
          }}>
          <View>
            <Card>
              <Card.Content>
                <Title
                  style={{
                    textDecorationLine: 'underline',
                    fontWeight: 'bold',
                  }}>
                  {`#${item.id}`}
                </Title>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    global.actionType = 'edit';
                    global.tempActionType = 'edit';
                    global.empId = item?.id;
                    navigation.navigate(ROUTES.EMPLOYEEFORM_DRAWER);
                  }}>
                  <MaterialCommunityIcons
                    name={'pencil'}
                    size={25}
                    color={COLORS.black}
                    style={{ alignSelf: 'center' }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.trash}
                  // onPress={() => }
                  onPress={() => {
                    setListItem(item);
                    setisModalVisible(true);
                  }}>
                  <FontAwesome5
                    name={'trash'}
                    size={20}
                    color={COLORS.black}
                    style={{ alignSelf: 'center' }}
                  />
                </TouchableOpacity>

                <Title>{`${item?.firstName} ${item?.lastName}`}</Title>
                <View style={{ flexDirection: 'row', paddingLeft: sizeWidth(1) }}>
                  <MaterialIcons name="location-city" size={22} color="black" />
                  <Paragraph
                    style={{ paddingLeft: 5 }}>{`${item?.location}`}</Paragraph>
                </View>

                <View style={{ flexDirection: 'row', paddingLeft: sizeWidth(1) }}>
                  <FontAwesome name="building-o" size={22} color="black" />
                  <Paragraph style={{ paddingLeft: 10 }}>
                    {`${item?.department}`}
                  </Paragraph>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: sizeWidth(1) }}>
                  <MaterialIcons name="call" size={22} color="black" />
                  <Paragraph
                    style={{
                      paddingLeft: sizeWidth(1),
                    }}>{`#${item?.mobileNumber}`}</Paragraph>
                </View>
              </Card.Content>
            </Card>
          </View>
        </TouchableNativeFeedback>
        {/* <View style={styles.body}>
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
      </View> */}
      </>
    );
  };

  return (
    <>
      {/* <Spinner size={"large"} color={COLORS.blue} visible={isLoading} /> */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        nRequestClose={() => changeModalVisible(false)}>
        <PropupModel
          deleteHandler={() => deleteHandler(listItem?.id)}
          title="Delete Employee"
          description="Are you sure you want to remove delete employee?"
          changeModalVisible={changeModalVisible}
          setData={setData}
        />
      </Modal>
      {employeeData && employeeData?.length == 0 ? (
        <View
          style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: sizeFont(4),
              fontWeight: '500',
            }}>
            No Employees found
          </Text>
        </View>
      ) : (
        <FlatList
          data={employeeData}
          renderItem={renderEmployeeList}
          keyExtractor={(item, index) => index.toString()}            
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          
        />
          
      )}
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            global.tempActionType = '';
            global.empId = '';
            navigation.navigate(ROUTES.EMPLOYEEFORM_DRAWER, { forNewRegistration: true });
          }}>
          <FontAwesome5
            name={'plus'}
            size={20}
            color={'#ffffff'}
            style={{ alignSelf: 'center' }}
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
    width: sizeWidth(15),
    height: sizeWidth(15),
    borderRadius: sizeWidth(15),
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    bottom: sizeWidth(4),
    right: sizeWidth(4),
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
