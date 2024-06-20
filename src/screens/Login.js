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
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

export default function LogIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidEntryMessage, setInvalidEntryMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorpassword, setErrorPassword] = useState(false);
  const [errorempty, setErrorempty] = useState(false);
  const [errorMessages, setErrorMessages] = useState('');
  const userInfor = useSelector(state => state.user.data);

  const loginHandler = async () => {
    setLoading(true);
    if (email !== '' && password !== '') {
      const userEarlierToken = await AsyncStorage.getItem('userToken');
      const userData = await AsyncStorage.getItem('userData');
      setErrorempty(false);
      setErrorEmail(false);
      setErrorPassword(false);
      const userAuth = {email, password};
      try {
        const storedUser = JSON.parse(userData);

        const response = await axios.post(
          'https://e-com-cyber.onrender.com/user/login',
          userAuth,
        );
        setLoading(false);
        navigation.replace('Auth');
        const userToken = response.data.token;
        await AsyncStorage.setItem('userToken', userToken);
      } catch (error) {
        console.log('Error retrieving data from AsyncStorage:', error.message);
        if (error.response) {
          const errorMessagereq = error.response.data.message;
          setErrorMessages(errorMessagereq);
        }
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
        {loading ? (
          <Text style={GlobalStyles.error}>{errorMessages}</Text>
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
                color: globalColor.button,
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
