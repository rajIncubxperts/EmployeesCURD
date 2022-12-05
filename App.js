import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, Text, StatusBar} from 'react-native';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './src/navigations/AuthNavigator';
import { AuthProvider, AuthContext} from './src/Context/AuthContext';
import DrawerNavigator from './src/navigations/DrawerNavigator';
import configureStore from './src/Redux/ConfigureStore/configureStore';
import AppRouter from './src/navigations/AppRouter';
import { Provider } from 'react-redux';

global.actionType = ""
global.tempActionType = ""
global.empId = ""

export default function App() {
  const store = configureStore();

  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar backgroundColor='#165fa8' />
          <AppRouter />
        </NavigationContainer>
      </AuthProvider>
    </Provider >
  );
}


// import React, {useState}from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Modal,
//   TouchableOpacity,
//   Text,
//   StatusBar,
// } from 'react-native';
// import SimpleModal from './src/components/SimpleModal';


// const App = () => {
// const [isModalVisible, setisModalVisible] = useState(false);
// const [chooseData, setchooseData] = useState();


// const changeModalVisible = (bool) => {
//   setisModalVisible(bool);
// }
// const setData = (data) => {
//   setchooseData(data);
// }

//   return (
//     <SafeAreaView style={styles.container}>
//       <TouchableOpacity onPress={() => changeModalVisible(true)} style={styles.touchableOpacity}>
//         <Text style={styles.text}>Open</Text>
//       </TouchableOpacity>
//       <Modal
//       transparent={true}
//       animationType='fade'
//       visible={isModalVisible}
//       nRequestClose={() => changeModalVisible(false)}
//       >
//         <SimpleModal   
//         changeModalVisible={changeModalVisible}
//         setData={setData}
//         />
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignContent:'center',
//     justifyContent:'center',
//     backgroundColor: 'green', 
//   },
//   touchableOpacity: {
   
    
//   },
//   text: {
//     marginVertical: 20,
//     fontSize: 20,
//     fontWeight: 'bold',
//   alignSelf:'center'
//   },
// });

// export default App;