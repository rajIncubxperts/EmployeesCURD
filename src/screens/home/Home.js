import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {COLORS, ROUTES} from '../../constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Card, Title, Paragraph} from 'react-native-paper';
import PropupModel from '../../components/PropupModel';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  getEmployeeAction,
  deleteEmployeeAction,
} from '../../Redux/actions/EmployeeAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authResponseData} from '../../Redux/actions/AuthAction';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

const Home = ({navigation}) => {
  const [showBox, setShowBox] = useState(true);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [chooseData, setchooseData] = useState();

  const {employeeData, isLoading} = useSelector(state => state.EmployeeReducer);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getEmployeeAction());
      (async () => {
        const getParseData = await AsyncStorage.getItem('userInfo');
        const convertPaeseData = JSON.parse(getParseData);
        await dispatch(authResponseData(convertPaeseData));
      })();
    }, []),
  );

  const deleteHandler = async id => {
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

  const renderEmployeeList = ({item}) => {
    console.log(item);
    return (
      <>
        <TouchableNativeFeedback
          onPress={() => navigation.navigate('EmployeeDetails Tab', {item})}>
          <View>
          <Spinner visible={isLoading} />
            {showBox && (
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
                    // onPress={() => }
                    onPress={() => deleteHandler(item?.id)}>
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
                      description="Are you sure you want to remove delete employee?"
                      changeModalVisible={changeModalVisible}
                      setData={setData}
                    />
                  </Modal>
                  <Title>{`${item?.firstName} ${item?.lastName}`}</Title>
                  <View style={{flexDirection: 'row', paddingLeft: 5}}>
                    <MaterialIcons
                      name="location-city"
                      size={22}
                      color="black"
                    />
                    <Paragraph
                      style={{paddingLeft: 5}}>{`${item?.location}`}</Paragraph>
                  </View>

                  <View style={{flexDirection: 'row', paddingLeft: 5}}>
                    <FontAwesome name="building-o" size={22} color="black" />
                    <Paragraph style={{paddingLeft: 10}}>
                      {`${item?.department}`}
                    </Paragraph>
                  </View>
                  <View style={{flexDirection: 'row', paddingLeft: 5}}>
                    <MaterialIcons name="call" size={22} color="black" />
                    <Paragraph
                      style={{
                        paddingLeft: 5,
                      }}>{`#${item?.mobileNumber}`}</Paragraph>
                  </View>
                </Card.Content>
              </Card>
            )}
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
      <Spinner visible={isLoading} />

      <FlatList
        data={employeeData}
        renderItem={renderEmployeeList}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            global.tempActionType = '';
            global.empId = '';
            navigation.navigate(ROUTES.EMPLOYEEFORM_DRAWER);
          }}>
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
