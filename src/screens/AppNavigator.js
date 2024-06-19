import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LogIn from './LogIn';
import Profile from './Profile';
import Home from './Home';
import WishList from './WishList';
import AllCategories from './AllCategories';
import MyCart from './MyCart';
import SignUp from './SignUp';
import ForgetPassSendEmail from './ForgetPassSendEmail';
import {globalColor} from '../GlobalStyles';
import {Image, StyleSheet} from 'react-native';
import Explore from './Explore';

// import {Ionicons} from '@expo/vector-icons';

// Import screens

// Create Stack, Bottom Tab, and Drawer navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Nested Stack for the Home Tab
function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AllCategories" component={AllCategories} />
      <Stack.Screen name="MyCart" component={MyCart} />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={
          {
            headerShown: false,
            tabBarIcon: ({tintColor}) => (
              <Image
                tintColor={'#000'}
                style={{width: 24, height: 24}}
                source={require('../assets/img/home.png')}
              />
            ),
            tabBarInactiveTintColor: 'plum',
            tabBarInactiveTintColor: '#5E5C5C',
            tabBarActiveTintColor: '#000',
            tabBarInactiveBackgroundColor: '#fff',
            tabBarActiveBackgroundColor: globalColor.lightWhite,
          }

          /* tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={size} />
          ), */
        }
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({tintColor}) => (
            <Image
              tintColor={'#000'}
              style={{width: 24, height: 24}}
              source={require('../assets/img/explore.png')}
            />
          ),
          tabBarInactiveTintColor: 'plum',
          tabBarInactiveTintColor: '#5E5C5C',
          tabBarActiveTintColor: '#000',
          tabBarInactiveBackgroundColor: '#fff',
          tabBarActiveBackgroundColor: globalColor.lightWhite,
        }}
      />
      <Tab.Screen
        name="AllCategories"
        component={AllCategories}
        options={{
          tabBarIcon: ({tintColor}) => (
            <Image
              tintColor={'#000'}
              style={{width: 24, height: 24}}
              source={require('../assets/img/category.png')}
            />
          ),
          tabBarInactiveTintColor: 'plum',
          tabBarInactiveTintColor: '#5E5C5C',
          tabBarActiveTintColor: '#000',
          tabBarInactiveBackgroundColor: '#fff',
          tabBarActiveBackgroundColor: globalColor.lightWhite,
        }}
      />
      <Tab.Screen
        name="MyCart"
        component={MyCart}
        options={{
          tabBarIcon: ({tintColor}) => (
            <Image
              tintColor={'#000'}
              style={styles.image}
              source={require('../assets/img/shop.png')}
            />
          ),
          tabBarInactiveTintColor: 'plum',
          tabBarInactiveTintColor: '#5E5C5C',
          tabBarActiveTintColor: '#000',
          tabBarInactiveBackgroundColor: '#fff',
          tabBarActiveBackgroundColor: globalColor.lightWhite,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({tintColor}) => (
            <Image
              tintColor={'#000'}
              style={{width: 24, height: 24}}
              source={require('../assets/img/profile.png')}
            />
          ),
          tabBarInactiveTintColor: 'plum',
          tabBarInactiveTintColor: '#5E5C5C',
          tabBarActiveTintColor: '#000',
          tabBarInactiveBackgroundColor: '#fff',
          tabBarActiveBackgroundColor: globalColor.lightWhite,
        }}
      />
    </Tab.Navigator>
  );
}

// Auth Navigator
function Auth() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{title: 'E-Shop'}}
      />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

// Top-level stack navigator
function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="LogIn">
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgetPassSendEmail"
        component={ForgetPassSendEmail}
      />
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default AppNavigator;

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  },
});
