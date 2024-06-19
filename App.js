import {View, Text} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/screens/AppNavigator';
import UserStore from './src/redux/UserStore';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <Provider store={UserStore}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
