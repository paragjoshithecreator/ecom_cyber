import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Linking,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PrimaryButton from '../components/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ModalCom from '../components/ModalCom';
import axios from 'axios';

export default function Profile() {
  const [token, setToken] = useState('');
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  // const [deleteAccount, setDeleteAccount] = useState(false);
  const [modelVisible, setModelVisible] = useState(false);

  const userInfo = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    setToken(userToken);
    try {
      const userProfile = await AsyncStorage.getItem('userData');
      const email = JSON.parse(userProfile).email;
      setEmail(email);
    } catch (error) {
      console.log(error);
    }
  };

  const clearToken = async () => {
    const keys = ['userData', 'userToken'];
    try {
      await AsyncStorage.multiRemove(keys);
      console.log('Token cleared successfully');
      navigation.navigate('LogIn');
      // ToastAndroid.show('Logout Successfully...');
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  };

  useEffect(() => {
    userInfo();
  }, []);

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
      clearToken();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.mainContainer}>
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

      <Text style={styles.headings}>Accout Settings</Text>
      <View style={styles.spaceLiner}></View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.innerView}>
          <Image
            style={styles.imageSetting}
            source={require('../assets/img/profile.png')}
          />
          <Text style={styles.textSetting}>Edit Profile</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditProfile');
          }}
          style={styles.settingImageCenter}>
          <Image
            style={styles.imageSetting}
            source={require('../assets/img/right_arrow.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.innerView}>
          <Image
            style={styles.imageSetting}
            source={require('../assets/img/profile.png')}
          />
          <Text style={styles.textSetting}>Save Cards & Wallet</Text>
        </View>
        <TouchableOpacity style={styles.settingImageCenter}>
          <Image
            style={styles.imageSetting}
            source={require('../assets/img/right_arrow.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.innerView}>
          <Image
            style={styles.imageSetting}
            source={require('../assets/img/profile.png')}
          />
          <Text style={styles.textSetting}>Save Addresses</Text>
        </View>
        <TouchableOpacity style={styles.settingImageCenter}>
          <Image
            style={styles.imageSetting}
            source={require('../assets/img/right_arrow.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.innerView}>
          <Image
            style={styles.imageSetting}
            source={require('../assets/img/profile.png')}
          />
          <Text style={styles.textSetting}>Select Language</Text>
        </View>
        <TouchableOpacity style={styles.settingImageCenter}>
          <Image
            style={styles.imageSetting}
            source={require('../assets/img/right_arrow.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.innerView}>
          <Image
            style={styles.imageSetting}
            source={require('../assets/img/profile.png')}
          />
          <Text style={styles.textSetting}>Settings</Text>
        </View>
        <TouchableOpacity style={styles.settingImageCenter}>
          <Image
            style={styles.imageSetting}
            source={require('../assets/img/right_arrow.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.space}></View>
      <Text style={styles.headings}>My Activity</Text>
      <View style={styles.spaceLiner}></View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.innerView}>
          <Image
            style={styles.imageSetting}
            source={require('../assets/img/like.png')}
          />
          <Text style={styles.textSetting}>Delete Account</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setModelVisible(true);
          }}
          style={styles.settingImageCenter}>
          <Image
            style={styles.imageSetting}
            source={require('../assets/img/right_arrow.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.innerView}>
          <Image
            style={styles.imageSetting}
            source={require('../assets/img/like.png')}
          />
          <Text style={styles.textSetting}>Contect us</Text>
        </View>

        <TouchableOpacity
          onPress={async () => {
            try {
              await Linking.openURL(`mailto:${email}`);
            } catch (error) {
              console.log(error);
            }
          }}
          style={styles.settingImageCenter}>
          <Image
            style={styles.imageSetting}
            source={require('../assets/img/right_arrow.png')}
          />
        </TouchableOpacity>
      </View>
      <PrimaryButton onPress={clearToken}>LogOut</PrimaryButton>
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
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
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
  textSetting: {
    alignSelf: 'center',
    color: '#000',
    fontSize: 12,
    fontWeight: '500',
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  settingImageCenter: {
    alignSelf: 'center',
  },
});
