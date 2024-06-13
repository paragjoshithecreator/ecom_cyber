import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {globalColor} from '../GlobalStyles';

export default function TrendingList() {
  const navigation = useNavigation();

  const getProducts = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products`);
      const productData = response.data.products;
      setProducts(productData);
    } catch (error) {
      console.log(error);
    }
  };

  const [products, setProducts] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getProducts();
    }
  }, [isFocused]);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProductDetail', {
                itemId: item.id,
              });
            }}
            style={styles.container}>
            <Image style={styles.image} source={{uri: item.thumbnail}} />
            <Text style={styles.title}>{item.title}</Text>
            <Text
              style={[
                styles.availability,
                {
                  color:
                    item.availabilityStatus === 'In Stock' ? 'green' : 'red',
                },
              ]}>
              {item.availabilityStatus}
            </Text>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.rating}>Rating: {item.rating}</Text>
            <Text style={styles.stock}>Stock: {item.stock}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {width: 0, height: 1},
    backgroundColor: globalColor.lightWhite,
  },
  image: {
    width: 150,
    height: 200,
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
  rating: {
    fontSize: 14,
    color: '#888',
  },
  stock: {
    fontSize: 14,
    color: '#888',
  },
  availability: {
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'left',
  },
});
