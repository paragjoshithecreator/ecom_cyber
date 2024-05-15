import {useSelector} from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../components/PrimaryButton';
import Loader from '../components/Loader';
import Input from '../components/Input';
import TextInputPass from '../components/TextInputPass';
import {GlobalStyles, globalColor} from '../GlobalStyles';
import {strings} from '../language';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector(state => state.user.data);

  const loginHandler = async () => {
    const userEarlierToken = await AsyncStorage.getItem('signupToken');
    const userAuth = {email, password};
    const userData = await AsyncStorage.getItem('userData');
    console.log('UserNew Token', typeof userEarlierToken);
    try {
      if (userEarlierToken !== null) {
        setLoading(true);

        const response = await axios.post(
          'https://e-com-cyber.onrender.com/user/login',
          userAuth,
          {
            headers: {
              authorization: `Bearer ${userEarlierToken}`,
            },
          },
        );

        console.log('----------------------', response);
        const userToken = response.data.token;
        await AsyncStorage.setItem('userToken', userToken);
        // Handle success
        const storedUser = JSON.parse(userData);
        console.log('UserD: ', storedUser);
        if (storedUser.email === email && storedUser.password === password) {
          setLoading(false);
          navigation.replace('DrawerNav');
        } else {
          Alert.alert('Invalid email or password');
        }
      } else {
        Alert.alert('User not found');
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };

  /* const loginHandler = () => {
    const user = userInfo.find(
      user => user.email === email && user.password === password,
    );
    if (user) {
      navigation.replace('Home');
    } else {
      console.log('err');
    }
    // setUserDetails(user);
  };  */

  const {namePlaceHolder} = strings;

  return (
    <View style={styles.container}>
      <View style={styles.space}>
        <Loader animating={loading} color={'red'} size={'large'} />
        <Text style={GlobalStyles.heading}>Hi, Welcome Back!👋</Text>
      </View>
      <Input
        placeholder={'Enter Your Email'}
        onChangeText={txt => {
          setEmail(txt.trim(), true);
        }}
        value={email}
      />
      <TextInputPass
        placeholder={namePlaceHolder}
        onChangeText={txt => {
          setPassword(txt.trim(), true);
        }}
        value={password}
      />
      <PrimaryButton onPress={loginHandler}>LOGIN</PrimaryButton>
      <View style={styles.page}>
        <Text style={GlobalStyles.loginHeading}>
          Don't have an account?
          <Text
            onPress={() => {
              navigation.replace('SignUp');
            }}
            style={styles.page}>
            {'  '}
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  error: {
    marginLeft: '5%',
    color: 'red',
    fontSize: 14,
  },
  space: {
    paddingVertical: '10%',
  },
  page: {
    paddingVertical: '2%',
    color: globalColor.button,
  },
});
