import {View, Text, FlatList, Image, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {catData} from '../DummyData';
import {globalColor} from '../GlobalStyles';
import axios from 'axios';

export default function CategoryItems() {
  useEffect(() => {
    products();
  }, []);

  const [product, setProduct] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const products = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        'https://e-com-cyber.onrender.com/category/getallcategory',
      );
      const Category = response.data.categoryData;
      setProduct(Category);
      setIsLoading(false);
    } catch (error) {
      console.error('Product:', error);
    }
  };
  const [ispressed, setIspressed] = useState(false);

  return (
    <View>
      <FlatList
        data={product}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() => {
              console.log('pressed');
              setIspressed(true);
            }}
            style={({pressed}) =>
              pressed ? styles.bgColor : styles.container
            }>
            <Image
              source={{uri: item.image}}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.categoryText}>{item.name}</Text>
          </Pressable>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9AE2D9',
    marginBottom: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  bgColor: {
    backgroundColor: '#fff',
    marginBottom: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    opacity: 0.7,
  },
  image: {width: 50, height: 50, borderRadius: 10},
  categoryText: {
    color: globalColor.black,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 5,
  },
});
