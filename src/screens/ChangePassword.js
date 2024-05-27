import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import PrimaryButton from '../components/PrimaryButton';
import Input from '../components/Input';
import {strings} from '../language';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {globalColor} from '../GlobalStyles';

export default function ChangePassword() {
  const navigation = useNavigation();
  const [tokenId, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // user Submit forget pass token
  const submitTokenForgetPassword = async () => {
    const token = tokenId;
    console.log(token);
    if (newPassword === confirmPassword && tokenId != '') {
      const password = newPassword;
      const passwordc = {password};
      try {
        const response = await axios.patch(
          `https://e-com-cyber.onrender.com/user/resetpassword/${token}`,
          passwordc,
        );
        console.log('RESPONSEFORGET', response);
        Toast.show({
          type: 'Congratultions!!!',
          text1: 'Password Missmatched!',
        });
        navigation.navigate('LogIn');
      } catch (error) {
        console.log(error);
      }
    } else {
      Toast.show({
        type: 'Failed',
        text1: 'Password Missmatch!',
      });
    }
  };
  const {newPasswordPlaceHolder, confirmPasswordPlaceHolder, enterOTP} =
    strings;
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter Validation Code</Text>
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
          setNewPassword(txt);
        }}
        value={newPassword}
      />
      <Input
        placeholder={confirmPasswordPlaceHolder}
        onChangeText={txt => {
          setConfirmPassword(txt);
        }}
        value={confirmPassword}
      />
      <PrimaryButton children={'Send'} onPress={submitTokenForgetPassword} />
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
});
