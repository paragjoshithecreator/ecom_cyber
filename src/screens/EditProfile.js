import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import AddButton from '../components/AddButton';
import {strings} from '../language';
import {globalColor} from '../GlobalStyles';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

export default function EditProfile() {
  const isFocused = useIsFocused();
  const phoneInput = useRef(null);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [token, setToken] = useState('');
  const [value, setValue] = useState('');
  const [valid, setValid] = useState(false);
  const [formattedValue, setFormattedValue] = useState('');

  console.log('value', mobile);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Successful',
      text2: 'Your Profile is Updated👍',
    });
  };

  //geting User details
  const userInfo = async () => {
    const userEarlierToken = await AsyncStorage.getItem('userToken');
    setToken(userEarlierToken);
    try {
      const response = await axios.get(
        'https://e-com-cyber.onrender.com/user/getuser',
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${userEarlierToken}`,
          },
        },
      );

      const name = await response.data.data.userName;
      const email = await response.data.data.email;
      const mobile = await response.data.data.mobile;
      const address = await response.data.data.address;
      setUserName(name);
      setEmail(email);
      setMobile(mobile);
      setAddress(address);
      setValue(mobile);
      setFormattedValue(mobile);
      setValid(true);
    } catch (error) {
      console.log('Server:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      userInfo();
    }
  }, [isFocused]);

  // updating user info
  const updateUser = async () => {
    const userUpdatedData = {userName, email, mobile, address};
    try {
      const response = await axios.put(
        'https://e-com-cyber.onrender.com/user/updateuser',
        userUpdatedData,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );
      showToast();
    } catch (error) {
      console.log(error);
    }
  };

  const navigation = useNavigation();
  const {namePlaceHolder, emailPlaceHolder, welcome, mobileplaceholder} =
    strings;
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Image
            style={styles.image}
            source={require('../assets/img/back.png')}
          />
        </TouchableOpacity>
        <Toast />
        <Text style={styles.nameText}>{welcome}</Text>
        <Text style={styles.nameText}>{userName}</Text>
        <Toast />
      </View>
      <View style={styles.editView}>
        <Text>{namePlaceHolder}</Text>
        <Input
          placeholder={namePlaceHolder}
          onChangeText={txt => {
            setUserName(txt);
          }}
          value={userName}
        />
        <Text>{emailPlaceHolder}</Text>
        <Input
          placeholder={emailPlaceHolder}
          keyboardType={'email-address'}
          onChangeText={txt => {
            setEmail(txt);
          }}
          value={email}
        />
        <Text>{'Mobile'}</Text>

        <Input
          placeholder={mobileplaceholder}
          keyboardType={'numeric'}
          onChangeText={txt => {
            setMobile(txt);
          }}
          value={mobile}
        />
        <Text>{formattedValue}</Text>
        <PhoneInput
          placeholder={mobile}
          countryPickerButtonStyle={{height: 60}}
          containerStyle={{height: 60}}
          textInputStyle={{height: 60}}
          ref={phoneInput}
          defaultValue={mobile}
          defaultCode="IN"
          layout="first"
          onChangeText={text => {
            setMobile(text);
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text);
          }}
          value={mobile}
          withDarkTheme
          withShadow
          autoFocus
        />

        <Text>{'Address'}</Text>
        <Input
          placeholder={'enter address'}
          onChangeText={txt => {
            setAddress(txt);
          }}
          value={address}
        />
        <View style={styles.buttonView}>
          <AddButton
            onPress={() => {
              navigation.navigate('Profile');
            }}
            title={'CANCEL'}
          />

          <AddButton onPress={updateUser} title={'SAVE'} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColor.white,
  },
  innerContainer: {
    height: '15%',
    backgroundColor: '#AA336A',
  },
  image: {
    tintColor: '#fff',
    margin: 10,
  },
  nameText: {
    alignSelf: 'center',
    color: globalColor.white,
    fontSize: 18,
    fontWeight: '300',
  },
  editView: {
    marginVertical: 20,
    marginHorizontal: 30,
    justifyContent: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
});
