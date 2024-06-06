import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from '../components/PrimaryButton';
import ModalCom from '../components/ModalCom';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import ProfileSetting from '../components/ProfileSetting';

export default function Profile() {
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const [modelVisible, setModelVisible] = useState(false);

  const clearToken = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      console.log('Token cleared successfully');
      setTimeout(() => {
        navigation.navigate('LogIn');
      }, 4000);
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  };
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Logout successful 👋',
      text2: 'Your Profile has Logout!',
    });
    clearToken();
  };

  const deleteAccountHandler = async () => {
    setModelVisible(false);
    console.log('INNER', token);
    try {
      const response = await axios.delete(
        'https://e-com-cyber.onrender.com/user/deleteuser',
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
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.innerView}>
          <Image
            style={styles.image}
            source={require('../assets/img/profile.png')}
          />
          <Text style={styles.name}>James Smith</Text>
        </View>
        <View style={styles.orderContainer}>
          <TouchableOpacity style={styles.orderView}>
            <Text style={styles.text}>Your Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.orderView}
            onPress={() => {
              navigation.navigate('WishList');
            }}>
            <Text style={styles.text}>Wishlist</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orderContainer}>
          <TouchableOpacity style={styles.orderView}>
            <Text style={styles.text}>Coupons</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.orderView}>
            <Text style={styles.text}>Track Order</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.space}></View>
        <Toast />

        <Text style={styles.headings}>Accout Settings</Text>
        <View style={styles.spaceLiner}></View>

        <ProfileSetting
          onPress={() => {
            navigation.navigate('EditProfile');
          }}
          label={'Edit Profile'}
        />
        <ProfileSetting
          onPress={() => {
            navigation.navigate('EditProfile');
          }}
          label={'Save Cards & Wallet'}
        />
        <ProfileSetting onPress={() => {}} label={'Save Addresses'} />
        <ProfileSetting onPress={() => {}} label={'Select Language'} />
        <ProfileSetting onPress={() => {}} label={'Select Language'} />
        <ProfileSetting onPress={() => {}} label={'Settings'} />

        <View style={styles.space}></View>
        <Text style={styles.headings}>My Activity</Text>
        <View style={styles.spaceLiner}></View>
        <ProfileSetting
          onPress={() => {
            setModelVisible(true);
          }}
          label={'Delete Account'}
        />
        <ProfileSetting
          onPress={() => {
            setModelVisible(true);
          }}
          label={'Contact'}
        />

        <PrimaryButton onPress={showToast}>LogOut</PrimaryButton>
        <ModalCom
          metaData={'want to delete'}
          title={'Are You Sure!'}
          visible={modelVisible}
          onPressNo={() => {
            setModelVisible(false);
          }}
          onPressYes={deleteAccountHandler}
          image={require('../assets/img/delete.png')}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F7F9F9',
  },
  innerView: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  imageSetting: {
    width: 25,
    height: 25,
    marginRight: 20,
  },
  name: {
    marginLeft: 10,
    alignSelf: 'center',
    color: '#000',
    fontWeight: '600',
    fontSize: 18,
  },
  orderView: {
    width: '50%',
    height: 50,
    backgroundColor: '#eaf9ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 5,
    elevation: 1,
  },
  text: {
    color: '#000',
  },
  space: {
    marginVertical: 10,
    height: 5,
    width: '100%',
    backgroundColor: '#ccc',
  },
  spaceLiner: {
    marginTop: 10,
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
  },
  headings: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
  },
});
