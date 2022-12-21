import React from 'react';
import { StatusBar} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';

import { AuthProvider} from './src/Context/AuthContext';
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

