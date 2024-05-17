import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import axios from 'axios';

export default function Test() {
  const [product, setProduct] = useState([]);
  const userInfo = async () => {
    const response = await axios.get(
      `https://productdata-j0mo.onrender.com/product`,
    );
    console.log(response.data);
    const result = response.data;
    setProduct(result);
  };
  useEffect(() => {
    userInfo();
  }, []);
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={product}
        renderItem={({item}) => (
          <View>
            <Image
              style={{width: 100, height: 100}}
              source={{uri: item.image}}
            />
            <Text>{item._id}</Text>
            <Text>{item.name}</Text>
            <Text>{item.detail}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}
