import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {addUser} from '../redux/UserSlice';
import React, {useEffect, useState} from 'react';
import {View, Alert, StyleSheet, Image, Text} from 'react-native';
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
  const [error, setError] = useState(false);
  const [errorE, setErrorE] = useState(false);
  const [errorP, setErrorP] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  const signUp = async () => {
    const userData = {userName, email, password};
    console.log(userData);
    try {
      const response = await axios.post(
        'https://e-com-cyber.onrender.com/signup',
        userData,
      );

      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error('Sign-up failed:', error);
      // Handle error
    }
  };

  const isUserAuth = async () => {
    const useToken = await AsyncStorage.getItem('userToken');
    setToken(useToken);
    console.log('userToken', useToken);
  };

  useEffect(() => {
    isUserAuth();
  }, []);

  const submitHandler = async index => {
    const userData = {userName, email, password};
    const registeredEmails = userInfo.data.map(user => user.email);

    if (email !== '' && password !== '' && userName !== '') {
      console.log('entered empty');
      let emails = validateEmail(email);
      console.log(emails);
      let passwords = validatePassword(password);
      console.log(passwords);
      if (emails && passwords) {
        if (
          registeredEmails.includes(email) ||
          registeredEmails.includes(email) == null
        ) {
          Alert.alert('Already registered');
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
            await AsyncStorage.setItem('signupToken', userToken);
            dispatch(addUser({userName, email, password}));
            // Handle success
            await AsyncStorage.setItem(
              'userData',
              JSON.stringify({userName, email, password}),
            );
            setLoading(false);
            navigation.replace('LogIn');
          } catch (error) {
            console.error('Error saving data to AsyncStorage:', error);
          }
        }
      } else {
        Alert.alert('invalid email or password');
      }
    } else {
      Alert.alert('Already registered!');
    }
    console.log(userInfo);
  };

  const {namePlaceHolder, emailPlaceHolder, passwordPlaceHolder} = strings;

  return (
    <View style={styles.container}>
      <View>
        <Loader animating={loading} color={'red'} size={'large'} />
        <Text style={GlobalStyles.heading}>Create an account</Text>
        <Text style={GlobalStyles.subHeading}>
          Connect with your friends today!
        </Text>
      </View>
      <View style={styles.space}>
        <Input
          placeholder={namePlaceHolder}
          onChangeText={txt => {
            setUserName(txt.trim(), true);
          }}
          onBlur={() => {
            if (userName == '') {
              setError(true);
            } else {
              setError(false);
            }
          }}
          value={userName}
        />
        {error ? <Text style={styles.error}>Empty</Text> : null}
        <Input
          placeholder={emailPlaceHolder}
          onChangeText={txt => {
            setEmail(txt.trim(), true);
          }}
          value={email}
          onBlur={() => {
            if (email == '') {
              setErrorE(true);
            } else {
              setErrorE(false);
            }
          }}
        />
        {errorE ? <Text style={styles.error}>Empty</Text> : null}
        <TextInputPass
          placeholder={passwordPlaceHolder}
          secureTextEntry={true}
          onChangeText={txt => {
            setPassword(txt.trim(), true);
          }}
          value={password}
          onBlur={() => {
            if (password == '') {
              setErrorP(true);
            } else {
              setErrorP(false);
            }
          }}
        />
        {errorP ? <Text style={styles.error}>Empty</Text> : null}
        <PrimaryButton onPress={submitHandler}>SUBMIT</PrimaryButton>
        <View style={styles.page}>
          <Text style={GlobalStyles.loginHeading}>
            Already have an account?
            <Text
              onPress={() => {
                navigation.replace('LogIn');
              }}
              style={styles.page}>
              {'  '}
              Login
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    // justifyContent: 'center',
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
