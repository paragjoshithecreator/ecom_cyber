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
  Alert,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidEntry, setInvalidEntry] = useState(false);
  const [invalidEntryMessage, setInvalidEntryMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorpassword, setErrorPassword] = useState(false);
  const [errorempty, setErrorempty] = useState(false);

  const userInfo = useSelector(state => state.user.data);

  const loginHandler = async () => {
    const userEarlierToken = await AsyncStorage.getItem('userToken');
    const userAuth = {email, password};
    const userData = await AsyncStorage.getItem('userData');
    // console.log('UserNew Token', typeof userEarlierToken);
    if (email !== '' && password !== '') {
      setErrorempty(false);
      setErrorEmail(false);
      setErrorPassword(false);
      try {
        setLoading(true);

        const storedUser = JSON.parse(userData);
        if (storedUser.email === email && storedUser.password === password) {
          console.log('UserD: ', storedUser);
          setLoading(false);
          const response = await axios.post(
            'https://e-com-cyber.onrender.com/user/login',
            userAuth,
          );
          navigation.replace('DrawerNav');
          /* const userToken = response.data.token;
          await AsyncStorage.setItem('userToken', userToken); */
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
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingBottom: 10,
        }}>
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
          <TouchableOpacity style={{alignSelf: 'flex-end', marginRight: 10}}>
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

  space: {
    paddingVertical: '8%',
  },
  page: {
    paddingVertical: '2%',
    color: globalColor.button,
    fontSize: 16,
  },
});
