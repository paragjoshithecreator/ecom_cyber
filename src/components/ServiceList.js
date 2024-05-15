import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Loader from './Loader';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ServiceList() {
  const [product, setProduct] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const widthWindow = useWindowDimensions().width;

  useEffect(() => {
    products();
  }, []);

  const products = async () => {
    const userEarlierToken = await AsyncStorage.getItem('signupToken');
    try {
      setIsLoading(true);
      const response = await axios.get(
        'https://e-com-cyber.onrender.com/category/getallcategory',
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${userEarlierToken}`, // Include JWT token in the header
          },
        },
      );
      const Category = response.data.categoryData;
      setProduct(Category);
      // console.log(response.data.categoryData);
      setIsLoading(false);
    } catch (error) {
      console.error('Product:', error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loader size="large" animating={isLoading} /> : null}
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={product}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MyCart', {
                productId: item.name,
              });
            }}
            style={styles.innerView}>
            <Image style={styles.image} source={{uri: item.image}} />
            <Text
              style={[styles.text, {fontSize: widthWindow > 500 ? 16 : 12}]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item._id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  listView: {marginHorizontal: 10},
  innerView: {margin: 10},
  image: {
    width: 42,
    height: 42,
    borderRadius: 20,
    alignSelf: 'center',
    color: 'yellow',
    resizeMode: 'contain',
  },
  text: {
    color: '#000000',
    textAlign: 'center',
  },
});
