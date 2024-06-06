import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import ModalCom from './ModalCom';
import {strings} from '../language';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

export default function FavWishList() {
  const route = useRoute();
  const [userFav, setUserFav] = useState([]);
  const [remove, setRemove] = useState(false);
  const [productId, setProductId] = useState('');
  const navigation = useNavigation();

  const wishListHandler = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        `https://e-com-cyber.onrender.com/user/getwishlist`,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        },
      );
      console.log(response.data.wish.products);
      const productDetails = response.data.wish.products;
      setUserFav(productDetails);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const userFavHandler = async () => {
    const favItemDetails = await AsyncStorage.getItem('favItemDetails');
    const itemData = JSON.parse(favItemDetails);

    if (itemData) {
      setUserFav(itemData);

      console.log('IN IF', itemData);
    }
  };

  const removeItemFromWishList = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('IN the API', productId);
    try {
      const response = await axios.put(
        `https://e-com-cyber.onrender.comr/user/removewishlist/${productId}`,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        },
      );
      console.log('delete response..', response);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    wishListHandler();
  }, []);

  const addToFav = async item => {
    // Update state
    setUserFav(prevState => [...prevState, item]);
    // Save to AsyncStorage
    await AsyncStorage.setItem(
      'favItemDetails',
      JSON.stringify([...userFav, item]),
    );
  };

  const {productPrice, modalHeading, modalMetaData} = strings;
  const modalImage = require('../assets/img/delete.png');

  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <FlatList
          numColumns={2}
          data={userFav}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.spaceSection}
              onPress={() => {
                console.log('Send', item._id);
                navigation.navigate('ProductDetail', {
                  itemId: item.productId,
                });
              }}>
              <View style={styles.listView}>
                <TouchableOpacity
                  onPress={() => {
                    setProductId(item.productId);
                    setRemove(true);
                  }}>
                  <Image
                    style={styles.image}
                    source={require('../assets/img/delete.png')}
                  />
                </TouchableOpacity>
                <View style={styles.imageView}>
                  <Image style={styles.imageTow} source={{uri: item.image}} />
                </View>
                <Text style={styles.heading}>{item.itemName}</Text>
                <Text style={styles.rateList} numberOfLines={1}>
                  {item.itemdescription}
                </Text>
                <Text style={[styles.rateList, {color: 'green'}]}>
                  {productPrice} {item.price}
                </Text>
                <Text style={{color: '#000'}}>{item._id}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
        />
      </View>
      <ModalCom
        onPressYes={() => {
          removeItemFromWishList();
          setRemove(false);
        }}
        onPressNo={() => {
          setRemove(false);
        }}
        title={modalHeading}
        metaData={modalMetaData}
        image={modalImage}
        visible={remove}
        animationType="slide"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  heading: {
    color: '#000',
    fontSize: 16,
    alignSelf: 'center',
  },
  innerContainer: {
    paddingBottom: '2%',
  },
  listView: {
    borderRadius: 10,
    width: 185,
    // height: 200,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: '2%',
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceSection: {marginVertical: 8},
  image: {
    alignSelf: 'flex-end',
    tintColor: 'red',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTow: {
    width: 120,
    height: 120,
    borderRadius: 10,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  rateList: {
    fontSize: 12,
    color: '#000',
    marginVertical: 5,
    marginLeft: 10,
  },
});
