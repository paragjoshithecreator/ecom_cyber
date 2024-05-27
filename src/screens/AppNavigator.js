import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';
import WishList from './WishList';
import AllCategories from './AllCategories';
import EditProfile from './EditProfile';
import Profile from './Profile';
import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import ProductDetail from './ProductDetail';
import Explore from './Explore';
import MyCart from './MyCart';
import {Screen} from 'react-native-screens';
import ForgetPassSendEmail from './ForgetPassSendEmail';
import ChangePassword from './ChangePassword';

const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="DashBoard"
      screenOptions={{
        headerRight: () => {
          return (
            <TouchableOpacity
              style={{
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
              onPress={() => {}}>
              <View
                style={{
                  width: 18,
                  height: 18,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    color: '#FFF',
                    alignSelf: 'center',
                  }}>
                  0
                </Text>
              </View>
              <Image
                style={{width: 24, height: 24, marginRight: 10}}
                source={require('../assets/img/shop.png')}
              />
            </TouchableOpacity>
          );
        },
      }}>
      <Drawer.Screen
        name="Auth"
        component={Auth}
        options={{headerTitleAlign: 'center', title: 'DashBoard'}}
      />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Explore" component={Explore} />
      <Drawer.Screen name="MyCart" component={MyCart} />
      <Drawer.Screen name="WishList" component={WishList} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false, drawerLabel: () => null}}
      />
      <Drawer.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{headerShown: false, drawerLabel: () => null}}
      />
    </Drawer.Navigator>
  );
};

const Auth = () => {
  return (
    <Bottom.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}>
      <Bottom.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({tintColor}) => (
            <Image
              tintColor={'#AA336A'}
              style={{width: 24, height: 24}}
              source={require('../assets/img/home.png')}
            />
          ),
          tabBarInactiveTintColor: '#fff',
          tabBarActiveTintColor: '#AA336A',
          headerTintColor: 'red',
          tabBarInactiveBackgroundColor: '#fff',
          tabBarActiveBackgroundColor: 'orange',
        }}
      />

      <Bottom.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({tintColor}) => (
            <Image
              tintColor={'#AA336A'}
              style={{width: 24, height: 24}}
              source={require('../assets/img/explore.png')}
            />
          ),
          tabBarInactiveTintColor: '#fff',
          tabBarActiveTintColor: '#AA336A',
          tabBarInactiveBackgroundColor: '#fff',
          tabBarActiveBackgroundColor: 'orange',
        }}
      />
      <Bottom.Screen
        name="AllCategories"
        component={AllCategories}
        options={{
          tabBarIcon: ({tintColor}) => (
            <Image
              tintColor={'#AA336A'}
              style={{width: 24, height: 24}}
              source={require('../assets/img/category.png')}
            />
          ),
          tabBarInactiveTintColor: '#fff',
          tabBarActiveTintColor: '#AA336A',
          tabBarInactiveBackgroundColor: '#fff',
          tabBarActiveBackgroundColor: 'orange',
        }}
      />
      <Bottom.Screen
        name="MyCart"
        component={MyCart}
        options={{
          tabBarIcon: ({tintColor}) => (
            <Image
              tintColor={'#AA336A'}
              style={{width: 24, height: 24}}
              source={require('../assets/img/shop.png')}
            />
          ),
          tabBarInactiveTintColor: '#fff',
          tabBarActiveTintColor: '#AA336A',
          tabBarInactiveBackgroundColor: '#fff',
          tabBarActiveBackgroundColor: 'orange',
        }}
      />
      {/*  <Bottom.Screen
        name="WishList"
        component={WishList}
        options={{
          tabBarIcon: ({tintColor}) => (
            <Image
              tintColor={'#AA336A'}
              style={{width: 24, height: 24}}
              source={require('../assets/img/love.png')}
            />
          ),
          tabBarInactiveTintColor: '#fff',
          tabBarActiveTintColor: '#AA336A',
          // headerTintColor: '#fff',
          tabBarInactiveBackgroundColor: '#fff',
          tabBarActiveBackgroundColor: 'orange',
        }}
      />  */}
      <Bottom.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({tintColor}) => (
            <Image
              tintColor={'#AA336A'}
              style={{width: 24, height: 24}}
              source={require('../assets/img/profile.png')}
            />
          ),
          tabBarInactiveTintColor: '#fff',
          tabBarActiveTintColor: '#AA336A',
          // headerTintColor: '#fff',
          tabBarInactiveBackgroundColor: '#fff',
          tabBarActiveBackgroundColor: 'orange',
        }}
      />
    </Bottom.Navigator>
  );
};

export default function AppNavigator() {
  const [token, setToken] = useState(false);
  const userToken = async () => {
    try {
      const userData = await AsyncStorage.getItem('userToken');
      console.log('THis is Token', userData);
      return userData;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const check = async () => {
      const isAuthenticated = await userToken();
      setToken(isAuthenticated);
    };
    check();
  }, [token]);

  return (
    <NavigationContainer>
      {token ? (
        <DrawerNav />
      ) : (
        <Stack.Navigator initialRouteName="LogIn">
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="LogIn"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen
            name="DrawerNav"
            component={DrawerNav}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ForgetPassSendEmail"
            component={ForgetPassSendEmail}
            options={{title: 'Forgot Password'}}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{title: 'New Password'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
