import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {addUser} from '../redux/UserSlice';
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
import {validateEmail, validatePassword} from './Validation';
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
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [errorMessageEmpty, setErrorMessageEmpty] = useState('');
  const [invalidEntry, setInvalidEntry] = useState('');
  const [alreadyRegistered, setAlreadyRegistered] = useState('');

  const isUserAuth = async () => {
    const useToken = await AsyncStorage.getItem('userToken');
    setToken(useToken);
    console.log('userToken', useToken);
  };

  useEffect(() => {
    isUserAuth();
  }, []);

  const submitHandler = async index => {
    const userData = {userName, email, password, address, mobile};
    const registeredEmails = userInfo.data.map(user => user.email);

    if ((email !== '' && password !== '' && userName !== '', mobile !== '')) {
      setErrorMessageEmpty('');
      let emails = validateEmail(email);
      console.log(emails);
      let passwords = validatePassword(password);
      console.log(passwords);
      if (emails && passwords) {
        setInvalidEntry('');
        if (
          registeredEmails.includes(email) ||
          registeredEmails.includes(email) == null
        ) {
          setAlreadyRegistered(alreadyRegisteredmessage);
        } else {
          setLoading(true);
          // Dispatch action to add user

          // Save user info to AsyncStorage
          try {
            const response = await axios.post(
              'https://e-com-cyber.onrender.com/user/signup',
              userData,
            );

            console.log('TOKEN SIGN : ', response.data.token);
            const userToken = response.data.token;
            const jsonValue = JSON.stringify(userToken);
            await AsyncStorage.setItem('userToken', jsonValue);
            dispatch(addUser({userName, email, password, mobile, address}));
            // Handle success
            await AsyncStorage.setItem(
              'userData',
              JSON.stringify({userName, email, password, mobile, address}),
            );
            setLoading(false);
            navigation.replace('LogIn');
          } catch (error) {
            console.error('Error saving data to AsyncStorage:', error);
          }
        }
      } else {
        setInvalidEntry(invalid);
      }
    } else {
      setErrorMessageEmpty(errorMessageEmpty);
    }
    console.log(userInfo);
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
    invalid,
    alreadyRegisteredmessage,
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
          <Input
            placeholder={mobileplaceholder}
            maxLength={10}
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
          {errorMobile ? <Text>{errorMessage}</Text> : null}
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
          {errorPassword ? (
            <Text style={GlobalStyles.error}>{errorMessage}</Text>
          ) : null}
          {errorMessageEmpty ? (
            <Text style={GlobalStyles.error}>{errorMessage}</Text>
          ) : null}
          {invalidEntry ? (
            <Text style={GlobalStyles.error}>{invalid}</Text>
          ) : null}
          {alreadyRegistered ? (
            <Text style={GlobalStyles.error}>{alreadyRegisteredmessage}</Text>
          ) : null}
          <PrimaryButton onPress={submitHandler}>
            {registerButton}
          </PrimaryButton>
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
