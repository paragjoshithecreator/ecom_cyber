import {View, Text, StyleSheet, Alert, AppState} from 'react-native';
import React, {useEffect, useState} from 'react';
import Input from '../components/Input';
import {strings} from '../language';
import PrimaryButton from '../components/PrimaryButton';
import axios from 'axios';
import {GlobalStyles, globalColor} from '../GlobalStyles';
import Toast from 'react-native-toast-message';
import CheckBox from '@react-native-community/checkbox';

export default function ForgetPassSendEmail({navigation}) {
  const [emailForget, setEmailForget] = useState('');
  const [tokenId, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ch, setCh] = useState(false);

  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      console.log('AppState changed to', nextAppState);
    };

    // Add event listener
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    // Cleanup function to remove event listener
    return () => {
      subscription.remove();
    };
  }, []);

  // user Forget Password sending token on email
  const sendMailHandler = async () => {
    const email = emailForget;
    const eForgetToken = {email};
    console.log(eForgetToken);
    setCh(true);
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

  const submitTokenForgetPassword = async () => {
    const token = tokenId;
    console.log(token);
    if (password && tokenId != '') {
      const forgetPassword = {password};
      console.log('pass', password);
      try {
        console.log(password, token);
        const response = await axios.patch(
          `https://e-com-cyber.onrender.com/user/resetpassword/${token}`,
          forgetPassword,
        );
        console.log('RESPONSEFORGET', response);

        navigation.navigate('LogIn');
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Invalid input');
    }
  };

  const {
    emailPlaceHolder,
    newPasswordPlaceHolder,
    confirmPasswordPlaceHolder,
    enterOTP,
  } = strings;
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter Email Address</Text>
      <Input
        placeholder={emailPlaceHolder}
        onChangeText={txt => {
          setEmailForget(txt);
        }}
        value={emailForget}
      />
      <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
        <Text
          style={{alignSelf: 'center', color: globalColor.black, fontSize: 12}}>
          Send Email
        </Text>
        <CheckBox
          style={styles.checkBox}
          disabled={!emailForget}
          onValueChange={sendMailHandler}
          value={ch}
        />
      </View>

      {ch ? (
        <View>
          <Input
            placeholder={enterOTP}
            onChangeText={txt => {
              setToken(txt);
            }}
            value={tokenId}
          />
          <Input
            placeholder={newPasswordPlaceHolder}
            onChangeText={txt => {
              setPassword(txt);
            }}
            value={password}
          />
          <Input
            placeholder={confirmPasswordPlaceHolder}
            onChangeText={txt => {
              setConfirmPassword(txt);
            }}
            value={confirmPassword}
          />
          {/* <CountDown
            until={60 * 10}
            size={15}
            digitStyle={{backgroundColor: '#FFF'}}
            digitTxtStyle={{color: '#1CC625'}}
            timeToShow={['M', 'S']}
            timeLabels={{m: 'MM', s: 'SS'}}
          /> */}
          <PrimaryButton
            children={'Send'}
            onPress={submitTokenForgetPassword}
          />
        </View>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    marginLeft: 20,
    marginVertical: 10,
    fontWeight: '400',
    color: globalColor.black,
  },
  checkBox: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
});
