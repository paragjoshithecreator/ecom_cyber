import axios from 'axios';
import {globalColor} from '../GlobalStyles';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, StyleSheet, Pressable} from 'react-native';
import {catData} from '../DummyData';
import {useNavigation} from '@react-navigation/native';

export default function CategoryItems() {
  useEffect(() => {
    products();
  }, []);

  const [product, setProduct] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const products = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        'https://e-com-cyber.onrender.com/category/getallcategory',
      );
      const Category = response;
      console.log(Category.data.categoryData);
      setProduct(Category.data.categoryData);
      setIsLoading(false);
    } catch (error) {
      console.error('Product:', error);
    }
  };

  return (
    <View>
      {!isLoading ? (
        <FlatList
          data={product}
          renderItem={({item, index}) => (
            <Pressable
              onPress={()=>{}
                /* () => {
                navigation.navigate('Explore', {
                  productId: item.name,
                });
              } */
            }
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
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#9AE2D9',
    backgroundColor: '#ccc',
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
