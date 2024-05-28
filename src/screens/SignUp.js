import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import Input from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';
import {GlobalStyles, globalColor} from '../GlobalStyles';
import TextInputPass from '../components/TextInputPass';
import {strings} from '../language';
import Loader from '../components/Loader';

export default function SignUp({navigation}) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [errorUserName, setErrorUserName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorMobile, setErrorMobile] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  const isUserAuth = async () => {
    const useToken = await AsyncStorage.getItem('userToken');
    setToken(useToken);
  };

  useEffect(() => {
    isUserAuth();
  }, []);

  const userHandler = async () => {
    const userData = {userName, email, password, address, mobile};
    console.log(userData);

    try {
      const response = await axios.post(
        'https://e-com-cyber.onrender.com/user/signup',
        userData,
      );

      console.log('TOKEN SIGN : ', response.data.token);

      const userToken = response.data.token;
      const jsonValue = JSON.stringify(userToken);
      await AsyncStorage.setItem('userToken', userToken);
      navigation.replace('LogIn');
    } catch (error) {
      // Enhanced error handling
      console.log('Error message: ', error.message);

      // Accessing detailed error response
      if (error.response) {
        const errorMessagereq = error.response.data.message;
        setErrorMessage(errorMessagereq);
      }
    }
  };

  const {
    registerHeading,
    registerSubheading,
    namePlaceHolder,
    emailPlaceHolder,
    passwordPlaceHolder,
    errorMessage,
    registerButton,
    switchMessage,
    switchScreen,
    mobileplaceholder,
    addressplaceholder,
  } = strings;

  const bgImage = require('../assets/img/bglogin.png');

  return (
    <ImageBackground source={bgImage} style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Loader animating={loading} color={'red'} size={'large'} />
          <Text style={GlobalStyles.heading}>{registerHeading}</Text>
          <Text style={GlobalStyles.subHeading}>{registerSubheading}</Text>
        </View>
        <View style={styles.space}>
          <Input
            placeholder={namePlaceHolder}
            onChangeText={txt => {
              setUserName(txt.trim(), true);
            }}
            onBlur={() => {
              if (userName == '') {
                setErrorUserName(true);
              } else {
                setErrorUserName(false);
              }
            }}
            value={userName}
          />
          {errorUserName ? (
            <Text style={GlobalStyles.error}>{errorMessage}</Text>
          ) : null}
          <Input
            placeholder={emailPlaceHolder}
            onChangeText={txt => {
              setEmail(txt.trim(), true);
            }}
            value={email}
            onBlur={() => {
              if (email == '') {
                setErrorEmail(true);
              } else {
                setErrorEmail(false);
              }
            }}
          />
          {errorEmail ? (
            <Text style={GlobalStyles.error}>{errorMessage}</Text>
          ) : null}
          <TextInputPass
            placeholder={passwordPlaceHolder}
            secureTextEntry={true}
            onChangeText={txt => {
              setPassword(txt.trim(), true);
            }}
            value={password}
            onBlur={() => {
              if (password == '') {
                setErrorPassword(true);
              } else {
                setErrorPassword(false);
              }
            }}
          />
          {errorPassword ? (
            <Text style={GlobalStyles.error}>{errorMessage}</Text>
          ) : null}
          <Input
            placeholder={mobileplaceholder}
            maxLength={10}
            keyboardType={'numeric'}
            onChangeText={txt => {
              setMobile(txt);
            }}
            value={mobile}
            onBlur={() => {
              if (password == '') {
                setErrorMobile(true);
              } else {
                setErrorMobile(false);
              }
            }}
          />
          {errorMobile ? (
            <Text style={GlobalStyles.error}>{errorMessage}</Text>
          ) : null}
          <Input
            placeholder={addressplaceholder}
            onBlur={() => {
              if (password == '') {
                setErrorAddress(true);
              } else {
                setErrorAddress(false);
              }
            }}
            onChangeText={txt => {
              setAddress(txt);
            }}
            value={address}
          />

          {ErrorMessage ? (
            <Text style={GlobalStyles.error}>{ErrorMessage}</Text>
          ) : null}
          <PrimaryButton onPress={userHandler}>{registerButton}</PrimaryButton>
          <View style={styles.page}>
            <Text style={GlobalStyles.loginHeading}>
              {switchMessage}
              <Text
                onPress={() => {
                  navigation.replace('LogIn');
                }}
                style={styles.page}>
                {'  '}
                {switchScreen}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  innerContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 10,
  },

  space: {
    paddingVertical: '10%',
    paddingHorizontal: 20,
  },
  page: {
    paddingVertical: '2%',
    color: globalColor.button,
    fontSize: 16,
  },
});
