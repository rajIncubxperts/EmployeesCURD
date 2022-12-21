import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  RefreshControl,
  ActivityIndicator,
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
import ListLoader from '../../components/ListLoader';

const Home = ({ navigation }) => {
  const [isModalVisible, setisModalVisible] = useState(false);
  const [listItem, setListItem] = useState(null);
  const [chooseData, setchooseData] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const { employeeData, isLoading, } = useSelector(state => state.EmployeeReducer);
  const {pageSize, pageNum, result } = employeeData;
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(editEmployeeResponseData(null));
      dispatch(getEmployeeAction({pageNum: 1, pageSize: 5, result: null}));
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

  const setData = data => {
    setchooseData(data);
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(false);
    if (result?.length < 1) {
      try {
        dispatch(getEmployeeAction({pageNum: 1, pageSize: 5, result: null}));
        setRefreshing(false)
      } catch (error) {
        console.error(error);
      }
    }
    else{
      dispatch(getEmployeeAction({pageNum: 1, pageSize: 5, result: null}));
      setRefreshing(false)
    // Alert.alert('No more new data available')
      setRefreshing(false)
    }
  }, [refreshing]);

  const onEndReached = React.useCallback(async () => {
 setLoading(true);
    dispatch(getEmployeeAction({pageNum: pageNum + 1, pageSize: 5, result: result}));
    setLoading(false)
  });
  const renderFooter = () =>  <ListLoader />
  // const renderFooter = () => { 
  //   return (
  //     // Footer View with Loader
  //     <View style={styles.footer}>
  //       {loading ? (
  //         <>
  //         <ActivityIndicator
  //           color="black"
  //           style={{margin: 10}} />
  //           <Text style={{color:COLORS.black, alignSelf:'center'}}>Loading</Text>
  //           </>
  //       ) : null}
  //     </View>
  //   );
  // };
  const renderEmployeeList = ({ item, index }) => {
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
      </>
    );
  };
   console.log('is lOadin in Home >>',isLoading);

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
      {result && result?.length == 0 ? (
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
          data={result}
          renderItem={renderEmployeeList}
          keyExtractor={(item, index) => index.toString()}            
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReachedThreshold={0.9}
          onEndReached={onEndReached}
          ListFooterComponent={renderFooter}
          refreshing={false}
          
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
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 10
  },
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
