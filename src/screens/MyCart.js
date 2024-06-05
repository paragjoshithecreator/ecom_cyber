import axios from 'axios';
import Loader from '../components/Loader';
import ShopButton from '../components/ShopButton';
import PrimaryButton from '../components/PrimaryButton';
import {globalColor} from '../GlobalStyles';
import {strings} from '../language';
import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: '4', value: '4'},
  {label: '5', value: '5'},
  {label: '6', value: '6'},
  {label: '7', value: '7'},
  {label: '8', value: '8'},
];
export default function MyCart() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [token, setToken] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const products = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    setToken(userToken);

    setLoading(true);
    try {
      const response = await axios.get(
        `https://e-com-cyber.onrender.com/user/getcart`,

        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        },
      );
      setLoading(false);
      const result = await response.data.cart.products;
      const totalPrice = await response.data.cart.total;
      console.log('OUR RESPONSE', response.data.cart);
      setProduct(result);
      setTotalPrice(totalPrice);
    } catch (error) {
      console.error('Product:', error);
    }
  };
  useEffect(() => {
    products();
  }, []);

  const removeTocartHandler = async productId => {
    const token = await AsyncStorage.getItem(`userToken`);
    try {
      const response = await axios.delete(
        `https://e-com-cyber.onrender.com/removefromcart/${productId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const {removetoCart, buyNow, productPrice, total} = strings;

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <Loader animating={loading} color={'red'} size={'large'} />
      ) : (
        <View style={styles.container}>
          <FlatList
            data={product}
            renderItem={({item}) => {
              return (
                <View>
                  <TouchableOpacity style={styles.innerContainer}>
                    <View style={styles.sideView}>
                      <Image style={styles.image} source={{uri: item.image}} />

                      <View>
                        <Text style={styles.nameText}>{item.category}</Text>
                        <Text style={styles.nameText}>{item.quantity}</Text>
                        <Text style={styles.priceText}>$ {item.price}</Text>
                        <Text style={styles.priceText}>$ {item.name}</Text>
                        <Text style={styles.nameText}>
                          {item.ratings}
                          {'⭐️'}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.buttonView}>
                      <ShopButton
                        onPress={() => removeTocartHandler(item.productId)}
                        title={removetoCart}
                        backgroundColor={'green'}
                      />
                      <Dropdown
                      placeholder='Qty'
                        style={{width: 50}}
                        selectedTextStyle={{color: 'green', fontSize: 16}}
                        inputSearchStyle={{fontSize: 12, height: 120}}
                        data={data}
                        value={value}
                        labelField={'label'}
                        valueField="value"
                        onChange={item => {
                          setValue(item.value);
                          setIsFocus(false);
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={item => item._id}
          />
          <View style={styles.bottomView}>
            <View style={styles.innerBottomView}>
              <Text style={styles.totalText}>{total}</Text>

              <Text style={styles.sumText}>
                {productPrice} {totalPrice}
              </Text>
            </View>
            <PrimaryButton>{buyNow}</PrimaryButton>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 9,
    elevation: 10,
  },
  sideView: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  nameText: {
    color: globalColor.black,
    fontSize: 14,
  },
  priceText: {
    color: globalColor.green,
    fontSize: 14,
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  bottomView: {
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  innerBottomView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  totalText: {
    fontSize: 20,
    color: globalColor.black,
  },
  sumText: {
    fontSize: 16,
    color: globalColor.orange,
  },
});
