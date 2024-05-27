import {useSelector} from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../components/PrimaryButton';
import Loader from '../components/Loader';
import Input from '../components/Input';
import TextInputPass from '../components/TextInputPass';
import {GlobalStyles, globalColor} from '../GlobalStyles';
import {strings} from '../language';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import ShopButton from '../components/ShopButton';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidEntry, setInvalidEntry] = useState(false);
  const [invalidEntryMessage, setInvalidEntryMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorpassword, setErrorPassword] = useState(false);
  const [errorempty, setErrorempty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const userInfor = useSelector(state => state.user.data);

  //geting User details
  const userEmail = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('userData');
      const storedEmail = JSON.parse(userEmail);
      const finalEmail = storedEmail.email;
      console.log('USERDATA', finalEmail);
      //setEmailForget(finalEmail);
    } catch (error) {
      console.log(error);
    }
  };

  // user Forget Password sending token on email
  const sendMailHandler = async () => {
    const email = emailForget;
    const eForgetToken = {email};
    try {
      const response = await axios.post(
        'https://e-com-cyber.onrender.com/user/forgetpassword',
        eForgetToken,
      );
      console.log('USERFORGET RESPONSE', response);
    } catch (error) {
      console.log(error);
    }
  };

  // user Submit forget pass token
  const submitTokenForgetPassword = async () => {
    const tokenId =
      'b28009dead82c11f43f0241dd771446ac2246ff4ab0121a27763f496595e0d23';
    const password = 'Ai12345.java';
    const passwordc = {password};
    try {
      const response = await axios.patch(
        `https://e-com-cyber.onrender.com/user/resetpassword/${tokenId}`,
        passwordc,
      );
      console.log('RESPONSEFORGET', response);
    } catch (error) {
      console.log(error);
    }
  };

  const loginHandler = async () => {
    // console.log('UserNew Token', typeof userEarlierToken);
    if (email !== '' && password !== '') {
      const userEarlierToken = await AsyncStorage.getItem('userToken');
      const userData = await AsyncStorage.getItem('userData');
      setErrorempty(false);
      setErrorEmail(false);
      setErrorPassword(false);
      const userAuth = {email, password};
      try {
        setLoading(true);

        const storedUser = JSON.parse(userData);
        if (true) {
          console.log('UserD: ', storedUser);
          setLoading(false);
          const response = await axios.post(
            'https://e-com-cyber.onrender.com/user/login',
            userAuth,
          );
          navigation.replace('DrawerNav');
          const userToken = response.data.token;
          await AsyncStorage.setItem('userToken', userToken);
        } else {
          // Handle success
          setInvalidEntry(true);
          setInvalidEntryMessage(invalid);
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    } else {
      setErrorempty(true);
    }
  };

  const {
    emailPlaceHolder,
    errorMessage,
    passwordPlaceHolder,
    loginButton,
    forgetPassword,
    invalid,
  } = strings;
  const bgImage = require('../assets/img/bglogin.png');

  return (
    <ImageBackground source={bgImage} style={styles.container}>
      <View style={styles.innerView}>
        <View style={styles.space}>
          <Loader animating={loading} color={'red'} size={'large'} />
          <Text style={GlobalStyles.heading}>Hi, Welcome Back!👋</Text>
        </View>
        <Input
          placeholder={emailPlaceHolder}
          onChangeText={txt => {
            setEmail(txt.trim(), true);
          }}
          onBlur={() => {
            if (email == '') {
              setErrorEmail(true);
            } else {
              setErrorEmail(false);
            }
          }}
          value={email}
        />
        {errorEmail ? (
          <Text style={GlobalStyles.error}>{errorMessage}</Text>
        ) : null}
        <TextInputPass
          placeholder={passwordPlaceHolder}
          onChangeText={txt => {
            setPassword(txt.trim(), true);
          }}
          onBlur={() => {
            if (password == '') {
              setErrorPassword(true);
            } else {
              setErrorPassword(false);
            }
          }}
          value={password}
        />
        {errorpassword || errorempty ? (
          <Text style={GlobalStyles.error}>{errorMessage}</Text>
        ) : null}
        {invalidEntry ? (
          <Text style={GlobalStyles.error}>{invalidEntryMessage}</Text>
        ) : null}
        <PrimaryButton onPress={loginHandler}>{loginButton}</PrimaryButton>

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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ForgetPassSendEmail');
            }}
            style={{alignSelf: 'flex-end', marginRight: 10}}>
            <Text
              style={{
                color: globalColor.black,
                fontSize: 12,
              }}>
              {forgetPassword}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  innerView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  space: {
    paddingVertical: '8%',
  },
  page: {
    paddingVertical: '2%',
    color: globalColor.button,
    fontSize: 16,
  },
});
