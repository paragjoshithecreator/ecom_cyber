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

export default function MyCart() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  const products = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('userToken');
    console.log('TOKEN', token);
    try {
      const response = await axios.get(
        `https://e-com-cyber.onrender.com/user/getcart`,
        {},

        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.data.data.products;
      console.log(result);
      setProduct(result);

      setLoading(false);
    } catch (error) {
      console.error('Product:', error.response.data);
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
                        <Text style={styles.nameText}>{item.name}</Text>
                        <Text style={styles.nameText}>{item.quantity}</Text>
                        <Text style={styles.priceText}>$ {item.price}</Text>
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
                {productPrice} {'1,200'}
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
