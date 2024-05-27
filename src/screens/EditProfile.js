import axios from 'axios';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import AddButton from '../components/AddButton';
import {strings} from '../language';
import {globalColor} from '../GlobalStyles';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

export default function EditProfile() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Successful',
      text2: 'Your Profile is Updated 👋',
    });
  };

  //geting User details
  const userInfo = async () => {
    const userEarlierToken = await AsyncStorage.getItem('userToken');
    console.log(typeof userEarlierToken, 'TYPE');
    setToken(userEarlierToken);
    console.log('TOKEN', userEarlierToken);
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
      setUserName(name);
      setEmail(email);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userInfo();
    console.log('useEffect');
  }, []);

  // updating user info
  const updateUser = async () => {
    const userUpdatedData = {userName, email};
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
  const {namePlaceHolder, emailPlaceHolder, welcome} = strings;
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
          onChangeText={txt => {
            setEmail(txt);
          }}
          value={email}
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
